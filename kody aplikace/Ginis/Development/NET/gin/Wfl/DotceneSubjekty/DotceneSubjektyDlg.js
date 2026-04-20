

$(function () {
        "use strict";
        namespace("Gordic.Wfl.WebClient.DotceneSubjektyDlg", {

            onContentReady: function () {
                this.actions.actDetail.update({ icon: Gordic.Gin.Globals.Icons.ZobrazitDetail().icon });
                this.actions.actNovy.update({ icon: Gordic.Gin.Globals.Icons.NovyZaznam().icon });
                this.actions.actOdstranit.update({ icon: "fa-remove" });
                this.actions.actSkupiny.update({ icon: "fa-group" });

                this.povoleniDto.NeaktivniCheckboxChecked = this.userSettings.get("NeaktivniCheckboxChecked", false);

               

                if (!this._isDebounced) {
                    this.showPreview = Utils.debounced(this.showPreview, 250);
                    this._isDebounced = true;
                }
                var that = this;
                this.title = "jres:26226930" + " " + this.Ixp;
                var polePodminek = [];

                if (this.povoleniDto.IZDokVlozVeSpisuCheckboxEnabled) {
                    polePodminek.push({ hodnota: 1, name: "IZDokVlozVeSpisuCheckboxChecked", label: "jres:26226320" });
                }
                polePodminek.push({ hodnota: 2, name: "IAktualniCheckboxChecked", label: "jres:31926105" });
                polePodminek.push({ hodnota: 3, name: "NeaktivniCheckboxChecked", label: "jres:26226321" });

                var FiltryForm = new Gordic.Forms
                    .Form({
                        tabLabel: "Údaje externího subjektu",
                        name: "Filtry",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1"
                    })
                    .addSection()
                    //.addRow("jres:26226320").addField("gcheck", { name: "IZDokVlozVeSpisuCheckboxChecked", disabled: !this.povoleniDto.IZDokVlozVeSpisuCheckboxEnabled, labelFromRow: false }) //RC 26226320 : Zobrazit i dotčené subjekty z dokumentů vložených ve spisu
                    //.addRow("jres:31926105").addField("gcheck", { name: "IAktualniCheckboxChecked", labelFromRow: false }) //RC 31926105 : Zobrazit aktuální verzi externího subjektu
                    //.addRow("jres:26226321").addField("gcheck", { name: "NeaktivniCheckboxChecked", labelFromRow: false }) //RC 26226321 : Zobrazit i neaktivní dotčené subjekty
                    .addRow({ label: "", favoriteRowLayoutDescriptor: "w-L-9 w-M-6 w-S-12"})
                    .addField("gselectbox", {
                        name: "selField",
                        itemTemplate: "{label}",
                        list: true,
                        multi:true,
                        itemWidth: "",
                        model:"model.checkValues=value.hodnota",
                        data: new Gordic.Data.View(polePodminek, { key:"hodnota" })
                    })
                    ; 

                this.filterPanel = $("<div>").appendTo(this.element)
                    .on("gfilterpanelapply", function (event, obj) {
                        //console.log("Hledám: ", obj);
                        //that.povoleniDto.IZDokVlozVeSpisuCheckboxChecked = obj.filter.IZDokVlozVeSpisuCheckboxChecked;
                        //that.povoleniDto.NeaktivniCheckboxChecked = obj.filter.NeaktivniCheckboxChecked;
                        //that.povoleniDto.IAktualniCheckboxChecked = obj.filter.IAktualniCheckboxChecked;
                        that.povoleniDto.IZDokVlozVeSpisuCheckboxChecked = (obj.filter.checkValues && (obj.filter.checkValues.indexOf(1) > -1)) ? true : false;
                        that.povoleniDto.NeaktivniCheckboxChecked = (obj.filter.checkValues && (obj.filter.checkValues.indexOf(3) > -1)) ? true : false;
                        that.povoleniDto.IAktualniCheckboxChecked = (obj.filter.checkValues && (obj.filter.checkValues.indexOf(2) > -1)) ? true : false;

                        that.userSettings.set("NeaktivniCheckboxChecked", that.povoleniDto.NeaktivniCheckboxChecked);

                        that.reloadData();
                    })
                    .gfilterpanel({
                        simpleMode: true,
                        forms: [FiltryForm], //
                        favoriteLayoutDescriptor: "L5M3S1"//"w-L-3 w-M-3 w-S-12"// 
                    });
                this.povoleniDto.checkValues = [];
                if (this.povoleniDto.IZDokVlozVeSpisuCheckboxChecked) {
                    this.povoleniDto.checkValues.push(1);
                }
                if (this.povoleniDto.IAktualniCheckboxChecked) {
                    this.povoleniDto.checkValues.push(2);
                }
                if (this.povoleniDto.NeaktivniCheckboxChecked) {
                    this.povoleniDto.checkValues.push(3);
                }

                this.filterPanel.gfilterpanel("applyFilter", this.povoleniDto, true);



                //#region Vytvoreni gsidebaru pro nahled

                this.previewDiv = this.createPreviewPanel();
                this.rowToPreview = null;

                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31926004" }, //RC 31926004 : Náhled
                    id: "panelPreview",
                    icon: "gi-nahled",
                    customDiv: this.previewDiv,
                    open: function (ev, ctx) {
                        if (that.rowToPreview != null) {
                            that.loadPreview(that.rowToPreview);
                            that.rowToPreview = null;
                        }
                    },
                });
                this.enablePreview(false);

                //#endregion

                var gridKolonky = new Gordic.Data.GridFormat();
              
                gridKolonky
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn())
                    .addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds())
                    ;

                if (this.gin_iszr_povole && this.gin_iszr_rozin) {  
                    gridKolonky.addIconColumn(Gordic.Esu.Function.DatumOvereniVSZRColumn());

                }

                gridKolonky
                    .addIconColumn({
                        name: "esu_stav",
                        caption: "jres:31926098", //RC 31926098 : Aktuálnost ESU
                        //customClass: "center",
                        width: 40,
                        //fixedWidth: true,
                        iconTemplate: function (data) {
                            if (data.iconEsuStavIco) {
                                return {
                                    icon: data.iconEsuStavIco,
                                    tooltip: data.iconEsuStavText
                                }; //RC 31900112 : Subjekt má aktivní bankovní účet (účty).
                            } else {
                                return null;
                            }
                        }
                    })
                    .addNumberColumn({
                        name: "por_cislo",
                        width: 50,
                        caption: "jres:31926099", //RC 31926099 : Pořadí
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: "jres:26225557", //RC 26225557 : Značka
                        width: 80
                    });

                if (this.ssl_dotcs_rozpr === 1) {
                    gridKolonky
                        .addIconColumn({
                            name: "postaveni_img",
                            caption: "jres:31926100", //RC 31926100 : Postavení
                            //customClass: "center",
                            width: 40,
                            //fixedWidth: true,
                            iconTemplate: function (data) {
                                var custClass = "";
                                if (data.postaveni_img) { 
                                    if (data.roz_vazba && roz_vazba != 100) {
                                        custClass = " ui-state-disabled";
                                    }
                                    return {
                                        icon: ["fa-user " + custClass, "fa-link gi-stack-pos--rb"], //postaveni_subjektu_ke_spisu
                                        tooltip: "jres:31926100" //RC 31926100 : Postavení
                                    };
                                }else {
                                    return null;
                                }
                            }
                        })
                        .addTextColumn({
                            name: "postaveni",
                            caption: "jres:31926100",  //RC 31926100 : Postavení
                        });

                }

                gridKolonky
                    .addTextColumn({
                        name: "esu_txt",
                        width: 350,
                        caption: "jres:26225309", //RC 26225309 : Externí subjekt
                    })
                    .addTextColumn({
                        name: "zast_osoba",
                        caption: "jres:26225305", //RC 26225305 : Zást.osoba
                    });
                if (this.gin_esu_inzobr){
                    gridKolonky
                    .addTextColumn({
                        name: "druh_stav_r_txt",
                        caption: "jres:31926101", //RC 31926101 : Insolvence
                    });

                }
                gridKolonky
                    .addTextColumn({
                        name: "dva_txt",
                        caption: "jres:26225311", //RC 26225311 : Důvod vazby
                        width: 100,
                        editor: {
                            widget: "gselectbox",
                            
                            options: $.extend({}, {
                            name: "duvodVazbyField",
                            model: "model.ixs_dva = value.ixs_dva",
                            serverFilters: {
                                aktivita: [100, 300, 500, 900],
                                //typ_vazby: new Gordic.Forms.Dependency("typVazbyField", "typ_vazby") //typ_vazby
                                }
                            }
                            , Gordic.Prefabs.Select.wflsdva())
                        },
                    })
                    .addTextColumn({
                        name: "poznamka",
                        caption: "jres:26225312", //RC 26225312 : Poznámka
                        editor: { widget: "gstringbox" },
                        width: 100
                    });

                gridKolonky
                    .addTextColumn({
                        name: "typ_vazby_txt",
                        caption: "jres:26225313", //RC 26225313 : Typ vazby
                        width: 50
                    })
                    .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:26225280", //RC 26225280 : Datum změny
                    })
                    .addTextColumn({
                        name: "nazev_rf",
                        caption: "jres:26225279", //RC 26225279 : Změnu provedl
                    })
                    ;
                if (this.IsSpis){
                    gridKolonky
                        .addTextColumn({
                            name: "ixp",
                            caption: "jres:26225442", //RC 26225442 : PID
                        })

                }

                $.content(this).actions.add({
                    name: "actDoubleClickDokumentu",
                    run: function (ev, ctx) {
                        //console.log(ctx.cellInfo.data);
                        //
                        
                    }
                });

                that.grid = $("<div>").appendTo(this.element);
                that.grid.gautofit()
                    //.height(600)
                    .ggrid({
                        name: "Grid",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        navigationMode: "row", // row, cell
                        //defaultAction: $.content(this).actions.actDoubleClickDokumentu, //selectAction
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) { //aktivita_ds
                                return " ui-disabled data-deleted ";
                            } else return " ";
                        },
                        selection: function (ev, selectionInfo) {
                            var sel = that.grid.ggrid("activeRow");
                            if (sel != null) {
                                that.enablePreview(true);
                                that.showPreview(sel);
                            } else {
                                that.enablePreview(false);
                            }
                            that.updateActions();
                        }, 

                        multi: false,

                        scrollHelperTemplate: "{esu_txt}",  // "{ixs_esu} - {nazev}",
                        searchColumns: ["esu_txt"],

                        columns: gridKolonky,
                    }).ggridroweditor({
                        save: function (data, info) {
                            var opt = {};
                            opt.row = data
                            return $.content(this).call("UlozZmenuRadku", opt);
                        },
                        start: function (ev, obj) {
                            var field = $(this).findFields("duvodVazbyField");
                            var Serverfilters = field.gfield("option", "serverFilters");
                            Serverfilters.typ_vazby = obj.cellInfo.data.typ_vazby;
                            field.gfield("option", "serverFilters", Serverfilters);
                        }
                });


                    

                


             
                this.naplnGrid(this.ListDto);

                //this.element.gsidebar("option", { right: { visible: false } });
                //this.rightSb$.gsbpanel("show");
                
            },

            naplnGrid: function (listDto) {
                this.ViewTabulka = new Gordic.Data.View(listDto, { key: "ixp_vis" }); 
                this.grid.ggrid("setData", this.ViewTabulka, true);
                this.updateActions();
            },

            //#region updateActions

            updateActions: function () {
                var gridValue = this.grid.ggrid("getSelection");
                var notEmpty = (gridValue && gridValue.length > 0);

                var povEditVazbu = true;
                if (this.editovatelneTypyVazeb != "-1" && this.editovatelneTypyVazeb != "") {
                    this.editovatelneTypyVazeb = this.editovatelneTypyVazeb + ",";
                    var typVazby;
                    var aktVazba = "";
                    typVazby = (notEmpty && gridValue[0])?  gridValue[0]["typ_vazby"]: "";
                    aktVazba = typVazby + ",";
                    if (this.editovatelneTypyVazeb.indexOf(aktVazba) != -1)
                        povEditVazbu = true;
                    else
                        povEditVazbu = false;
                }
                var m_oActionZmenitAktivitu; 
                var m_oActionOdstranit;
                if (!notEmpty || (this.IsSpis && notEmpty && (gridValue[0]["doctype_bitmap"] != 11))) { //PisemnostBitmap.Spis
                    m_oActionZmenitAktivitu = false;
                    m_oActionOdstranit = false;
                } else {
                    m_oActionZmenitAktivitu = povEditVazbu;
                    m_oActionOdstranit = povEditVazbu;
                } 
                
                this.actions.actDetail.update({ enabled: notEmpty });
                this.actions.actPostaveniSubjektuKeSpisu.update({ enabled: notEmpty });
                this.actions.actDetailVazby.update({ enabled: (notEmpty && this.povoleniDto.EnabledMode)});
                this.actions.actPridatZDokumentu.update({ enabled: (this.povoleniDto.EnabledMode) });
                this.actions.actNovy.update({ enabled: (this.povoleniDto.EnabledMode) });
                this.actions.actOdstranit.update({ enabled: (notEmpty && this.povoleniDto.EnabledMode) && m_oActionOdstranit });
                this.actions.actSkupiny.update({ enabled: (this.povoleniDto.EnabledMode) });
                this.actions.actZmenitAktivitu.update({ enabled: (notEmpty && this.povoleniDto.EnabledMode) && m_oActionZmenitAktivitu });
                this.actions.actAktualizovatEsu.update({ enabled: (notEmpty && this.povoleniDto.EnabledMode) });

                this.actions.actDotceneDokumenty.update({ visible: (this.gin_rad_esudodo === 1) });
                this.actions.actPostaveniSubjektuKeSpisu.update({ visible: this.povoleniDto.m_nSslDotcsRozprPar ===1 });
            },

            //#endregion

            /// přidat nové
            novy: function () {
                var that = this;
                
                if (!this.JeEko) {// není EKO

                    var  Logovani = {
                        Ixp: this.Ixp,
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                        AktZnacka: this.AktZnacka,
                    }
                    var optKartoteky = {
                        Ucel: 3,
                        Logovani: Logovani
                    };
                    Gordic.Esu.Dialogs.KartotekaEsuDlg(this, optKartoteky).on("closed", function (ev, retVal) {
                        if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {
                            that.novyPridaniZKartoteky(retVal.subjekty);
                        }
                    });
                } else {
                    //Console.log("Není dodělané napojení na GDetailVazbyDotcenehoSubjekuTab")
                    //TODO
                    var options = {
                        Ixp: this.Ixp,
                        IxsEsu: null,
                        TypVazby: null,
                        LicZast: null,
                        PorZast: null,
                        AktZnacka: this.AktZnacka,
                        EditEsu: this.EditEsu

                    };
                    Gordic.Wfl.Dialogs.DetailDotcSubjektuDlg(this, options, 'showWindow').on("closed", function (ev, retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }
                    });
                }

            },
            novyPridaniZKartoteky: function (data) {
                var that = this;
                this.call("PridaniSubjektuZKartoteky", { list: data })       
                    .done(function (retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }

                    });
                
            },

            detail: function () {
                var that = this;
                //var sel = that.gridKartoteka.ggrid("getSelection")[0];
                var Logovani = {
                    Ixp: this.Ixp,
                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                    AktZnacka: this.AktZnacka,
                    DuvodHledaniTxt: ""
                }
                var sel = that.grid.ggrid("activeRow");
                if (sel) {
                    var opt = {
                        IxsEsu: sel.ixs_esu,
                        Ucel: 1,
                        Logovani: Logovani,
                        LzePrepnoutZDetailuNaEditaci: this.EditEsu
                    };
                    var dlailog =  Gordic.Esu.Dialogs.DetailEsuDlg(that, opt);
                    if (dlailog) {
                        dlailog.on("close",
                            function (ev, retVal) {
                                if (retVal) {
                                    if (retVal.ulozeno) {
                                        that.reloadData();
                                    }

                                }
                            });
                    }

                       
                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }
            },

            detailVazby: function () {
                var that = this;
                var sel = this.grid.ggrid("activeRow");
                if (sel) { 
                    var options = {
                        Ixp: this.Ixp,
                        IxsEsu: sel.ixs_esu,
                        TypVazby: sel.typ_vazby,
                        LicZast: sel.lic_zast,
                        PorZast: sel.por_zast,
                        AktZnacka: this.AktZnacka,
                        EditEsu: this.EditEsu

                    };
                    Gordic.Wfl.Dialogs.DetailDotcSubjektuDlg(this, options, 'showWindow').on("closed", function (ev, retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }
                    });
                }

                 /*
                if (sel.por_zast != null)     // ALF 31.7.2012 - při zobrazení vazby subjektu na dokumentu při zobrazení DS spisu docházelo k chybě 
                {
                    //TODO
                   
                    GDetailVazbyDotcenehoSubjekuTab l_oDetailVazbyDotcenehoSubjekuTab = new GDetailVazbyDotcenehoSubjekuTab(
                        m_oIxp,
                        CurrentRow.ixs_esu,
                        CurrentRow.typ_vazby,
                        CurrentRow.lic_zast,
                        CurrentRow.por_zast,
                        m_oDokument.AktZnacka,
                        m_bEditEsu
                    );
                    l_oDetailVazbyDotcenehoSubjekuTab.Closed += new EventHandler(DetailVazbyTab_Closed);
                    l_oDetailVazbyDotcenehoSubjekuTab.ReadOnlyMode = m_oIxp != CurrentRow.ixp;
                    Task.AddModalWin(l_oDetailVazbyDotcenehoSubjekuTab);
                    
                }
                */

            },

            odstranit: function () {
                var that = this;
                var sel = that.grid.ggrid("getSelection");
                if (sel && sel.length > 0) {
                    this.dialogs.confirm("jres:31926103").on("closed", function (ev, retVal) {  //RC 31926103 : Odstranit vybrané řádky?
                        if (retVal) {
                            if (retVal === "yes") {
                                that.odstranitSrv();
                            }
                        }
                    });

                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }

            },

            odstranitSrv: function () {
                var that = this;
                var sel = that.grid.ggrid("getSelection");
                if(sel){
                this.call("OdstranitVybrane", { list: sel })
                    .done(function (retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }
                    });
                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }
            },


            skupiny: function () {
                var that = this;
                var Logovani = {
                    Ixp: this.Ixp,
                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                    AktZnacka: this.AktZnacka,
                }
                var options = {
                    ID: "ESUSkupinyEsuDlg#",
                    Logovani: Logovani,
                    SkupinyWorkingMode: 1
                };
                Gordic.Esu.Dialogs.RozdelovnikEsuDlg(this, options).on("closed", function (ev, retVal) {
                    if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {
                        that.novePridaniZeSkupiny(retVal.subjekty);
                    }
                });
            },

            novePridaniZeSkupiny: function (data) {
                var that = this;
                this.call("PridaniSubjektuZeSkupinEsu", { list: data })
                    .done(function (retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }
                    });
            },

            zmenitAktivitu: function () {
                var that = this;
                var sel = that.grid.ggrid("getSelection");
                if (sel) {
                this.call("zmenitAktivitu", { list: sel })
                    .done(function (retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }
                        });
                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }
            },
            aktualizovatESU: function () {
                var that = this;
                var sel = that.grid.ggrid("getSelection");
                if (sel && sel.length > 0) {
                    this.dialogs.confirm("jres:31926104").on("closed", function (ev, retVal) { //RC 31926104 : Přejete si aktualizovat vybrané externí subjekty na jejich aktuální verze?
                        if (retVal) {
                            if (retVal === "yes") {
                                that.aktualizovatESUsrv();
                            }
                        }
                    });

                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }
            },

            aktualizovatESUsrv: function () {
                var that = this;
                var sel = that.grid.ggrid("getSelection");
                if (sel) {
                this.call("AktualizovatVybraneEsu", { list: sel })
                    .done(function (retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.reloadData();
                        }
                        });
                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }

            },

            pridatZDokumentu: function () {
                var that = this;
                Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(this, {}).on("closed", function (ev, retVal) {
                    if (retVal && retVal.ixp) {
                        that.pridaniNovehoZDokumentu(retVal.ixp);
                    }
                });

            },

            pridaniNovehoZDokumentu: function (ixp) {
                var that = this;
                if (ixp) {
                    this.call("PridatZDokumentu", { ixpPridavaneho: ixp })
                        .done(function (retVal) {
                            if (retVal) {
                                that.nastavZeDosloKeZmene();
                                that.reloadData();
                            }
                        });
                } 

            },
            dotceneDokumenty: function () {
                var that = this;
                var sel = that.grid.ggrid("activeRow");

                if(sel) {
                    var opt = {
                        ixs_esu: sel.ixs_esu,
                        Logovani: {
                            Ixp: this.Ixp,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                            AktZnacka: this.AktZnacka,
                            DuvodHledaniTxt: ""
                        }
                    };
                    Gordic.Wfl.Dialogs.DotceneDokumentyDlg(this, opt).on("closed", function (ev, retVal) {

                    });
                } else {
                    that.dialogs.alert("jres:31926102"); //RC 31926102 : Nebyl označen řádek
                }
            },

            //#region akce

            reloadData: function () {
                var that = this;
                this.call("LoadData")
                    .done(function (retVal) {
                        if (retVal) {
                            that.naplnGrid(retVal);
                        }

                    });
            },

            //#endregion
            //#region Esu náhled
            _isDebounced: false,

            createPreviewPanel: function () {
                return $("<div>").gpreview({
                    parentContent: this,
                    tabs: [

                        {
                            caption: "jres:31926106", //RC 31926106 : Souhrn
                            content: "Gordic.Esu.WebClient.GEsuDetailPreview"//časem takto-> function (loadParams) { return Gordic.Previews.getPreviewClass(loadParams.typ_ag, loadParams); }
                        },

                    ]
                });
            },

            loadPreview: function (row) {
                var that = this;
                //console.log(row);
                this.previewDiv.gpreview("loadAll", {
                    Logovani: {
                        Ixp: that.Ixp,
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                        AktZnacka: that.AktZnacka,
                        DuvodHledaniTxt:""
                    },
                    IxsEsu: row.ixs_esu
                } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
            },
            enablePreview: function (enabled) {
                this.previewDiv.gpreview("option", { disabled: !enabled });
            },
            showPreview: function (row) {
                if (this.element.gsidebar("getPanel", "panelPreview").gsbpanel("option", "visible")) {
                    this.loadPreview(row);
                } else {
                    this.rowToPreview = row;
                }
            },
            //#endregion
            //#region porovnání
            showComparison: function (rows) {
                var _this = this;

                var dataRows = rows.map(function (item, idx) { return item.data; }); // převod z grid metadata-view do pole dto
                if (this.isComparisonInited) {
                    this.addToComparison(dataRows);
                } else {
                    this.isComparisonInited = true;
                    this.comparisonCnt$.empty();

                    $('<div class="js-detail-comparator">').appendTo(this.comparisonCnt$).gcomparator({
                        items: dataRows,
                        columns: this.gridDokumenty.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
                        itemTemplate: "{nazev}",
                        itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
                        selection: function (ev, ctx) { _this.gridDokumenty.ggrid("activeRow", ctx.item); }
                    });
                }
                for (var row in rows) {
                    rows[row].checked = false;
                }

                this.gridDokumenty.ggrid("refresh");

            },

            addToComparison: function (rows) {
                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
            },
            //#endregion

            nastavZeDosloKeZmene: function () {
                if (this.retValue == null) {
                    this.retValue = {};
                }
                this.retValue.dosloKeZmene = true;

            },

            closing: function () { // podmineny userClose 
                var def = $.Deferred();

                if (this.retValue) {
                    def.resolve(this.retValue);
                } else {
                    def.resolve();
                }
               
                return def.promise();
            },

            closeDet: function () {
                this.tryClose();

            },

            

    }, { extendIntellisense: GContent });
    
       

});

   
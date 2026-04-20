

$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.SeznamPobocekDlg", {
            /// <summary>Běžný režim - dvojklik otevírá detail a neprovádí výběr</summary>
            /// 0 = Normal,
            /// <summary>Režim výběru jednoho externího subjektu</summary>
            /// 1 = SelectEsu,
            /// <summary>Režim výběru jednoho externího subjektu nebo jedné zástupné osoby</summary>
            /// 2 = SelectEsuOrZo,
            /// <summary>Režim výběru více externích subjektů a více zástupných osob</summary>
            /// 3 = SelectMultiEsuAndZo

            onContentReady: function () {
                if (!this._isDebounced) {
                    this.showPreview = Utils.debounced(this.showPreview, 250);
                    this._isDebounced = true;
                }
                var that = this;

                this.newOps({ title: "jres:31900187" });
                this.poleProSmazani = [];
                this.poleProPridani = [];

                //#region Vytvoreni gsidebaru pro nahled

                this.previewDiv = this.createPreviewPanel();
                this.rowToPreview = null;

                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31900196" }, //RC 31900196 : Náhled
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

                //#region Vytvoreni gsidebaru pro porovnání
                this.comparisonBadge = new GObservableObject({ value: "0" });
                this.comparisonCnt$ = $("<div class='no-border'>").append($("<h3>", { text: "jres:31900218", style: "margin: 0.5rem" })); //RC 31900218 : Vyberte alespoň dvě položky v seznamu
                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31900197", badge: this.comparisonBadge }, //RC 31900197 : Porovnání
                    id: "rightComparisonPanel",
                    pinned: false,
                    icon: "fa-balance-scale",
                    customDiv: this.comparisonCnt$
                });
                //#endregion

                var gridKolonky = new Gordic.Data.GridFormat()
                    .addIconColumn({
                        name: "stav",
                        caption: "jres:26265328", //RC 26265328 : Stav
                        //customClass: "center",
                        width: 40,
                        //fixedWidth: true,
                        iconTemplate: function (data) {
                            if (data) {
                                switch (data.stav) {
                                    case 1: // pridat
                                        return { icon: "gi-plus g-state-text g-state-success", tooltip: "jres:31900188"}; //RC 31900188 : Přidán
                                    case 2: // odebrat
                                        return { icon: "gi-window-close g-state-text  g-state-important", tooltip: "jres:31900189" }; //RC 31900189 : Odebrán
                                    default:
                                        return null;
                                }
                            } else {
                                return null;
                            }
                        }
                    })
                    .addHtmlColumn({
                        name: "cnt_zo",
                        caption: "jres:31900190", //RC 31900190 : Zástupné osoboy
                        customClass: "center",
                        width: 40,
                        fixedWidth: true,
                        cellTemplate: Gordic.Esu.Function.cellTemplateZastupneOsoby(that) 
                    });

                    if (this.gin_ssl_datschr) {
                        gridKolonky.addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds());
                    }

                    gridKolonky
                        .addIconColumn(Gordic.Esu.Function.ColumnTypAdresy())

                        .addIconColumn(Gordic.Esu.Function.ColumnIszrIkonka(that.gin_esu_inzobr, that.gin_iszr_zostv));

                    gridKolonky.addTextColumn({
                        name: "typ_adr_txt",
                        caption: "jres:26265354", //RC 26265354 : Typ adresy
                    });

                    if (this.gin_ssl_datschr) {
                        gridKolonky.addTextColumn({
                            name: "id_ds",
                            caption: "jres:31900191", //RC 31900191 : Datová schránka
                        });

                    }
                    gridKolonky.addTextColumn({
                        name: "nazev_ext",
                        caption: "jres:26265146", //RC 26265146 : Název
                    })
                    .addTextColumn({
                        name: "ulice",
                        caption: "jres:26265147", //RC 26265147 : Ulice
                    })
                    .addTextColumn({
                        name: "cpop",
                        caption: "jres:31900193", //RC 31900193 : Č.pop
                    })
                    .addTextColumn({
                        name: "obec",
                        caption: "jres:26265149", //RC 26265149 : Obec
                    })
                    .addNumberColumn({
                        name: "ur_pri",
                        caption: "jres:26265382", //RC 26265382 : Úroveň přístupu
                    })
                    .addTextColumn({
                        name: "esu_txt_ext",
                        caption: "jres:26265098", //RC 26265098 : Externí subjekt
                    })
                    .addTextColumn({
                        name: "typ_txt",
                        caption: "jres:31900194", //RC 31900194 : Typ
                    })
                    .addTextColumn({
                        name: "ixs_esu",
                        caption: "jres:26265221", //RC 26265221 : ID
                    })
                    .addTextColumn({
                        name: "ixs_eko",
                        caption: "jres:31900195", //RC 31900195 : ID ekonomického subjektu
                    })
                    .addTextColumn({
                        name: "zmenu_prov_rf",
                        caption: "jres:26265161", //RC 26265161 : Změnu provedl
                    });

                $.content(this).actions.add({
                    name: "actOtevriDetailEsu",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                        that.detailEditace();
                        
                    }
                });

                that.gridPobocky = $("<div>").appendTo(this.element);
                    //.height(900)
                that.gridPobocky.gautofit()
                    .ggrid({
                        name: "GridPobocky",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-gridPobocky",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                                return "bold";
                            } else return "  ";
                        },
                        selection: function (ev, selectionInfo) {
                            var sel = that.gridPobocky.ggrid("activeRow");
                            if (sel != null) {
                                that.enablePreview(true);
                                that.showPreview(sel);
                            } else {
                                that.enablePreview(false);
                            }
                            that.updateActions();
                        },

                        multi: this.TypZobrazeni === 3 ? true : false,

                        scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                        /*
                        searchColumns: ["zkratka","nazev", "ico", "dic", "druh_stav_r_txt", "ulice", "cpop", "cor", "obec", "cast_obce", "psc", "ur_pri", "mail", "stupen_ver_txt",
                            "mi_jmeno", "mi_prijmeni", "rc", "dat_nar", "dat_umrti", "ixs_esu", "id_ds", "typ_upadku_txt", "oc", "dat_zmena", "zmenu_prov_rf", "ixs_eko"],
                            */
                        columns: gridKolonky,
                    });
             
                
                  
                

               

                this.naplnGrid(this.ListDto);
                if (this.IxsDto && this.IxsDto.IxsEsu) {
                    this.focusVGridu(this.IxsDto.IxsEsu);
                }

                //this.element.gsidebar("option", { right: { visible: false } });
                //this.rightSb$.gsbpanel("show");
                this.updateActions();
            },

            naplnGrid: function (listDto) {
                this.ViewTabulkaPobocky = new Gordic.Data.View(listDto, { key: "ixs_esu" }); 
                this.gridPobocky.ggrid("setData", this.ViewTabulkaPobocky, true);
            },

            //#endregion

        //#region operace nad gridem

            focusVGridu: function (ixs_esu) {
                this.gridPobocky.ggrid("activeRow", ixs_esu);


            },

            novaAdresaPobocka: function () {
                /// <summary> odevře se nová pobočka</summary>
                var that = this;
                var sub = this.NadrazenySubjekt;
                if (sub && sub.ixs_nad) {
                    //that.closeDet();
                    var opt = {
                        IxsEsu: sub.ixs_nad,
                        Ucel: 3,
                        Logovani: this.Logovani
                    };
                    Gordic.Esu.Dialogs.DetailEsuDlg(this, opt).on("close",
                        function (ev, retVal) {
                            if (retVal && retVal.ulozeno) {
                                var newDto = {

                                    ixs_esu: retVal.data.IxsEsu,
                                    nazev: retVal.data.Nazev,
                                };
                                that.pridaniRadkuDoGriduPresServer(newDto,true);
                            }

                    }); 
                } else {
                    this.dialogs.alert("jres:31900198"); //RC 31900198 : Nebyla vybrána adresa v seznamu.
                }
            },

            pridat: function () {
              
                var that = this;
                if (this.NadrazenySubjekt) {
                    var userOptions = {
                        Logovani: this.Logovani,
                        VyhledaniAdresDto: {
                            ixsEsu: this.NadrazenySubjekt.ixs_esu,
                            nazev: this.NadrazenySubjekt.nazev,
                            ico: this.NadrazenySubjekt.ico,
                            idDs: this.NadrazenySubjekt.id_ds,
                            m_asEsuListForRemove: this.getEsuListForRemove(), // pole esu které se nemají nabízet
                        }
                    };

                    Gordic.Esu.Dialogs.SeznamAdresDlg(this, userOptions).on("close", function (ev, retVal) {

                        if (retVal && retVal.novaAdresa) {
                            var radek = retVal.novaAdresa[0];
                            radek.ixs_nad = that.NadrazenySubjekt.ixs_esu; // rovnou přepíšu ixs_nad protože v ukládání už se nepřepisuje :D 
                            var stav = 1;

                            //radek.stav = stav;
                            //that.poleProPridani.push(radek);
                            that.pridaniRadkuDoGriduPresServer(radek, false, stav, true);
                        }
                    });
                } else {
                    this.showFlash("jres:31900352", "g-state-warning"); //RC 31900352 : Nebyl nalezen nadřazený subjekt.
                }

            },

            pridaniRadkuDoGriduPresServer: function (model,nacistZIxsEsu,stav,pridatDoPoleProPridani) {
                var that = this;

                this.call("PridaniNovehoDoGridu", {
                    novy: model,
                    nacistZIxsEsu: nacistZIxsEsu
                } /*, null, { applyValidationResultTo: ff } */)
                    .done(function (retVal) {
                        if (retVal) {
                            retVal.stav = stav;
                            if (pridatDoPoleProPridani) {
                                that.poleProPridani.push(retVal);
                            }
                            that.pridaniRadkuDoGridu(retVal);
                        }

                    });

            },

            pridaniRadkuDoGridu: function (radek) {
                var rows = this.ViewTabulkaPobocky.getDataRows(false, "data");
                // kontrola zda už v gridu není
                var pridatradek = true;
                $(rows).each(function (index, jednotlivyRadek) {
                    if (jednotlivyRadek.ixs_esu === radek.ixs_esu) {
                        pridatradek = false;
                    }
                });
                if (pridatradek) {
                    rows.push(radek);
                }
                this.naplnGrid(rows);
                this.focusVGridu(radek.ixs_esu);
                this.gridPobocky.ggrid("activeRow", radek.ixs_esu);
            },

            getEsuListForRemove: function() {
                var poleIxsEsu = [];
                $(this.poleProPridani).each(function (index, element) {
                    poleIxsEsu.push(element.ixs_esu);
                });
                return poleIxsEsu;
            },

            vyjmout: function () {
                var that = this;
                var sel = that.gridPobocky.ggrid("getSelection");
                if (sel.length > 0) {
                    var radekKVyjmuti = sel["0"];
                    var rows = this.ViewTabulkaPobocky.getDataRows(false, "data");
                    var tempRows = $.grep(rows, function (value) {
                        if (value.ixs_esu !== radekKVyjmuti.ixs_esu) { //dohledám si řádek kterého se to týka
                            return true;
                        } else { // řádek kterého se to týka
                            if (value.stav === 1) { // pokud byl zrovna přidanej a nedošlo k uložení
                                that.poleProPridani = $.grep(that.poleProPridani, function (value) {// vyndám z pole pro přidání
                                    if (value.ixs_esu === radekKVyjmuti.ixs_esu) { 
                                        return false;
                                    } else {
                                        return true;
                                    }
                                });
                                return false;
                            }
                            // jinak nastavím stav a doplním do pole pro smazání
                            value.stav = 2;
                            radekKVyjmuti.ixs_nad = radekKVyjmuti.ixs_esu; // rovnou změním ixs_nad na vlastní ixs_esu. po uložení se tím vazba přeruší :-)
                            radekKVyjmuti.stav = 2;
                            that.poleProSmazani.push(radekKVyjmuti);
                            return true; // false  - necháno true protože se přesunula indikace odebrání na ikonu stav
                            
                        }
                    });
                    this.naplnGrid(tempRows);
                }
                this.updateActions();
            },
          
            detailEditace: function () {
                var that = this;
                var sel = that.gridPobocky.ggrid("getSelection");
                if (sel.length > 0 && sel["0"].ixs_esu) {
                    var opt = {
                        IxsEsu: sel["0"].ixs_esu,
                        Ucel: 1,
                        Logovani: this.Logovani,
                        LzePrepnoutZDetailuNaEditaci:true
                    };
                    Gordic.Esu.Dialogs.DetailEsuDlg(this, opt);
                }

            },

             //#endregion

            //#region refresh

            refresh: function () {
                var that = this;
                this.poleProPridani = [];
                this.poleProSmazani = [];

                this.call("LoadData", { ixsDto: this.IxsDto } /*, null, { applyValidationResultTo: ff } */)
                    .done(function (retVal) {
                        if (retVal) {
                            that.poleProPridani = [];
                            that.poleProSmazani = [];
                            that.naplnGrid(retVal);
                            that.updateActions();
                        }

                    });

            },
            //#endregion

            //#region uložiz
            saveAndCloseDet: function () {
                var that = this;
                if (this.poleProPridani.length > 0 || this.poleProSmazani.length > 0) {
                    var text = "";
                    text = text + this.getPridatText();
                    text = text + this.getVyjmoutText();
                    this.dialogs.confirm("jres:31900199", text).on("close", function (ev, retVal) { //RC 31900199 : Přidání/Vyjmutí adresy
                        if (retVal) {
                            if (retVal === "yes") {
                                that.save();
                            }
                        }
                    });

                }
            },

            save: function () { 
                var that = this;
                this.call("SaveData", { listPridat: this.poleProPridani, listVyjmout: this.poleProSmazani } /*, null, { applyValidationResultTo: ff } */)
                    .done(function (retVal) {
                        if (retVal.stav === "OK") {
                            that.poleProPridani = [];
                            that.poleProSmazani = [];
                            that.refresh();
                            return;
                        } else if (retVal.zprava != null) {
                            that.dialogs.alert(retVal.zprava);
                            that.poleProPridani = [];
                            that.poleProSmazani = [];
                            return;
                        }

                    });

            },
           

            getPridatText: function() {
                if (this.poleProPridani.length <= 0)
                    return "";
                var str = "jres:31900200" +"<br>"; //RC 31900200 : Chcete přidat adresu(y)?
                $(this.poleProPridani).each(function (index, element) {
                    str = str + element.esu_txt.trim() + "<br>";

                });
                return str;
            },

            getVyjmoutText: function () {
                var that = this;
                if (this.poleProSmazani.length <= 0)
                    return "";
                var str = "jres:31900201" + "<br>"; //RC 31900201 : Chcete vyjmout adresu(y)?
                $(this.poleProSmazani).each(function (index, element) {
                    str = str + element.esu_txt.trim() + "<br>";

                });
                return str;
            },

            //#endregion

            //#region updateActions

            updateActions: function () {
                this.updateActionNova();
                this.updateActionPridat();
                this.updateActionVyjmout();
                this.updateActionDetail();
                this.updateActionUlozit();
            },

            updateActionNova: function () {
                var enabled = false;
                var sub = this.NadrazenySubjekt;
                if (this.Ucel !== 2
                    && sub
                    && (sub.typ_org !== 60 || (sub.typ_org === 60 && this.gin_esu_rp_bann))
                ) {
                    enabled = true;
                }
                this.actions.actNovy.update({ enabled: enabled });
            },

            updateActionPridat: function () {
                var enabled = false;
                var sub = this.NadrazenySubjekt;
                if (this.Ucel !== 2
                    && this.gin_rad_esuppa
                    && sub
                    && (sub.typ_org !== 60 || (sub.typ_org === 60 && this.gin_esu_rp_bann))
                ) {
                    enabled = true;
                }
                this.actions.actPridat.update({ enabled: enabled });
            },

            updateActionVyjmout: function () {
                var enabled = false;
                var sel = this.gridPobocky.ggrid("getSelection");
                if (this.Ucel !== 2
                    && this.gin_rad_esuppa
                    && sel.length === 1
                    && (sel["0"].typ_org !== 60 || (sel["0"].typ_org === 60 && this.gin_esu_rp_bann))
                    && ((sel["0"].ixs_esu !== sel["0"].ixs_nad) || (sel["0"].ixs_esu !== sel["0"].ixs_eko))
                    && sel["0"].pravoEditace
                ) {
                    enabled = true;
                }
                this.actions.actVyjmout.update({ enabled: enabled });
            },

            updateActionDetail:function()
            {
                var enabled = false;
                var sel = this.gridPobocky.ggrid("getSelection");
                if (sel.length === 1
                    && sel["0"].pravoProhlizeni
                ) {
                    enabled = true;
                }
                this.actions.actDetail.update({ enabled: enabled });
            },

            updateActionUlozit: function () {
                if (this.poleProPridani.length > 0 || this.poleProSmazani.length > 0) {
                    this.actions.actSaveAndClose.update({ enabled: true });
                } else {
                    this.actions.actSaveAndClose.update({ enabled: false });
                }
            },

            
            //#endregion

            //#region Esu náhled
            _isDebounced: false,

            createPreviewPanel: function () {
                return $("<div>").gpreview({
                    tabs: [

                        {
                            caption: "jres:31900321", //RC 31900321 : Souhrn
                            content: "Gordic.Esu.WebClient.GEsuDetailPreview"//časem takto-> function (loadParams) { return Gordic.Previews.getPreviewClass(loadParams.typ_ag, loadParams); }
                        },

                    ]
                });
            },

            loadPreview: function (row) {
                var that = this;
                console.log(row);
                this.previewDiv.gpreview("loadAll", {
                    Logovani: that.Logovani,
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
                        columns: this.gridPobocky.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
                        itemTemplate: "{nazev}",
                        itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
                        selection: function (ev, ctx) { _this.gridPobocky.ggrid("activeRow", ctx.item); }
                    });
                }
                for (var row in rows) {
                    rows[row].checked = false;
                }

                this.gridPobocky.ggrid("refresh");

            },

            addToComparison: function (rows) {
                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
            },
            //#endregion

            prevzit: function () {
                var that = this;
                var sel = that.gridPobocky.ggrid("getSelection");
                this.close({ subjekty: sel }); //tryClose
            },

            closing: function () { // podmineny userClose 
                var def = $.Deferred();

                if(this.poleProPridani.length > 0 || this.poleProSmazani.length > 0) {
                    this.dialogs.messageBox("jres:31900209",//RC 31900209 : Zavření
                        "jres:31900210", GDlg.mbbYesNo, GDlg.mbiQuestion)  //RC 31900210 : Opravdu chcete zavřít Adresy/Pobočky bez uložení změn?
                        .on("yes", def.resolve)
                        .on("close", def.reject);
                } else {
                    def.resolve();
                }
               
                return def.promise();
            },


            

    }, { extendIntellisense: GContent });
    
       

});

   
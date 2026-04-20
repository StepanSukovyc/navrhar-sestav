"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Stavy konsolidace
             *
             * @author tkares
             * @since 484.1.0.69
             */
            var GSeznamIISSPPreuctovaniSkutecnosti = /** @class */ (function (_super) {
                __extends(GSeznamIISSPPreuctovaniSkutecnosti, _super);
                function GSeznamIISSPPreuctovaniSkutecnosti() {
                    //private ekoParams: Gordic.Ucr.WebClient.GEkoParamsDto;
                    //private tema: string;
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.loadingData = false; // atribut nacitani dat
                    _this._isAggregation = true;
                    return _this;
                    ///**
                    // * Prevedeni kliku na bunku do filtru a nacteni
                    // * @param ev
                    // */
                    //private dispatchFillServerGridEvent(ev: JQueryEventObject): void {
                    //    var $col = $(ev.target);
                    //    if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                    //        return;
                    //    let selection = document.getSelection();
                    //    if (ev.shiftKey && selection) selection.empty(); //Pokud se vybira pres kl. zkratku ctrl+shift+lclick, tak at se neoznacuje text
                    //    var colIndex = $col.attr("data-column-index")!;
                    //    var colDef = this.$grid.ggrid("trueColumns", false)[colIndex] as GGridColumn;
                    //    if (colDef.serverFilter) {
                    //        let value: any = $col.text();
                    //        if (!value) return; //NOTE: Pokud neni hodnota, tak asi neni co resit. Resi hlavne bug s textovou hodnotou v ciselnych sloupcich
                    //        let sel = this.$grid.ggrid("getSelection", false)[0];
                    //        //NOTE: Tohle je spatny zpusob, cele by to chtelo prepsat, aby se neslo po stringu z bunky, ale po datech. 
                    //        //      Poptat se Skalice, jestli exituje nejaky lepsi zpusob...
                    //        if (colDef.columnType === "datetime") value = sel[colDef.name!];
                    //        else if (colDef.columnType === "currency") value = sel[colDef.name!];
                    //        var $filterFrmBox = this.$grid.ggridserverfilter("findFields", colDef.name!);
                    //        $filterFrmBox.gfield("setValue", value, { valid: false });
                    //    }
                    //}
                    ///**
                    // * Vraci objekt filtru
                    // * @param {GContent} content
                    // * @returns
                    // */
                    //private GetFilter(): JQuery {
                    //    //debugger;
                    //    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                    //        return this.$filterPanel;
                    //    else
                    //        throw "Filtr nenalezen";
                    //    //return content?.element.find(".js-filtr.gfilterpanel");
                    //    //return $(".js-filtr");
                    //}
                    ///**
                    // * Vytvoreni gridformatu dle predlohy
                    // * 
                    // * 
                    // */
                    //private createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto> {
                    //    let that = this;
                    //    var myGridFormat = new Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto>();
                    //    if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty) {
                    //        //TODO: Validita
                    //        //myGridFormat.addIconColumn({
                    //        //    name: "img_valid",
                    //        //    caption: "jres:30250344",                                                                                //RC 30250344 : IISSP Přepočteno
                    //        //    width: 39,// fixedWidth: true,
                    //        //    customClass: "center",
                    //        //    iconTemplate: function (data) {
                    //        //        if(data.as)
                    //        //        if (data.s_prep_aisp != null && data.s_prep_aisp > 0) {
                    //        //            return {
                    //        //                icon: "fa-check-circle g-state-text g-state-success", text: "jres:30250344", //RC 30250344 : IISSP Přepočteno
                    //        //                //tooltip: "jres:30250288"
                    //        //            };                             // RC 29750022 : Nepřečtený doklad //RC 30250288 : Nepřečtený doklad
                    //        //        }
                    //        //        if (data.id_hdr_ris != null && data.id_hdr_ris !== undefined) {
                    //        //            return {
                    //        //                icon: "gi-exclam g-state-error", text: "jres:30250345", //RC 30250345 : Nezpracováno
                    //        //                //tooltip: "jres:30250289"
                    //        //            };
                    //        //        }
                    //        //    }
                    //        //});
                    //    }
                    //    myGridFormat.addTextColumn({
                    //        name: "bu_vl",
                    //        caption: "jres:30250350", //RC 30250350 : Bankovní účet                
                    //        serverFilter: this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy ? Gordic.Eko.Filters.stringInterval({ model: "bu_vl", caption: "jres:30250351" }) : undefined, //RC 30250351 : Bankovní účet
                    //        width: 115,
                    //    });
                    //    myGridFormat.addTextColumn({
                    //        name: "sk_vl",
                    //        caption: "jres:30250353", //RC 30250353 : Banka
                    //        serverFilter: this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy ? Gordic.Eko.Filters.stringInterval({ model: "sk_vl", caption: "jres:30250352" }) : undefined, //RC 30250352 : Banka
                    //        width: 40, hidden: true
                    //    });
                    //    if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty) {
                    //        //TODO: diff_uct_buc "Rozdíl AS UCT-BV"
                    //        //myGridFormat.addIconColumn({
                    //        //    name: "diff_uct_buc",
                    //        //    caption: "jres:30250344",                                                                                //RC 30250344 : IISSP Přepočteno
                    //        //    width: 39,// fixedWidth: true,
                    //        //    customClass: "center",
                    //        //    iconTemplate: function (data) {
                    //        //        if (data.s_prep_aisp != null && data.s_prep_aisp > 0) {
                    //        //            return {
                    //        //                icon: "fa-check-circle g-state-text g-state-success", text: "jres:30250344", //RC 30250344 : IISSP Přepočteno
                    //        //                //tooltip: "jres:30250288"
                    //        //            };                             // RC 29750022 : Nepřečtený doklad //RC 30250288 : Nepřečtený doklad
                    //        //        }
                    //        //        if (data.id_hdr_ris != null && data.id_hdr_ris !== undefined) {
                    //        //            return {
                    //        //                icon: "gi-exclam g-state-error", text: "jres:30250345", //RC 30250345 : Nezpracováno
                    //        //                //tooltip: "jres:30250289"
                    //        //            };
                    //        //        }
                    //        //    }
                    //        //});
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "ps_uct",
                    //            caption: "jres:30250393", //RC 30250393 : PS UCT
                    //            width: 120,
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "c0_uct",
                    //            caption: "jres:30250394", //RC 30250394 : MD UCT
                    //            width: 120,
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "c1_uct",
                    //            caption: "jres:30250395", //RC 30250395 : DAL UCT
                    //            width: 120,
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "denmes",
                    //            caption: "jres:30250369",   //RC 30250369 : Změna UCT
                    //            width: 100, //fixedWidth: true,
                    //            //customClass: "center",
                    //            cellTemplate: function (data, metarow, info) {
                    //                //var font = "font-weight: bold;";
                    //                if (typeof data.denmes === undefined || data.denmes === null)
                    //                    return "";
                    //                let denmes = data.denmes as number;
                    //                let den = denmes % 32;
                    //                let mesic = Math.floor(denmes / 32);
                    //                return $("<span>", { text: "" + den + "." + mesic + ".", title: ""/*, "style": font*/ });
                    //            }
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "as_uct",
                    //            caption: "jres:30250396", //RC 30250396 : AS UCT
                    //            width: 120,
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "ps_buc",
                    //            caption: "jres:30250397", //RC 30250397 : PS BV
                    //            width: 120,
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "c0_buc",
                    //            caption: "jres:30250398", //RC 30250398 : MD BV
                    //            width: 120,
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "c1_buc",
                    //            caption: "jres:30250399", //RC 30250399 : DAL BV
                    //            width: 120,
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "as_buc",
                    //            caption: "jres:30250400", //RC 30250400 : AS BV
                    //            width: 120,
                    //        });
                    //        myGridFormat.addNumberColumn({
                    //            name: "cis_pid",
                    //            caption: "jres:30250401", //RC 30250401 : Číslo BV
                    //            width: 80,
                    //        });
                    //        myGridFormat.addDateColumn({
                    //            name: "dat_nov_zus",
                    //            caption: "jres:30250402", //RC 30250402 : Změna BV
                    //            width: 70,
                    //            format:"dd.MM."
                    //        });
                    //        myGridFormat.addNumberColumn({
                    //            name: "s_bvy", //RC 30250403 : s_bvy
                    //            caption: "jres:30250404", //RC 30250404 : Stav BV
                    //            width: 30,
                    //            hidden: !this.debug
                    //        });
                    //    }
                    //    if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy) {
                    //        //if (that.showUCS_UUS) {
                    //        //    myGridFormat.addTextColumn({
                    //        //        name: "ucs",
                    //        //        caption: this.Globals.Zkratky?.Ucs,
                    //        //        description: this.Globals.Zkratky?.Ucs,
                    //        //        width: 60, hidden: true,
                    //        //        //group: topoGroup,
                    //        //        aggregate: Gordic.Data.Aggregates.first("ucs"),
                    //        //        //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                    //        //        serverFilter: Gordic.Eko.Filters.ucsInterval({
                    //        //            ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl
                    //        //            , onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined
                    //        //            , model: "ucs"
                    //        //            , disabled: false
                    //        //        })
                    //        //    });
                    //        //    myGridFormat.addTextColumn({
                    //        //        name: "uus",
                    //        //        caption: this.Globals.Zkratky?.Uus,
                    //        //        description: this.Globals.Zkratky?.Uus,
                    //        //        width: 60,
                    //        //        //group: topoGroup,
                    //        //        //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                    //        //        serverFilter: Gordic.Eko.Filters.uusInterval({
                    //        //            ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl
                    //        //            , onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined
                    //        //            , model: "uus"
                    //        //        })
                    //        //    });
                    //        //}
                    //        myGridFormat.addTextColumn({
                    //            name: "id_hdr_ris",
                    //            caption: "jres:31100082", //RC 31100082 : ID IISSP
                    //            description: "jres:31100255", //RC 31100255 : Identifikátor rezervace rozpočtových prostředků IISSP
                    //            width: 90,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_hdr_ris", caption: "jres:31100082", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }), //RC 31100082 : ID IISSP
                    //        });
                    //        myGridFormat.addNumberColumn({
                    //            name: "radek_hdr",
                    //            caption: "jres:31100083",//RC 31100083 : řádek IISSP
                    //            description: "jres:31100256", //RC 31100256 : Řádek rezervace rozpočtových prostředků IISSP
                    //            width: 91,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", caption: "jres:30250356", firstField: { maxLength: 3 }, secondField: { maxLength: 3 } }), //RC 30250356 : FIM
                    //        });
                    //        myGridFormat.addDateColumn({
                    //            name: "dat_rez",
                    //            caption: "jres:30250354",//RC 30250354 : Rezerv.
                    //            description: "jres:30250355", //RC 30250355 : Datum rezervace IISSP
                    //            width: 80
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_fim",
                    //            caption: "jres:30250356", //RC 30250356 : FIM     
                    //            width: 75,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", caption: "jres:30250356", firstField: { maxLength: 7 }, secondField: { maxLength: 7 } }), //RC 30250356 : FIM
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_zdr",
                    //            caption: "jres:30250357", //RC 30250357 : ZDR
                    //            width: 70,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zdr", caption: "jres:30250357", firstField: { maxLength: 7 }, secondField: { maxLength: 7 } }), //RC 30250357 : ZDR
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_par",
                    //            caption: "jres:30250358", //RC 30250358 : PAR
                    //            width: 60,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_par", caption: "jres:30250358", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }), //RC 30250358 : PAR
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_pol",
                    //            caption: "jres:30250359", //RC 30250359 : POL
                    //            width: 60,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pol", caption: "jres:30250359", firstField: { maxLength: 4 }, secondField: { maxLength: 4 } }), //RC 30250359 : POL
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_eds",
                    //            caption: "jres:30250360", //RC 30250360 : EDS/SMVS
                    //            width: 100,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_eds", caption: "jres:30250360", firstField: { maxLength: 13 }, secondField: { maxLength: 13 } }), //RC 30250360 : EDS/SMVS
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_pvs",
                    //            caption: "jres:30250361", //RC 30250361 : PVS
                    //            width: 90,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pvs", caption: "jres:30250361", firstField: { maxLength: 10 }, secondField: { maxLength: 10 } }), //RC 30250361 : PVS
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_ucl",
                    //            caption: "jres:30250362", //RC 30250362 : UCL
                    //            width: 90,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_ucl", caption: "jres:30250362", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }), //RC 30250362 : UCL
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_zj",
                    //            caption: "jres:30250363", //RC 30250363 : ZJ
                    //            width: 35,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zj", caption: "jres:30250363", firstField: { maxLength: 3 }, secondField: { maxLength: 3 } }) //RC 30250363 : ZJ
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_uj",
                    //            caption: "jres:30250385", //RC 30250385 : UJ
                    //            width: 64,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uj", caption: "jres:30250365", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }) //RC 30250365 : 130250364
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "isp_uz",
                    //            caption: "jres:30250366", //RC 30250366 : UZ
                    //            width: 64,
                    //            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uz", caption: "jres:30250366", firstField: { maxLength: 5 }, secondField: { maxLength: 5 } }) //RC 30250366 : UZ
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "kc0",
                    //            caption: "jres:30250367", //RC 30250367 : AS MD
                    //            width: 120,
                    //            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "kc0", caption: "jres:30250367" }) //RC 30250367 : AS MD
                    //        });
                    //        myGridFormat.addCurrencyColumn({
                    //            name: "kc1",
                    //            caption: "jres:30250368", //RC 30250368 : AS Dal
                    //            width: 120,
                    //            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "kc1", caption: "jres:30250368" }) //RC 30250368 : AS Dal
                    //        });
                    //        myGridFormat.addTextColumn({
                    //            name: "denmes",
                    //            caption: "jres:30250369",   //RC 30250369 : Změna UCT
                    //            width: 100, //fixedWidth: true,
                    //            //customClass: "center",
                    //            cellTemplate: function (data, metarow, info) {
                    //                //var font = "font-weight: bold;";
                    //                if (typeof data.denmes === undefined || data.denmes === null)
                    //                    return "";
                    //                let denmes = data.denmes as number;
                    //                let den = denmes % 32;
                    //                let mesic = Math.floor(denmes / 32);
                    //                return $("<span>", { text: "" + den + "." + mesic + ".", title: ""/*, "style": font*/ });
                    //            }
                    //        });
                    //        if (!that.isAggregation()) {
                    //            myGridFormat.addNumberColumn({
                    //                name: "mesic",
                    //                caption: "jres:30250370", //RC 30250370 : M
                    //                width: 30,
                    //                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "mesic", caption: "jres:30250370" }) //RC 30250370 : M
                    //            });
                    //            myGridFormat.addNumberColumn({
                    //                name: "den",
                    //                caption: "jres:30250371", //RC 30250371 : D
                    //                width: 30,
                    //                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "den", caption: "jres:30250371" }) //RC 30250371 : D
                    //            });
                    //            myGridFormat.addCurrencyColumn({
                    //                name: "sc0",
                    //                caption: "jres:30250372", //RC 30250372 : DO MD
                    //                width: 120,
                    //                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "sc0", caption: "jres:30250372" }) //RC 30250372 : DO MD
                    //            });
                    //            myGridFormat.addCurrencyColumn({
                    //                name: "sc1",
                    //                caption: "jres:30250373", //RC 30250373 : DO Dal
                    //                width: 120,
                    //                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "sc1", caption: "jres:30250373" }) //RC 30250373 : DO Dal
                    //            });
                    //            myGridFormat.addDateTimeColumn({
                    //                name: "dat_zmena",
                    //                caption: "jres:31100015", //RC 31100015 : Datum změny
                    //                width: 130,
                    //                serverFilter: Gordic.Eko.Filters.dateInterval({
                    //                    model: "dat_zmena",
                    //                    firstField: { valueType: "datetime" },
                    //                    secondField: { valueType: "datetime" },
                    //                    caption: "jres:31100015" //RC 31100015 : Datum změny
                    //                })
                    //            });
                    //        }
                    //    }
                    //    return myGridFormat;
                    //}
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                GSeznamIISSPPreuctovaniSkutecnosti.prototype.onContentReady = function () {
                    var that = this;
                    switch (this.TypUlohy) {
                        case 16 /* IISSP_Preuctovani_stavy */:
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiStavy(this);
                            break;
                        case 17 /* IISSP_Preuctovani_BankovniUcty */:
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiBanka(this);
                            break;
                        case 18 /* IISSP_Preuctovani_RegistrDavek */:
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiRegistr(this);
                            break;
                    }
                    that.serviceObject.onContentReady();
                    return;
                    //that.uid = "seznamStavyKon";
                    //that.createActions();
                    var menuPar = [];
                    if (that.TypUlohy === 16 /* IISSP_Preuctovani_stavy */) {
                        menuPar = [{ action: that.actions.actZapisy, favorite: true },
                            { action: that.actions.actPrepocet, favorite: true },
                            { action: that.actions.actPrepocetUplny, favorite: true },
                            { action: that.actions.actVytvorit, favorite: true }
                        ];
                    }
                    // definice menu
                    this.menuBar(menuPar);
                    //// vytvoreni fitru panelu
                    //this.createFilterPanel(this);
                    //that.createGrid();
                    this.$grid.ggridserverfilter({});
                    //if (that.FinMisto.trim()!=="")
                    //    this.$grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto} });
                    //#region Kl. zkratky
                    //this.element.gshortcut({
                    //    key: "INSERT",
                    //    description: "jres:31100226", //RC 31100226 : Načtení dat
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    action: new GAction({
                    //        name: "LoadDataAct",
                    //        run: (ev, ctx) => {
                    //            //this.loadData();
                    //            let view = that.$grid.ggrid("getView");                        
                    //            view.requestData(undefined);
                    //            view.getLoadingPromise().always(() => {
                    //                that.loadingData = false;
                    //                that.nastaveniAkci();
                    //            });
                    //        }
                    //    }),
                    //});
                    //this.element.gshortcut({
                    //    key: "DELETE",
                    //    description: "jres:31100181", //RC 31100181 : Vyčistit
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: new GAction({
                    //        name: "clearFilterRowAct",
                    //        caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                    //        icon: "gi-bin",
                    //        run: (ev, ctx) => {
                    //            that.loadingData = true;
                    //            this.$filterPanel.gfilterpanel("clear");
                    //            that.loadingData = false;
                    //    }}),
                    //});
                    //this.element.gshortcut({
                    //    key: "0",
                    //    description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: new GAction({
                    //        name: "clearAndFilterAct",
                    //        run:(ev, ctx) => {
                    //            this.$filterPanel.gfilterpanel("clear");
                    //            let view = that.$grid.ggrid("getView")
                    //            view.requestData(undefined);
                    //            view.getLoadingPromise().always(() => {
                    //                that.loadingData = false;
                    //                that.nastaveniAkci();
                    //            });
                    //    }}),
                    //});
                    //this.$grid.gshortcut({
                    //    key: "ctrl+shift+lclick",
                    //    group: Gordic.Shortcuts.Groups.Grid,
                    //    description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                    //    action: new GAction({
                    //        name: "selFilterAct",
                    //        run: (ev, ctx) => {
                    //            this.dispatchFillServerGridEvent(ev);
                    //        } }),
                    //});
                    //this.$grid.gshortcut({
                    //    key: "ctrl+lclick",
                    //    group: Gordic.Shortcuts.Groups.Grid,
                    //    description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                    //    action: new GAction({
                    //        name: "selFilterAndSearchAct",
                    //        run: (ev, ctx) => {
                    //            this.dispatchFillServerGridEvent(ev);
                    //            let view = that.$grid.ggrid("getView")
                    //            view.requestData(undefined);
                    //            view.getLoadingPromise().always(() => {
                    //                that.loadingData = false;
                    //                that.nastaveniAkci();
                    //            });
                    //            //this.loadData();
                    //        }
                    //    }),
                    //});
                    //this.$grid.gshortcut();
                    //}
                    //#endregion
                    //if (this.selectedMonth>0)
                    //    this.findFields("Mesic").gfield("setValue", { mesic:this.selectedMonth },false)
                    //that.nastaveniAkci();
                };
                GSeznamIISSPPreuctovaniSkutecnosti = __decorate([
                    Decorators.gcontent
                ], GSeznamIISSPPreuctovaniSkutecnosti);
                return GSeznamIISSPPreuctovaniSkutecnosti;
            }(Gordic.GContentBase));
            WebClient.GSeznamIISSPPreuctovaniSkutecnosti = GSeznamIISSPPreuctovaniSkutecnosti;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GSeznamIISSPPreuctovaniSkutecnosti.js.map
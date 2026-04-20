"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP stavy - Stavy rozpoctu
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPStavyStavyRozpoctu extends WebClient.GSeznamIISSPBase {
                constructor() {
                    super(...arguments);
                    this._nestazene = false;
                    this._nesouhlasne = false;
                    ///**
                    // *  Nacteni dat
                    // */
                    //public loadDataOld(): JQueryPromise<any> {
                    //    var that = this;
                    //    var def = $.Deferred();
                    //    var maska: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto = {};
                    //    var filter = that.getFilter().gfilterpanel('getCurrentData');
                    //    console.log("loaddata.filter", filter);
                    //    //let view = this.$grid.ggrid("getView");
                    //    let grid = this.getGrid();
                    //    if (grid == null) return $.Deferred().reject().promise();
                    //    grid.ggridserverfilter<Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto>("collect", maska)
                    //        .then((filterServer) => {
                    //            maska = filterServer;
                    //            if (filter.Mesic === null)
                    //                filter.Mesic = -1;
                    //            debugger;
                    //            let denmes: number | null = null;
                    //            if (typeof filter.datumK !== undefined && filter.datumK !== null) {
                    //                denmes = 1 * filter.datumK.getDate() + (filter.datumK.getMonth() + 1) * 32
                    //            }
                    //            let nesouhlasne: any;
                    //            if (that._nesouhlasne)
                    //                nesouhlasne =  { o: "=", v: true } ;
                    //            let nestazene: any;
                    //            if (that._nestazene)
                    //                nestazene = { o: "=", v: true } ;
                    //            let myfiltr = { rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO }, denmes: { o: "<=", v: denmes }, nesouhlasne, nestazene };
                    //            Gordic.Isl.UcrRisreStavy.stavyRozpoctu({  maska: maska, filter: { filters: myfiltr } })
                    //                .get()
                    //                .then(function (result) {
                    //                    debugger;
                    //                    //at.setActions(result.ListValues?.length as any);
                    //                    //that.loadingData = false;
                    //                    that.nastaveniAkci();
                    //                    return def.resolve(result);
                    //                })
                    //                .always(function () {
                    //                    //that.loadingData = false;
                    //                })
                    //                ;
                    //            return def.promise();
                    //        }
                    //        );
                    //    return def.promise();
                    //}
                }
                onContentReady() {
                    super.onContentReady();
                    let that = this;
                    that.FinMisto = this.parentCnt["FinMisto"];
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    if (this.FinMisto.trim() !== "")
                        grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto } });
                    if (this.parentCnt.maska)
                        grid.ggridserverfilter("apply", this.parentCnt.maska);
                    if (this.autoReload)
                        this.reload();
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    that.parentCnt.actions.addRange({
                        actOdeslat: {
                            name: "actOdeslat",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250469", //RC 30250469 : Dotaz IISSP
                            run: function (ev, ctx) {
                                this.setPending(that.dotazIISSP());
                            }
                        },
                    });
                }
                /**
                 * Odeslat vykaz
                 *
                 *
                 * */
                dotazIISSP() {
                    this.parentCnt.beginOperation("jres:30250445"); //RC 30250445 : Připravuje se odeslání
                    //const rok = this.parentCnt.Globals.EkoParams!.Rok!;
                    //const now = new Date();
                    //let date = rok === now.getFullYear() ? now : Gordic.Utils.DateTime.getEndOfYear(rok);
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", {})
                        .then((filter) => {
                        const cd = this.$filterPanel.gfilterpanel("getCurrentData");
                        if (cd.datumK === null) {
                            this.parentCnt.dialogs.alert("jres:30250645"); //RC 30250645 : Není zadána položka 'ke dni'                        
                            return $.Deferred().reject().promise();
                        }
                        return this.parentCnt.isl.IisspInbox.odeslaniSpEkisStro({
                            data: {
                                ico: this.parentCnt.Globals.EkoParams.ICO, //data.ico, //ico neni v datech!
                                ucs: this.parentCnt.Globals.EkoParams.UCS, //data.ucs, //ucs neni v datech!
                                stav_datum: cd.datumK,
                                eds_smvs_akce: [{ kod: filter.isp_eds?.start, kod_do: filter.isp_eds?.end }],
                                misto_financni: [{ kod: filter.isp_fim?.start, kod_do: filter.isp_fim?.end }],
                                paragraf: [{ kod: filter.isp_par?.start, kod_do: filter.isp_par?.end }],
                                polozka_rozpoctova: [{ kod: filter.isp_pol?.start, kod_do: filter.isp_pol?.end }],
                                pvs: [{ kod: filter.isp_pvs?.start, kod_do: filter.isp_pvs?.end }],
                                ucel: [{ kod: filter.isp_ucl?.start, kod_do: filter.isp_ucl?.end }],
                                zdroj: [{ kod: filter.isp_zdr?.start, kod_do: filter.isp_zdr?.end }]
                            }
                        }).get();
                    })
                        .then((res) => {
                        this.parentCnt.dialogs.alert(`jres:31100281`.format(res.result.data.davka_id_externi ?? "")); //RC 31100281 : Požadavek do inboxu úspěšně zařazen pod ID {0}.
                    })
                        .always(() => { this.parentCnt.endOperation(); });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    // pokud neni grid, nic nedelej
                    if (this.parentCnt.closed)
                        return;
                    let view = grid.ggrid("getView");
                    let rows = grid.ggrid("getSelection");
                    let pocet = view.getCount();
                    let row = {};
                    if (pocet > 0)
                        row = rows[0];
                    // odeslat
                    this.parentCnt.actions.actOdeslat?.update({
                        enabled: pocet > 0 && Ucr.Globals.GUcrGlobals.Rad_RisStrc === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                    });
                }
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [
                        { action: this.parentCnt.actions.actOdeslat, favorite: true },
                    ];
                    return menuPar;
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid() {
                    let that = this;
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], {
                        processors: { provider: provider },
                        key: "ixs_vkz,por_cislo"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        profiles: [
                            { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        ],
                        profileVisible: false,
                        selection: function (ev, info) {
                            that.nastaveniAkci();
                        },
                    });
                }
                /**
                * function createFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                createFilterZalozka() {
                    var that = this;
                    const rok = that.Globals.EkoParams?.Rok;
                    // konec roku
                    let datMax = Gordic.Utils.DateTime.getEndOfYear(rok);
                    // zacatek roku
                    let datMin = Gordic.Utils.DateTime.getStartOfYear(rok);
                    let aktDat = new Date();
                    if (rok > (new Date()).getFullYear())
                        aktDat = datMax;
                    //let posledniDenVMesici = Gordic.Utils.DateTime.getEndOfMonth(new Date(that.Globals.EkoParams?.Rok + "-" + (new Date().getMonth() + 1) + "-1"));
                    //let datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    //datMax = posledniDenVMesici;
                    //let datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    //let aktDat = datMax;
                    if (that.parentCnt.maska && typeof that.parentCnt.maska.dat_stav !== "undefined") {
                        aktDat = that.parentCnt.maska.dat_stav;
                        // zrusim meze
                        datMin = undefined;
                        datMax = undefined;
                    }
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250347" }) //RC 30250347 : ke dni
                        .addField("gdatebox", {
                        name: "datumK",
                        //minValue: new Date(that.Globals.EkoParams?.Rok as number, 1, 1),
                        //maxValue: new Date(that.Globals.EkoParams?.Rok as number ,12,31) ,
                        //maxValue:new Date(2019,12,31,23,59),
                        minValue: datMin,
                        maxValue: datMax,
                        initialValue: aktDat,
                        //initialValue: new Date(that.Globals.EkoParams?.Rok as number, 12, 31) ,
                        //model: "model.datumK=value",
                        change: (ev, ctx) => {
                        },
                        valueType: "date"
                    });
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250496" }) //RC 30250496 : Volby
                        .addField("gselectbox", {
                        name: "volby", list: true, itemWidth: "",
                        dropdown: false,
                        multi: true,
                        model: "model.volby=value.hodnota",
                        itemTemplate: "{text}",
                        data: new Gordic.Data.View([{ text: "jres:30250470", hodnota: 1 } //RC 30250470 : Nestažené
                            ,
                            { text: "jres:30250471", hodnota: 2 }] //RC 30250471 : Nesouhlasné stavy
                        , { key: "hodnota" })
                        //, initialValue: initialValue
                        ,
                        emptyValue: null,
                        change: function (ev, obj) {
                            //                    if (that.loading || (obj.flags && obj.flags.filterClear === true)) return;
                            //if (that.loading) return;
                            if (obj && typeof obj.value !== "undefined") {
                            }
                        }
                    });
                    //filterFormDef.addSection()
                    //    .addRow({ label: "jres:30250470" }) //RC 30250470 : Nestažené
                    //    .addField("gcheck", {
                    //        name: "nestazene",
                    //        initialValue: false,
                    //        //model: "model.agregace=value.agregace",
                    //        change: (ev, ctx) => {
                    //            let grid = this.getGrid();
                    //            if (grid == null) return;
                    //            if ( typeof ctx === "undefined" || typeof ctx.value === "undefined")
                    //                return;
                    //            // nastaveni atributu nestazene
                    //            that._nestazene = ctx.value as boolean;
                    //        },
                    //    }
                    //);
                    //filterFormDef.addSection()
                    //    .addRow({ label: "jres:30250471" }) //RC 30250471 : Nesouhlasné stavy
                    //    .addField("gcheck", {
                    //        name: "nesouhlasne",
                    //        initialValue: false,
                    //        //model: "model.agregace=value.agregace",
                    //        change: (ev, ctx) => {
                    //            let grid = this.getGrid();
                    //            if (grid == null) return;
                    //            if ( typeof ctx === "undefined" || typeof ctx.value === "undefined")
                    //                return;
                    //            // nastaveni atributu nesouhlasne
                    //            that._nesouhlasne = ctx.value as boolean;
                    //        },
                    //    }
                    //    );
                    return filterFormDef;
                }
                /**
                 * Nacteni Isl sluzby pro list
                 * @param param0
                 */
                loadISLList(rq) {
                    return this.parentCnt.isl.UcrRisreStavy.stavyRozpoctu(rq);
                }
                /**
                 * Zjisteni voleb na filtrpanelu
                 * */
                nactiVolby(volby) {
                    this._nestazene = false;
                    this._nesouhlasne = false;
                    for (var i = 0; i < volby.length; i++) {
                        if (volby[i] == 1)
                            this._nestazene = true;
                        else if (volby[i] == 2)
                            this._nesouhlasne = true;
                    }
                }
                /**
                 * Vrat muj sestaveny filtr
                 *
                 * @returns
                 */
                getMyFilter(filterServer, filter) {
                    this.nactiVolby(filter.volby);
                    if (filter.Mesic === null)
                        filter.Mesic = -1;
                    let denmes = null;
                    if (typeof filter.datumK !== undefined && filter.datumK !== null) {
                        denmes = 1 * filter.datumK.getDate() + (filter.datumK.getMonth() + 1) * 32;
                    }
                    if (denmes === null) {
                        this.parentCnt.dialogs.alert("jres:30250645"); //RC 30250645 : Není zadána položka 'ke dni'
                        return;
                    }
                    let nesouhlasne;
                    if (this._nesouhlasne)
                        nesouhlasne = { o: "=", v: true };
                    let nestazene;
                    if (this._nestazene)
                        nestazene = { o: "=", v: true };
                    let myfiltr = { rok: { o: "=", v: this.Globals.EkoParams?.Rok }, ico: { o: "=", v: this.Globals.EkoParams?.ICO }, denmes: { o: "<=", v: denmes }, nesouhlasne, nestazene };
                    return {
                        maska: filterServer, filter: { filters: myfiltr }
                    };
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    let that = this;
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "isp_fim",
                        caption: "jres:30250356", //RC 30250356 : FIM     
                        description: "jres:30250430", //RC 30250430 : Finanční místo
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", disabled: true, caption: "jres:30250356", firstField: { maxLength: 7 }, secondField: { maxLength: 7, allowedChars: "0123456789" } }), //RC 30250356 : FIM
                        width: 75,
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_zdr",
                        caption: "jres:30250357", //RC 30250357 : ZDR
                        width: 70,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zdr", caption: "jres:30250357", firstField: { maxLength: 7 }, secondField: { maxLength: 7 } }), //RC 30250357 : ZDR
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_par",
                        caption: "jres:30250358", //RC 30250358 : PAR
                        width: 60,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_par", caption: "jres:30250358", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }), //RC 30250358 : PAR
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_pol",
                        caption: "jres:30250359", //RC 30250359 : POL
                        width: 60,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pol", caption: "jres:30250359", firstField: { maxLength: 4 }, secondField: { maxLength: 4 } }), //RC 30250359 : POL
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_eds",
                        caption: "jres:30250360", //RC 30250360 : EDS/SMVS
                        width: 100,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_eds", caption: "jres:30250360", firstField: { maxLength: 13 }, secondField: { maxLength: 13 } }), //RC 30250360 : EDS/SMVS
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_pvs",
                        caption: "jres:30250361", //RC 30250361 : PVS
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pvs", caption: "jres:30250361", firstField: { maxLength: 10 }, secondField: { maxLength: 10 } }), //RC 30250361 : PVS
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_ucl",
                        caption: "jres:30250362", //RC 30250362 : UCL
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_ucl", caption: "jres:30250362", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }), //RC 30250362 : UCL
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc0",
                        caption: "jres:30250461", //RC 30250461 : GINIS Schválený
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_r_sch2",
                        caption: "jres:30250484", //RC 30250484 : GINIS-IISSP Schválené
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (!parseDecimal(data.c_r_sch ?? 0).equals(parseDecimal(data.kc0 ?? 0))) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250483", //RC 30250483 : Stav GINIS a IISSP nesouhlasí
                                    //tooltip: "jres:30250288"
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_r_sch",
                        caption: "jres:30250462", //RC 30250462 : IISSP Schválený
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc1",
                        caption: "jres:30250464", //RC 30250464 : GINIS Po změnách
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_r_zme2",
                        caption: "jres:30250485", //RC 30250485 : GINIS-IISSP Po změnách
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (!parseDecimal(data.c_r_zme ?? 0).equals(parseDecimal(data.kc1 ?? 0))) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250483", //RC 30250483 : Stav GINIS a IISSP nesouhlasí
                                    //tooltip: "jres:30250288"
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_r_zme",
                        caption: "jres:30250465", //RC 30250465 : IISSP Po změnách
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc01",
                        caption: "jres:30250466", //RC 30250466 : GINIS Konečný
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_r_kon2",
                        caption: "jres:30250486", //RC 30250486 : GINIS-IISSP Konečný
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (!parseDecimal(data.c_r_kon ?? 0).equals(parseDecimal(data.kc01 ?? 0))) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250483", //RC 30250483 : Stav GINIS a IISSP nesouhlasí
                                    //tooltip: "jres:30250288"
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_r_kon",
                        caption: "jres:30250467", //RC 30250467 : IISSP Konečný
                        width: 120,
                    });
                    myGridFormat.addDateTimeColumn({
                        name: "dat_akt_stro",
                        caption: "jres:30250468", //RC 30250468 : Datum STRO
                        width: 120,
                    });
                    return myGridFormat;
                }
            }
            WebClient.GSeznamIISSPStavyStavyRozpoctu = GSeznamIISSPStavyStavyRozpoctu;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJvenBvY3R1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJvenBvY3R1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0E4aUJmO0FBOWlCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E4aUJuQjtJQTlpQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThpQjdCO1FBOWlCb0IsV0FBQSxTQUFTO1lBRTFCOzs7OztlQUtHO1lBQ0gsTUFBYSw4QkFBK0IsU0FBUSxVQUFBLGdCQUFnQjtnQkFBcEU7O29CQUtZLGVBQVUsR0FBWSxLQUFLLENBQUM7b0JBQzVCLGlCQUFZLEdBQVksS0FBSyxDQUFDO29CQW1ldEMsS0FBSztvQkFDTCxpQkFBaUI7b0JBQ2pCLEtBQUs7b0JBQ0wsNENBQTRDO29CQUM1QyxzQkFBc0I7b0JBQ3RCLDZCQUE2QjtvQkFDN0IsNEVBQTRFO29CQUU1RSxtRUFBbUU7b0JBRW5FLDZDQUE2QztvQkFDN0MsK0NBQStDO29CQUMvQyxnQ0FBZ0M7b0JBQ2hDLCtEQUErRDtvQkFFL0QscUdBQXFHO29CQUNyRyxtQ0FBbUM7b0JBQ25DLG1DQUFtQztvQkFHbkMsd0NBQXdDO29CQUN4QyxvQ0FBb0M7b0JBRXBDLHVCQUF1QjtvQkFDdkIsK0NBQStDO29CQUMvQyxpRkFBaUY7b0JBQ2pGLDRGQUE0RjtvQkFDNUYsZUFBZTtvQkFDZixtQ0FBbUM7b0JBQ25DLG9DQUFvQztvQkFDcEMsc0RBQXNEO29CQUN0RCxpQ0FBaUM7b0JBQ2pDLGtDQUFrQztvQkFDbEMsbURBQW1EO29CQUVuRCx5TEFBeUw7b0JBRXpMLHFHQUFxRztvQkFDckcsd0JBQXdCO29CQUN4QiwyQ0FBMkM7b0JBQzNDLCtCQUErQjtvQkFDL0Isd0VBQXdFO29CQUN4RSxpREFBaUQ7b0JBQ2pELDJDQUEyQztvQkFDM0MsaURBQWlEO29CQUVqRCxvQkFBb0I7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d0JBQ3ZELEtBQUssRUFBRSxHQUFHO3FCQUViLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLElBQUksRUFBRSxjQUFjO3dCQUNwQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEdBQUc7cUJBRWIsQ0FBQyxDQUFDO29CQUVILE9BQU8sWUFBWSxDQUFDO2dCQUN4QixDQUFDO2FBOERKO1lBcmlCWSx3Q0FBOEIsaUNBcWlCMUMsQ0FBQTtRQUNMLENBQUMsRUE5aUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4aUI3QjtJQUFELENBQUMsRUE5aUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE4aUJuQjtBQUFELENBQUMsRUE5aUJTLE1BQU0sS0FBTixNQUFNLFFBOGlCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBzdGF2eSAtIFN0YXZ5IHJvenBvY3R1XHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJvenBvY3R1IGV4dGVuZHMgR1Nlem5hbUlJU1NQQmFzZSBpbXBsZW1lbnRzIElHQ29udGVudHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgRmluTWlzdG86IHN0cmluZzsgICAvLyBmaW5hbmNuaSBtaXN0b1xyXG5cclxuICAgICAgICBwcml2YXRlIF9uZXN0YXplbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIF9uZXNvdWhsYXNuZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIub25Db250ZW50UmVhZHkoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LkZpbk1pc3RvID0gdGhpcy5wYXJlbnRDbnRbXCJGaW5NaXN0b1wiXTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5GaW5NaXN0by50cmltKCkgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpc3BfZmltOiB7IHN0YXJ0OiB0aGF0LkZpbk1pc3RvLCBlbmQ6IHRoYXQuRmluTWlzdG8gfSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5tYXNrYSlcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB0aGlzLnBhcmVudENudC5tYXNrYSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsb2FkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGFjdE9kZXNsYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kZXNsYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2OVwiLCAvL1JDIDMwMjUwNDY5IDogRG90YXogSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRvdGF6SUlTU1AoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9kZXNsYXQgdnlrYXpcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZG90YXpJSVNTUCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA0NDVcIik7IC8vUkMgMzAyNTA0NDUgOiBQxZlpcHJhdnVqZSBzZSBvZGVzbMOhbsOtXHJcblxyXG4gICAgICAgICAgICAvL2NvbnN0IHJvayA9IHRoaXMucGFyZW50Q250Lkdsb2JhbHMuRWtvUGFyYW1zIS5Sb2shO1xyXG4gICAgICAgICAgICAvL2NvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIC8vbGV0IGRhdGUgPSByb2sgPT09IG5vdy5nZXRGdWxsWWVhcigpID8gbm93IDogR29yZGljLlV0aWxzLkRhdGVUaW1lLmdldEVuZE9mWWVhcihyb2spO1xyXG5cclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvPihcImNvbGxlY3RcIiwge30pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2QgPSB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWw8eyBkYXR1bUs6IERhdGUgfT4oXCJnZXRDdXJyZW50RGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2QuZGF0dW1LID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMwMjUwNjQ1XCIpOyAvL1JDIDMwMjUwNjQ1IDogTmVuw60gemFkw6FuYSBwb2xvxb5rYSAna2UgZG5pJyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5pc2wuSWlzc3BJbmJveC5vZGVzbGFuaVNwRWtpc1N0cm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMucGFyZW50Q250Lkdsb2JhbHMhLkVrb1BhcmFtcyEuSUNPISwgLy9kYXRhLmljbywgLy9pY28gbmVuaSB2IGRhdGVjaCFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhpcy5wYXJlbnRDbnQuR2xvYmFscyEuRWtvUGFyYW1zIS5VQ1MhLCAvL2RhdGEudWNzLCAvL3VjcyBuZW5pIHYgZGF0ZWNoIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhdl9kYXR1bTogY2QuZGF0dW1LLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRzX3NtdnNfYWtjZTogICAgICBbeyBrb2Q6IGZpbHRlci5pc3BfZWRzPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF9lZHM/LmVuZCB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pc3RvX2ZpbmFuY25pOiAgICAgW3sga29kOiBmaWx0ZXIuaXNwX2ZpbT8uc3RhcnQgLCBrb2RfZG86IGZpbHRlci5pc3BfZmltPy5lbmQgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhZ3JhZjogICAgICAgICAgIFt7IGtvZDogZmlsdGVyLmlzcF9wYXI/LnN0YXJ0ICwga29kX2RvOiBmaWx0ZXIuaXNwX3Bhcj8uZW5kIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sb3prYV9yb3pwb2N0b3ZhOiBbeyBrb2Q6IGZpbHRlci5pc3BfcG9sPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF9wb2w/LmVuZCB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB2czogICAgICAgICAgICAgICAgW3sga29kOiBmaWx0ZXIuaXNwX3B2cz8uc3RhcnQgLCBrb2RfZG86IGZpbHRlci5pc3BfcHZzPy5lbmQgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y2VsOiAgICAgICAgICAgICAgIFt7IGtvZDogZmlsdGVyLmlzcF91Y2w/LnN0YXJ0ICwga29kX2RvOiBmaWx0ZXIuaXNwX3VjbD8uZW5kIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemRyb2o6ICAgICAgICAgICAgICBbeyBrb2Q6IGZpbHRlci5pc3BfemRyPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF96ZHI/LmVuZCB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmRpYWxvZ3MuYWxlcnQoYGpyZXM6MzExMDAyODFgLmZvcm1hdChyZXMucmVzdWx0LmRhdGEuZGF2a2FfaWRfZXh0ZXJuaSA/PyBcIlwiKSkgLy9SQyAzMTEwMDI4MSA6IFBvxb5hZGF2ZWsgZG8gaW5ib3h1IMO6c3DEm8WhbsSbIHphxZlhemVuIHBvZCBJRCB7MH0uXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMucGFyZW50Q250LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZlbmlBa2NpKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5jbG9zZWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVZ5a2F6dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGxldCBwb2NldCA9IHZpZXcuZ2V0Q291bnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8gPSB7fSA7XHJcbiAgICAgICAgICAgIGlmIChwb2NldCA+IDApXHJcbiAgICAgICAgICAgICAgICByb3cgPSByb3dzWzBdXHJcbiAgICAgICAgICAgIC8vIG9kZXNsYXRcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RPZGVzbGF0Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmICBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9SaXNTdHJjID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pVmR1LkFub0VkaXRhY2UsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudWJhcnVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBEZWZpbmVNZW51QmFyKCk6IE1lbnVQYXJhbXNbXSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudVBhcjogTWVudVBhcmFtc1tdID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RPZGVzbGF0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnVQYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rhc3BzRHRvPihbXSwge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfVxyXG4gICAgICAgICAgICAgICAgLCBrZXk6IFwiaXhzX3Zreixwb3JfY2lzbG9cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHNsb3VwY2UgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy92YXIgZGVmYXVsdFByb2ZpbGUgPSBzbG91cGNlLmNvbHVtbnM7Ly9zbG91cGNlLmNvbHVtbnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInZsYXN0bm9zdFwiKSA9PT0gLTEpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyBuYW1lOiBcImRlZmF1bHRcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJ1c2VyUHJvZmlsZVwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogZnVuY3Rpb24gY3JlYXRlRmlsdGVyWmFsb3prYVxyXG4gICAgICAgICogICAgICBcclxuICAgICAgICAqIE9iZWNuYSB6YWxvemthXHJcbiAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgcm9rID0gdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rITtcclxuICAgICAgICAgICAgLy8ga29uZWMgcm9rdVxyXG4gICAgICAgICAgICBsZXQgZGF0TWF4ID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLmdldEVuZE9mWWVhcihyb2spO1xyXG4gICAgICAgICAgICAvLyB6YWNhdGVrIHJva3VcclxuICAgICAgICAgICAgbGV0IGRhdE1pbiA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5nZXRTdGFydE9mWWVhcihyb2spO1xyXG4gICAgICAgICAgICBsZXQgYWt0RGF0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHJvayA+IChuZXcgRGF0ZSgpKS5nZXRGdWxsWWVhcigpKVxyXG4gICAgICAgICAgICAgICAgYWt0RGF0ID0gZGF0TWF4O1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgcG9zbGVkbmlEZW5WTWVzaWNpID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLmdldEVuZE9mTW9udGgobmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItXCIgKyAobmV3IERhdGUoKS5nZXRNb250aCgpICsgMSkgKyBcIi0xXCIpKTtcclxuICAgICAgICAgICAgLy9sZXQgZGF0TWF4ID0gbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItMTItMzFcIik7XHJcbiAgICAgICAgICAgIC8vZGF0TWF4ID0gcG9zbGVkbmlEZW5WTWVzaWNpO1xyXG4gICAgICAgICAgICAvL2xldCBkYXRNaW4gPSBuZXcgRGF0ZSh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgKyBcIi0xLTFcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGFrdERhdCA9IGRhdE1heDtcclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyZW50Q250Lm1hc2thICYmIHR5cGVvZiB0aGF0LnBhcmVudENudC5tYXNrYS5kYXRfc3RhdiE9PVwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGFrdERhdCA9IHRoYXQucGFyZW50Q250Lm1hc2thLmRhdF9zdGF2O1xyXG4gICAgICAgICAgICAgICAgLy8genJ1c2ltIG1lemVcclxuICAgICAgICAgICAgICAgIGRhdE1pbiA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBkYXRNYXggPSB1bmRlZmluZWQgYXMgYW55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMTIsIEwtMTItMTItMCwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pICAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1EZWYuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDM0N1wiIH0pIC8vUkMgMzAyNTAzNDcgOiBrZSBkbmlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWluVmFsdWU6IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayBhcyBudW1iZXIsIDEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWF4VmFsdWU6IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayBhcyBudW1iZXIgLDEyLDMxKSAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXhWYWx1ZTpuZXcgRGF0ZSgyMDE5LDEyLDMxLDIzLDU5KSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogZGF0TWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiBkYXRNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBha3REYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayBhcyBudW1iZXIsIDEyLCAzMSkgLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwuZGF0dW1LPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDk2XCIgfSkgLy9SQyAzMDI1MDQ5NiA6IFZvbGJ5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZvbGJ5XCIsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwudm9sYnk9dmFsdWUuaG9kbm90YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IHRleHQ6IFwianJlczozMDI1MDQ3MFwiLCBob2Rub3RhOiAxIH0gLy9SQyAzMDI1MDQ3MCA6IE5lc3Rhxb5lbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyB0ZXh0OiBcImpyZXM6MzAyNTA0NzFcIiwgaG9kbm90YTogMiB9XSAvL1JDIDMwMjUwNDcxIDogTmVzb3VobGFzbsOpIHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwiaG9kbm90YVwiIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIGluaXRpYWxWYWx1ZTogaW5pdGlhbFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZyB8fCAob2JqLmZsYWdzICYmIG9iai5mbGFncy5maWx0ZXJDbGVhciA9PT0gdHJ1ZSkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5sb2FkaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoudmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA0NzBcIiB9KSAvL1JDIDMwMjUwNDcwIDogTmVzdGHFvmVuw6lcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwibmVzdGF6ZW5lXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5hZ3JlZ2FjZT12YWx1ZS5hZ3JlZ2FjZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICggdHlwZW9mIGN0eCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgY3R4LnZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIGF0cmlidXR1IG5lc3RhemVuZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuX25lc3RhemVuZSA9IGN0eC52YWx1ZSBhcyBib29sZWFuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICAvL2ZpbHRlckZvcm1EZWYuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDcxXCIgfSkgLy9SQyAzMDI1MDQ3MSA6IE5lc291aGxhc27DqSBzdGF2eVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJuZXNvdWhsYXNuZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vbW9kZWw6IFwibW9kZWwuYWdyZWdhY2U9dmFsdWUuYWdyZWdhY2VcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoIHR5cGVvZiBjdHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGN0eC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBuZXNvdWhsYXNuZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuX25lc291aGxhc25lID0gY3R4LnZhbHVlIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZvcm1EZWY7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBJc2wgc2x1emJ5IHBybyBsaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBsb2FkSVNMTGlzdChycTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiBhbnkgfSB9KTogSXNsLl9UYXNrPGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVTdGF2eS5zdGF2eVJvenBvY3R1KHJxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIHZvbGViIG5hIGZpbHRycGFuZWx1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RpVm9sYnkodm9sYnk6IFtOdW1iZXJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25lc3RhemVuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXNvdWhsYXNuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZvbGJ5IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZvbGJ5W2ldID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVzdGF6ZW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZvbGJ5W2ldID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVzb3VobGFzbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYXQgbXVqIHNlc3RhdmVueSBmaWx0clxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldE15RmlsdGVyKGZpbHRlclNlcnZlcjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8sIGZpbHRlcjogYW55KTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiB7fSB9IH0gfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uYWN0aVZvbGJ5KGZpbHRlci52b2xieSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyLk1lc2ljID0gLTE7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVubWVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIuZGF0dW1LICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLmRhdHVtSyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGVubWVzID0gMSAqIGZpbHRlci5kYXR1bUsuZ2V0RGF0ZSgpICsgKGZpbHRlci5kYXR1bUsuZ2V0TW9udGgoKSArIDEpICogMzJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGVubWVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDY0NVwiKTsgLy9SQyAzMDI1MDY0NSA6IE5lbsOtIHphZMOhbmEgcG9sb8W+a2EgJ2tlIGRuaSdcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmVzb3VobGFzbmU6IGFueTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25lc291aGxhc25lKVxyXG4gICAgICAgICAgICAgICAgbmVzb3VobGFzbmUgPSB7IG86IFwiPVwiLCB2OiB0cnVlIH07XHJcbiAgICAgICAgICAgIGxldCBuZXN0YXplbmU6IGFueTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25lc3RhemVuZSlcclxuICAgICAgICAgICAgICAgIG5lc3RhemVuZSA9IHsgbzogXCI9XCIsIHY6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBteWZpbHRyID0geyByb2s6IHsgbzogXCI9XCIsIHY6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LlJvayB9LCBpY286IHsgbzogXCI9XCIsIHY6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LklDTyB9LCBkZW5tZXM6IHsgbzogXCI8PVwiLCB2OiBkZW5tZXMgfSwgbmVzb3VobGFzbmUsIG5lc3RhemVuZSB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiBmaWx0ZXJTZXJ2ZXIsIGZpbHRlcjogeyBmaWx0ZXJzOiBteWZpbHRyIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHUgZGxlIHByZWRsb2h5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0bz4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBteUdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0bz4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZmltXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTZcIiwgLy9SQyAzMDI1MDM1NiA6IEZJTSAgICAgXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDMwXCIsIC8vUkMgMzAyNTA0MzAgOiBGaW5hbsSNbsOtIG3DrXN0b1xyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfZmltXCIsIGRpc2FibGVkOnRydWUsIGNhcHRpb246IFwianJlczozMDI1MDM1NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcsIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSB9KSwgLy9SQyAzMDI1MDM1NiA6IEZJTVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfemRyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTdcIiwgLy9SQyAzMDI1MDM1NyA6IFpEUlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfemRyXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1N1wiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSB9KSwgLy9SQyAzMDI1MDM1NyA6IFpEUlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNThcIiwgLy9SQyAzMDI1MDM1OCA6IFBBUlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcGFyXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNiB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSB9KSwgLy9SQyAzMDI1MDM1OCA6IFBBUlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTlcIiwgLy9SQyAzMDI1MDM1OSA6IFBPTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcG9sXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OVwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNCB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDQgfSB9KSwgLy9SQyAzMDI1MDM1OSA6IFBPTFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZWRzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjBcIiwgLy9SQyAzMDI1MDM2MCA6IEVEUy9TTVZTXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfZWRzXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMTMgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiAxMyB9IH0pLCAvL1JDIDMwMjUwMzYwIDogRURTL1NNVlNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3B2c1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYxXCIsIC8vUkMgMzAyNTAzNjEgOiBQVlNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3B2c1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjFcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDEwIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMTAgfSB9KSwgLy9SQyAzMDI1MDM2MSA6IFBWU1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdWNsXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjJcIiwgLy9SQyAzMDI1MDM2MiA6IFVDTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfdWNsXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSwgLy9SQyAzMDI1MDM2MiA6IFVDTFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtjMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDYxXCIsIC8vUkMgMzAyNTA0NjEgOiBHSU5JUyBTY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3Jfc2NoMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwNDg0IDogR0lOSVMtSUlTU1AgU2NodsOhbGVuw6lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzOSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyc2VEZWNpbWFsKGRhdGEuY19yX3NjaCA/PyAwKS5lcXVhbHMocGFyc2VEZWNpbWFsKGRhdGEua2MwID8/IDApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMDI1MDQ4M1wiLCAvL1JDIDMwMjUwNDgzIDogU3RhdiBHSU5JUyBhIElJU1NQIG5lc291aGxhc8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yX3NjaFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDYyXCIsIC8vUkMgMzAyNTA0NjIgOiBJSVNTUCBTY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia2MxXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NjRcIiwgLy9SQyAzMDI1MDQ2NCA6IEdJTklTIFBvIHptxJtuw6FjaFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3Jfem1lMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg1XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwNDg1IDogR0lOSVMtSUlTU1AgUG8gem3Em27DoWNoXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnNlRGVjaW1hbChkYXRhLmNfcl96bWUgPz8gMCkuZXF1YWxzKHBhcnNlRGVjaW1hbCggZGF0YS5rYzE/PzApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMDI1MDQ4M1wiLCAvL1JDIDMwMjUwNDgzIDogU3RhdiBHSU5JUyBhIElJU1NQIG5lc291aGxhc8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yX3ptZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDY1XCIsIC8vUkMgMzAyNTA0NjUgOiBJSVNTUCBQbyB6bcSbbsOhY2hcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtjMDFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2NlwiLCAvL1JDIDMwMjUwNDY2IDogR0lOSVMgS29uZcSNbsO9XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcl9rb24yXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0ODZcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUkMgMzAyNTA0ODYgOiBHSU5JUy1JSVNTUCBLb25lxI1uw71cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzOSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyc2VEZWNpbWFsKGRhdGEuY19yX2tvbiA/PyAwKS5lcXVhbHMocGFyc2VEZWNpbWFsKCBkYXRhLmtjMDE/PzApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMDI1MDQ4M1wiLCAvL1JDIDMwMjUwNDgzIDogU3RhdiBHSU5JUyBhIElJU1NQIG5lc291aGxhc8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcl9rb25cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2N1wiLCAvL1JDIDMwMjUwNDY3IDogSUlTU1AgS29uZcSNbsO9XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfYWt0X3N0cm9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2OFwiLCAvL1JDIDMwMjUwNDY4IDogRGF0dW0gU1RST1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBteUdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3B1YmxpYyBsb2FkRGF0YU9sZCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgIHZhciBtYXNrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIGZpbHRlciA9IHRoYXQuZ2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG5cclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImxvYWRkYXRhLmZpbHRlclwiLCBmaWx0ZXIpO1xyXG4gICAgICAgIC8vICAgIC8vbGV0IHZpZXcgPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAvLyAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAvLyAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvPihcImNvbGxlY3RcIiwgbWFza2EpXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKChmaWx0ZXJTZXJ2ZXIpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG1hc2thID0gZmlsdGVyU2VydmVyO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGZpbHRlci5NZXNpYyA9IC0xO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IGRlbm1lczogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlci5kYXR1bUsgIT09IHVuZGVmaW5lZCAmJiBmaWx0ZXIuZGF0dW1LICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVubWVzID0gMSAqIGZpbHRlci5kYXR1bUsuZ2V0RGF0ZSgpICsgKGZpbHRlci5kYXR1bUsuZ2V0TW9udGgoKSArIDEpICogMzJcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBuZXNvdWhsYXNuZTogYW55O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHRoYXQuX25lc291aGxhc25lKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIG5lc291aGxhc25lID0gIHsgbzogXCI9XCIsIHY6IHRydWUgfSA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgbmVzdGF6ZW5lOiBhbnk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAodGhhdC5fbmVzdGF6ZW5lKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIG5lc3RhemVuZSA9IHsgbzogXCI9XCIsIHY6IHRydWUgfSA7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IG15ZmlsdHIgPSB7IHJvazogeyBvOiBcIj1cIiwgdjogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIH0sIGljbzogeyBvOiBcIj1cIiwgdjogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIH0sIGRlbm1lczogeyBvOiBcIjw9XCIsIHY6IGRlbm1lcyB9LCBuZXNvdWhsYXNuZSwgbmVzdGF6ZW5lIH07XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgR29yZGljLklzbC5VY3JSaXNyZVN0YXZ5LnN0YXZ5Um96cG9jdHUoeyAgbWFza2E6IG1hc2thLCBmaWx0ZXI6IHsgZmlsdGVyczogbXlmaWx0ciB9IH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9hdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvL31cclxuICAgIH1cclxufSJdfQ==
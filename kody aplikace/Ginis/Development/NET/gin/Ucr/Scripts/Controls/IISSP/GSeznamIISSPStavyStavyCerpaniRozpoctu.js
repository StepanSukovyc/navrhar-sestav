"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP stavy - Stavy cerpni rozpoctu
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPStavyStavyCerpaniRozpoctu extends WebClient.GSeznamIISSPBase {
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
                    //    const grid = this.getGrid();
                    //    if (grid === null) return $.Deferred().reject().promise()
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
                    //            Gordic.Isl.UcrRisreStavy.stavyCerpaniRozpoctu({ maska: maska, filter: { filters: myfiltr } })
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
                    const grid = that.getGrid();
                    if (grid === null)
                        return;
                    if (this.FinMisto.trim() !== "")
                        grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto } });
                    if (this.parentCnt.maska)
                        grid.ggridserverfilter("apply", this.parentCnt.maska);
                    if (this.autoReload) {
                        this.reload();
                    }
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
                    //const that = this;
                    //const rok = this.parentCnt.Globals.EkoParams!.Rok!;
                    //const now = new Date();
                    //let date = rok === now.getFullYear() ? now : Gordic.Utils.DateTime.getEndOfYear(rok);
                    const grid = this.getGrid();
                    if (grid === null)
                        return $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", {})
                        .then((filter) => {
                        const cd = this.$filterPanel.gfilterpanel("getCurrentData");
                        //that.parentCnt.dialogs.alert(cd.datumK.toString());
                        //const date = cd.datumK;
                        if (cd.datumK === null) {
                            this.parentCnt.dialogs.alert("jres:30250645"); //RC 30250645 : Není zadána položka 'ke dni'                        
                            return $.Deferred().reject().promise();
                        }
                        return this.parentCnt.isl.IisspInbox.odeslaniEkisSpCero({
                            data: {
                                ico: this.parentCnt.Globals.EkoParams.ICO, //data.ico, //ico neni v datech!
                                ucs: this.parentCnt.Globals.EkoParams.UCS, //data.ucs, //ucs neni v datech!
                                stav_datum: cd.datumK,
                                stav_datum_od: null,
                                eds_smvs_akce: [{ kod: filter.isp_eds?.start, kod_do: filter.isp_eds?.end }],
                                misto_financni: [{ kod: filter.isp_fim?.start, kod_do: filter.isp_fim?.end }],
                                paragraf: [{ kod: filter.isp_par?.start, kod_do: filter.isp_par?.end }],
                                polozka_rozpoctova: [{ kod: filter.isp_pol?.start, kod_do: filter.isp_pol?.end }],
                                pvs: [{ kod: filter.isp_pvs?.start, kod_do: filter.isp_pvs?.end }],
                                ucel: [{ kod: filter.isp_ucl?.start, kod_do: filter.isp_ucl?.end }],
                                jednotka_uzemni: [{ kod: filter.isp_uj?.start, kod_do: filter.isp_uj?.end }],
                                znak_ucelovy: [{ kod: filter.isp_uz?.start, kod_do: filter.isp_uz?.end }],
                                zdroj: [{ kod: filter.isp_zdr?.start, kod_do: filter.isp_zdr?.end }],
                                jednotka_zaznamova: [{ kod: filter.isp_zj?.start, kod_do: filter.isp_zj?.end }]
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
                    const grid = this.getGrid();
                    if (grid === null)
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
                    ////var datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    //let datMax = Gordic.Utils.DateTime.getEndOfMonth(new Date(that.Globals.EkoParams?.Rok + "-" + (new Date().getMonth() + 1) + "-1"));
                    //var datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    //let aktDat = datMax;
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    if (that.parentCnt.maska && typeof that.parentCnt.maska.dat_stav !== "undefined") {
                        aktDat = that.parentCnt.maska.dat_stav;
                        // zrusim meze
                        datMin = undefined;
                        datMax = undefined;
                    }
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
                                //that.setFilter();
                                //// nastaveni akci
                                //let view = that.$grid.ggrid("getView");
                                //that.setActions(view.getDataRows().length);
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
                    //            if (typeof ctx === "undefined" || typeof ctx.value === "undefined")
                    //                return;
                    //            // nastaveni atributu nesouhlasne
                    //            that._nesouhlasne = ctx.value as boolean;
                    //        },
                    //    }
                    //    );
                    return filterFormDef;
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
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", disabled: false, caption: "jres:30250356", firstField: { maxLength: 7 }, secondField: { maxLength: 7, allowedChars: "0123456789" } }), //RC 30250356 : FIM
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
                    myGridFormat.addTextColumn({
                        name: "isp_zj",
                        caption: "jres:30250474", //RC 30250474 : ZJ
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zj", caption: "jres:30250474", firstField: { maxLength: 3 }, secondField: { maxLength: 3 } }), //RC 30250474 : ZJ
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_uj",
                        caption: "jres:30250475", //RC 30250475 : UJ
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uj", caption: "jres:30250475", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }), //RC 30250475 : UJ
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_uz",
                        caption: "jres:30250476", //RC 30250476 : UZ
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uz", caption: "jres:30250476", firstField: { maxLength: 5 }, secondField: { maxLength: 5 } }), //RC 30250476 : UZ
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc01",
                        caption: "jres:30250477", //RC 30250477 : GINIS PRSK
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_psk_suma2",
                        //caption: "jres:30250344",                                                                                //RC 30250344 : IISSP Přepočteno
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            //if (!data.c_psk_suma ||  !data.kc01)
                            //    return null;
                            let a = parseDecimal(data.c_psk_suma ?? 0);
                            let b = parseDecimal(data.kc01 ?? 0);
                            if (!a.equals(b)) {
                                //if (parseDecimal(data.c_psk_suma as any) != parseDecimal(data.kc01 as any)) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250482", //RC 30250482 : Není provedeno přeúčtování skutečnosti v IISSP nebo nesouhlasí stavy
                                    //tooltip: "jres:30250288"
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_psk_suma",
                        caption: "jres:30250478", //RC 30250478 : IISSP PRSK
                        width: 120,
                    });
                    myGridFormat.addDateColumn({
                        name: "dat_akt_cero",
                        caption: "jres:30250481", //RC 30250481 : Datum CERO
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_psk",
                        caption: "jres:30250480", //RC 30250480 : IISSP PSK
                        width: 120,
                        hidden: true
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_platba",
                        caption: "jres:30250479", //RC 30250479 : IISSP Příkaz k platbě
                        width: 120,
                        hidden: true
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_bvypis",
                        caption: "jres:30250681", //RC 30250681 : IISSP BVP
                        description: "jres:30250682", //RC 30250682 : IISSP Bankovní výpis
                        width: 120,
                        hidden: true
                    });
                    return myGridFormat;
                }
                /**
                 * Nacteni Isl sluzby pro list
                 * @param param0
                 */
                loadISLList(rq) {
                    return this.parentCnt.isl.UcrRisreStavy.stavyCerpaniRozpoctu(rq);
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
            }
            WebClient.GSeznamIISSPStavyStavyCerpaniRozpoctu = GSeznamIISSPStavyStavyCerpaniRozpoctu;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eUNlcnBhbmlSb3pwb2N0dS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlDZXJwYW5pUm96cG9jdHUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTZpQmY7QUE3aUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZpQm5CO0lBN2lCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNmlCN0I7UUE3aUJvQixXQUFBLFNBQVM7WUFFMUI7Ozs7O2VBS0c7WUFDSCxNQUFhLHFDQUFzQyxTQUFRLFVBQUEsZ0JBQWdCO2dCQUEzRTs7b0JBS1ksZUFBVSxHQUFZLEtBQUssQ0FBQztvQkFDNUIsaUJBQVksR0FBWSxLQUFLLENBQUM7b0JBa2V0QyxLQUFLO29CQUNMLGlCQUFpQjtvQkFDakIsS0FBSztvQkFDTCw0Q0FBNEM7b0JBQzVDLHNCQUFzQjtvQkFDdEIsNkJBQTZCO29CQUM3Qiw0RUFBNEU7b0JBRTVFLG1FQUFtRTtvQkFFbkUsNkNBQTZDO29CQUM3QywrQ0FBK0M7b0JBRS9DLGtDQUFrQztvQkFDbEMsK0RBQStEO29CQUMvRCxxR0FBcUc7b0JBQ3JHLG1DQUFtQztvQkFDbkMsbUNBQW1DO29CQUduQyx3Q0FBd0M7b0JBQ3hDLG9DQUFvQztvQkFFcEMsdUJBQXVCO29CQUN2QiwrQ0FBK0M7b0JBQy9DLGlGQUFpRjtvQkFDakYsNEZBQTRGO29CQUM1RixlQUFlO29CQUNmLG1DQUFtQztvQkFDbkMsb0NBQW9DO29CQUNwQyxzREFBc0Q7b0JBQ3RELGlDQUFpQztvQkFDakMsa0NBQWtDO29CQUNsQyxtREFBbUQ7b0JBRW5ELHlMQUF5TDtvQkFFekwsMkdBQTJHO29CQUMzRyx3QkFBd0I7b0JBQ3hCLDJDQUEyQztvQkFDM0MsK0JBQStCO29CQUMvQix3RUFBd0U7b0JBQ3hFLGlEQUFpRDtvQkFDakQsMkNBQTJDO29CQUMzQyxpREFBaUQ7b0JBRWpELG9CQUFvQjtvQkFDcEIsdUNBQXVDO29CQUN2QyxpREFBaUQ7b0JBRWpELG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQixtQ0FBbUM7b0JBRW5DLFdBQVc7b0JBQ1gsWUFBWTtvQkFHWiwyQkFBMkI7b0JBQzNCLEdBQUc7Z0JBQ1AsQ0FBQztnQkE1aEJHLGNBQWM7b0JBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM1QixJQUFHLElBQUksS0FBSyxJQUFJO3dCQUFFLE9BQU07b0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO3dCQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRS9GLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO3dCQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRzFELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7O3FCQUdLO2dCQUNFLGFBQWE7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUM1QixVQUFVLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLGtCQUFrQjs0QkFDbEIsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7NEJBQ3JELEdBQUcsRUFBRSxVQUFTLEVBQUUsRUFBRSxHQUFHO2dDQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOzRCQUN2QyxDQUFDO3lCQUNKO3FCQUVKLENBQ0EsQ0FBQztnQkFDTixDQUFDO2dCQUlEOzs7O3FCQUlLO2dCQUNHLFVBQVU7b0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxzQ0FBc0M7b0JBQ3RGLG9CQUFvQjtvQkFDcEIscURBQXFEO29CQUNyRCx5QkFBeUI7b0JBQ3pCLHVGQUF1RjtvQkFFdkYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM1QixJQUFJLElBQUksS0FBSyxJQUFJO3dCQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMxRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBd0QsU0FBUyxFQUFFLEVBQUUsQ0FBQzt5QkFDOUYsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ2IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQW1CLGdCQUFnQixDQUFDLENBQUM7d0JBQzlFLHFEQUFxRDt3QkFDckQseUJBQXlCO3dCQUN6QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLG9FQUFvRTs0QkFDbkgsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzNDLENBQUM7d0JBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUM7NEJBQ3BELElBQUksRUFBRTtnQ0FDRixHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFRLENBQUMsU0FBVSxDQUFDLEdBQUksRUFBRSxnQ0FBZ0M7Z0NBQzlFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQVEsQ0FBQyxTQUFVLENBQUMsR0FBSSxFQUFFLGdDQUFnQztnQ0FDOUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxNQUFNO2dDQUNyQixhQUFhLEVBQUUsSUFBSTtnQ0FDbkIsYUFBYSxFQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0NBQ2xGLGNBQWMsRUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFFO2dDQUNuRixRQUFRLEVBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztnQ0FDbEYsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztnQ0FDbEYsR0FBRyxFQUFpQixDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dDQUNsRixJQUFJLEVBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0NBQ2xGLGVBQWUsRUFBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO2dDQUNoRixZQUFZLEVBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztnQ0FDaEYsS0FBSyxFQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0NBQ2xGLGtCQUFrQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7NkJBQ25GO3lCQUNKLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDYixDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDLCtEQUErRDtvQkFDaEssQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELENBQUM7Z0JBR0Q7OztxQkFHSztnQkFDRSxhQUFhO29CQUVoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLElBQUksSUFBSSxLQUFLLElBQUk7d0JBQUUsT0FBTTtvQkFDekIsK0JBQStCO29CQUMvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTt3QkFBRyxPQUFPO29CQUVuQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUF3QyxjQUFjLENBQUMsQ0FBQztvQkFDN0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUU1QixJQUFJLEdBQUcsR0FBMEMsRUFBRSxDQUFDO29CQUNwRCxJQUFJLEtBQUssR0FBRyxDQUFDO3dCQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2pCLFVBQVU7b0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzt3QkFDdEMsT0FBTyxFQUFFLEtBQUssR0FBRyxDQUFDLElBQUssSUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsNkRBQXFEO3FCQUM5RyxDQUFDLENBQUM7Z0JBR1AsQ0FBQztnQkFFRDs7cUJBRUs7Z0JBQ0ssYUFBYTtvQkFFbkIsSUFBSSxPQUFPLEdBQ1A7d0JBQ0ksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7cUJBR2hFLENBQUE7b0JBQ0wsT0FBTyxPQUFPLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0Q7OztxQkFHSztnQkFDRSxVQUFVO29CQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBZ0IsR0FBRyxFQUFFO3dCQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzt3QkFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQW1DLEVBQUUsRUFBRTt3QkFDbEUsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTt3QkFDaEMsR0FBRyxFQUFFLG1CQUFtQjtxQkFDN0IsQ0FBQyxDQUFDO29CQUNILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN0QywrSEFBK0g7b0JBRS9ILE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt5QkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO3lCQUNoQyxRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQixJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzdGLFFBQVEsRUFBRTs0QkFDTixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3lCQUNwRjt3QkFDRCxjQUFjLEVBQUUsS0FBSzt3QkFDckIsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUk7NEJBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDekIsQ0FBQztxQkFDSixDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFHRDs7Ozs7O2tCQU1FO2dCQUNLLG1CQUFtQjtvQkFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFJLENBQUM7b0JBQ3pDLGFBQWE7b0JBQ2IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxlQUFlO29CQUNmLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkQsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFO3dCQUNoQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNwQixrRUFBa0U7b0JBQ2xFLHFJQUFxSTtvQkFDckksOERBQThEO29CQUM5RCxzQkFBc0I7b0JBQ3RCLElBQUksYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLDBDQUEwQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFBLENBQUUscUJBQXFCO29CQUMzSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFdBQVcsRUFBRSxDQUFDO3dCQUMvRSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO3dCQUN2QyxjQUFjO3dCQUNkLE1BQU0sR0FBRyxTQUFnQixDQUFDO3dCQUMxQixNQUFNLEdBQUcsU0FBZ0IsQ0FBQztvQkFDOUIsQ0FBQztvQkFDRCxhQUFhLENBQUMsVUFBVSxFQUFFO3lCQUNyQixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7eUJBQ3pELFFBQVEsQ0FBQyxVQUFVLEVBQUU7d0JBQ2xCLElBQUksRUFBRSxRQUFRO3dCQUNkLGtFQUFrRTt3QkFDbEUsb0VBQW9FO3dCQUNwRSxzQ0FBc0M7d0JBQ3RDLFFBQVEsRUFBRSxNQUFNO3dCQUNoQixRQUFRLEVBQUUsTUFBTTt3QkFDaEIsWUFBWSxFQUFFLE1BQU07d0JBQ3BCLHlFQUF5RTt3QkFDekUsOEJBQThCO3dCQUM5QixNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7d0JBRXBCLENBQUM7d0JBQ0QsU0FBUyxFQUFFLE1BQU07cUJBQ3BCLENBQ0osQ0FBQztvQkFDRixhQUFhLENBQUMsVUFBVSxFQUFFO3lCQUNyQixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7eUJBQ3hELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTt3QkFDdEMsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLDJCQUEyQjt3QkFDbEMsWUFBWSxFQUFFLFFBQVE7d0JBQ3RCLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUI7OzRCQUN2RixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsaUNBQWlDOzBCQUN4RSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FDdkI7d0JBQ0QsOEJBQThCOzt3QkFDNUIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUV2QixnR0FBZ0c7NEJBQ2hHLDJCQUEyQjs0QkFFM0IsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBRSxDQUFDO2dDQUMxQyxtQkFBbUI7Z0NBQ25CLG1CQUFtQjtnQ0FDbkIseUNBQXlDO2dDQUN6Qyw2Q0FBNkM7NEJBQ2pELENBQUM7d0JBR0wsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ1AsNEJBQTRCO29CQUM1QixtRUFBbUU7b0JBQ25FLDJCQUEyQjtvQkFDM0IsNEJBQTRCO29CQUM1Qiw4QkFBOEI7b0JBQzlCLG1EQUFtRDtvQkFDbkQsZ0NBQWdDO29CQUNoQyx3Q0FBd0M7b0JBQ3hDLHVDQUF1QztvQkFDdkMsa0ZBQWtGO29CQUNsRix5QkFBeUI7b0JBQ3pCLDZDQUE2QztvQkFDN0MscURBQXFEO29CQUNyRCxZQUFZO29CQUVaLE9BQU87b0JBQ1AsSUFBSTtvQkFDSiw0QkFBNEI7b0JBQzVCLDJFQUEyRTtvQkFDM0UsMkJBQTJCO29CQUMzQiw4QkFBOEI7b0JBQzlCLDhCQUE4QjtvQkFDOUIsbURBQW1EO29CQUNuRCxnQ0FBZ0M7b0JBQ2hDLHdDQUF3QztvQkFDeEMsdUNBQXVDO29CQUN2QyxpRkFBaUY7b0JBQ2pGLHlCQUF5QjtvQkFDekIsK0NBQStDO29CQUMvQyx1REFBdUQ7b0JBQ3ZELFlBQVk7b0JBRVosT0FBTztvQkFDUCxRQUFRO29CQUVSLE9BQU8sYUFBYSxDQUFDO2dCQUN6QixDQUFDO2dCQUtEOzs7O21CQUlHO2dCQUNJLGdCQUFnQjtvQkFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFvQyxDQUFDO29CQUlsRixZQUFZLENBQUMsYUFBYSxDQUFDO3dCQUN2QixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsV0FBVyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQzVELFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQjt3QkFDN04sS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQjtxQkFDcEwsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQjtxQkFDcEwsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQjtxQkFDcEwsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCO3dCQUNsRCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLHdCQUF3QjtxQkFDM0wsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQjtxQkFDdEwsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQjtxQkFDcEwsQ0FBQyxDQUFDO29CQUVILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLGtCQUFrQjtxQkFDbEwsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLGtCQUFrQjtxQkFDbEwsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLGtCQUFrQjtxQkFDbEwsQ0FBQyxDQUFDO29CQUVILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7d0JBQ3BELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsYUFBYSxDQUFDO3dCQUN2QixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsMklBQTJJO3dCQUMzSSxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQjt3QkFDOUIsV0FBVyxFQUFFLFFBQVE7d0JBRXJCLFlBQVksRUFBRSxVQUFVLElBQUk7NEJBQ3hCLHNDQUFzQzs0QkFDdEMsa0JBQWtCOzRCQUNsQixJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDekMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLENBQUM7Z0NBQ3BCLCtFQUErRTtnQ0FDM0UsT0FBTztvQ0FDSCxJQUFJLEVBQUUsc0RBQXNELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxvRkFBb0Y7b0NBQ3pLLDBCQUEwQjtpQ0FDN0IsQ0FBQzs0QkFDTixDQUFDOzRCQUNELE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLElBQUksRUFBRSxZQUFZO3dCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEdBQUc7cUJBRWIsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxjQUFjO3dCQUNwQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEdBQUc7cUJBRWIsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7d0JBQ25ELEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBQyxJQUFJO3FCQUVkLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHFDQUFxQzt3QkFDL0QsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsTUFBTSxFQUFDLElBQUk7cUJBRWQsQ0FBQyxDQUFDO29CQUVILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxXQUFXLEVBQUMsZUFBZSxFQUFFLG9DQUFvQzt3QkFDakUsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsTUFBTSxFQUFFLElBQUk7cUJBRWYsQ0FBQyxDQUFDO29CQUtILE9BQU8sWUFBWSxDQUFDO2dCQUN4QixDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ08sV0FBVyxDQUFDLEVBQTJDO29CQUU3RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFFRDs7cUJBRUs7Z0JBQ0csVUFBVSxDQUFDLEtBQWU7b0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO29CQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDckMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs2QkFDdEIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ2pDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRDs7OzttQkFJRztnQkFDTyxXQUFXLENBQUMsWUFBbUUsRUFBRSxNQUFXO29CQUVsRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUk7d0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRXRCLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUM7b0JBQ2pDLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUMvRCxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtvQkFDOUUsQ0FBQztvQkFDRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsNENBQTRDO3dCQUMzRixPQUFPO29CQUNYLENBQUM7b0JBQ0QsSUFBSSxXQUFnQixDQUFDO29CQUNyQixJQUFJLElBQUksQ0FBQyxZQUFZO3dCQUNqQixXQUFXLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEMsSUFBSSxTQUFjLENBQUM7b0JBQ25CLElBQUksSUFBSSxDQUFDLFVBQVU7d0JBQ2YsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBRXBDLElBQUksT0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO29CQUUzSyxPQUFPO3dCQUNILEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtxQkFDcEQsQ0FBQztnQkFDTixDQUFDO2FBOERKO1lBcGlCWSwrQ0FBcUMsd0NBb2lCakQsQ0FBQTtRQUNMLENBQUMsRUE3aUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2aUI3QjtJQUFELENBQUMsRUE3aUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2aUJuQjtBQUFELENBQUMsRUE3aUJTLE1BQU0sS0FBTixNQUFNLFFBNmlCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBzdGF2eSAtIFN0YXZ5IGNlcnBuaSByb3pwb2N0dVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlDZXJwYW5pUm96cG9jdHUgZXh0ZW5kcyBHU2V6bmFtSUlTU1BCYXNlIGltcGxlbWVudHMgSUdDb250ZW50e1xyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBGaW5NaXN0bzogc3RyaW5nOyAgIC8vIGZpbmFuY25pIG1pc3RvXHJcblxyXG4gICAgICAgIHByaXZhdGUgX25lc3RhemVuZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgX25lc291aGxhc25lOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdXBlci5vbkNvbnRlbnRSZWFkeSgpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuRmluTWlzdG8gPSB0aGlzLnBhcmVudENudFtcIkZpbk1pc3RvXCJdO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmKGdyaWQgPT09IG51bGwpIHJldHVyblxyXG4gICAgICAgICAgICBpZiAodGhpcy5GaW5NaXN0by50cmltKCkgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpc3BfZmltOiB7IHN0YXJ0OiB0aGF0LkZpbk1pc3RvLCBlbmQ6IHRoYXQuRmluTWlzdG8gfSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5tYXNrYSlcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB0aGlzLnBhcmVudENudC5tYXNrYSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlbG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMuYWRkUmFuZ2UoeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdE9kZXNsYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kZXNsYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2OVwiLCAvL1JDIDMwMjUwNDY5IDogRG90YXogSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZG90YXpJSVNTUCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZGVzbGF0IHZ5a2F6XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGRvdGF6SUlTU1AoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNDQ1XCIpOyAvL1JDIDMwMjUwNDQ1IDogUMWZaXByYXZ1amUgc2Ugb2Rlc2zDoW7DrVxyXG4gICAgICAgICAgICAvL2NvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2NvbnN0IHJvayA9IHRoaXMucGFyZW50Q250Lkdsb2JhbHMuRWtvUGFyYW1zIS5Sb2shO1xyXG4gICAgICAgICAgICAvL2NvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIC8vbGV0IGRhdGUgPSByb2sgPT09IG5vdy5nZXRGdWxsWWVhcigpID8gbm93IDogR29yZGljLlV0aWxzLkRhdGVUaW1lLmdldEVuZE9mWWVhcihyb2spO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvPihcImNvbGxlY3RcIiwge30pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2QgPSB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWw8eyBkYXR1bUs6IERhdGUgfT4oXCJnZXRDdXJyZW50RGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmRpYWxvZ3MuYWxlcnQoY2QuZGF0dW1LLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3QgZGF0ZSA9IGNkLmRhdHVtSztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2QuZGF0dW1LID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMwMjUwNjQ1XCIpOyAvL1JDIDMwMjUwNjQ1IDogTmVuw60gemFkw6FuYSBwb2xvxb5rYSAna2UgZG5pJyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250LmlzbC5JaXNzcEluYm94Lm9kZXNsYW5pRWtpc1NwQ2Vybyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5wYXJlbnRDbnQuR2xvYmFscyEuRWtvUGFyYW1zIS5JQ08hLCAvL2RhdGEuaWNvLCAvL2ljbyBuZW5pIHYgZGF0ZWNoIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGlzLnBhcmVudENudC5HbG9iYWxzIS5Fa29QYXJhbXMhLlVDUyEsIC8vZGF0YS51Y3MsIC8vdWNzIG5lbmkgdiBkYXRlY2ghXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X2RhdHVtOiBjZC5kYXR1bUssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X2RhdHVtX29kOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRzX3NtdnNfYWtjZTogICAgICBbeyBrb2Q6IGZpbHRlci5pc3BfZWRzPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF9lZHM/LmVuZCB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pc3RvX2ZpbmFuY25pOiAgICAgW3sga29kOiBmaWx0ZXIuaXNwX2ZpbT8uc3RhcnQgLCBrb2RfZG86IGZpbHRlci5pc3BfZmltPy5lbmQgfSBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYWdyYWY6ICAgICAgICAgICBbeyBrb2Q6IGZpbHRlci5pc3BfcGFyPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF9wYXI/LmVuZCB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbG96a2Ffcm96cG9jdG92YTogW3sga29kOiBmaWx0ZXIuaXNwX3BvbD8uc3RhcnQgLCBrb2RfZG86IGZpbHRlci5pc3BfcG9sPy5lbmQgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdnM6ICAgICAgICAgICAgICAgIFt7IGtvZDogZmlsdGVyLmlzcF9wdnM/LnN0YXJ0ICwga29kX2RvOiBmaWx0ZXIuaXNwX3B2cz8uZW5kIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNlbDogICAgICAgICAgICAgICBbeyBrb2Q6IGZpbHRlci5pc3BfdWNsPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF91Y2w/LmVuZCB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGplZG5vdGthX3V6ZW1uaTogICAgW3sga29kOiBmaWx0ZXIuaXNwX3VqPy5zdGFydCAsIGtvZF9kbzogZmlsdGVyLmlzcF91aj8uZW5kIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgem5ha191Y2Vsb3Z5OiAgICAgICBbeyBrb2Q6IGZpbHRlci5pc3BfdXo/LnN0YXJ0ICwga29kX2RvOiBmaWx0ZXIuaXNwX3V6Py5lbmQgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6ZHJvajogICAgICAgICAgICAgIFt7IGtvZDogZmlsdGVyLmlzcF96ZHI/LnN0YXJ0ICwga29kX2RvOiBmaWx0ZXIuaXNwX3pkcj8uZW5kIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgamVkbm90a2FfemF6bmFtb3ZhOiBbeyBrb2Q6IGZpbHRlci5pc3Bfemo/LnN0YXJ0ICwga29kX2RvOiBmaWx0ZXIuaXNwX3pqPy5lbmQgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5kaWFsb2dzLmFsZXJ0KGBqcmVzOjMxMTAwMjgxYC5mb3JtYXQocmVzLnJlc3VsdC5kYXRhLmRhdmthX2lkX2V4dGVybmkgPz8gXCJcIikpIC8vUkMgMzExMDAyODEgOiBQb8W+YWRhdmVrIGRvIGluYm94dSDDunNwxJvFoW7EmyB6YcWZYXplbiBwb2QgSUQgezB9LlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLnBhcmVudENudC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaSgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVyblxyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5jbG9zZWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVZ5a2F6dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGxldCBwb2NldCA9IHZpZXcuZ2V0Q291bnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8gPSB7fTtcclxuICAgICAgICAgICAgaWYgKHBvY2V0ID4gMClcclxuICAgICAgICAgICAgICAgIHJvdyA9IHJvd3NbMF1cclxuICAgICAgICAgICAgLy8gb2Rlc2xhdFxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdE9kZXNsYXQ/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBwb2NldCA+IDAgJiYgIEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX1Jpc1N0cmMgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlWZHUuQW5vRWRpdGFjZSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51YmFydVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIoKTogTWVudVBhcmFtc1tdIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBtZW51UGFyOiBNZW51UGFyYW1zW10gPVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdE9kZXNsYXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICByZXR1cm4gbWVudVBhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KFtdLCB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlciB9XHJcbiAgICAgICAgICAgICAgICAsIGtleTogXCJpeHNfdmt6LHBvcl9jaXNsb1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgc2xvdXBjZSA9IHRoYXQuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAvL3ZhciBkZWZhdWx0UHJvZmlsZSA9IHNsb3VwY2UuY29sdW1uczsvL3Nsb3VwY2UuY29sdW1ucy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZT8udG9Mb3dlckNhc2UoKS5pbmRleE9mKFwidmxhc3Rub3N0XCIpID09PSAtMSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBzbG91cGNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IG5hbWU6IFwiZGVmYXVsdFwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcInVzZXJQcm9maWxlXCIsIGNvbHVtbkxpc3Q6IHNsb3VwY2UuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVWaXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByb2sgPSB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shO1xyXG4gICAgICAgICAgICAvLyBrb25lYyByb2t1XHJcbiAgICAgICAgICAgIGxldCBkYXRNYXggPSBHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuZ2V0RW5kT2ZZZWFyKHJvayk7XHJcbiAgICAgICAgICAgIC8vIHphY2F0ZWsgcm9rdVxyXG4gICAgICAgICAgICBsZXQgZGF0TWluID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLmdldFN0YXJ0T2ZZZWFyKHJvayk7XHJcbiAgICAgICAgICAgIGxldCBha3REYXQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAocm9rID4gKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCkpXHJcbiAgICAgICAgICAgICAgICBha3REYXQgPSBkYXRNYXg7XHJcbiAgICAgICAgICAgIC8vLy92YXIgZGF0TWF4ID0gbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItMTItMzFcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGRhdE1heCA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5nZXRFbmRPZk1vbnRoKG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayArIFwiLVwiICsgKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpICsgXCItMVwiKSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRhdE1pbiA9IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayArIFwiLTEtMVwiKTtcclxuICAgICAgICAgICAgLy9sZXQgYWt0RGF0ID0gZGF0TWF4O1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEyLCBMLTEyLTEyLTAsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiB9KSAgLy9SQyAzMDI1MDA1MiA6IEZpbHRyXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5tYXNrYSAmJiB0eXBlb2YgdGhhdC5wYXJlbnRDbnQubWFza2EuZGF0X3N0YXYgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGFrdERhdCA9IHRoYXQucGFyZW50Q250Lm1hc2thLmRhdF9zdGF2O1xyXG4gICAgICAgICAgICAgICAgLy8genJ1c2ltIG1lemVcclxuICAgICAgICAgICAgICAgIGRhdE1pbiA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBkYXRNYXggPSB1bmRlZmluZWQgYXMgYW55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1EZWYuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDM0N1wiIH0pIC8vUkMgMzAyNTAzNDcgOiBrZSBkbmlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWluVmFsdWU6IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayBhcyBudW1iZXIsIDEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWF4VmFsdWU6IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayBhcyBudW1iZXIgLDEyLDMxKSAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXhWYWx1ZTpuZXcgRGF0ZSgyMDE5LDEyLDMxLDIzLDU5KSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogZGF0TWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiBkYXRNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBha3REYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayBhcyBudW1iZXIsIDEyLCAzMSkgLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwuZGF0dW1LPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDk2XCIgfSkgLy9SQyAzMDI1MDQ5NiA6IFZvbGJ5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZvbGJ5XCIsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwudm9sYnk9dmFsdWUuaG9kbm90YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IHRleHQ6IFwianJlczozMDI1MDQ3MFwiLCBob2Rub3RhOiAxIH0gLy9SQyAzMDI1MDQ3MCA6IE5lc3Rhxb5lbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyB0ZXh0OiBcImpyZXM6MzAyNTA0NzFcIiwgaG9kbm90YTogMiB9XSAvL1JDIDMwMjUwNDcxIDogTmVzb3VobGFzbsOpIHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwiaG9kbm90YVwiIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIGluaXRpYWxWYWx1ZTogaW5pdGlhbFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZyB8fCAob2JqLmZsYWdzICYmIG9iai5mbGFncy5maWx0ZXJDbGVhciA9PT0gdHJ1ZSkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5sb2FkaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoudmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gbmFzdGF2ZW5pIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRBY3Rpb25zKHZpZXcuZ2V0RGF0YVJvd3MoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ3MFwiIH0pIC8vUkMgMzAyNTA0NzAgOiBOZXN0YcW+ZW7DqVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJuZXN0YXplbmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKCB0eXBlb2YgY3R4ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHgudmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBuYXN0YXZlbmkgYXRyaWJ1dHUgbmVzdGF6ZW5lXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5fbmVzdGF6ZW5lID0gY3R4LnZhbHVlIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgIC8vZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA0NzFcIiB9KSAvL1JDIDMwMjUwNDcxIDogTmVzb3VobGFzbsOpIHN0YXZ5XHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcIm5lc291aGxhc25lXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5hZ3JlZ2FjZT12YWx1ZS5hZ3JlZ2FjZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlb2YgY3R4ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHgudmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBuYXN0YXZlbmkgYXRyaWJ1dHUgbmVzb3VobGFzbmVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Ll9uZXNvdWhsYXNuZSA9IGN0eC52YWx1ZSBhcyBib29sZWFuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX2ZpbVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU2XCIsIC8vUkMgMzAyNTAzNTYgOiBGSU0gICAgIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzMFwiLCAvL1JDIDMwMjUwNDMwIDogRmluYW7EjW7DrSBtw61zdG9cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX2ZpbVwiLCBkaXNhYmxlZDpmYWxzZSwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU2XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA3IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogNywgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIiB9IH0pLCAvL1JDIDMwMjUwMzU2IDogRklNXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF96ZHJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM1N1wiLCAvL1JDIDMwMjUwMzU3IDogWkRSXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF96ZHJcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU3XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA3IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogNyB9IH0pLCAvL1JDIDMwMjUwMzU3IDogWkRSXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9wYXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM1OFwiLCAvL1JDIDMwMjUwMzU4IDogUEFSXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF9wYXJcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU4XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogNiB9IH0pLCAvL1JDIDMwMjUwMzU4IDogUEFSXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9wb2xcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM1OVwiLCAvL1JDIDMwMjUwMzU5IDogUE9MXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF9wb2xcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU5XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA0IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogNCB9IH0pLCAvL1JDIDMwMjUwMzU5IDogUE9MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9lZHNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MFwiLCAvL1JDIDMwMjUwMzYwIDogRURTL1NNVlNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF9lZHNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYwXCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiAxMyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDEzIH0gfSksIC8vUkMgMzAyNTAzNjAgOiBFRFMvU01WU1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcHZzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjFcIiwgLy9SQyAzMDI1MDM2MSA6IFBWU1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcHZzXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMTAgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiAxMCB9IH0pLCAvL1JDIDMwMjUwMzYxIDogUFZTXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF91Y2xcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MlwiLCAvL1JDIDMwMjUwMzYyIDogVUNMXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF91Y2xcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYyXCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogOSB9IH0pLCAvL1JDIDMwMjUwMzYyIDogVUNMXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfempcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3NFwiLCAvL1JDIDMwMjUwNDc0IDogWkpcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3pqXCIsIGNhcHRpb246IFwianJlczozMDI1MDQ3NFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDMgfSB9KSwgLy9SQyAzMDI1MDQ3NCA6IFpKXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF91alwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc1XCIsIC8vUkMgMzAyNTA0NzUgOiBVSlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfdWpcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc1XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogNiB9IH0pLCAvL1JDIDMwMjUwNDc1IDogVUpcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3V6XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzZcIiwgLy9SQyAzMDI1MDQ3NiA6IFVaXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF91elwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzZcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDUgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA1IH0gfSksIC8vUkMgMzAyNTA0NzYgOiBVWlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtjMDFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3N1wiLCAvL1JDIDMwMjUwNDc3IDogR0lOSVMgUFJTS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wc2tfc3VtYTJcIixcclxuICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMwMjUwMzQ0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwMzQ0IDogSUlTU1AgUMWZZXBvxI10ZW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICghZGF0YS5jX3Bza19zdW1hIHx8ICAhZGF0YS5rYzAxKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhID0gcGFyc2VEZWNpbWFsKGRhdGEuY19wc2tfc3VtYT8/MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGIgPSBwYXJzZURlY2ltYWwoZGF0YS5rYzAxID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYS5lcXVhbHMoYikgKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHBhcnNlRGVjaW1hbChkYXRhLmNfcHNrX3N1bWEgYXMgYW55KSAhPSBwYXJzZURlY2ltYWwoZGF0YS5rYzAxIGFzIGFueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBcImpyZXM6MzAyNTA0ODJcIiwgLy9SQyAzMDI1MDQ4MiA6IE5lbsOtIHByb3ZlZGVubyBwxZllw7rEjXRvdsOhbsOtIHNrdXRlxI1ub3N0aSB2IElJU1NQIG5lYm8gbmVzb3VobGFzw60gc3RhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3Bza19zdW1hXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzhcIiwgLy9SQyAzMDI1MDQ3OCA6IElJU1NQIFBSU0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfYWt0X2Nlcm9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ4MVwiLCAvL1JDIDMwMjUwNDgxIDogRGF0dW0gQ0VST1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3Bza1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDgwXCIsIC8vUkMgMzAyNTA0ODAgOiBJSVNTUCBQU0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46dHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcGxhdGJhXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzlcIiwgLy9SQyAzMDI1MDQ3OSA6IElJU1NQIFDFmcOta2F6IGsgcGxhdGLEm1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjp0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2J2eXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjgxXCIsIC8vUkMgMzAyNTA2ODEgOiBJSVNTUCBCVlBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwianJlczozMDI1MDY4MlwiLCAvL1JDIDMwMjUwNjgyIDogSUlTU1AgQmFua292bsOtIHbDvXBpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbXlHcmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBJc2wgc2x1emJ5IHBybyBsaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBsb2FkSVNMTGlzdChycTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiBhbnkgfSB9KTogSXNsLl9UYXNrPGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVTdGF2eS5zdGF2eUNlcnBhbmlSb3pwb2N0dShycSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamlzdGVuaSB2b2xlYiBuYSBmaWx0cnBhbmVsdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aVZvbGJ5KHZvbGJ5OiBbTnVtYmVyXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXN0YXplbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbmVzb3VobGFzbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2xieSEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh2b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lc3RhemVuZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lc291aGxhc25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmF0IG11aiBzZXN0YXZlbnkgZmlsdHJcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRNeUZpbHRlcihmaWx0ZXJTZXJ2ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvLCBmaWx0ZXI6IGFueSk6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczoge30gfSB9IHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmFjdGlWb2xieShmaWx0ZXIudm9sYnkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGZpbHRlci5NZXNpYyA9IC0xO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlbm1lczogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyLmRhdHVtSyAhPT0gdW5kZWZpbmVkICYmIGZpbHRlci5kYXR1bUsgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRlbm1lcyA9IDEgKiBmaWx0ZXIuZGF0dW1LLmdldERhdGUoKSArIChmaWx0ZXIuZGF0dW1LLmdldE1vbnRoKCkgKyAxKSAqIDMyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRlbm1lcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZGlhbG9ncy5hbGVydChcImpyZXM6MzAyNTA2NDVcIik7IC8vUkMgMzAyNTA2NDUgOiBOZW7DrSB6YWTDoW5hIHBvbG/FvmthICdrZSBkbmknXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5lc291aGxhc25lOiBhbnk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXNvdWhsYXNuZSlcclxuICAgICAgICAgICAgICAgIG5lc291aGxhc25lID0geyBvOiBcIj1cIiwgdjogdHJ1ZSB9O1xyXG4gICAgICAgICAgICBsZXQgbmVzdGF6ZW5lOiBhbnk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXN0YXplbmUpXHJcbiAgICAgICAgICAgICAgICBuZXN0YXplbmUgPSB7IG86IFwiPVwiLCB2OiB0cnVlIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgbXlmaWx0ciA9IHsgcm9rOiB7IG86IFwiPVwiLCB2OiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgfSwgaWNvOiB7IG86IFwiPVwiLCB2OiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gfSwgZGVubWVzOiB7IG86IFwiPD1cIiwgdjogZGVubWVzIH0sIG5lc291aGxhc25lLCBuZXN0YXplbmUgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtYXNrYTogZmlsdGVyU2VydmVyLCBmaWx0ZXI6IHsgZmlsdGVyczogbXlmaWx0ciB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3B1YmxpYyBsb2FkRGF0YU9sZCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgIHZhciBtYXNrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIGZpbHRlciA9IHRoYXQuZ2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG5cclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImxvYWRkYXRhLmZpbHRlclwiLCBmaWx0ZXIpO1xyXG4gICAgICAgIC8vICAgIC8vbGV0IHZpZXcgPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgLy8gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKVxyXG4gICAgICAgIC8vICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oKGZpbHRlclNlcnZlcikgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbWFza2EgPSBmaWx0ZXJTZXJ2ZXI7XHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChmaWx0ZXIuTWVzaWMgPT09IG51bGwpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZmlsdGVyLk1lc2ljID0gLTE7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgZGVubWVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyLmRhdHVtSyAhPT0gdW5kZWZpbmVkICYmIGZpbHRlci5kYXR1bUsgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBkZW5tZXMgPSAxICogZmlsdGVyLmRhdHVtSy5nZXREYXRlKCkgKyAoZmlsdGVyLmRhdHVtSy5nZXRNb250aCgpICsgMSkgKiAzMlxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IG5lc291aGxhc25lOiBhbnk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAodGhhdC5fbmVzb3VobGFzbmUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbmVzb3VobGFzbmUgPSAgeyBvOiBcIj1cIiwgdjogdHJ1ZSB9IDtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBuZXN0YXplbmU6IGFueTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmICh0aGF0Ll9uZXN0YXplbmUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbmVzdGF6ZW5lID0geyBvOiBcIj1cIiwgdjogdHJ1ZSB9IDtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgbXlmaWx0ciA9IHsgcm9rOiB7IG86IFwiPVwiLCB2OiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgfSwgaWNvOiB7IG86IFwiPVwiLCB2OiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gfSwgZGVubWVzOiB7IG86IFwiPD1cIiwgdjogZGVubWVzIH0sIG5lc291aGxhc25lLCBuZXN0YXplbmUgfTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuSXNsLlVjclJpc3JlU3Rhdnkuc3RhdnlDZXJwYW5pUm96cG9jdHUoeyBtYXNrYTogbWFza2EsIGZpbHRlcjogeyBmaWx0ZXJzOiBteWZpbHRyIH0gfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2F0LnNldEFjdGlvbnMocmVzdWx0Lkxpc3RWYWx1ZXM/Lmxlbmd0aCBhcyBhbnkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL3RoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL3RoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgIC8vICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG59Il19
"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP stavy - Stavy skutecnosti
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPStavyStavySkutecnosti extends WebClient.GSeznamIISSPBase {
                constructor() {
                    super(...arguments);
                    this._nestazene = false;
                    this._nesouhlasne = false;
                }
                //private maska: Gordic.Iissp.Interface.GIisspInboxDto;
                onContentReady() {
                    // multi vyber
                    this.multiSelect = false;
                    // sumarizacni radek
                    this.sumRow = true;
                    this.myKeys = "ico,rok,mesden,sk_vl,bu_vl,id_hdr_ris,radek_hdr,xfimuz,ucs,uus";
                    //this.taskList = this.parentCnt.isl.UcrRisreSkutecnost.list();
                    //this.taskCount = this.parentCnt.isl.UcrRisreSkutecnost.count();
                    super.onContentReady();
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    that.FinMisto = this.parentCnt["FinMisto"];
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
                            run: (ev, ctx) => {
                                that.dotazIISSP();
                            }
                        },
                        acPohyby: {
                            name: "acPohyby",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250499", //RC 30250499 : Pohyby
                            run: (ev, ctx) => {
                                that.pohyby();
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
                    let that = this;
                    const cnt = that.parentCnt;
                    cnt.beginOperation("jres:30250445"); //RC 30250445 : Připravuje se odeslání
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    grid.ggridserverfilter("collect", {})
                        .then((filter) => {
                        const cd = this.$filterPanel.gfilterpanel("getCurrentData");
                        return cnt.isl.IisspInbox.odeslaniSpEkisStsk({
                            data: {
                                ico: cnt.Globals.EkoParams.ICO,
                                ucs: cnt.Globals.EkoParams.UCS,
                                stav_datum_od: cd.datumK.start,
                                stav_datum: cd.datumK.end,
                                misto_financni: filter.isp_fim?.start,
                                rezervace_cislo: { kod: filter.id_hdr_ris?.start, kod_do: filter.id_hdr_ris?.end },
                                zdroj: { kod: filter.isp_zdr?.start, kod_do: filter.isp_zdr?.end },
                                paragraf: { kod: filter.isp_par?.start, kod_do: filter.isp_par?.end },
                                polozka_rozpoctova: { kod: filter.isp_pol?.start, kod_do: filter.isp_pol?.end },
                                pvs: { kod: filter.isp_pvs?.start, kod_do: filter.isp_pvs?.end },
                                eds_smvs_akce: { kod: filter.isp_eds?.start, kod_do: filter.isp_eds?.end },
                                ucel: { kod: filter.isp_ucl?.start, kod_do: filter.isp_ucl?.end },
                                jednotka_zaznamova: { kod: filter.isp_zj?.start, kod_do: filter.isp_zj?.end },
                                jednotka_uzemni: { kod: filter.isp_uj?.start, kod_do: filter.isp_uj?.end },
                                znak_ucelovy: { kod: filter.isp_uz?.start, kod_do: filter.isp_uz?.end }
                            }
                        }).get();
                    })
                        .then((res) => {
                        cnt.dialogs.alert(`jres:31100281`.format(res.result.data.davka_id_externi ?? "")); //RC 31100281 : Požadavek do inboxu úspěšně zařazen pod ID {0}.
                    })
                        .always(() => { cnt.endOperation(); });
                }
                /**
                 * Odeslat vykaz
                 *
                 *
                 * */
                pohyby() {
                    const sel = this.getGrid()?.ggrid("getSelection")[0];
                    if (!sel)
                        return;
                    this.parentCnt.navigate(Gordic.Iissp.WebControls.GStskPohyby, {
                        id_volani_ssp: sel.id_volani_ssp,
                        radek_ik: sel.radek_ik,
                        radek_pol: sel.radek_pol
                    });
                    //that.parentCnt.beginOperation("jres:30250445"); //RC 30250445 : Připravuje se odeslání
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
                    // pohyby
                    this.parentCnt.actions.acPohyby?.update({
                        enabled: pocet > 0 && row.priz_detail > 0,
                    });
                }
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [
                        { action: this.parentCnt.actions.actOdeslat, favorite: true },
                        { action: this.parentCnt.actions.acPohyby, favorite: true },
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
                    let that = this;
                    let datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    let datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    let currDatMax = datMax;
                    if (that.Globals.EkoParams?.Rok == new Date().getFullYear())
                        currDatMax = new Date();
                    let currDat = { start: datMin, end: currDatMax };
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    if (that.parentCnt.maska && typeof that.parentCnt.maska.dat_stav !== "undefined") {
                        currDat = { start: that.parentCnt.maska.dat_stav_od, end: that.parentCnt.maska.dat_stav };
                        // zrusim meze
                        datMin = undefined;
                        datMax = undefined;
                    }
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250497" }) //RC 30250497 : Od - Do
                        .addField("gintervalbox", {
                        //format: (Gordic.Templates.Formatters as any).date(),
                        name: "datumK",
                        minValue: datMin,
                        maxValue: datMax,
                        //initialValue: datMax,
                        initialValue: currDat, // { start: datMin, end: currDat },
                        buttons: [
                            {
                                action: new GAction({
                                    name: "next",
                                    icon: "fa-arrow-right",
                                    tooltip: "jres:30250493", //RC 30250493 : Posune celý interval do budoucnosti                                
                                    run: (ev, ctx) => {
                                        let obj = $(ev.target).closest(".gfield");
                                        let value = obj.gfield("getValue");
                                        if (value === null)
                                            return;
                                        value.start.setDate(value.start.getDate() + 1);
                                        value.end.setDate(value.end.getDate() + 1);
                                        obj.gfield("setValue", value);
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "nastav",
                                    icon: "fa-expand",
                                    tooltip: "jres:30250495", //RC 30250495 : Nastaví interval ode dnešního dne na doporučenou délku
                                    run: (ev, ctx) => {
                                        let obj = $(ev.target).closest(".gfield");
                                        //let value = obj.gfield("getValue");
                                        //if (value === null) return;
                                        let now = new Date();
                                        now.setDate(now.getDate() - 30);
                                        let value = { start: now, end: new Date() };
                                        //(value.start as Date).setDate(new Date().getDate());
                                        //(value.end as Date).setDate(new Date().getDate() - 30);
                                        obj.gfield("setValue", value);
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "preview",
                                    icon: "fa-arrow-left",
                                    tooltip: "jres:30250494", //RC 30250494 : Posune celý interval do minulosti
                                    run: (ev, ctx) => {
                                        let obj = $(ev.target).closest(".gfield");
                                        let value = obj.gfield("getValue");
                                        if (value === null)
                                            return;
                                        value.start.setDate(value.start.getDate() - 1);
                                        value.end.setDate(value.end.getDate() - 1);
                                        obj.gfield("setValue", value);
                                    }
                                })
                            }
                        ],
                        //model: "model.datumK=value",
                        change: (ev, ctx) => {
                        },
                        //valueType: "date"
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
                    //    .addRow({ label: "jres:30250470" }) //RC 30250470 : Nestažené
                    //    .addField("gcheck", {
                    //        name: "nestazene",
                    //        labelFromRow: "always",
                    //        initialValue: false,
                    //        //model: "model.agregace=value.agregace",
                    //        change: (ev, ctx) => {
                    //            if (typeof that.$grid === "undefined" || typeof ctx === "undefined" || typeof ctx.value === "undefined")
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
                    //        labelFromRow: "always",
                    //        //labelFromRow: true, 
                    //        //model: "model.agregace=value.agregace",
                    //        change: (ev, ctx) => {
                    //            if (typeof that.$grid === "undefined" || typeof ctx === "undefined" || typeof ctx.value === "undefined")
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
                        name: "id_hdr_ris",
                        caption: "jres:31100082", //RC 31100082 : ID IISSP
                        description: "jres:31100255", //RC 31100255 : Identifikátor rezervace rozpočtových prostředků IISSP
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_hdr_ris", caption: "jres:31100082", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }) //RC 31100082 : ID IISSP
                        //maxLength: 9
                    });
                    myGridFormat.addNumberColumn({
                        name: "radek_hdr",
                        caption: "jres:31100083", //RC 31100083 : řádek IISSP
                        description: "jres:31100256", //RC 31100256 : Řádek rezervace rozpočtových prostředků IISSP
                        width: 80,
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "radek_hdr", caption: "jres:31100083", }) //RC 31100083 : řádek IISSP
                    });
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
                        caption: "jres:30250498", //RC 30250498 : GINIS IISSP PRSK
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data, meta) {
                            if (meta?._isVirtual)
                                return null;
                            const psk_suma = parseDecimal(data.c_psk_suma ?? 0);
                            const kc01 = parseDecimal(data.kc01 ?? 0);
                            if (!psk_suma.equals(kc01)) {
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
                    myGridFormat.addCurrencyColumn({
                        name: "c_platba",
                        caption: "jres:30250479", //RC 30250479 : IISSP Příkaz k platbě
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_bvypis",
                        caption: "jres:30250488", //RC 30250488 : IISSP Bank.výpis
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_psk",
                        caption: "jres:30250489", //RC 30250489 : IISSP PSK
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addDateColumn({
                        name: "dat_akt",
                        caption: "jres:30250490", //RC 30250490 : Datum sestavení
                        width: 110,
                    });
                    myGridFormat.addIconColumn({
                        name: "priz_detail",
                        caption: "jres:30250491", //RC 30250491 : Detail
                        width: 80, // fixedWidth: true,
                        customClass: "center",
                        description: "jres:30250491", //RC 30250491 : Detail
                        iconTemplate: function (data, meta) {
                            if (meta?._isVirtual)
                                return null;
                            if (data.priz_detail > 0) {
                                return {
                                    icon: "gi-detail", text: "jres:30250492", //RC 30250492 : Existuje detailní rozpad
                                    //tooltip: "jres:30250288"
                                };
                            }
                            return null;
                        }
                    });
                    return myGridFormat;
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
                 * Nacteni Isl sluzby pro list
                 * @param param0
                 */
                loadISLList(rq) {
                    return this.parentCnt.isl.UcrRisreStavy.stavySkutecnosti(rq);
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
                    debugger;
                    let denmesStart = null;
                    if (typeof filter.datumK !== undefined && filter.datumK.start !== null) {
                        denmesStart = 1 * filter.datumK.start.getDate() + (filter.datumK.start.getMonth() + 1) * 32;
                    }
                    let denmesEnd = null;
                    if (typeof filter.datumK !== undefined && filter.datumK.end !== null) {
                        denmesEnd = 1 * filter.datumK.end.getDate() + (filter.datumK.end.getMonth() + 1) * 32;
                    }
                    let nesouhlasne;
                    if (this._nesouhlasne)
                        nesouhlasne = { o: "=", v: true };
                    let nestazene;
                    if (this._nestazene)
                        nestazene = { o: "=", v: true };
                    if (denmesEnd === null || denmesStart === null)
                        return;
                    let myfiltr = {
                        rok: { o: "=", v: this.Globals.EkoParams?.Rok }, ico: { o: "=", v: this.Globals.EkoParams?.ICO },
                        denmes: { o: [">=", "<="], v: [denmesStart, denmesEnd] },
                        //denmes: { o: [">=", "<="], v: [denmesStart, denmesEnd] },
                        //denmes: { o: ">=", v: denmesStart }
                        //,denmes: { o: "<=", v: denmesEnd },
                        nesouhlasne, nestazene
                    };
                    return {
                        maska: filterServer, filter: { filters: myfiltr }
                    };
                }
            }
            WebClient.GSeznamIISSPStavyStavySkutecnosti = GSeznamIISSPStavyStavySkutecnosti;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVNrdXRlY25vc3RpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVNrdXRlY25vc3RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FpbUJmO0FBam1CRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpbUJuQjtJQWptQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWltQjdCO1FBam1Cb0IsV0FBQSxTQUFTO1lBRTFCOzs7OztlQUtHO1lBQ0gsTUFBYSxpQ0FBa0MsU0FBUSxVQUFBLGdCQUFnQjtnQkFBdkU7O29CQUtZLGVBQVUsR0FBWSxLQUFLLENBQUM7b0JBQzVCLGlCQUFZLEdBQVksS0FBSyxDQUFDO2dCQWtsQjFDLENBQUM7Z0JBamxCRyx1REFBdUQ7Z0JBRXZELGNBQWM7b0JBRVYsY0FBYztvQkFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDekIsb0JBQW9CO29CQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxnRUFBZ0UsQ0FBQztvQkFDL0UsK0RBQStEO29CQUMvRCxpRUFBaUU7b0JBRWpFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTztvQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTt3QkFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8s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Q0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTt3QkFDaEcsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRTt3QkFDeEQsMkRBQTJEO3dCQUMzRCxxQ0FBcUM7d0JBQ3JDLHFDQUFxQzt3QkFDckMsV0FBVyxFQUFFLFNBQVM7cUJBQ3pCLENBQUM7b0JBQ0YsT0FBTzt3QkFDSCxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7cUJBQ3BELENBQUM7Z0JBQ04sQ0FBQzthQUdKO1lBeGxCWSwyQ0FBaUMsb0NBd2xCN0MsQ0FBQTtRQUNMLENBQUMsRUFqbUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpbUI3QjtJQUFELENBQUMsRUFqbUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpbUJuQjtBQUFELENBQUMsRUFqbUJTLE1BQU0sS0FBTixNQUFNLFFBaW1CZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBzdGF2eSAtIFN0YXZ5IHNrdXRlY25vc3RpXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVNrdXRlY25vc3RpIGV4dGVuZHMgR1Nlem5hbUlJU1NQQmFzZSBpbXBsZW1lbnRzIElHQ29udGVudHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgRmluTWlzdG86IHN0cmluZzsgICAvLyBmaW5hbmNuaSBtaXN0b1xyXG5cclxuICAgICAgICBwcml2YXRlIF9uZXN0YXplbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIF9uZXNvdWhsYXNuZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBtYXNrYTogR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BJbmJveER0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7ICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBtdWx0aSB2eWJlclxyXG4gICAgICAgICAgICB0aGlzLm11bHRpU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHN1bWFyaXphY25pIHJhZGVrXHJcbiAgICAgICAgICAgIHRoaXMuc3VtUm93ID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm15S2V5cyA9IFwiaWNvLHJvayxtZXNkZW4sc2tfdmwsYnVfdmwsaWRfaGRyX3JpcyxyYWRla19oZHIseGZpbXV6LHVjcyx1dXNcIjtcclxuICAgICAgICAgICAgLy90aGlzLnRhc2tMaXN0ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJpc3JlU2t1dGVjbm9zdC5saXN0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy50YXNrQ291bnQgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVTa3V0ZWNub3N0LmNvdW50KCk7XHJcblxyXG4gICAgICAgICAgICBzdXBlci5vbkNvbnRlbnRSZWFkeSgpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5GaW5NaXN0byA9IHRoaXMucGFyZW50Q250W1wiRmluTWlzdG9cIl07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkZpbk1pc3RvLnRyaW0oKSAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB7IGlzcF9maW06IHsgc3RhcnQ6IHRoYXQuRmluTWlzdG8sIGVuZDogdGhhdC5GaW5NaXN0byB9IH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQubWFza2EpXHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgdGhpcy5wYXJlbnRDbnQubWFza2EpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5hZGRSYW5nZSh7ICAgICAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBhY3RPZGVzbGF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPZGVzbGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NjlcIiwgLy9SQyAzMDI1MDQ2OSA6IERvdGF6IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRvdGF6SUlTU1AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWNQb2h5Ynk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjUG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0OTlcIiwgLy9SQyAzMDI1MDQ5OSA6IFBvaHlieVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb2h5YnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9kZXNsYXQgdnlrYXpcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZG90YXpJSVNTUCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBjbnQgPSB0aGF0LnBhcmVudENudDtcclxuICAgICAgICAgICAgY250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQ0NVwiKTsgLy9SQyAzMDI1MDQ0NSA6IFDFmWlwcmF2dWplIHNlIG9kZXNsw6Fuw61cclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvPihcImNvbGxlY3RcIiwge30pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2QgPSB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWw8eyBkYXR1bUs6IEdJbnRlcnZhbER0bzxEYXRlPiB9PihcImdldEN1cnJlbnREYXRhXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY250LmlzbC5JaXNzcEluYm94Lm9kZXNsYW5pU3BFa2lzU3Rzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogY250Lkdsb2JhbHMhLkVrb1BhcmFtcyEuSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBjbnQuR2xvYmFscyEuRWtvUGFyYW1zIS5VQ1MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X2RhdHVtX29kOiBjZC5kYXR1bUsuc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X2RhdHVtOiBjZC5kYXR1bUsuZW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlzdG9fZmluYW5jbmk6IGZpbHRlci5pc3BfZmltPy5zdGFydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlemVydmFjZV9jaXNsbzogICAgeyBrb2Q6IGZpbHRlci5pZF9oZHJfcmlzPy5zdGFydCwga29kX2RvOiBmaWx0ZXIuaWRfaGRyX3Jpcz8uZW5kIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6ZHJvajogICAgICAgICAgICAgIHsga29kOiBmaWx0ZXIuaXNwX3pkcj8uc3RhcnQsICAgIGtvZF9kbzogZmlsdGVyLmlzcF96ZHI/LmVuZCAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYWdyYWY6ICAgICAgICAgICB7IGtvZDogZmlsdGVyLmlzcF9wYXI/LnN0YXJ0LCAgICBrb2RfZG86IGZpbHRlci5pc3BfcGFyPy5lbmQgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbG96a2Ffcm96cG9jdG92YTogeyBrb2Q6IGZpbHRlci5pc3BfcG9sPy5zdGFydCwgICAga29kX2RvOiBmaWx0ZXIuaXNwX3BvbD8uZW5kICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdnM6ICAgICAgICAgICAgICAgIHsga29kOiBmaWx0ZXIuaXNwX3B2cz8uc3RhcnQsICAgIGtvZF9kbzogZmlsdGVyLmlzcF9wdnM/LmVuZCAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRzX3NtdnNfYWtjZTogICAgICB7IGtvZDogZmlsdGVyLmlzcF9lZHM/LnN0YXJ0LCAgICBrb2RfZG86IGZpbHRlci5pc3BfZWRzPy5lbmQgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjZWw6ICAgICAgICAgICAgICAgeyBrb2Q6IGZpbHRlci5pc3BfdWNsPy5zdGFydCwgICAga29kX2RvOiBmaWx0ZXIuaXNwX3VjbD8uZW5kICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqZWRub3RrYV96YXpuYW1vdmE6IHsga29kOiBmaWx0ZXIuaXNwX3pqPy5zdGFydCwgICAgIGtvZF9kbzogZmlsdGVyLmlzcF96aj8uZW5kICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgamVkbm90a2FfdXplbW5pOiAgICB7IGtvZDogZmlsdGVyLmlzcF91aj8uc3RhcnQsICAgICBrb2RfZG86IGZpbHRlci5pc3BfdWo/LmVuZCAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpuYWtfdWNlbG92eTogICAgICAgeyBrb2Q6IGZpbHRlci5pc3BfdXo/LnN0YXJ0LCAgICAga29kX2RvOiBmaWx0ZXIuaXNwX3V6Py5lbmQgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5hbGVydChganJlczozMTEwMDI4MWAuZm9ybWF0KHJlcy5yZXN1bHQuZGF0YS5kYXZrYV9pZF9leHRlcm5pID8/IFwiXCIpKSAvL1JDIDMxMTAwMjgxIDogUG/FvmFkYXZlayBkbyBpbmJveHUgw7pzcMSbxaFuxJsgemHFmWF6ZW4gcG9kIElEIHswfS5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgY250LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2Rlc2xhdCB2eWthelxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2h5YnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdldEdyaWQoKT8uZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICBpZiAoIXNlbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdTdHNrUG9oeWJ5LCB7XHJcbiAgICAgICAgICAgICAgICBpZF92b2xhbmlfc3NwOiBzZWwuaWRfdm9sYW5pX3NzcCxcclxuICAgICAgICAgICAgICAgIHJhZGVrX2lrOiBzZWwucmFkZWtfaWssXHJcbiAgICAgICAgICAgICAgICByYWRla19wb2w6IHNlbC5yYWRla19wb2xcclxuICAgICAgICAgICAgfSBhcyBHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuSUdTdHNrUG9oeWJ5T3B0aW9ucyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQ0NVwiKTsgLy9SQyAzMDI1MDQ0NSA6IFDFmWlwcmF2dWplIHNlIG9kZXNsw6Fuw61cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koKSB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuY2xvc2VkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IHJvd3MgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXQgPSB2aWV3LmdldENvdW50KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0byA9IHt9O1xyXG4gICAgICAgICAgICBpZiAocG9jZXQgPiAwKVxyXG4gICAgICAgICAgICAgICAgcm93ID0gcm93c1swXVxyXG4gICAgICAgICAgICAvLyBvZGVzbGF0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0T2Rlc2xhdD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0ID4gMCAmJiAgR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfUmlzU3RyYyA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHBvaHlieVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjUG9oeWJ5Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmIHJvdy5wcml6X2RldGFpbCE+MCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnViYXJ1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcigpOiBNZW51UGFyYW1zW10ge1xyXG5cclxuICAgICAgICAgICAgbGV0IG1lbnVQYXI6IE1lbnVQYXJhbXNbXSA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0T2Rlc2xhdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY1BvaHlieSwgZmF2b3JpdGU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51UGFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnl0dm9yZW5pIGdyaWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0bz4oW10sIHtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH1cclxuICAgICAgICAgICAgICAgICwga2V5OiBcIml4c192a3oscG9yX2Npc2xvXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRQcm9maWxlID0gc2xvdXBjZS5jb2x1bW5zOy8vc2xvdXBjZS5jb2x1bW5zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lPy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ2bGFzdG5vc3RcIikgPT09IC0xKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMucGFyZW50Q250LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHNsb3VwY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgbmFtZTogXCJkZWZhdWx0XCIsIGNvbHVtbkxpc3Q6IHNsb3VwY2UuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwidXNlclByb2ZpbGVcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIGNyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVGaWx0ZXJaYWxvemthKCk6IGFueSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRhdE1heCA9IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayArIFwiLTEyLTMxXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0TWluID0gbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItMS0xXCIpO1xyXG4gICAgICAgICAgICBsZXQgY3VyckRhdE1heCA9ICBkYXRNYXg7XHJcbiAgICAgICAgICAgIGlmICh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgPT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKVxyXG4gICAgICAgICAgICAgICAgY3VyckRhdE1heCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyRGF0ID0geyBzdGFydDogZGF0TWluLCBlbmQ6IGN1cnJEYXRNYXggfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMTIsIEwtMTItMTItMCwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pICAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyZW50Q250Lm1hc2thICYmIHR5cGVvZiB0aGF0LnBhcmVudENudC5tYXNrYS5kYXRfc3RhdiAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgY3VyckRhdCA9IHsgc3RhcnQ6IHRoYXQucGFyZW50Q250Lm1hc2thLmRhdF9zdGF2X29kLCBlbmQ6IHRoYXQucGFyZW50Q250Lm1hc2thLmRhdF9zdGF2IH07IFxyXG4gICAgICAgICAgICAgICAgLy8genJ1c2ltIG1lemVcclxuICAgICAgICAgICAgICAgIGRhdE1pbiA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBkYXRNYXggPSB1bmRlZmluZWQgYXMgYW55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1EZWYuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ5N1wiIH0pIC8vUkMgMzAyNTA0OTcgOiBPZCAtIERvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnaW50ZXJ2YWxib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0OiAoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzIGFzIGFueSkuZGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IGRhdE1pbixcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogZGF0TWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBkYXRNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBjdXJyRGF0LC8vIHsgc3RhcnQ6IGRhdE1pbiwgZW5kOiBjdXJyRGF0IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5leHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDpcImpyZXM6MzAyNTA0OTNcIiwgLy9SQyAzMDI1MDQ5MyA6IFBvc3VuZSBjZWzDvSBpbnRlcnZhbCBkbyBidWRvdWNub3N0aSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBvYmouZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUuc3RhcnQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuc3RhcnQgYXMgRGF0ZSkuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZS5lbmQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuZW5kIGFzIERhdGUpLmdldERhdGUoKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFzdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leHBhbmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA0OTVcIiwgLy9SQyAzMDI1MDQ5NSA6IE5hc3RhdsOtIGludGVydmFsIG9kZSBkbmXFoW7DrWhvIGRuZSBuYSBkb3BvcnXEjWVub3UgZMOpbGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB2YWx1ZSA9IG9iai5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodmFsdWUgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHsgc3RhcnQ6IG5vdywgZW5kOiBuZXcgRGF0ZSgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHZhbHVlLnN0YXJ0IGFzIERhdGUpLnNldERhdGUobmV3IERhdGUoKS5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyh2YWx1ZS5lbmQgYXMgRGF0ZSkuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSAtIDMwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmdmaWVsZChcInNldFZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJyb3ctbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6XCJqcmVzOjMwMjUwNDk0XCIsIC8vUkMgMzAyNTA0OTQgOiBQb3N1bmUgY2Vsw70gaW50ZXJ2YWwgZG8gbWludWxvc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBvYmouZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUuc3RhcnQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuc3RhcnQgYXMgRGF0ZSkuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZS5lbmQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuZW5kIGFzIERhdGUpLmdldERhdGUoKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5kYXR1bUs9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YWx1ZVR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA0OTZcIiB9KSAvL1JDIDMwMjUwNDk2IDogVm9sYnlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidm9sYnlcIiwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAsIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC52b2xieT12YWx1ZS5ob2Rub3RhXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3sgdGV4dDogXCJqcmVzOjMwMjUwNDcwXCIsIGhvZG5vdGE6IDEgfSAvL1JDIDMwMjUwNDcwIDogTmVzdGHFvmVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCB7IHRleHQ6IFwianJlczozMDI1MDQ3MVwiLCBob2Rub3RhOiAyIH1dIC8vUkMgMzAyNTA0NzEgOiBOZXNvdWhsYXNuw6kgc3RhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCB7IGtleTogXCJob2Rub3RhXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAvLywgaW5pdGlhbFZhbHVlOiBpbml0aWFsVmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAsIGVtcHR5VmFsdWU6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5sb2FkaW5nIHx8IChvYmouZmxhZ3MgJiYgb2JqLmZsYWdzLmZpbHRlckNsZWFyID09PSB0cnVlKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGF0LmxvYWRpbmcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmogJiYgdHlwZW9mIG9iai52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNldEZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBuYXN0YXZlbmkgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdmlldyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNldEFjdGlvbnModmlldy5nZXREYXRhUm93cygpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ3MFwiIH0pIC8vUkMgMzAyNTA0NzAgOiBOZXN0YcW+ZW7DqVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJuZXN0YXplbmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LiRncmlkID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGN0eC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBuZXN0YXplbmVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Ll9uZXN0YXplbmUgPSBjdHgudmFsdWUgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ3MVwiIH0pIC8vUkMgMzAyNTA0NzEgOiBOZXNvdWhsYXNuw6kgc3RhdnlcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwibmVzb3VobGFzbmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBsYWJlbEZyb21Sb3c6IFwiYWx3YXlzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2xhYmVsRnJvbVJvdzogdHJ1ZSwgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LiRncmlkID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGN0eC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBuZXNvdWhsYXNuZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuX25lc291aGxhc25lID0gY3R4LnZhbHVlIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZvcm1EZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICBcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF9oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlkX2hkcl9yaXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsICBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgIC8vbWF4TGVuZ3RoOiA5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODNcIiwvL1JDIDMxMTAwMDgzIDogxZnDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NlwiLCAvL1JDIDMxMTAwMjU2IDogxZjDoWRlayByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoeyBtb2RlbDogXCJyYWRla19oZHJcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZmltXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTZcIiwgLy9SQyAzMDI1MDM1NiA6IEZJTSAgICAgXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDMwXCIsIC8vUkMgMzAyNTA0MzAgOiBGaW5hbsSNbsOtIG3DrXN0b1xyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfZmltXCIsIGRpc2FibGVkOnRydWUsIGNhcHRpb246IFwianJlczozMDI1MDM1NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcsIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSB9KSwgLy9SQyAzMDI1MDM1NiA6IEZJTVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfemRyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTdcIiwgLy9SQyAzMDI1MDM1NyA6IFpEUlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfemRyXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1N1wiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSB9KSwgLy9SQyAzMDI1MDM1NyA6IFpEUlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNThcIiwgLy9SQyAzMDI1MDM1OCA6IFBBUlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcGFyXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNiB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSB9KSwgLy9SQyAzMDI1MDM1OCA6IFBBUlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTlcIiwgLy9SQyAzMDI1MDM1OSA6IFBPTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcG9sXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OVwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNCB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDQgfSB9KSwgLy9SQyAzMDI1MDM1OSA6IFBPTFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZWRzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjBcIiwgLy9SQyAzMDI1MDM2MCA6IEVEUy9TTVZTXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfZWRzXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMTMgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiAxMyB9IH0pLCAvL1JDIDMwMjUwMzYwIDogRURTL1NNVlNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3B2c1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYxXCIsIC8vUkMgMzAyNTAzNjEgOiBQVlNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3B2c1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjFcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDEwIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMTAgfSB9KSwgLy9SQyAzMDI1MDM2MSA6IFBWU1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdWNsXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjJcIiwgLy9SQyAzMDI1MDM2MiA6IFVDTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfdWNsXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSwgLy9SQyAzMDI1MDM2MiA6IFVDTFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3pqXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzRcIiwgLy9SQyAzMDI1MDQ3NCA6IFpKXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF96alwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzRcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDMgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiAzIH0gfSksIC8vUkMgMzAyNTA0NzQgOiBaSlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdWpcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3NVwiLCAvL1JDIDMwMjUwNDc1IDogVUpcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3VqXCIsIGNhcHRpb246IFwianJlczozMDI1MDQ3NVwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNiB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSB9KSwgLy9SQyAzMDI1MDQ3NSA6IFVKXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF91elwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc2XCIsIC8vUkMgMzAyNTA0NzYgOiBVWlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfdXpcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc2XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA1IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogNSB9IH0pLCAvL1JDIDMwMjUwNDc2IDogVVpcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrYzAxXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzdcIiwgLy9SQyAzMDI1MDQ3NyA6IEdJTklTIFBSU0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcHNrX3N1bWEyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0OThcIiwgLy9SQyAzMDI1MDQ5OCA6IEdJTklTIElJU1NQIFBSU0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzOSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSxtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGE/Ll9pc1ZpcnR1YWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBza19zdW1hID0gcGFyc2VEZWNpbWFsKGRhdGEuY19wc2tfc3VtYSA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrYzAxID0gcGFyc2VEZWNpbWFsKGRhdGEua2MwMSA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBza19zdW1hLmVxdWFscyhrYzAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMDI1MDQ4MlwiLCAvL1JDIDMwMjUwNDgyIDogTmVuw60gcHJvdmVkZW5vIHDFmWXDusSNdG92w6Fuw60gc2t1dGXEjW5vc3RpIHYgSUlTU1AgbmVibyBuZXNvdWhsYXPDrSBzdGF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcHNrX3N1bWFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3OFwiLCAvL1JDIDMwMjUwNDc4IDogSUlTU1AgUFJTS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wbGF0YmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3OVwiLCAvL1JDIDMwMjUwNDc5IDogSUlTU1AgUMWZw61rYXogayBwbGF0YsSbXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2J2eXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg4XCIsIC8vUkMgMzAyNTA0ODggOiBJSVNTUCBCYW5rLnbDvXBpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wc2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ4OVwiLCAvL1JDIDMwMjUwNDg5IDogSUlTU1AgUFNLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICAsIHZpc2libGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfYWt0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0OTBcIiwgLy9SQyAzMDI1MDQ5MCA6IERhdHVtIHNlc3RhdmVuw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDkxXCIsIC8vUkMgMzAyNTA0OTEgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcImpyZXM6MzAyNTA0OTFcIiwgLy9SQyAzMDI1MDQ5MSA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSxtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGE/Ll9pc1ZpcnR1YWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnByaXpfZGV0YWlsIT4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLCB0ZXh0OiBcImpyZXM6MzAyNTA0OTJcIiwgLy9SQyAzMDI1MDQ5MiA6IEV4aXN0dWplIGRldGFpbG7DrSByb3pwYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIHZvbGViIG5hIGZpbHRycGFuZWx1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RpVm9sYnkodm9sYnk6IFtOdW1iZXJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25lc3RhemVuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXNvdWhsYXNuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZvbGJ5IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZvbGJ5W2ldID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVzdGF6ZW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodm9sYnlbaV0gPT0gMilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXNvdWhsYXNuZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBJc2wgc2x1emJ5IHBybyBsaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBsb2FkSVNMTGlzdChycTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiBhbnkgfSB9KTogSXNsLl9UYXNrPGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVTdGF2eS5zdGF2eVNrdXRlY25vc3RpKHJxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhdCBtdWogc2VzdGF2ZW55IGZpbHRyXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0TXlGaWx0ZXIoZmlsdGVyU2VydmVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0bywgZmlsdGVyOiBhbnkpOiB7IG1hc2thOiB7fSwgZmlsdGVyOiB7IGZpbHRlcnM6IHt9IH0gfSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5hY3RpVm9sYnkoZmlsdGVyLnZvbGJ5KTtcclxuICAgICAgICAgICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGZpbHRlci5NZXNpYyA9IC0xO1xyXG5cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCBkZW5tZXNTdGFydDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyLmRhdHVtSyAhPT0gdW5kZWZpbmVkICYmIGZpbHRlci5kYXR1bUsuc3RhcnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRlbm1lc1N0YXJ0ID0gMSAqIGZpbHRlci5kYXR1bUsuc3RhcnQuZ2V0RGF0ZSgpICsgKGZpbHRlci5kYXR1bUsuc3RhcnQuZ2V0TW9udGgoKSArIDEpICogMzJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGVubWVzRW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIuZGF0dW1LICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLmRhdHVtSy5lbmQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRlbm1lc0VuZCA9IDEgKiBmaWx0ZXIuZGF0dW1LLmVuZC5nZXREYXRlKCkgKyAoZmlsdGVyLmRhdHVtSy5lbmQuZ2V0TW9udGgoKSArIDEpICogMzJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmVzb3VobGFzbmU6IGFueTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25lc291aGxhc25lKVxyXG4gICAgICAgICAgICAgICAgbmVzb3VobGFzbmUgPSB7IG86IFwiPVwiLCB2OiB0cnVlIH07XHJcbiAgICAgICAgICAgIGxldCBuZXN0YXplbmU6IGFueTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25lc3RhemVuZSlcclxuICAgICAgICAgICAgICAgIG5lc3RhemVuZSA9IHsgbzogXCI9XCIsIHY6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZW5tZXNFbmQgPT09IG51bGwgfHwgZGVubWVzU3RhcnQgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBteWZpbHRyID0ge1xyXG4gICAgICAgICAgICAgICAgcm9rOiB7IG86IFwiPVwiLCB2OiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgfSwgaWNvOiB7IG86IFwiPVwiLCB2OiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gfSxcclxuICAgICAgICAgICAgICAgIGRlbm1lczogeyBvOiBbXCI+PVwiLCBcIjw9XCJdLCB2OiBbZGVubWVzU3RhcnQsIGRlbm1lc0VuZF0gfSxcclxuICAgICAgICAgICAgICAgIC8vZGVubWVzOiB7IG86IFtcIj49XCIsIFwiPD1cIl0sIHY6IFtkZW5tZXNTdGFydCwgZGVubWVzRW5kXSB9LFxyXG4gICAgICAgICAgICAgICAgLy9kZW5tZXM6IHsgbzogXCI+PVwiLCB2OiBkZW5tZXNTdGFydCB9XHJcbiAgICAgICAgICAgICAgICAvLyxkZW5tZXM6IHsgbzogXCI8PVwiLCB2OiBkZW5tZXNFbmQgfSxcclxuICAgICAgICAgICAgICAgIG5lc291aGxhc25lLCBuZXN0YXplbmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiBmaWx0ZXJTZXJ2ZXIsIGZpbHRlcjogeyBmaWx0ZXJzOiBteWZpbHRyIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufSJdfQ==
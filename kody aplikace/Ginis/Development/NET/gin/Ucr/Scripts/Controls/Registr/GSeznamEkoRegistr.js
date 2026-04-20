"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoRegistr extends WebClient.GSeznamEkoZaznamuBase {
                /**
                 * Konstruktor
                 *
                 * @param content - parent content
                 */
                constructor(content) {
                    super(content);
                    /** Globalni modulove parametry v JS */
                    this.definovaneSloupce = [];
                    this.logOptions = { name: "GSeznamEkoRegistr", authorCode: 492, file: "GSeznamEkoRegistr.ts" };
                    this.soucetVeStatusBaru = true;
                    this.povolenNahled = false;
                    this.rememberHistory = true;
                    this.Zapisova = true;
                    this.selectedMonth = this.parentCnt["selectedMonth"];
                    this.typReg = this.parentCnt["typReg"];
                    this.AutoLoadData = false;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrRegistrZP.list();
                    this.taskCount = this.parentCnt.isl.UcrRegistrZP.count();
                    this.myKeys = "ico,ucs,uea_reg,ueb_reg,uex_reg";
                }
                onContentReady() {
                    super.onContentReady();
                    if (this.selectedMonth > 0) 
                    //this.parentCnt.findFields("Mesic").gfield("model", "apply", { mesic: this.selectedMonth });
                    {
                        this.loadingData = true;
                        this.parentCnt.findFields("Mesic").gfield("setValue", { mesic: this.selectedMonth }, false);
                        this.loadingData = false;
                    }
                }
                /**
                  * Nacti filtry
                  * @param that
                  * @param req
                  * @param next
                  */
                getFilterData(that, req, next) {
                    var maska = {};
                    //let filter = that.GetFilter().gfilterpanel('getCurrentData');
                    let filter = that.GetFilter().gfilterpanel('getConfirmedData');
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", maska)
                        .then((newFilter) => {
                        let saveFilter = $.extend(true, {}, newFilter);
                        saveFilter["filter"] = newFilter;
                        saveFilter["filter"]["Mesic"] = filter["Mesic"];
                        that.addFilterIntoHistory($.extend(true, {}, saveFilter));
                        //if (that.addFilterToHistory) {
                        //    if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                        //        that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                        //    that.filterHistory.push(newFilter);
                        //    that.currFilterHistoryIndex++;
                        //}
                        //that.addFilterToHistory = true;
                        //that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        //that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                        maska = newFilter;
                        maska["uea_reg"] = newFilter["cfu"]["uea"];
                        maska["ueb_reg"] = newFilter["cfu"]["ueb"];
                        let mesic = filter["Mesic"];
                        if (mesic === null) {
                            mesic = -1;
                            return $.Deferred().reject().promise();
                        }
                        //let myfilter = $.extend(true, {}, newFilter);
                        //myfilter.filter!["Mesic"] = undefined;
                        let rq = { ktg_ueab: that.typReg, mesic: filter.Mesic, Maska: maska };
                        rq["filter"] = { ktg_ueab: that.typReg, mesic: filter.Mesic, };
                        var newRequest = $.extend(true, {}, req);
                        newRequest["filters"] = rq;
                        newRequest["maska"] = maska;
                        return next(newRequest);
                    });
                    //var newRequest = $.extend(true, {}, req);
                    //var maska: Gordic.Uct.Interface.GUcrKonsolidaceStavyListFilterDto = {};
                    //var filter = that.GetFilter().gfilterpanel('getCurrentData') || {};
                    //return this.$grid.ggridserverfilter<Gordic.Uct.Interface.GUcrKonsolidaceStavyListFilterDto>("collect", maska)
                    //    .then((newFilter) => {
                    //        if (that.addFilterToHistory) {
                    //            if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                    //                that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                    //            that.filterHistory.push(maska as any);
                    //            that.currFilterHistoryIndex++;
                    //        }
                    //        that.addFilterToHistory = true;
                    //        that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                    //        that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                    //        let maska = newFilter;
                    //        if (filter.Mesic === null)
                    //            filter.Mesic = -1;
                    //        let myfiltr = { rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO }, mesic: { o: "<=", v: filter.Mesic }, Maska: newFilter } as any;
                    //        newRequest.filters = myfiltr;
                    //        return next(newRequest);
                    //    }
                    //    );
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    super.createShortCut();
                }
                /**
                 * Vytvoreni formatovacich podminek
                 *
                 * */
                createFormatCond() {
                    let that = this;
                    let condFormats = undefined;
                    if (that.definovaneSloupce.length > 0) {
                        condFormats = [];
                        that.definovaneSloupce.forEach(item => {
                            if (item.Typ != -1 && item.Name?.substring(item.Name.length - 2) !== "_h")
                                condFormats?.push({ description: item.Caption, applyTo: item.Name, formula: "NOT(ISBLANK(@" + item.Name + "_h))", bg: Gordic.Components.Grid.CondFormats.CondFormatBg.darkyellow });
                        });
                    }
                    return condFormats;
                }
                /**
                 *  Hodnoty
                 *
                 * */
                Hodnoty() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    var view = grid.ggrid("getView");
                    let data = view.getDataRows();
                    //let filter = that.GetFilter().gfilterpanel('getCurrentData');            
                    let filter = that.GetFilter().gfilterpanel('getConfirmedData');
                    if (filter.Mesic === null)
                        return;
                    that.parentCnt.beginOperation("Načítám...");
                    that.parentCnt.isl.UcrRegistrZP.listWithValues({ mesic: filter.Mesic, rq: data })
                        .get()
                        .then(result => {
                        // predani definice sloupcu
                        that.definovaneSloupce = result.Columns;
                        for (var i = 0; i < result.Seznam.length; i++) {
                            var item = result.Seznam[i];
                            that.upravHodnoty(item);
                            //for (const property in item.Sloupce) {
                            //    let Typ = item.Sloupce[property].Typ;
                            //    switch (Typ) {
                            //        case 10:// number
                            //            item[item.Sloupce[property].Name] = item.Sloupce[property].ValueN
                            //            break;
                            //        case 40: // decimal
                            //            item[item.Sloupce[property].Name] = item.Sloupce[property].ValueC
                            //            break;
                            //        case 30: // datetime
                            //            item[item.Sloupce[property].Name] = item.Sloupce[property].ValueD;
                            //            break;
                            //        case -1:
                            //            item[item.Sloupce[property].Name] = item.Sloupce[property].ValueS
                            //            item["h"] = item.Sloupce[property].ValueS
                            //        default:
                            //            item[item.Sloupce[property].Name] = item.Sloupce[property].ValueS
                            //            break;
                            //    }
                            //}
                        }
                        //result.forEach(
                        //    item => {
                        //        that.definovaneSloupce = [];
                        //        for (const property in item.Sloupce) {
                        //            item[item.Sloupce[property].Name] = item.Sloupce[property].Value;
                        //            that.definovaneSloupce.push(item.Sloupce[property]);
                        //        }
                        //    }
                        //);
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("option", "columns", that.createGridFormat());
                        var view = grid.ggrid("getView");
                        view.updateData(result.Seznam);
                        grid.ggrid("useProfile", { condFormats: that.createFormatCond() });
                        return;
                    })
                        .always(() => that.parentCnt.endOperation());
                }
                /**
                 * Upraveni radku hodnot predni Pole hodno preneseno do sloupcu
                 *
                 * @param radek
                 */
                upravHodnoty(radek) {
                    for (const property in radek.Sloupce) {
                        let Typ = radek.Sloupce[property].Typ;
                        switch (Typ) {
                            case 10: // number
                                radek[radek.Sloupce[property].Name] = radek.Sloupce[property].ValueN;
                                break;
                            case 40: // decimal
                                radek[radek.Sloupce[property].Name] = radek.Sloupce[property].ValueC;
                                break;
                            case 30: // datetime
                                radek[radek.Sloupce[property].Name] = radek.Sloupce[property].ValueD;
                                break;
                            case -1:
                                radek[radek.Sloupce[property].Name] = radek.Sloupce[property].ValueS;
                                radek["h"] = radek.Sloupce[property].ValueS;
                            default:
                                radek[radek.Sloupce[property].Name] = radek.Sloupce[property].ValueS;
                                break;
                        }
                    }
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    //let grid = this.getGrid();
                    //if (grid == null) return;    
                    var enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    // pristupnost akci dle nactenych dat
                    // pokud neni grid, nic nedelej
                    if (this.parentCnt.closed)
                        return;
                    this.parentCnt.actions.printAct.update({ enabled: enable });
                    this.parentCnt.actions.actHodnoty.update({ enabled: enable });
                    this.parentCnt.actions.actDetailDokladu.update({ enabled: enable });
                }
                /**
                 * Vytovreni gridformatu
                 *
                 * @returns
                 */
                createGridFormat() {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    switch (this.Globals.Params.RezimProvozu) {
                        case 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */: break;
                        case 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */:
                            myGridFormat.addTextColumn({
                                name: "nks",
                                caption: this.Globals.Zkratky?.Nks,
                                description: this.Globals.Texty?.Nks,
                                width: 60,
                                //group: topoGroup,
                                serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                            });
                            break;
                        case 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */:
                            myGridFormat.addTextColumn({
                                name: "ucs",
                                caption: this.Globals.Zkratky?.Ucs,
                                description: this.Globals.Texty?.Ucs,
                                width: 60,
                                //group: topoGroup,
                                aggregate: Gordic.Data.Aggregates.first("ucs"),
                                //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                                serverFilter: Gordic.Eko.Filters.ucsInterval({
                                    ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                    onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                    model: "ucs",
                                    disabled: false
                                })
                            });
                            if (!this.AvoidUus)
                                myGridFormat.addTextColumn({
                                    name: "uus",
                                    caption: this.Globals.Zkratky?.Uus,
                                    description: this.Globals.Texty?.Uus,
                                    width: 60,
                                    //group: topoGroup,
                                    //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                                    serverFilter: Gordic.Eko.Filters.uusInterval({
                                        ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                        onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                        model: "uus",
                                        disabled: false
                                    })
                                });
                            if (!this.AvoidNks)
                                myGridFormat.addTextColumn({
                                    name: "nks",
                                    caption: this.Globals.Zkratky?.Nks,
                                    description: this.Globals.Texty?.Nks,
                                    width: 60,
                                    //group: topoGroup,
                                    serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                                });
                            break;
                        case 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */:
                            myGridFormat.addTextColumn({
                                name: "ico",
                                caption: this.Globals.Zkratky?.Ico,
                                description: this.Globals.Texty?.Ico,
                                width: 60,
                                //group: topoGroup
                                aggregate: Gordic.Data.Aggregates.first("ico"),
                                serverFilter: this.ExterniSumarizace
                                    ? Gordic.Eko.Filters.rarInterval({ model: "ico", onlyActive: false, caption: this.Globals.Zkratky?.Ico, disabled: false })
                                    : Gordic.Eko.Filters.icoInterval({ model: "ico", onlyActive: false, caption: this.Globals.Zkratky?.Ico, disabled: false })
                            });
                            if (this.AvoidExt || this.globalParams.TypSumarizace !== 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) {
                                myGridFormat.addTextColumn({
                                    name: "ucs",
                                    caption: this.Globals.Zkratky?.Ucs,
                                    description: this.Globals.Texty?.Ucs,
                                    width: 60,
                                    //group: topoGroup,
                                    aggregate: Gordic.Data.Aggregates.first("ucs"),
                                    //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                                    serverFilter: Gordic.Eko.Filters.ucsInterval({
                                        ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                        onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                        model: "ucs",
                                        disabled: false
                                    })
                                });
                                if (!this.AvoidUus)
                                    myGridFormat.addTextColumn({
                                        name: "uus",
                                        caption: this.Globals.Zkratky?.Uus,
                                        description: this.Globals.Texty?.Uus,
                                        width: 60,
                                        //group: topoGroup,
                                        //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                                        serverFilter: Gordic.Eko.Filters.uusInterval({
                                            ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                            onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                            model: "uus",
                                            disabled: false
                                        })
                                    });
                                if (!this.AvoidNks)
                                    myGridFormat.addTextColumn({
                                        name: "nks",
                                        caption: this.Globals.Zkratky?.Nks,
                                        description: this.Globals.Texty?.Nks,
                                        width: 60,
                                        //group: topoGroup,
                                        serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                                    });
                            }
                            break;
                    }
                    // Modifikovane Su a Au
                    for (let i = 0; i < this.parentCnt.modifyCfu.columns.length; i++) {
                        const c = this.parentCnt.modifyCfu.columns[i];
                        myGridFormat.addTextColumn({
                            name: `${c.name}_reg`,
                            caption: c.caption,
                            description: c.description,
                            width: c.width,
                            serverFilter: Gordic.Eko.Filters.cfuInterval({
                                cfu: c,
                                isRoz: false,
                                isUct: true,
                                model: `${c.name}`
                                //model: `${c.name}_reg`
                            })
                        });
                    }
                    myGridFormat.addTextColumn({
                        name: "uex_reg",
                        caption: "jres:30250208", //RC 30250208 : Účetní identifikátor
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "uex_reg", caption: "jres:30250208" }), //RC 30250208 : Účetní identifikátor
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "zkr_ag",
                        caption: "jres:30250209", //RC 30250209 : Agenda
                        width: 50,
                    });
                    myGridFormat.addTextColumn({
                        name: "ixp",
                        caption: "jres:30250210", //RC 30250210 : Identifikátor
                        width: 100,
                    });
                    myGridFormat.addIconColumn({
                        name: "PS",
                        caption: "S",
                        description: "jres:30250230", //RC 30250230 : Z počátečního stavu
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: (row, meta) => (meta?._isVirtual) ? null : (row.aktivita === 300) ? { icon: "fa-check-circle", text: "jres:30250232" } : null,
                        //if (data.s_prep_aisp != null && data.s_prep_aisp > 0) {
                        //    return {
                        //        icon: "fa-check-circle g-state-text g-state-success", text: "jres:30250344", //RC 30250344 : IISSP Přepočteno
                        //        //tooltip: "jres:30250288"
                        //    };
                        //}
                        //if (data.id_hdr_ris != null && data.id_hdr_ris !== undefined) {
                        //    return {
                        //        icon: "gi-exclam g-state-error", text: "jres:30250345", //RC 30250345 : Nezpracováno
                        //        //tooltip: "jres:30250289"
                        //    };
                        //}
                    });
                    myGridFormat.addIconColumn({
                        name: "pripraveno",
                        caption: "P",
                        description: "jres:30250231", //RC 30250231 : Připraveno
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: (row, meta) => (meta?._isVirtual) ? null : ((row.s_prep > 0)) ? null : { icon: "fa-check-circle", text: "jres:30250235" }, //RC 30250235 : Připraveno
                    });
                    //myGridFormat.addTextColumn({
                    //    name: "PS",
                    //    caption: "S",
                    //    description: "jres:30250230", //RC 30250230 : Z počátečního stavu
                    //    cellTemplate: row => (row.aktivita === 300) ? new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-check-circle" }) : null as any,
                    //    tooltipTemplate: row => (row.aktivita === 300) ? "jres:30250232" //RC 30250232 : ANO
                    //        : "jres:30250233", //RC 30250233 : NE
                    //    width: 25,
                    //});
                    //myGridFormat.addTextColumn({
                    //    name: "pripraveno",
                    //    caption: "P",
                    //    cellTemplate: row => (row.s_prep! > 0) ? null as any: new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-check-circle" }),
                    //    tooltipTemplate: row => (row.s_prep! > 0) ? "jres:30250234" : //RC 30250234 : Nepřipraveno
                    //        "jres:30250235" //RC 30250235 : Připraveno
                    //    ,
                    //    description: "jres:30250231", //RC 30250231 : Připraveno
                    //    width: 25,
                    //});
                    this.definovaneSloupce.forEach(sloupec => {
                        let width = 90;
                        myGridFormat.addTextColumn({
                            name: sloupec.Name + "_h",
                            width: 1,
                            caption: sloupec.Caption + " - " + "jres:30250264", //RC 30250264 : Uživatelská hodnota
                            visible: false,
                            hidden: true
                        });
                        switch (sloupec.Typ) {
                            case 10:
                                width = 50; // cislo
                                myGridFormat.addNumberColumn({
                                    name: sloupec.Name,
                                    width: width,
                                    caption: sloupec.Caption,
                                    tooltipTemplate: (row, b, c) => {
                                        let value = row[c?.column.field + "_h"];
                                        if (typeof value !== "undefined" && value !== null && value !== "") {
                                            return "jres:30250265"; //RC 30250265 : Uživatelská hodnota
                                        }
                                        return "";
                                    }
                                });
                                break;
                            case 40:
                                width = 120; // mena
                                myGridFormat.addCurrencyColumn({
                                    name: sloupec.Name,
                                    width: width,
                                    caption: sloupec.Caption,
                                    tooltipTemplate: (row, b, c) => {
                                        let value = row[c?.column.field + "_h"];
                                        if (typeof value !== "undefined" && value !== null && value !== "") {
                                            return "jres:30250265"; //RC 30250265 : Uživatelská hodnota
                                        }
                                        return "";
                                    }
                                });
                                break;
                            case 30:
                                width = 80; // date
                                myGridFormat.addDateColumn({
                                    name: sloupec.Name,
                                    width: width,
                                    //cellTemplate: (row) => {
                                    //    const value = row[sloupec.Name!];
                                    //    if (!value) return "";
                                    //    if ((value as any) instanceof Date)
                                    //        return Gordic.Templates.Formatters.date(value, "dd.MM.yyyy");
                                    //     else
                                    //        return value;                                
                                    //},
                                    caption: sloupec.Caption,
                                    tooltipTemplate: (row, b, c) => {
                                        let value = row[c?.column.field + "_h"];
                                        if (typeof value !== "undefined" && value !== null && value !== "") {
                                            return "jres:30250265"; //RC 30250265 : Uživatelská hodnota
                                        }
                                        return "";
                                    }
                                });
                                break;
                            default: // string
                                myGridFormat.addTextColumn({
                                    name: sloupec.Name,
                                    width: width,
                                    caption: sloupec.Caption,
                                    tooltipTemplate: (row, b, c) => {
                                        let value = row[c?.column.field + "_h"];
                                        if (typeof value !== "undefined" && value !== null && value !== "") {
                                            return "jres:30250265"; //RC 30250265 : Uživatelská hodnota
                                        }
                                        return "";
                                    }
                                });
                        }
                    });
                    //foreach(KeyValuePair < string, string > kv in m_Hodnoty)
                    //{
                    //    var c = CreateHodColumn(gf, kv.Key, kv.Value);
                    //    c.Group = "h";
                    //}
                    //foreach(KeyValuePair < string, string > kv in m_Hodnoty)
                    //{
                    //    var c = CreateHodColumn(gf, kv.Key + "_h", kv.Value + " - " + GResources.GetResourceText(21050035)); //RC 21050035 : Uživatelská hodnota
                    //    c.Group = "uh";
                    //    c.Visible = false;
                    //}
                    myGridFormat.addCurrencyColumn({
                        name: "c0",
                        caption: "jres:30250211", //RC 30250211 : MD                
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250212", //RC 30250212 : Dal                
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0c1",
                        caption: "jres:30250213", //RC 30250213 : MD - Dal
                        width: 120,
                    });
                    if (this.typReg === 20 /* Uct.Interface.GETypRegistru.Pohledavky */) {
                        //gf.AddStringColumn("uea_vaz", UserProcess.EkoParams.EkoCfuSet["uea"].Zkratka + " " + GResources.GetResourceText(21050044), (ushort)UserProcess.EkoParams.EkoCfuSet["uea"].Delka, 4, gvZapisy.DefaultCellStyle.Font); //RC 21050044 : OPP
                        //gf.AddStringColumn("ueb_vaz", UserProcess.EkoParams.EkoCfuSet["ueb"].Zkratka + " " + GResources.GetResourceText(21050044), (ushort)UserProcess.EkoParams.EkoCfuSet["ueb"].Delka, 4, gvZapisy.DefaultCellStyle.Font);
                        myGridFormat.addTextColumn({
                            name: "uea_vaz",
                            caption: "jres:30250294".format(this.parentCnt.modifyCfu.columns[0].caption), //RC 30250294 : {0} OPP
                            width: 70,
                        });
                        myGridFormat.addTextColumn({
                            name: "ueb_vaz",
                            caption: "jres:30250294".format(this.parentCnt.modifyCfu.columns[1].caption), //RC 30250294 : {0} OPP
                            width: 70,
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "vc0",
                            caption: "jres:30250211" //RC 30250211 : MD
                                + " " + "jres:30250214", //RC 30250214 : OPP
                            width: 120,
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "vc1",
                            caption: "jres:30250212" //RC 30250212 : Dal
                                + " " + "jres:30250214", //RC 30250214 : OPP
                            width: 120,
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "vc0c1",
                            caption: "jres:30250213" //RC 30250213 : MD - Dal
                                + " " + "jres:30250214", //RC 30250214 : OPP
                            width: 120,
                        });
                    }
                    return myGridFormat;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    var oldTema = this.tema;
                    this.tema = "";
                    super.createActions();
                    this.tema = oldTema;
                    let that = this;
                    this.parentCnt.actions.addRange({
                        actHodnoty: {
                            name: "actHodnoty",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250236", //RC 30250236 : Hodnoty
                            run: function (ev, ctx) {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var row = grid.ggrid("activeRow");
                                if (row === null)
                                    return;
                                //that.$grid.ggrid("activeCellAddress");
                                //var column = that.$grid.ggrid("activeCellAddress").col;
                                //that.showZapisy(row, "");
                                that.Hodnoty();
                            }
                        },
                        actDetailDokladu: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: () => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var radek = Gordic.Eko.Grid.currentRow(grid);
                                if (radek != null) {
                                    //ZobrazDetail(that, radek)
                                    //that.$grid.ggrid("activeCellAddress");
                                    that.showDetail(radek);
                                }
                                else {
                                    that.parentCnt.dialogs.messageBox("jres:30250237", //RC 30250237 : Upozornění
                                    "jres:30250238"); //RC 30250238 : Není vybrán žádný řádek!
                                }
                            }
                        }),
                    });
                    this.printAct = this.parentCnt.actions.add(GAction.createPrintAction({
                        name: "printAct",
                        tema: that.tema,
                        enabled: true,
                        parentContent: that.parentCnt,
                        serverParameterMethod: "Gordic.Ucr.WebClient.GUcrPrintParameters:ServerParameterMethodTiskRegistrPZ",
                        reportStarting: function (rep) {
                            // zjisteni filtru
                            //let filter = that.GetFilter().gfilterpanel('getCurrentData');
                            let filter = that.GetFilter().gfilterpanel('getConfirmedData');
                            if (filter.Mesic === null)
                                filter.Mesic = -1;
                            // zjisteni nastaveni zatrzitek
                            let nepripraveno = false;
                            let nezatridene = false;
                            let uzivatelske = false;
                            if (filter.volby.length > 0) {
                                filter.volby.forEach((item) => {
                                    if (!item)
                                        return;
                                    if (item == 1)
                                        nepripraveno = true;
                                    else if (item == 2)
                                        nezatridene = true;
                                    else if (item == 3)
                                        uzivatelske = true;
                                });
                            }
                            let maska = {};
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            return grid.ggridserverfilter("collect", maska)
                                .then((filterServer) => {
                                filterServer["uea_reg"] = filterServer["cfu"]["uea"];
                                filterServer["ueb_reg"] = filterServer["cfu"]["ueb"];
                                maska = filterServer;
                                let tiskData = {
                                    Maska: filterServer, Mesic: filter.Mesic,
                                    Nepripravane: nepripraveno, Nezatridene: nezatridene, UzivHodnota: uzivatelske
                                };
                                rep.customDto = tiskData;
                                return rep;
                            });
                            // naplneni filtru
                        }
                    }));
                }
                /**
                 * Metoda povoleni nastani seznamu
                 * @param rq
                 */
                allowedList(rq) {
                    return true;
                }
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                GetFilter() {
                    //debugger;
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                        return this.$filterPanel;
                    else
                        throw "Filtr nenalezen";
                }
                /**
                  * Zobrazeni detailu
                  * @param row - aktualni radek
                  */
                showDetail(row) {
                    if (typeof row === "undefined" || row === null)
                        return;
                    let that = this;
                    let parm = {
                        ixp: row.ixp, kat: that.typReg, uea: row.uea_reg, ueb: row.ueb_reg, zkr_ag: row.zkr_ag, uex_reg: row.uex_reg, row: row, mesic: that.getMesic(),
                        Columns: that.definovaneSloupce
                    };
                    that.parentCnt.navigate("Gordic.Ucr.WebClient.GDetailRegistr", {
                        inputParams: parm
                    })
                        .on("close", function (res) {
                        //debugger;
                        if (res.returnValue && res.returnValue.row) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            // aktualizace zapisu na seznamu
                            var view = grid.ggrid("getView");
                            // TODO: Nefunguje podminene formatovani v pripade update!!
                            view.updateData(res.returnValue.row, "update");
                            //grid.ggrid<Gordic.Uct.Interface.GEkoSeznamDphFilterDto>("useProfile", { condFormats: that.createFormatCond() });
                        }
                    })
                        .on('contentclosed', (ev, ctx) => {
                    }); // při zavření detailu se nastaví focus na grid
                    ;
                }
                /**
                 * Zjisteni mesice
                 * */
                getMesic() {
                    //let filter = this.GetFilter().gfilterpanel('getCurrentData');
                    let filter = this.GetFilter().gfilterpanel('getConfirmedData');
                    if (filter.Mesic === null)
                        return -1;
                    return filter.Mesic;
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = new Array();
                    menu.push({ action: this.parentCnt.actions.actHodnoty, favorite: true });
                    menu.push({ action: this.parentCnt.actions.prevFilterAct, favorite: true, align: "opposite" });
                    menu.push({ action: this.parentCnt.actions.nextFilterAct, favorite: true, align: "opposite" });
                    menu.push({ action: this.parentCnt.actions.actDetailDokladu, favorite: true });
                    if (this.printAct)
                        menu.push({ action: this.printAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.clearFilterRowAct });
                    return menu;
                }
                createFilterPanel() {
                    var that = this;
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.parentCnt.element)
                        .gfilterpanel({
                        //helperCustomizer: function (data) {
                        //    var polSort = data.sort(function (a, b) { return a.name >= b.name; });
                        //    return polSort;
                        //}
                        forms: [that.CreateFilterZalozka()],
                        favoriteLayoutDescriptor: "L4M3S1 L12-12-0 M-12-12-0 S-12-12-0",
                        //favoriteLayoutDescriptor:"L1M1S1 L12-12-0 M-12-12-0 S-12-12-0",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: [FilterViewMode.Detail /*, FilterViewMode.Normal*/],
                        //simpleModeAutoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        primaryButtonBehaviour: "AlwaysPrimary",
                        //favoriteLayoutDescriptor: "L4M3S1",
                        clearFilterButtonVisible: "AlwaysVisible",
                        //autoLoadAfterChoseFilter: true,
                        autoLoadAfterCreatePanel: false,
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        //apply: function (event, obj) {
                        //    console.log("filterForm.apply", obj);
                        //    that.parentCnt.log.trace("filterForm.apply", obj);
                        //    //if (that.loadingData) return;
                        //    //var view = that.$grid.ggrid("getView");
                        //    //view.requestData(obj.filter);
                        //    //view.getLoadingPromise().always(() => {
                        //    //    that.loadingData = false
                        //    //});
                        //},
                        reset: (ev, data) => {
                            that.loadingData = true;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                            that.loadingData = false;
                        }
                    });
                    //this.$filterPanel = $("<div>")
                    //    .appendTo(this.parentCnt.element)
                    //    .gfilterpanel({
                    //        forms: [fpForm],
                    //        favorites: ["md"],
                    //        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                    //        searchButtonOnMainRow: true,
                    //        saveOptionsForm: GUcrMaskaDetail.getForm(gf as any), //TODO: Dat spravny typ gridformatu!
                    //        filterViewMode: FilterViewMode.Simple,
                    //        filterViewModeUserSettings: [FilterViewMode.Detail],
                    //        filterStorageService: new GUcrMaskaService({ typSestavy: this.parentCnt.typSestavy, parentContent: that.parentCnt }),
                    //        autoLoadAfterChoseFilter: false,
                    //        //apply: (ev, data) => { this.loadData2(data.filter); },
                    //        reset: (ev, data) => { this.$grid.ggridserverfilter("clear"); },
                    //        primaryButtonBehaviour: "AlwaysPrimary",
                    //        clearFilterButtonVisible: "AlwaysVisible",
                    //        poVyhledaniZobrazit: "OblibenePodminky",
                    //        poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                    //    });
                }
                /**
                * function CreateFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                CreateFilterZalozka() {
                    var that = this;
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow({ label: "jres:30250124" }) //RC 30250124 : Měsíc
                        .addField("gselectbox", Gordic.Prefabs.Select.ucrMesic(), {
                        name: "Mesic",
                        //customClass: "w-4",
                        model: "model.Mesic=value.mesic",
                        emptyValue: { mesic: null, mesic_txt: " " },
                        serverFilters: { rok: that.Globals.EkoParams?.Rok, mesic: "< 13", pseudo: false /*new Gordic.Forms.Dependency("Rok", "rok", true) */ },
                        dropdown: true,
                        //change: (ev, ctx) => {
                        //    //    this.onObdobiChanged();
                        //    if (ctx.value == null) return;
                        //    if (that.loadingData) return;
                        //    if (ctx.flags.valid) {
                        //        //that.reload();
                        //        //let view = that.$grid.ggrid("getView");
                        //        //view.requestData();
                        //        //view.getLoadingPromise().always(() => {
                        //        //    that.loadingData = false
                        //        //});
                        //    }
                        //},
                        flag: Gordic.Prefabs.Field.Flags.required
                    })
                        .addRow({ label: "jres:30250228", favoriteRowLayoutDescriptor: "w-L-6 w-M-8 w-S-12" /*layoutDescriptor: "L1M2S1, L-12-12-12, M-12-11-1, S-12-11-1"*/ }) //RC 30250228 : Pouze
                    ;
                    let volby = new Gordic.Data.View([
                        { text: "jres:30250216", hodnota: 1 } //RC 30250229 : nepřipravené
                        ,
                        { text: "jres:30250215", hodnota: 2 } //RC 30250215 : nezatříděné PS
                        ,
                        { text: "jres:30250218", hodnota: 3 } //RC 30250218 : s uživatelskou hodnotou
                    ], { key: "hodnota" });
                    filterFormDef.addField("gselectbox", {
                        name: "volby", list: true, itemWidth: "",
                        dropdown: false,
                        multi: true,
                        model: "model.volby=value.hodnota",
                        itemTemplate: "{text}",
                        data: volby,
                        emptyValue: null,
                        change: function (ev, obj) {
                            //                    if (that.loading || (obj.flags && obj.flags.filterClear === true)) return;
                            //if (that.loading) return;
                            if (obj && typeof obj.value !== "undefined") {
                                //that.reload();
                                that.setFilter();
                                //// nastaveni akci
                                //let view = that.$grid.ggrid("getView");
                                //that.setActions(view.getDataRows().length);
                            }
                        }
                    });
                    return filterFormDef;
                }
                /**
                 * Nastaveni filtru
                 */
                setFilter() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    let view = grid.ggrid("getView");
                    //let filterData = this.GetFilter().gfilterpanel('getCurrentData');
                    let filterData = this.GetFilter().gfilterpanel('getConfirmedData');
                    //let filterProcess = view.processors["aktFiltr"] as Gordic.Data.FilterProcessor<Gordic.Eko.Interface.RegistrZPDto>;
                    //if (filterProcess) {
                    //    filterProcess.fce = that.functionFilter;
                    //}
                    //else {
                    if (filterData === null || typeof filterData === undefined)
                        return;
                    if (typeof filterData.volby === "undefined" || filterData.volby === null)
                        filterData.volby = [];
                    let filter = new Gordic.Data.FilterProcessor(/*that.functionFilter*/ that.getFiltering(filterData.volby));
                    view.process({ aktFiltr: filter });
                    //}
                }
                /**
                 * Zjisteni filtru dle zaskrtavatek
                 *
                 * */
                getFiltering(value) {
                    let nepripraveno = false;
                    let nezatridene = false;
                    let uzivatelske = false;
                    if (value.length > 0) {
                        value.forEach((item) => {
                            if (!item)
                                return;
                            if (item == 1)
                                nepripraveno = true;
                            else if (item == 2)
                                nezatridene = true;
                            else if (item == 3)
                                uzivatelske = true;
                        });
                        //     nepripraveno = this.findFields("nepripravene").gfield("getValue");
                        //     nezatridene = this.findFields("nezatridene").gfield("getValue");
                        //     uzivatelske = this.findFields("uzivatelske").gfield("getValue");
                    }
                    let filter = "";
                    if (nepripraveno)
                        filter = "s_prep>0";
                    //filter = "aktivita=100";
                    if (nezatridene) {
                        if (filter != "")
                            filter += " && ";
                        filter += "(aktivita == 300 && (ixp == '' || ixp == '0000P000000N' || ixp == '0000X0000003'))";
                    }
                    if (uzivatelske) {
                        //if (filter != "") filter += " && ";
                        //filter += "(aktivita == 300 AND(ixp == '' OR ixp == '0000P000000N' OR ixp == '0000X0000003'))"
                    }
                    if (filter === "")
                        filter = "1";
                    return filter;
                }
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    return profiles;
                }
            }
            WebClient.GSeznamEkoRegistr = GSeznamEkoRegistr;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1JlZ2lzdHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtRWtvUmVnaXN0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBdWhDZjtBQXZoQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdWhDbkI7SUF2aENnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1aEM3QjtRQXZoQ29CLFdBQUEsU0FBUztZQUUxQixNQUFhLGlCQUFrQixTQUFRLFVBQUEscUJBQXFCO2dCQWF4RDs7OzttQkFJRztnQkFDSCxZQUFZLE9BQXFDO29CQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBbEJuQix1Q0FBdUM7b0JBSS9CLHNCQUFpQixHQUE2QyxFQUFFLENBQUM7b0JBTXpFLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxDQUFDO29CQVN0RixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxT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O3FCQUMxRSxDQUFBO29CQUVELEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFHaEYsT0FBTyxRQUFRLENBQUM7Z0JBQ3BCLENBQUM7YUFLSjtZQXBoQ1ksMkJBQWlCLG9CQW9oQzdCLENBQUE7UUFDTCxDQUFDLEVBdmhDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdWhDN0I7SUFBRCxDQUFDLEVBdmhDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdWhDbkI7QUFBRCxDQUFDLEVBdmhDUyxNQUFNLEtBQU4sTUFBTSxRQXVoQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvUmVnaXN0ciBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLyoqIEdsb2JhbG5pIG1vZHVsb3ZlIHBhcmFtZXRyeSB2IEpTICovXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbm92YW5lU2xvdXBjZTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjckRlZlNsb3VwY2VEdG9bXSA9IFtdO1xyXG4gICAgICAgIHByaXZhdGUgdHlwUmVnOiBVY3QuSW50ZXJmYWNlLkdFVHlwUmVnaXN0cnU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBzZWxlY3RlZE1vbnRoOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIExpbWl0IHBvY3R1IG5hY2l0YW55Y2ggemF6bmFtdSwgcG9rdWQgbmVkb2pkZSBrIHBvdHZyemVuaSwgemUgdXppdmF0ZWwgY2hjZSBqaXQgcHJlcyBsaW1pdCAqL1xyXG4gICAgICAgIHN1bUxpbWl0OiBudW1iZXI7XHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtRWtvUmVnaXN0clwiLCBhdXRob3JDb2RlOiA0OTIsIGZpbGU6IFwiR1Nlem5hbUVrb1JlZ2lzdHIudHNcIiB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb25zdHJ1a3RvclxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50IC0gcGFyZW50IGNvbnRlbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNvdWNldFZlU3RhdHVzQmFydSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucG92b2xlbk5haGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuWmFwaXNvdmEgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLnBhcmVudENudFtcInNlbGVjdGVkTW9udGhcIl07XHJcbiAgICAgICAgICAgIHRoaXMudHlwUmVnID0gdGhpcy5wYXJlbnRDbnRbXCJ0eXBSZWdcIl07XHJcbiAgICAgICAgICAgIHRoaXMuQXV0b0xvYWREYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUmVnaXN0clpQLmxpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrQ291bnQgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUmVnaXN0clpQLmNvdW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMubXlLZXlzID0gXCJpY28sdWNzLHVlYV9yZWcsdWViX3JlZyx1ZXhfcmVnXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIub25Db250ZW50UmVhZHkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTW9udGggPiAwKVxyXG4gICAgICAgICAgICAvL3RoaXMucGFyZW50Q250LmZpbmRGaWVsZHMoXCJNZXNpY1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgbWVzaWM6IHRoaXMuc2VsZWN0ZWRNb250aCB9KTtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5maW5kRmllbGRzKFwiTWVzaWNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBtZXNpYzogdGhpcy5zZWxlY3RlZE1vbnRoIH0sIGZhbHNlLCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICogTmFjdGkgZmlsdHJ5XHJcbiAgICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICAqIEBwYXJhbSByZXFcclxuICAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEZpbHRlckRhdGEodGhhdDogdGhpcywgcmVxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbmV4dDogSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbnVtYmVyPik6IElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+IHwgSlF1ZXJ5UHJvbWlzZTxJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgICAgICB2YXIgbWFza2E6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBmaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbGV0IGZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBhbnkgPSB0aGF0LkdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q29uZmlybWVkRGF0YScpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBmaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2F2ZUZpbHRlciA9ICQuZXh0ZW5kKHRydWUsIHt9LCBuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVGaWx0ZXJbXCJmaWx0ZXJcIl0gPSBuZXdGaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUZpbHRlcltcImZpbHRlclwiXVtcIk1lc2ljXCJdID0gZmlsdGVyIVtcIk1lc2ljXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkRmlsdGVySW50b0hpc3RvcnkoJC5leHRlbmQodHJ1ZSwge30sIHNhdmVGaWx0ZXIpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICE9PSB0aGF0LmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnNwbGljZSh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5maWx0ZXJIaXN0b3J5LnB1c2gobmV3RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYWRkRmlsdGVyVG9IaXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmFjdGlvbnNbXCJuZXh0RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA8IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmFjdGlvbnNbXCJwcmV2RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2thID0gbmV3RmlsdGVyIDtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrYVtcInVlYV9yZWdcIl0gPSBuZXdGaWx0ZXJbXCJjZnVcIl1bXCJ1ZWFcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2FbXCJ1ZWJfcmVnXCJdID0gbmV3RmlsdGVyW1wiY2Z1XCJdW1widWViXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNpYyA9IGZpbHRlciFbXCJNZXNpY1wiXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzaWMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IG15ZmlsdGVyID0gJC5leHRlbmQodHJ1ZSwge30sIG5ld0ZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9teWZpbHRlci5maWx0ZXIhW1wiTWVzaWNcIl0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJxID0geyAga3RnX3VlYWI6IHRoYXQudHlwUmVnLCAgbWVzaWM6IGZpbHRlci5NZXNpYywgTWFza2E6IG1hc2thICB9IGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICBycVtcImZpbHRlclwiXSA9IHsga3RnX3VlYWI6IHRoYXQudHlwUmVnLCBtZXNpYzogZmlsdGVyLk1lc2ljLCAgfSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSZXF1ZXN0W1wiZmlsdGVyc1wiXSA9IHJxO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlcXVlc3RbXCJtYXNrYVwiXSA9IG1hc2thO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KG5ld1JlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy92YXIgbmV3UmVxdWVzdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCByZXEpO1xyXG4gICAgICAgICAgICAvL3ZhciBtYXNrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjcktvbnNvbGlkYWNlU3RhdnlMaXN0RmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgIC8vdmFyIGZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpIHx8IHt9O1xyXG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JLb25zb2xpZGFjZVN0YXZ5TGlzdEZpbHRlckR0bz4oXCJjb2xsZWN0XCIsIG1hc2thKVxyXG4gICAgICAgICAgICAvLyAgICAudGhlbigobmV3RmlsdGVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCAhPT0gdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5zcGxpY2UodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5wdXNoKG1hc2thIGFzIGFueSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4Kys7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zW1wibmV4dEZpbHRlckFjdFwiXT8uZW5hYmxlZCh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPCB0aGF0LmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zW1wicHJldkZpbHRlckFjdFwiXT8uZW5hYmxlZCh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPiAwKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIGxldCBtYXNrYSA9IG5ld0ZpbHRlcjtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWx0ZXIuTWVzaWMgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBsZXQgbXlmaWx0ciA9IHsgcm9rOiB7IG86IFwiPVwiLCB2OiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgfSwgaWNvOiB7IG86IFwiPVwiLCB2OiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gfSwgbWVzaWM6IHsgbzogXCI8PVwiLCB2OiBmaWx0ZXIuTWVzaWMgfSwgTWFza2E6IG5ld0ZpbHRlciB9IGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBuZXdSZXF1ZXN0LmZpbHRlcnMgPSBteWZpbHRyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVTaG9ydEN1dCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlU2hvcnRDdXQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZm9ybWF0b3ZhY2ljaCBwb2RtaW5la1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtYXRDb25kKCk6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgY29uZEZvcm1hdHM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5kZWZpbm92YW5lU2xvdXBjZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25kRm9ybWF0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZpbm92YW5lU2xvdXBjZS5mb3JFYWNoKFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXAgIT0gLTEgJiYgaXRlbS5OYW1lPy5zdWJzdHJpbmcoaXRlbS5OYW1lLmxlbmd0aCAtIDIpICE9PSBcIl9oXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0cz8ucHVzaCh7IGRlc2NyaXB0aW9uOiBpdGVtLkNhcHRpb24gYXMgc3RyaW5nLCBhcHBseVRvOiBpdGVtLk5hbWUhLCBmb3JtdWxhOiBcIk5PVChJU0JMQU5LKEBcIiArIGl0ZW0uTmFtZSArIFwiX2gpKVwiLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZGFya3llbGxvdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25kRm9ybWF0cztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEhvZG5vdHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgSG9kbm90eSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gOyAgICBcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB2aWV3LmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgIC8vbGV0IGZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBhbnkgPSB0aGF0LkdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q29uZmlybWVkRGF0YScpO1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW0uLi5cIik7XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JSZWdpc3RyWlAubGlzdFdpdGhWYWx1ZXMoeyBtZXNpYzogZmlsdGVyLk1lc2ljLCBycTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZWRhbmkgZGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmaW5vdmFuZVNsb3VwY2UgPSByZXN1bHQuQ29sdW1ucyE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuU2V6bmFtIS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc3VsdC5TZXpuYW0hW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwcmF2SG9kbm90eShpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3IgKGNvbnN0IHByb3BlcnR5IGluIGl0ZW0uU2xvdXBjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBsZXQgVHlwID0gaXRlbS5TbG91cGNlW3Byb3BlcnR5XS5UeXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHN3aXRjaCAoVHlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXNlIDEwOi8vIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGl0ZW1baXRlbS5TbG91cGNlW3Byb3BlcnR5XS5OYW1lXSA9IGl0ZW0uU2xvdXBjZVtwcm9wZXJ0eV0uVmFsdWVOXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXNlIDQwOiAvLyBkZWNpbWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaXRlbVtpdGVtLlNsb3VwY2VbcHJvcGVydHldLk5hbWVdID0gaXRlbS5TbG91cGNlW3Byb3BlcnR5XS5WYWx1ZUNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXNlIDMwOiAvLyBkYXRldGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGl0ZW1baXRlbS5TbG91cGNlW3Byb3BlcnR5XS5OYW1lXSA9IGl0ZW0uU2xvdXBjZVtwcm9wZXJ0eV0uVmFsdWVEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpdGVtW2l0ZW0uU2xvdXBjZVtwcm9wZXJ0eV0uTmFtZV0gPSBpdGVtLlNsb3VwY2VbcHJvcGVydHldLlZhbHVlU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGl0ZW1bXCJoXCJdID0gaXRlbS5TbG91cGNlW3Byb3BlcnR5XS5WYWx1ZVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaXRlbVtpdGVtLlNsb3VwY2VbcHJvcGVydHldLk5hbWVdID0gaXRlbS5TbG91cGNlW3Byb3BlcnR5XS5WYWx1ZVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0LmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZGVmaW5vdmFuZVNsb3VwY2UgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBpdGVtLlNsb3VwY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGl0ZW1baXRlbS5TbG91cGNlW3Byb3BlcnR5XS5OYW1lXSA9IGl0ZW0uU2xvdXBjZVtwcm9wZXJ0eV0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmRlZmlub3ZhbmVTbG91cGNlLnB1c2goaXRlbS5TbG91cGNlW3Byb3BlcnR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8+KFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEocmVzdWx0LlNlem5hbSEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb1Nlem5hbURwaEZpbHRlckR0bz4oXCJ1c2VQcm9maWxlXCIsIHsgY29uZEZvcm1hdHM6IHRoYXQuY3JlYXRlRm9ybWF0Q29uZCgpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXByYXZlbmkgcmFka3UgaG9kbm90IHByZWRuaSBQb2xlIGhvZG5vIHByZW5lc2VubyBkbyBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHJhZGVrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1cHJhdkhvZG5vdHkocmFkZWs6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8pIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gcmFkZWsuU2xvdXBjZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IFR5cCA9IHJhZGVrLlNsb3VwY2VbcHJvcGVydHldLlR5cDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoVHlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDovLyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtbcmFkZWsuU2xvdXBjZVtwcm9wZXJ0eV0uTmFtZV0gPSByYWRlay5TbG91cGNlW3Byb3BlcnR5XS5WYWx1ZU5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZGVjaW1hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRla1tyYWRlay5TbG91cGNlW3Byb3BlcnR5XS5OYW1lXSA9IHJhZGVrLlNsb3VwY2VbcHJvcGVydHldLlZhbHVlQ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDogLy8gZGF0ZXRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtbcmFkZWsuU2xvdXBjZVtwcm9wZXJ0eV0uTmFtZV0gPSByYWRlay5TbG91cGNlW3Byb3BlcnR5XS5WYWx1ZUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrW3JhZGVrLlNsb3VwY2VbcHJvcGVydHldLk5hbWVdID0gcmFkZWsuU2xvdXBjZVtwcm9wZXJ0eV0uVmFsdWVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrW1wiaFwiXSA9IHJhZGVrLlNsb3VwY2VbcHJvcGVydHldLlZhbHVlU1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrW3JhZGVrLlNsb3VwY2VbcHJvcGVydHldLk5hbWVdID0gcmFkZWsuU2xvdXBjZVtwcm9wZXJ0eV0uVmFsdWVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZlbmlBa2NpKGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvL2xldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmFibGUgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCkgPiAwO1xyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LmNsb3NlZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMucHJpbnRBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IGVuYWJsZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RIb2Rub3R5IS51cGRhdGUoeyBlbmFibGVkOiBlbmFibGUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0RGV0YWlsRG9rbGFkdSEudXBkYXRlKHsgZW5hYmxlZDplbmFibGUgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXRvdnJlbmkgZ3JpZGZvcm1hdHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5HbG9iYWxzLlBhcmFtcyEuUmV6aW1Qcm92b3p1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuTktTOiBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1M6XHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlRleHR5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuVGV4dHk/LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlRleHR5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5jYXB0aW9uLCBuYW1lOiBcInV1c1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SOlxyXG4gICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpY29cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogdGhpcy5FeHRlcm5pU3VtYXJpemFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBHb3JkaWMuRWtvLkZpbHRlcnMucmFySW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5JY28gYXMgYW55LCBkaXNhYmxlZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogR29yZGljLkVrby5GaWx0ZXJzLmljb0ludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uSWNvIGFzIGFueSwgZGlzYWJsZWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkF2b2lkRXh0IHx8IHRoaXMuZ2xvYmFsUGFyYW1zLlR5cFN1bWFyaXphY2UgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTdW1hcml6YWNlLkV4dGVybmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlRleHR5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmljbywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkVXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlRleHR5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5jYXB0aW9uLCBuYW1lOiBcInV1c1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZE5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBNb2RpZmlrb3ZhbmUgU3UgYSBBdVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyZW50Q250Lm1vZGlmeUNmdS5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gdGhpcy5wYXJlbnRDbnQubW9kaWZ5Q2Z1LmNvbHVtbnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke2MubmFtZX1fcmVnYCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGMuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuY2Z1SW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZnU6IGMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUm96OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNVY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgJHtjLm5hbWV9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBgJHtjLm5hbWV9X3JlZ2BcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidWV4X3JlZ1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjA4XCIsIC8vUkMgMzAyNTAyMDggOiDDmsSNZXRuw60gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwidWV4X3JlZ1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMDhcIiB9KSwgLy9SQyAzMDI1MDIwOCA6IMOaxI1ldG7DrSBpZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemtyX2FnXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMDlcIiwgLy9SQyAzMDI1MDIwOSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIxMFwiLCAvL1JDIDMwMjUwMjEwIDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJQU1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMjMwXCIsIC8vUkMgMzAyNTAyMzAgOiBaIHBvxI3DoXRlxI1uw61obyBzdGF2dVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChyb3csbWV0YSkgPT4gKG1ldGE/Ll9pc1ZpcnR1YWwpP251bGw6KHJvdy5ha3Rpdml0YSA9PT0gMzAwKSA/IHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGVcIiwgdGV4dDogXCJqcmVzOjMwMjUwMjMyXCJ9IDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChkYXRhLnNfcHJlcF9haXNwICE9IG51bGwgJiYgZGF0YS5zX3ByZXBfYWlzcCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IFwianJlczozMDI1MDM0NFwiLCAvL1JDIDMwMjUwMzQ0IDogSUlTU1AgUMWZZXBvxI10ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg4XCJcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdGEuaWRfaGRyX3JpcyAhPSBudWxsICYmIGRhdGEuaWRfaGRyX3JpcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1leGNsYW0gZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDVcIiwgLy9SQyAzMDI1MDM0NSA6IE5lenByYWNvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODlcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaXByYXZlbm9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDIzMVwiLCAvL1JDIDMwMjUwMjMxIDogUMWZaXByYXZlbm9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzOSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93LCBtZXRhKSA9PiAobWV0YT8uX2lzVmlydHVhbCkgPyBudWxsIDooKHJvdy5zX3ByZXAhID4gMCkpID8gbnVsbCA6IHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGVcIiwgdGV4dDogXCJqcmVzOjMwMjUwMjM1XCIgfSwgLy9SQyAzMDI1MDIzNSA6IFDFmWlwcmF2ZW5vXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9teUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiUFNcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJTXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyMzBcIiwgLy9SQyAzMDI1MDIzMCA6IFogcG/EjcOhdGXEjW7DrWhvIHN0YXZ1XHJcbiAgICAgICAgICAgIC8vICAgIGNlbGxUZW1wbGF0ZTogcm93ID0+IChyb3cuYWt0aXZpdGEgPT09IDMwMCkgPyBuZXcgR29yZGljLlV0aWxzLkljb25CdWlsZGVyKCkuY3JlYXRlSWNvbih7IGljb246IFwiZmEtY2hlY2stY2lyY2xlXCIgfSkgOiBudWxsIGFzIGFueSxcclxuICAgICAgICAgICAgLy8gICAgdG9vbHRpcFRlbXBsYXRlOiByb3cgPT4gKHJvdy5ha3Rpdml0YSA9PT0gMzAwKSA/IFwianJlczozMDI1MDIzMlwiIC8vUkMgMzAyNTAyMzIgOiBBTk9cclxuICAgICAgICAgICAgLy8gICAgICAgIDogXCJqcmVzOjMwMjUwMjMzXCIsIC8vUkMgMzAyNTAyMzMgOiBORVxyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInByaXByYXZlbm9cIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJQXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNlbGxUZW1wbGF0ZTogcm93ID0+IChyb3cuc19wcmVwISA+IDApID8gbnVsbCBhcyBhbnk6IG5ldyBHb3JkaWMuVXRpbHMuSWNvbkJ1aWxkZXIoKS5jcmVhdGVJY29uKHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGVcIiB9KSxcclxuICAgICAgICAgICAgLy8gICAgdG9vbHRpcFRlbXBsYXRlOiByb3cgPT4gKHJvdy5zX3ByZXAhID4gMCkgPyBcImpyZXM6MzAyNTAyMzRcIiA6IC8vUkMgMzAyNTAyMzQgOiBOZXDFmWlwcmF2ZW5vXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcImpyZXM6MzAyNTAyMzVcIiAvL1JDIDMwMjUwMjM1IDogUMWZaXByYXZlbm9cclxuICAgICAgICAgICAgLy8gICAgLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMjMxXCIsIC8vUkMgMzAyNTAyMzEgOiBQxZlpcHJhdmVub1xyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmlub3ZhbmVTbG91cGNlLmZvckVhY2goc2xvdXBlYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSA5MDtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzbG91cGVjLk5hbWUhICsgXCJfaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHNsb3VwZWMuQ2FwdGlvbiEgKyBcIiAtIFwiICsgXCJqcmVzOjMwMjUwMjY0XCIsIC8vUkMgMzAyNTAyNjQgOiBVxb5pdmF0ZWxza8OhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzbG91cGVjLlR5cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IHdpZHRoID0gNTA7Ly8gY2lzbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzbG91cGVjLk5hbWUhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogc2xvdXBlYy5DYXB0aW9uISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKHJvdywgYiwgYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJvd1tjPy5jb2x1bW4uZmllbGQgKyBcIl9oXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDI2NVwiOyAvL1JDIDMwMjUwMjY1IDogVcW+aXZhdGVsc2vDoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDogd2lkdGggPSAxMjA7Ly8gbWVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogc2xvdXBlYy5OYW1lISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHNsb3VwZWMuQ2FwdGlvbiEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChyb3csIGIsIGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSByb3dbYz8uY29sdW1uLmZpZWxkICsgXCJfaFwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTAyNjVcIjsgLy9SQyAzMDI1MDI2NSA6IFXFvml2YXRlbHNrw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzA6IHdpZHRoID0gODA7IC8vIGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogc2xvdXBlYy5OYW1lISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zdCB2YWx1ZSA9IHJvd1tzbG91cGVjLk5hbWUhXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCh2YWx1ZSBhcyBhbnkpIGluc3RhbmNlb2YgRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUodmFsdWUsIFwiZGQuTU0ueXl5eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBzbG91cGVjLkNhcHRpb24hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAocm93LCBiLCBjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcm93W2M/LmNvbHVtbi5maWVsZCArIFwiX2hcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwMjY1XCI7IC8vUkMgMzAyNTAyNjUgOiBVxb5pdmF0ZWxza8OhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogLy8gc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNsb3VwZWMuTmFtZSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBzbG91cGVjLkNhcHRpb24hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAocm93LCBiLCBjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcm93W2M/LmNvbHVtbi5maWVsZCArIFwiX2hcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwMjY1XCI7IC8vUkMgMzAyNTAyNjUgOiBVxb5pdmF0ZWxza8OhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JlYWNoKEtleVZhbHVlUGFpciA8IHN0cmluZywgc3RyaW5nID4ga3YgaW4gbV9Ib2Rub3R5KVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgdmFyIGMgPSBDcmVhdGVIb2RDb2x1bW4oZ2YsIGt2LktleSwga3YuVmFsdWUpO1xyXG4gICAgICAgICAgICAvLyAgICBjLkdyb3VwID0gXCJoXCI7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2ZvcmVhY2goS2V5VmFsdWVQYWlyIDwgc3RyaW5nLCBzdHJpbmcgPiBrdiBpbiBtX0hvZG5vdHkpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgYyA9IENyZWF0ZUhvZENvbHVtbihnZiwga3YuS2V5ICsgXCJfaFwiLCBrdi5WYWx1ZSArIFwiIC0gXCIgKyBHUmVzb3VyY2VzLkdldFJlc291cmNlVGV4dCgyMTA1MDAzNSkpOyAvL1JDIDIxMDUwMDM1IDogVcW+aXZhdGVsc2vDoSBob2Rub3RhXHJcbiAgICAgICAgICAgIC8vICAgIGMuR3JvdXAgPSBcInVoXCI7XHJcbiAgICAgICAgICAgIC8vICAgIGMuVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjExXCIsIC8vUkMgMzAyNTAyMTEgOiBNRCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjEyXCIsIC8vUkMgMzAyNTAyMTIgOiBEYWwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjEzXCIsIC8vUkMgMzAyNTAyMTMgOiBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cFJlZyA9PT0gVWN0LkludGVyZmFjZS5HRVR5cFJlZ2lzdHJ1LlBvaGxlZGF2a3kpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2dmLkFkZFN0cmluZ0NvbHVtbihcInVlYV92YXpcIiwgVXNlclByb2Nlc3MuRWtvUGFyYW1zLkVrb0NmdVNldFtcInVlYVwiXS5aa3JhdGthICsgXCIgXCIgKyBHUmVzb3VyY2VzLkdldFJlc291cmNlVGV4dCgyMTA1MDA0NCksICh1c2hvcnQpVXNlclByb2Nlc3MuRWtvUGFyYW1zLkVrb0NmdVNldFtcInVlYVwiXS5EZWxrYSwgNCwgZ3ZaYXBpc3kuRGVmYXVsdENlbGxTdHlsZS5Gb250KTsgLy9SQyAyMTA1MDA0NCA6IE9QUFxyXG4gICAgICAgICAgICAgICAgLy9nZi5BZGRTdHJpbmdDb2x1bW4oXCJ1ZWJfdmF6XCIsIFVzZXJQcm9jZXNzLkVrb1BhcmFtcy5Fa29DZnVTZXRbXCJ1ZWJcIl0uWmtyYXRrYSArIFwiIFwiICsgR1Jlc291cmNlcy5HZXRSZXNvdXJjZVRleHQoMjEwNTAwNDQpLCAodXNob3J0KVVzZXJQcm9jZXNzLkVrb1BhcmFtcy5Fa29DZnVTZXRbXCJ1ZWJcIl0uRGVsa2EsIDQsIGd2WmFwaXN5LkRlZmF1bHRDZWxsU3R5bGUuRm9udCk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1ZWFfdmF6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjk0XCIuZm9ybWF0KHRoaXMucGFyZW50Q250Lm1vZGlmeUNmdS5jb2x1bW5zWzBdLmNhcHRpb24pLCAvL1JDIDMwMjUwMjk0IDogezB9IE9QUFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWViX3ZhelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI5NFwiLmZvcm1hdCh0aGlzLnBhcmVudENudC5tb2RpZnlDZnUuY29sdW1uc1sxXS5jYXB0aW9uKSwgLy9SQyAzMDI1MDI5NCA6IHswfSBPUFBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjExXCIgLy9SQyAzMDI1MDIxMSA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgXCIgKyBcImpyZXM6MzAyNTAyMTRcIiwgLy9SQyAzMDI1MDIxNCA6IE9QUFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMTJcIiAvL1JDIDMwMjUwMjEyIDogRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgXCIgKyBcImpyZXM6MzAyNTAyMTRcIiwgLy9SQyAzMDI1MDIxNCA6IE9QUFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YzBjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIxM1wiIC8vUkMgMzAyNTAyMTMgOiBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIFwiICsgXCJqcmVzOjMwMjUwMjE0XCIsIC8vUkMgMzAyNTAyMTQgOiBPUFBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBteUdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRUZW1hID0gdGhpcy50ZW1hO1xyXG4gICAgICAgICAgICB0aGlzLnRlbWEgPSBcIlwiO1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGVtYSA9IG9sZFRlbWE7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RIb2Rub3R5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RIb2Rub3R5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMzZcIiwgLy9SQyAzMDI1MDIzNiA6IEhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgY29sdW1uID0gdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZUNlbGxBZGRyZXNzXCIpLmNvbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3daYXBpc3kocm93LCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Ib2Rub3R5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWxEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4oZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1pvYnJhekRldGFpbCh0aGF0LCByYWRlaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZUNlbGxBZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RGV0YWlsKHJhZGVrIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMjM3XCIsIC8vUkMgMzAyNTAyMzcgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMzhcIik7IC8vUkMgMzAyNTAyMzggOiBOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWshXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbnRBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZChHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbnRBY3RcIixcclxuICAgICAgICAgICAgICAgIHRlbWE6IHRoYXQudGVtYSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LnBhcmVudENudCxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlVjci5XZWJDbGllbnQuR1VjclByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNrUmVnaXN0clBaXCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHpqaXN0ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IGFueSA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDb25maXJtZWREYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLk1lc2ljID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHpqaXN0ZW5pIG5hc3RhdmVuaSB6YXRyeml0ZWtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmVwcmlwcmF2ZW5vID0gZmFsc2U7IGxldCBuZXphdHJpZGVuZSA9IGZhbHNlOyBsZXQgdXppdmF0ZWxza2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnZvbGJ5Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci52b2xieS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtID09IDEpIG5lcHJpcHJhdmVubyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtID09IDIpIG5lemF0cmlkZW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0gPT0gMykgdXppdmF0ZWxza2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2thOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBmaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGZpbHRlclNlcnZlcikgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTZXJ2ZXJbXCJ1ZWFfcmVnXCJdID0gZmlsdGVyU2VydmVyW1wiY2Z1XCJdW1widWVhXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU2VydmVyW1widWViX3JlZ1wiXSA9IGZpbHRlclNlcnZlcltcImNmdVwiXVtcInVlYlwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thID0gZmlsdGVyU2VydmVyOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXNrRGF0YTogR29yZGljLlVjci5XZWJDbGllbnQuR1VjUHJpbnRQYXJhbVJlZ2lzdHJEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFza2E6IGZpbHRlclNlcnZlciwgTWVzaWM6IGZpbHRlci5NZXNpY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgTmVwcmlwcmF2YW5lOiBuZXByaXByYXZlbm8sIE5lemF0cmlkZW5lOiBuZXphdHJpZGVuZSwgVXppdkhvZG5vdGE6IHV6aXZhdGVsc2tlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHRpc2tEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hcGxuZW5pIGZpbHRydVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSBhcyBHUHJpbnRBY3Rpb25UeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcG92b2xlbmkgbmFzdGFuaSBzZXpuYW11XHJcbiAgICAgICAgICogQHBhcmFtIHJxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGFsbG93ZWRMaXN0KHJxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGZpbHRydVxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0RmlsdGVyKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2ZpbHRlcnBhbmVsXCIsIHRoaXMuJGZpbHRlclBhbmVsKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRmaWx0ZXJQYW5lbDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJGaWx0ciBuZW5hbGV6ZW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICAqIEBwYXJhbSByb3cgLSBha3R1YWxuaSByYWRla1xyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgc2hvd0RldGFpbChyb3c6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8gJiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiByb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgcm93ID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHBhcm06IEdSZWdpc3RySUREdG8gPSB7XHJcbiAgICAgICAgICAgICAgICBpeHA6IHJvdy5peHAsIGthdDogdGhhdC50eXBSZWcsIHVlYTogcm93LnVlYV9yZWcsIHVlYjogcm93LnVlYl9yZWcsIHprcl9hZzogcm93Lnprcl9hZywgdWV4X3JlZzogcm93LnVleF9yZWcsIHJvdzogcm93LCBtZXNpYzogdGhhdC5nZXRNZXNpYygpXHJcbiAgICAgICAgICAgICAgICAsIENvbHVtbnM6IHRoYXQuZGVmaW5vdmFuZVNsb3VwY2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQubmF2aWdhdGUoXCJHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsUmVnaXN0clwiLCB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFBhcmFtczogcGFybVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSB6YXBpc3UgbmEgc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IGdyaWQuZ2dyaWQ8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4oXCJnZXRWaWV3XCIpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBOZWZ1bmd1amUgcG9kbWluZW5lIGZvcm1hdG92YW5pIHYgcHJpcGFkZSB1cGRhdGUhIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEocmVzLnJldHVyblZhbHVlLnJvdywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvPihcInVzZVByb2ZpbGVcIiwgeyBjb25kRm9ybWF0czogdGhhdC5jcmVhdGVGb3JtYXRDb25kKCkgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTsgLy8gcMWZaSB6YXbFmWVuw60gZGV0YWlsdSBzZSBuYXN0YXbDrSBmb2N1cyBuYSBncmlkXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmppc3RlbmkgbWVzaWNlXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGdldE1lc2ljKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIC8vbGV0IGZpbHRlciA9IHRoaXMuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBhbnkgPSB0aGlzLkdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q29uZmlybWVkRGF0YScpO1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyLk1lc2ljO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdEhvZG5vdHksIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMucHJldkZpbHRlckFjdCEsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMubmV4dEZpbHRlckFjdCEsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdERldGFpbERva2xhZHUsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJpbnRBY3QpXHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pXHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVGaWx0ZXJQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaGVscGVyQ3VzdG9taXplcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lID49IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHBvbFNvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5DcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEgTDEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOlwiTDFNMVMxIEwxMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbC8qLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWwqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlQXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJIZWxwZXJJdGVtVGVtcGxhdGU6IFwiPGI+e25hemV2fTwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHRJdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKHRoYXQubG9hZGluZ0RhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3ZhciB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy92aWV3LnJlcXVlc3REYXRhKG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0OiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZmlsdGVyUGFuZWwgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgLy8gICAgLmFwcGVuZFRvKHRoaXMucGFyZW50Q250LmVsZW1lbnQpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZm9ybXM6IFtmcEZvcm1dLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmF2b3JpdGVzOiBbXCJtZFwiXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNU0zUzEgTC0xMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHNlYXJjaEJ1dHRvbk9uTWFpblJvdzogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHNhdmVPcHRpb25zRm9ybTogR1Vjck1hc2thRGV0YWlsLmdldEZvcm0oZ2YgYXMgYW55KSwgLy9UT0RPOiBEYXQgc3ByYXZueSB0eXAgZ3JpZGZvcm1hdHUhXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyVmlld01vZGVVc2VyU2V0dGluZ3M6IFtGaWx0ZXJWaWV3TW9kZS5EZXRhaWxdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy5wYXJlbnRDbnQudHlwU2VzdGF2eSwgcGFyZW50Q29udGVudDogdGhhdC5wYXJlbnRDbnQgfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9hcHBseTogKGV2LCBkYXRhKSA9PiB7IHRoaXMubG9hZERhdGEyKGRhdGEuZmlsdGVyKTsgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHJlc2V0OiAoZXYsIGRhdGEpID0+IHsgdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcHJpbWFyeUJ1dHRvbkJlaGF2aW91cjogXCJBbHdheXNQcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdDogXCJPYmxpYmVuZVBvZG1pbmt5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0VXNlclNldHRpbmdzOiBcIkRlbnlcIiAvL05PVEU6IFpha2F6dWplIHByZXBpbmFuaSBwbyB2eWhsZWRhbmkgLSBwb2t1ZCBzZSBuZWtkbyBwb2tvdXNlbCB2eW1hemF0IGZpbHRyIHYgdG9tdG8gcmV6aW11LCB0YWsgbXVzZWwga2xpa25vdXQgbmEgdnlobGVkYXQsIHZpeiBUMzk4N1xyXG5cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxMiwgTC0xMi0xMi0wLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMTI0XCIgfSkgLy9SQyAzMDI1MDEyNCA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnVjck1lc2ljKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk1lc2ljXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuTWVzaWM9dmFsdWUubWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB7IG1lc2ljOiBudWxsLCBtZXNpY190eHQ6IFwiIFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyByb2s6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvaywgbWVzaWM6IFwiPCAxM1wiLCBwc2V1ZG86IGZhbHNlLypuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJSb2tcIiwgXCJyb2tcIiwgdHJ1ZSkgKi8gfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB0aGlzLm9uT2Jkb2JpQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChjdHgudmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGN0eC5mbGFncy52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy92aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMjI4XCIsIGZhdm9yaXRlUm93TGF5b3V0RGVzY3JpcHRvcjogXCJ3LUwtNiB3LU0tOCB3LVMtMTJcIiAvKmxheW91dERlc2NyaXB0b3I6IFwiTDFNMlMxLCBMLTEyLTEyLTEyLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiKi8gfSBhcyBhbnkpIC8vUkMgMzAyNTAyMjggOiBQb3V6ZVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZvbGJ5ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAyMTZcIiwgaG9kbm90YTogMSB9IC8vUkMgMzAyNTAyMjkgOiBuZXDFmWlwcmF2ZW7DqVxyXG4gICAgICAgICAgICAgICAgLCB7IHRleHQ6IFwianJlczozMDI1MDIxNVwiLCBob2Rub3RhOiAyIH0gLy9SQyAzMDI1MDIxNSA6IG5lemF0xZnDrWTEm27DqSBQU1xyXG4gICAgICAgICAgICAgICAgLCB7IHRleHQ6IFwianJlczozMDI1MDIxOFwiLCBob2Rub3RhOiAzIH0gLy9SQyAzMDI1MDIxOCA6IHMgdcW+aXZhdGVsc2tvdSBob2Rub3RvdVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAsIHsga2V5OiBcImhvZG5vdGFcIiB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2b2xieVwiLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgICwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAsIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLnZvbGJ5PXZhbHVlLmhvZG5vdGFcIlxyXG4gICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCJcclxuICAgICAgICAgICAgICAgICwgZGF0YTogdm9sYnlcclxuICAgICAgICAgICAgICAgICwgZW1wdHlWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5sb2FkaW5nIHx8IChvYmouZmxhZ3MgJiYgb2JqLmZsYWdzLmZpbHRlckNsZWFyID09PSB0cnVlKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQubG9hZGluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoudmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIG5hc3RhdmVuaSBha2NpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNldEFjdGlvbnModmlldy5nZXREYXRhUm93cygpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgZmlsdHJ1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRGaWx0ZXIoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGZpbHRlckRhdGEgPSB0aGlzLkdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckRhdGE6IGFueSA9IHRoaXMuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDb25maXJtZWREYXRhJyk7XHJcbiAgICAgICAgICAgIC8vbGV0IGZpbHRlclByb2Nlc3MgPSB2aWV3LnByb2Nlc3NvcnNbXCJha3RGaWx0clwiXSBhcyBHb3JkaWMuRGF0YS5GaWx0ZXJQcm9jZXNzb3I8R29yZGljLkVrby5JbnRlcmZhY2UuUmVnaXN0clpQRHRvPjtcclxuICAgICAgICAgICAgLy9pZiAoZmlsdGVyUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAvLyAgICBmaWx0ZXJQcm9jZXNzLmZjZSA9IHRoYXQuZnVuY3Rpb25GaWx0ZXI7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyRGF0YSA9PT0gbnVsbCB8fCB0eXBlb2YgZmlsdGVyRGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyRGF0YS52b2xieSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBmaWx0ZXJEYXRhLnZvbGJ5ID09PSBudWxsKSBcclxuICAgICAgICAgICAgICAgIGZpbHRlckRhdGEudm9sYnkgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlciA9IG5ldyBHb3JkaWMuRGF0YS5GaWx0ZXJQcm9jZXNzb3I8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4oLyp0aGF0LmZ1bmN0aW9uRmlsdGVyKi90aGF0LmdldEZpbHRlcmluZyhmaWx0ZXJEYXRhLnZvbGJ5KSk7XHJcbiAgICAgICAgICAgIHZpZXcucHJvY2Vzcyh7IGFrdEZpbHRyOiBmaWx0ZXIgfSwpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIGZpbHRydSBkbGUgemFza3J0YXZhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlcmluZyh2YWx1ZTogW10pIHtcclxuICAgICAgICAgICAgbGV0IG5lcHJpcHJhdmVubyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbmV6YXRyaWRlbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHV6aXZhdGVsc2tlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtID09IDEpIG5lcHJpcHJhdmVubyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXRlbSA9PSAyKSBuZXphdHJpZGVuZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXRlbSA9PSAzKSB1eml2YXRlbHNrZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBuZXByaXByYXZlbm8gPSB0aGlzLmZpbmRGaWVsZHMoXCJuZXByaXByYXZlbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbmV6YXRyaWRlbmUgPSB0aGlzLmZpbmRGaWVsZHMoXCJuZXphdHJpZGVuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB1eml2YXRlbHNrZSA9IHRoaXMuZmluZEZpZWxkcyhcInV6aXZhdGVsc2tlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAobmVwcmlwcmF2ZW5vKVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyID0gXCJzX3ByZXA+MFwiO1xyXG4gICAgICAgICAgICAvL2ZpbHRlciA9IFwiYWt0aXZpdGE9MTAwXCI7XHJcbiAgICAgICAgICAgIGlmIChuZXphdHJpZGVuZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciAhPSBcIlwiKSBmaWx0ZXIgKz0gXCIgJiYgXCI7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIgKz0gXCIoYWt0aXZpdGEgPT0gMzAwICYmIChpeHAgPT0gJycgfHwgaXhwID09ICcwMDAwUDAwMDAwME4nIHx8IGl4cCA9PSAnMDAwMFgwMDAwMDAzJykpXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXppdmF0ZWxza2UpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGZpbHRlciAhPSBcIlwiKSBmaWx0ZXIgKz0gXCIgJiYgXCI7XHJcbiAgICAgICAgICAgICAgICAvL2ZpbHRlciArPSBcIihha3Rpdml0YSA9PSAzMDAgQU5EKGl4cCA9PSAnJyBPUiBpeHAgPT0gJzAwMDBQMDAwMDAwTicgT1IgaXhwID09ICcwMDAwWDAwMDAwMDMnKSlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IFwiXCIpIGZpbHRlciA9IFwiMVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlUHJvZmlsZXMoZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=
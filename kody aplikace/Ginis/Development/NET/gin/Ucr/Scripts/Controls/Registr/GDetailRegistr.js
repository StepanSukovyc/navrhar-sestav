"use strict";
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
            let GDetailRegistr = class GDetailRegistr extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GDetailRegistrce#";
                    // Editovatelny gridu
                    //private editGrid: JQuery;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-ucrDetailRegistr";
                    // modifikace udaju
                    this.modified = false;
                    this.error = false;
                    this.typAg = 0;
                }
                onContentReady() {
                    let that = this;
                    that.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionUlozit({
                            enabled: false, run: function () {
                                if (that.globalParams.Rad_Rzp && that.globalParams.RPZ_Povoleni_Menit_Hodnoty)
                                    that.ulozit();
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                        actPrimarnidoklad: {
                            name: "actPrimarnidoklad",
                            caption: "jres:30250295" //RC 30250295 : Primární doklad
                            ,
                            run: () => {
                                if (that.error)
                                    return;
                                let ixp = that.element.findFields("ixp").gfield("getValue");
                                let typAg = that.inputParams.row?.typ_ag;
                                if (that.typAg != 0)
                                    typAg = that.typAg;
                                that.showPrimDoklad(ixp, typAg);
                            }
                        }
                    });
                    // prikazova lista
                    that.commandBar([
                        { action: that.actions.actUlozit },
                        { action: that.actions.actZavrit, primary: true },
                    ]);
                    that.init();
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init() {
                    let that = this;
                    that.typAg = that.inputParams.row?.typ_ag;
                    // pocatecni nastaveni atributu
                    this.menuBar([
                        //{ action: that.actions.newAct, favorite: true, captionVisible: "never" },
                        { action: that.actions.actPrimarnidoklad, favorite: true }
                    ]);
                    //this.title = this.inputValues.currentRow.vykaz as any;        
                    //that.myPanel = $("<div>")
                    //    .appendTo(this.element)
                    //    .gtab({
                    //        title: "jres:30250090", //RC 30250090 : Detail daňové evidence
                    //        opened: true, locked: true
                    //    });
                    let wrp$ = $("<div style='display: none'>").appendTo(this.element);
                    //var detail = $("<div style='display: none'>")
                    //    .appendTo(this.element)
                    //    //.gtab({
                    //    //    title: "jres:30250093", //RC 30250093 : Detail
                    //    //    opened: true,
                    //    //})
                    //    ;
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L4M3S1, L-12-12-0, M-3-9-0, S-12-12-0", tabLabel: "", opened: true })
                        .addSection()
                        .addRow(that.uea_txt).addField("gstringbox", { name: "uea", disabled: true })
                        .addSection()
                        .addRow(that.ueb_txt).addField("gstringbox", { name: "ueb", disabled: true })
                        .addSection()
                        .addRow("jres:30250245").addField("gstringbox", {
                        name: "uex_reg", disabled: true
                    })
                        .addSection()
                        .addRow("jres:30250246").addField("gstringbox", { name: "kat_txt", disabled: true }) //RC 30250246 : Kategorie
                        .addSection()
                        .addRow("jres:30250250").addField("gstringbox", {
                        name: "ixp", disabled: !(that.globalParams.Rad_Rzp && that.globalParams.RPZ_Povoleni_Menit_PRIM_DOKL),
                        validators: [/*new Gordic.Validators.Length({ min: 12, max: 12 }), */ new Gordic.Validators.Ixs({ pid: true })]
                        //,maxLen:12
                        ,
                        change: (ev, obj) => {
                            that.beginOperation("jres:30250266"); //RC 30250266 : Načítám...
                            that.isl.UcrRegistrZP.testExistsIxp({ ixp: obj.value })
                                .get()
                                .then(responce => {
                                if (responce.Valid) {
                                    that.modified = true;
                                    that.error = false;
                                    that.element.findFields("zkr_ag").gfield("setValue", responce.ZkratkaAg, true);
                                    //that.inputParams.zkr_ag = responce.ZkratkaAg;
                                    //that.inputParams.row!.typ_ag = responce.TypAg!;
                                    that.typAg = responce.TypAg;
                                }
                                else {
                                    that.error = true;
                                    that.element.findFields("zkr_ag").gfield("setValue", "", true);
                                }
                                that.setActions();
                                return;
                            }).always(() => that.endOperation());
                        }
                    }) //RC 30250250 : Primární doklad
                        .addSection()
                        .addRow("jres:30250251").addField("gstringbox", { name: "zkr_ag", disabled: true }); //RC 30250251 : Agenda
                    let detail = $.newDiv("detail-header").appendTo(this.element).gform("createFrom", form);
                    //let form$ = $("<div class='detail-header'>")
                    //    .appendTo(this.element)
                    //    .gform("setup", this.getFormOptions())
                    //    //#region Nelze pouzit - zaznamy nemaji ixp
                    //    //#endregion
                    //    .gformsection("create", "")
                    //    .gformrow("addFieldsRow", "jres:30250094") //RC 30250094 : Evidenční číslo daňového dokladu
                    //    .gstringbox({ name: "ec_dd", disabled: true })
                    //    .gformrow("addFieldsRow", "jres:30250095").gstringbox({ name: "dic", disabled: true }) //RC 30250095 : DIČ dodavatele / odběratele
                    //    .gform("complete");
                    //    $(form$).gform("viewMode", "view");
                    //    wrp$.gtab({
                    //        title: "jres:30250096", //RC 30250096 : Doklad
                    //        opened:true,
                    //    });
                    //form$.detach().appendTo(wrp$);
                    var tabRadky = $.newDiv()
                        .appendTo(this.element);
                    /*var view = new Gordic.Data.View<Gordic.Uct.Interface.GUctssudModDto>(that.data);*/
                    //let provider = new Gordic.Data.Provider<any, any, any>(() => {
                    //    return that.loadData();
                    //});
                    //let view = new Gordic.Data.View<Gordic.Eko.Interface.GRegistrZPDto>(that.data, { processors: { provider: provider } });
                    // vytvorit grid
                    const grid = $.newDiv(this.classGrid)
                        .css("height", "100%")
                        .appendTo(tabRadky)
                        .ggrid({
                        columnMode: "full",
                        multi: false,
                        navigationMode: "cell",
                        marking: false,
                        columns: that.createGridFormat(),
                        profileVisible: false,
                        //userSettings: that.inputValues.currentRow.id as string,
                        //                        searchColumns: ["popis"],
                    });
                    if (that.globalParams.Rad_Rzp && that.globalParams.RPZ_Povoleni_Menit_Hodnoty) {
                        grid.ggridcelleditor({
                            change: function (ev, obj) {
                                that.modified = true;
                                that.setActions();
                                //debugger;
                            },
                            beforeStop: function (ev, obj) {
                                let row = that.SpustVypocet(obj.cellInfo.data);
                                obj.view.updateDataRaw(row);
                                //debugger;
                            }
                        });
                    }
                    grid.gautofit();
                    this.fillValues(detail);
                    if (that.globalParams.Rad_Rzp && that.globalParams.RPZ_Povoleni_Menit_Hodnoty) {
                        grid.ggridcelleditor('start');
                    }
                    else
                        that.setActions();
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions() {
                    // pokud neni grid, nic nedelej
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    if (this.closed)
                        return;
                    if (this.globalParams.Rad_Rzp && this.globalParams.RPZ_Povoleni_Menit_Hodnoty)
                        this.actions.actUlozit.update({ enabled: !this.error && this.modified, tooltip: "" });
                    else {
                        this.actions.actUlozit.update({ enabled: false, tooltip: "jres:30250635" }); //RC 30250635 : Není povoleno parametrem
                    }
                }
                /**
                 * Zobrazeni prim. dokladu
                 * @param row
                 */
                showPrimDoklad(ixp, typAg) {
                    let that = this;
                    //if (typAg !== null && ![40, 50, 70, 80, 100, 110, 120, 180, 230, 510, 580, 620, 330].concat(typAg as number))
                    //    return;
                    //Gordic.WebApp.Utility.openApp(
                    //    {
                    //        ixx1: ixp, // id cílového objektu v nově otevírané záložce
                    //        ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                    //        ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                    //        typAg: typAg,  // typ agendy cílového objektu (nepovinné)
                    //        faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                    //        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                    //        noAppFail: true  // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                    //    },
                    //    "OpenDetail"            // název metody spuštěné po otevření nové záložky
                    //);
                    if (typAg !== null && ![40, 50, 70, 80, 100, 110, 120, 180, 230, 510, 580, 620, 330].concat(typAg))
                        return;
                    // test na vyplenini ixp
                    if (typeof ixp === "undefined" || ixp === null)
                        return;
                    //Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: ixp } }, Global.Enums.ModOtevreni.auto);
                    //return;
                    Gordic.WebApp.Utility.openApp({
                        ixx1: ixp, // id cílového objektu v nově otevírané záložce
                        //ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        typAg: typAg, // typ agendy cílového objektu (nepovinné)
                        //faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                    ).catch(() => {
                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(that, { SimpleMode: false, /*IxpInitProVazbuSouvisejicich: ixp!,*/ DetailDto: { ixp: ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                    });
                }
                /**
                 * Ulozeni zmen
                 * */
                ulozit() {
                    let that = this;
                    let dtoDataSave = {};
                    // posbiran data z formulare
                    that.findFields().gfield("model", "collect", dtoDataSave);
                    // predam do predavaciho dto dto
                    let radekRegistru = this.inputParams.row;
                    radekRegistru.ixp = dtoDataSave.ixp;
                    //radekRegistru?.uex_reg = dtoDataSave.uex_reg;
                    radekRegistru.zkr_ag = dtoDataSave.zkr_ag;
                    let hodnoty = [];
                    let grid = that.GetGrid(that);
                    if (grid == null)
                        return;
                    hodnoty = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                    that.beginOperation("jres:30250258"); //RC 30250258 : Provádím ukládání...
                    that.isl.UcrRegistrZP.upsert({ month: that.inputParams.mesic, row: radekRegistru, hodnoty: hodnoty })
                        .get()
                        .then(() => {
                        if (that.typAg != 0) {
                            that.inputParams.row.ixp = dtoDataSave.ixp;
                            that.inputParams.row.zkr_ag = dtoDataSave.zkr_ag;
                            that.inputParams.row.typ_ag = that.typAg;
                        }
                        hodnoty.forEach(item => {
                            for (let i = 0; i < that.inputParams.Columns.length; i++) {
                                let column = that.inputParams.Columns[i];
                                if (column.Name === "H" + item.ixs_sud) {
                                    that.inputParams.row["H" + item.ixs_sud] = that.getValue(item.vh, column.Typ);
                                    that.inputParams.row["H" + item.ixs_sud + "_h"] = that.inputParams.row["H" + item.ixs_sud];
                                    //that.inputParams.row!["h"] = item.h;
                                    break;
                                }
                            }
                        });
                        //let column = that.inputParams.Columns?.find(column => "H" + item.ixs_sud == column.Caption);
                        //that.inputParams.row!["vh"] = "";
                        //that.inputParams.row!["h"] = "";
                        that.showFlash({
                            label: "jres:30250259" //RC 30250259 : Uložení provedeno
                            ,
                            state: "success"
                        });
                        that.tryClose();
                        return;
                    })
                        .always(() => { that.endOperation(); });
                }
                /**
                 * Navrat hodnoty v pozadovanem formatu
                 * @param value
                 */
                getValue(value, type) {
                    if (type == 10) // number
                     {
                        const parsed = parseInt(value);
                        if (isNaN(parsed))
                            return 0;
                        return parsed;
                    }
                    else if (type == 30) // datum
                     {
                        //let s3 = Gordic.Templates.Formatters.datetime("2022-01-01T00:00:00.000Z", "yyyyMMddhhmm");
                        let frags = value.split(".");
                        if (frags.length != 3)
                            return "";
                        if (!isNumeric(frags[2]) || !isNumeric(frags[1]) || !isNumeric(frags[0]))
                            return "";
                        var date = new Date(parseInt(frags[2]), parseInt(frags[1]) - 1, parseInt(frags[0])); // mesice zacinaji od 0 v JS!
                        if (Gordic.Utils.DateTime.isValid(date))
                            return date;
                        else
                            return "";
                        //    let mom = moment(value, 'DD.MM.YYYY', true);
                        //    if (mom.isValid())
                        //        return mom.toDate();
                        //    return "";
                    }
                    else if (type == 40) // dec
                     {
                        const parsed = parseFloat(value);
                        if (isNaN(parsed))
                            return 0;
                        return parsed;
                    }
                    else // string
                        return value;
                }
                /**
                 * Vytvoreni gridformatu
                 * */
                createGridFormat() {
                    var that = this;
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "Hodnoty",
                        caption: "P",
                        description: "jres:30250256", //RC 30250256 : Povinné
                        width: 30,
                        //iconTemplate: (row) => {
                        //debugger;
                        //return (row.pov_sud!>0) ? { icon: "fa-check-circle", text: "ANO" } : { icon: "", text: "" };
                        //},
                        cellTemplate: row => (row.pov_sud > 0) ? new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-check-circle" }) : "",
                        tooltipTemplate: row => (row.pov_sud > 0) ? "jres:30250257" //RC 30250257 : Povinná položka
                            : "jres:30250233", //RC 30250233 : NE
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:30250091", //RC 30250091 : Název
                        width: 150
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "jres:30250267", //RC 30250267 : Zkratka
                        width: 100
                    })
                        .addTextColumn({
                        name: "ah", //RC 30250248 : Systémová hodnota
                        caption: "jres:30250248", //RC 30250248 : Systémová hodnota
                        cellTemplate: row => {
                            if (row.aht === 2 || row.aht === 4)
                                return new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-info-circle g-state-text g-state-info" }) + " &nbsp; " + row.ah;
                            else if (row.aht === 1)
                                //return new Gordic.Utils.IconBuilder().createIcon({ icon: "gi-info" }) + "  " +row.ah!;
                                return new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-info-circle g-state-text g-state-info" }) + " &nbsp; " + row.ah;
                            else if (row.aht === 3)
                                return new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-info-circle g-state-text g-state-info" }) + " &nbsp; " + row.ah;
                            return row.ah;
                        },
                        tooltipTemplate: row => {
                            if (row.aht === 2 || row.aht === 4)
                                return "jres:30250260"; //RC 30250260 : Ze systému
                            else if (row.aht === 1)
                                return "jres:30250261"; //RC 30250261 : Přednastavená hodnota (tvrdá)
                            else if (row.aht === 3)
                                return "jres:30250262"; //RC 30250262 : Přednastavená hodnota
                            return row.ah;
                        },
                        width: 150
                    })
                        .addTextColumn({
                        name: "h",
                        caption: "jres:30250247", //RC 30250247 : Uživatelská hodnota
                        cellTemplate: (row, metarow, info) => {
                            if (!row.h)
                                return "";
                            switch (row.typ_sud) {
                                case 10: // number
                                    return Gordic.Templates.Formatters.number(row.h, "N");
                                case 30: // date
                                    if (row.h instanceof Date)
                                        return Gordic.Templates.Formatters.date(row.h, "dd.MM.yyyy");
                                    else
                                        return row.h;
                                case 20: // string
                                    return row.h;
                                case 40: // decimal
                                    return Gordic.Templates.Formatters.number(row.h, "C");
                                default:
                                    return row.h;
                            }
                            //if (row.aht === 2 || row.aht === 4)
                            //    return new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-info-circle g-state-text g-state-info" }) + " &nbsp; " + row.ah!;
                            //else if (row.aht === 1)
                            //    //return new Gordic.Utils.IconBuilder().createIcon({ icon: "gi-info" }) + "  " +row.ah!;
                            //    return new Gordic.Utils.IconBuilder().createIcon({ icon: "fa-info-circle g-state-text g-state-info" }) + " &nbsp; " + row.ah!;
                            //else if (row.aht === 3)
                            //    return Gordic.Templates.Formatters.date(row.h, "dd.MM.yyyy");
                            //return row.ah!;
                        },
                        width: 150,
                        editor: (!that.globalParams.Rad_Rzp || !that.globalParams.RPZ_Povoleni_Menit_Hodnoty) ? undefined : this.createEditor
                    })
                        .addTextColumn({
                        name: "vh",
                        caption: "jres:30250249", //RC 30250249 : Vykazovaná hodnota
                        width: 150
                    });
                }
                /**
                 * Nacteni gridu
                 * @param content
                 */
                GetGrid(content) {
                    let data = content.element.find(".ggrid.js-ucrDetailRegistr");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Vytvoreni editacniho policka
                 * @param editorContext
                 */
                createEditor(editorContext) {
                    let that = this;
                    switch (editorContext.cellInfo.data.typ_sud) {
                        case 10: // number
                            return {
                                widget: "gnumberbox",
                                //start: alert("start MD"),
                                options: [
                                    Gordic.Prefabs.Number.decimal(0, true), {
                                        name: "h", customClass: "js-h" /*, model: "model.c0=value",*/,
                                        returnType: "string",
                                        emptyValue: "",
                                    }
                                ]
                            };
                        case 30: // date
                            return {
                                widget: "gdatebox",
                                options: [
                                    {
                                        name: "h", customClass: "js-h",
                                        model: "model.h=value",
                                        modelValueTransform: {
                                            collect: function (fieldValue) {
                                                if (fieldValue instanceof Date)
                                                    return Gordic.Templates.Formatters.date(fieldValue, "dd.MM.yyyy");
                                                else
                                                    return fieldValue;
                                            },
                                            apply: function (fieldValue) {
                                                return fieldValue;
                                            }
                                        },
                                        //returnType: "string", 
                                        emptyValue: "",
                                    }
                                ]
                            };
                        case 20: // string
                            return {
                                widget: "gstringbox",
                                //start: alert("start MD"),
                                options: [
                                    {
                                        name: "h", customClass: "js-h", /*, model: "model.c0=value",*/
                                        returnType: "string",
                                        emptyValue: "",
                                    }
                                ]
                            };
                        case 40: // decimal
                            return {
                                widget: "gnumberbox",
                                //start: alert("start MD"),
                                options: [
                                    Gordic.Prefabs.Number.decimal(2, true), {
                                        name: "h", customClass: "js-h",
                                        returnType: "string",
                                        emptyValue: "",
                                    }
                                ]
                            };
                        default:
                            return {
                                widget: "gstringbox",
                                //start: alert("start MD"),
                                options: [
                                    {
                                        name: "h", customClass: "js-h" /*, model: "model.c0=value",*/
                                    }
                                ]
                            };
                    }
                }
                SpustVypocet(row) {
                    let rep = row.sud_rep;
                    let h = row.h?.toString();
                    if (typeof h === "undefined" || h === null || h == "") {
                        let aht = row.aht; //parseInt(row.aht);
                        if (aht == 4)
                            rep = "SP";
                        h = row.ah?.toString();
                    }
                    let m = this.inputParams.mesic - 1;
                    if (m > 11)
                        m = 11;
                    if (m < 0)
                        m = 0;
                    //let datum = new Date(this.Globals.EkoParams?.Rok!, m, 1);
                    let dt = new Date(this.Globals.EkoParams?.Rok, m, 1);
                    let dat = Gordic.Utils.DateTime.add(dt, 1, "months");
                    dat = Gordic.Utils.DateTime.add(dt, -1, "days");
                    //let dat = moment({ year: this.Globals.EkoParams?.Rok!, month: m, day:1 }).add(1, 'months').add(-1, "days");
                    //let datum = dat.toDate();
                    //moment.
                    //    .AddMonths(1).AddDays(-1);
                    row.vh = this.Vzorec(rep, h, dat);
                    return row;
                }
                /// <summary>Vzorec pro výpočet SUD hodnot</summary>
                Vzorec(sudRep, val, autoDate) {
                    if (typeof val === "undefined" || val === null || val === "")
                        return val;
                    sudRep = sudRep.trim();
                    //try {
                    switch (sudRep) {
                        case "SPM": //Splatnost = k datu + měsíce
                            {
                                let dt = Gordic.Utils.DateTime.add(autoDate, -1 * autoDate.getDay(), "days");
                                dt = Gordic.Utils.DateTime.add(dt, parseInt(val) + 1, "months");
                                return Gordic.Templates.Formatters.date(dt, "dd.MM.yyyy");
                                //let d = autoDate.subtract(autoDate.day(), "days").add(val + 1, "months");
                                //d = new moment({ year autoDate.year(), autoDate.month(), 1}).Add(val + 1, "months").AddDays(-1);
                                //DateTime d = new DateTime(autoDate.Year, autoDate.Month, 1).AddMonths(Int32.Parse(val) + 1).AddDays(-1);
                                //return dt.format("DD.MM.YYYY");
                                //return autoDate.AddMonths(Int32.Parse(val)).ToString(new GTbGDate().Pattern);
                            }
                        case "SPDPM": //Splatnost = k datu + dny
                            {
                                let dt = Gordic.Utils.DateTime.add(autoDate, parseInt(val), "days");
                                return Gordic.Templates.Formatters.date(dt, "dd.MM.yyyy");
                                //let d = autoDate.add(val, "days");
                                //DateTime d = autoDate.AddDays(Int32.Parse(val));
                                //return d.format("DD.MM.YYYY");
                            }
                        case "SPDCT": //Splatnost = ke čtvrtletí + dny
                            {
                                let dt = new Date(autoDate.getFullYear(), autoDate.getMonth(), 1);
                                while ((dt.getMonth() % 3) != 0)
                                    dt = Gordic.Utils.DateTime.add(dt, 1, "months");
                                dt = Gordic.Utils.DateTime.add(dt, parseInt(val), "days");
                                return Gordic.Templates.Formatters.date(dt, "dd.MM.yyyy");
                                //let d = moment([autoDate.year(), autoDate.month(),1]);
                                //while ((d.month() % 3) != 0) d = d.add(1, "months");
                                //d = autoDate.add(val, "days");
                                ////d = d.AddDays(Int32.Parse(val));
                                //return d.format("DD.MM.YYYY");
                            }
                        case "SPDKR": //Splatnost = k 1.12. + dny
                            {
                                let dt = new Date(autoDate.getFullYear(), 11, 1);
                                dt = Gordic.Utils.DateTime.add(dt, parseInt(val) - 1, "days");
                                return Gordic.Templates.Formatters.date(dt, "dd.MM.yyyy");
                                //let d = moment([autoDate.year(), 11, 1]).add(parseInt(val) - 1, "days");
                                ////DateTime d = new DateTime(autoDate.Year, 12, 1).AddDays(Int32.Parse(val) - 1);
                                //return d.format("DD.MM.YYYY");
                            }
                        default:
                            //if ((val as any) instanceof Date)
                            //    return Gordic.Templates.Formatters.date(val, "dd.MM.yyyy");
                            //else
                            return val;
                    }
                    //}
                }
                getFormOptions() {
                    //if (mode=== false)
                    //    return { layoutDescriptor: "L3M3S2, L-3-9-0, M-12-12-0, S-12-12-0, breaks-800-1190", name: "headForm" };
                    //else 
                    return { layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0, breaks-300-500", name: "headForm" };
                }
                /**
                 * Vyplneni dat
                 * @param form
                 */
                fillValues(form) {
                    this.findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", this.inputParams, { initialValues: true, setFlags: { triggerChange: false } }); // verificationNeeded: false
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    //var view = new Gordic.Data.View<Gordic.Uct.Interface.GUctssudModDto>(this.data);
                    grid.ggrid("setData", this.data, true);
                }
                /**
                * Uzavirani okna
                * @returns
                */
                closing() {
                    var that = this;
                    if (!that.modified)
                        return $.Deferred().resolve().promise();
                    return $.Deferred().resolve({ row: that.inputParams.row }).promise();
                }
            };
            GDetailRegistr = __decorate([
                Decorators.gcontent
            ], GDetailRegistr);
            WebClient.GDetailRegistr = GDetailRegistr;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFJlZ2lzdHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsUmVnaXN0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNHJCZjtBQTVyQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNHJCbkI7SUE1ckJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0ckI3QjtRQTVyQm9CLFdBQUEsU0FBUztZQUkxQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQUFoRDs7b0JBQ0ksUUFBRyxHQUFHLG1CQUFtQixDQUFDO29CQUMxQixxQkFBcUI7b0JBQ3JCLDJCQUEyQjtvQkFDM0I7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxxQkFBcUIsQ0FBQztvQkFPcEQsbUJBQW1CO29CQUNYLGFBQVEsR0FBWSxLQUFLLENBQUM7b0JBQzFCLFVBQUssR0FBWSxLQUFLLENBQUM7b0JBQ3ZCLFVBQUssR0FBUyxDQUFDLENBQUM7Z0JBcXFCNUIsQ0FBQztnQkFocUJHLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0NBQ2pCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBMEI7b0NBQ3pFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDdEIsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUks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O29CQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7d0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVELE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pFLENBQUM7YUFDSixDQUFBO1lBdHJCWSxjQUFjO2dCQUQxQixVQUFVLENBQUMsUUFBUTtlQUNQLGNBQWMsQ0FzckIxQjtZQXRyQlksd0JBQWMsaUJBc3JCMUIsQ0FBQTtRQUVMLENBQUMsRUE1ckJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0ckI3QjtJQUFELENBQUMsRUE1ckJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0ckJuQjtBQUFELENBQUMsRUE1ckJTLE1BQU0sS0FBTixNQUFNLFFBNHJCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbFJlZ2lzdHIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHVpZCA9IFwiR0RldGFpbFJlZ2lzdHJjZSNcIjtcclxuICAgICAgICAvLyBFZGl0b3ZhdGVsbnkgZ3JpZHVcclxuICAgICAgICAvL3ByaXZhdGUgZWRpdEdyaWQ6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0cmlkYSBncmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjbGFzc0dyaWQ6IHN0cmluZyA9IFwianMtdWNyRGV0YWlsUmVnaXN0clwiO1xyXG4gICAgICAgIC8vIFZzdHVwbmkgcGFyYW1ldHJ5XHJcbiAgICAgICAgcHJpdmF0ZSBpbnB1dFBhcmFtczogR1JlZ2lzdHJJRER0bztcclxuICAgICAgICAvLyBwb3BpcyBzdVxyXG4gICAgICAgIHByaXZhdGUgdWVhX3R4dDogc3RyaW5nOyAgICAgICAgXHJcbiAgICAgICAgLy8gcG9waXMgYXVcclxuICAgICAgICBwcml2YXRlIHVlYl90eHQ6IHN0cmluZztcclxuICAgICAgICAvLyBtb2RpZmlrYWNlIHVkYWp1XHJcbiAgICAgICAgcHJpdmF0ZSBtb2RpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgZXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIHR5cEFnOiBudW1iZXI9MDtcclxuICAgICAgICBwcml2YXRlIGRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rzc3VkTW9kRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBHbG9iYWxzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyR2xvYmFsRHRvO1xyXG4gICAgICAgIC8vIHBhcmFtZXRyeVxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFsUGFyYW1zOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUGFyYW1zRHRvO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VbG96aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFsUGFyYW1zLlJhZF9SenAgJiYgdGhhdC5nbG9iYWxQYXJhbXMuUlBaX1Bvdm9sZW5pX01lbml0X0hvZG5vdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3ppdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpbWFybmlkb2tsYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByaW1hcm5pZG9rbGFkXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczozMDI1MDI5NVwiIC8vUkMgMzAyNTAyOTUgOiBQcmltw6FybsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICwgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmVycm9yKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpeHAgPSB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcIml4cFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR5cEFnID0gdGhhdC5pbnB1dFBhcmFtcy5yb3c/LnR5cF9hZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudHlwQWcgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cEFnID0gdGhhdC50eXBBZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93UHJpbURva2xhZChpeHAsIHR5cEFnISk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gcHJpa2F6b3ZhIGxpc3RhXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFVsb3ppdCB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQsIHByaW1hcnk6IHRydWUgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQhLnR5cEFnID0gdGhhdC5pbnB1dFBhcmFtcy5yb3c/LnR5cF9hZyBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIC8vIHBvY2F0ZWNuaSBuYXN0YXZlbmkgYXRyaWJ1dHVcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMubmV3QWN0LCBmYXZvcml0ZTogdHJ1ZSwgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIiB9LFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByaW1hcm5pZG9rbGFkLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnRpdGxlID0gdGhpcy5pbnB1dFZhbHVlcy5jdXJyZW50Um93LnZ5a2F6IGFzIGFueTsgICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoYXQubXlQYW5lbCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMDkwXCIsIC8vUkMgMzAyNTAwOTAgOiBEZXRhaWwgZGHFiG92w6kgZXZpZGVuY2VcclxuICAgICAgICAgICAgLy8gICAgICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgd3JwJCA9ICQoXCI8ZGl2IHN0eWxlPSdkaXNwbGF5OiBub25lJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGRldGFpbCA9ICQoXCI8ZGl2IHN0eWxlPSdkaXNwbGF5OiBub25lJz5cIilcclxuICAgICAgICAgICAgLy8gICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLy8uZ3RhYih7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIHRpdGxlOiBcImpyZXM6MzAyNTAwOTNcIiwgLy9SQyAzMDI1MDA5MyA6IERldGFpbFxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICBvcGVuZWQ6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAvLyAgICAvL30pXHJcbiAgICAgICAgICAgIC8vICAgIDtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEsIEwtMTItMTItMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIsIHRhYkxhYmVsOiBcIlwiLCBvcGVuZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQudWVhX3R4dCkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ1ZWFcIiwgZGlzYWJsZWQ6IHRydWUgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQudWViX3R4dCkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTpcInVlYlwiLCBkaXNhYmxlZDogdHJ1ZSB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjQ1XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7Ly9SQyAzMDI1MDI0NSA6IMOaxI1ldG7DrSBpZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWV4X3JlZ1wiLCBkaXNhYmxlZDp0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjQ2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6XCJrYXRfdHh0XCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMzAyNTAyNDYgOiBLYXRlZ29yaWVcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjUwXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIiwgZGlzYWJsZWQ6ICEodGhhdC5nbG9iYWxQYXJhbXMuUmFkX1J6cCAmJiB0aGF0Lmdsb2JhbFBhcmFtcy5SUFpfUG92b2xlbmlfTWVuaXRfUFJJTV9ET0tMKVxyXG4gICAgICAgICAgICAgICAgICAgICwgdmFsaWRhdG9yczogWy8qbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMTIsIG1heDogMTIgfSksICovbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkl4cyh7IHBpZDogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sbWF4TGVuOjEyXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI2NlwiKTsgLy9SQyAzMDI1MDI2NiA6IE5hxI3DrXTDoW0uLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVWNyUmVnaXN0clpQLnRlc3RFeGlzdHNJeHAoeyBpeHA6IG9iai52YWx1ZSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25jZS5WYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcInprcl9hZ1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXNwb25jZS5aa3JhdGthQWcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuaW5wdXRQYXJhbXMuemtyX2FnID0gcmVzcG9uY2UuWmtyYXRrYUFnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuaW5wdXRQYXJhbXMucm93IS50eXBfYWcgPSByZXNwb25jZS5UeXBBZyE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQhLnR5cEFnID0gcmVzcG9uY2UuVHlwQWchO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiemtyX2FnXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIFwiXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4gdGhhdC5lbmRPcGVyYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAyNTAgOiBQcmltw6FybsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyNTFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ6a3JfYWdcIixkaXNhYmxlZDogdHJ1ZSB9KSAvL1JDIDMwMjUwMjUxIDogQWdlbmRhXHJcblxyXG4gICAgICAgICAgICBsZXQgZGV0YWlsID0gJC5uZXdEaXYoXCJkZXRhaWwtaGVhZGVyXCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAvL2xldCBmb3JtJCA9ICQoXCI8ZGl2IGNsYXNzPSdkZXRhaWwtaGVhZGVyJz5cIilcclxuICAgICAgICAgICAgLy8gICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdmb3JtKFwic2V0dXBcIiwgdGhpcy5nZXRGb3JtT3B0aW9ucygpKVxyXG4gICAgICAgICAgICAvLyAgICAvLyNyZWdpb24gTmVsemUgcG91eml0IC0gemF6bmFteSBuZW1hamkgaXhwXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIC8vICAgIC5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIilcclxuICAgICAgICAgICAgLy8gICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMDI1MDA5NFwiKSAvL1JDIDMwMjUwMDk0IDogRXZpZGVuxI1uw60gxI3DrXNsbyBkYcWIb3bDqWhvIGRva2xhZHVcclxuICAgICAgICAgICAgLy8gICAgLmdzdHJpbmdib3goeyBuYW1lOiBcImVjX2RkXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzAyNTAwOTVcIikuZ3N0cmluZ2JveCh7IG5hbWU6IFwiZGljXCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMzAyNTAwOTUgOiBEScSMIGRvZGF2YXRlbGUgLyBvZGLEm3JhdGVsZVxyXG4gICAgICAgICAgICAvLyAgICAuZ2Zvcm0oXCJjb21wbGV0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgJChmb3JtJCkuZ2Zvcm0oXCJ2aWV3TW9kZVwiLCBcInZpZXdcIik7XHJcbiAgICAgICAgICAgIC8vICAgIHdycCQuZ3RhYih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMDk2XCIsIC8vUkMgMzAyNTAwOTYgOiBEb2tsYWRcclxuICAgICAgICAgICAgLy8gICAgICAgIG9wZW5lZDp0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2Zvcm0kLmRldGFjaCgpLmFwcGVuZFRvKHdycCQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYlJhZGt5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC8vLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGl0bGU6IFwieHhcIiwgLy9SQyAzMDI1MDA0MiA6IFDFmWVka29udGHEjW7DrSBwxZllZHBpc3lcclxuICAgICAgICAgICAgICAgIC8vICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgeyBpZDogXCJJRG1udXROb3Z5XCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE5vdnksIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL11cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLyp2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rzc3VkTW9kRHRvPih0aGF0LmRhdGEpOyovXHJcblxyXG4gICAgICAgICAgICAvL2xldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4odGhhdC5kYXRhLCB7IHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH0gfSk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcml0IGdyaWRcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWJSYWRreSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcImNlbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtYXJraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy91c2VyU2V0dGluZ3M6IHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5pZCBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJwb3Bpc1wiXSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFsUGFyYW1zLlJhZF9SenAgJiYgdGhhdC5nbG9iYWxQYXJhbXMuUlBaX1Bvdm9sZW5pX01lbml0X0hvZG5vdHkpIHtcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRjZWxsZWRpdG9yKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICwgYmVmb3JlU3RvcDogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuU3B1c3RWeXBvY2V0KG9iai5jZWxsSW5mby5kYXRhIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rzc3VkTW9kRHRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnZpZXcudXBkYXRlRGF0YVJhdyhyb3cgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdyaWQuZ2F1dG9maXQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFZhbHVlcyhkZXRhaWwpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxQYXJhbXMuUmFkX1J6cCAmJiB0aGF0Lmdsb2JhbFBhcmFtcy5SUFpfUG92b2xlbmlfTWVuaXRfSG9kbm90eSkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZGNlbGxlZGl0b3IoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRBY3Rpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXByYXZhIHZpZGl0ZWxub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHNldEFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsUGFyYW1zLlJhZF9SenAgJiYgdGhpcy5nbG9iYWxQYXJhbXMuUlBaX1Bvdm9sZW5pX01lbml0X0hvZG5vdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VWxveml0IS51cGRhdGUoeyBlbmFibGVkOiAhdGhpcy5lcnJvciAmJiB0aGlzLm1vZGlmaWVkLCB0b29sdGlwOlwiXCIgfSk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVsb3ppdCEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6XCJqcmVzOjMwMjUwNjM1XCIgfSk7IC8vUkMgMzAyNTA2MzUgOiBOZW7DrSBwb3ZvbGVubyBwYXJhbWV0cmVtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBwcmltLiBkb2tsYWR1XHJcbiAgICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd1ByaW1Eb2tsYWQoaXhwOiBzdHJpbmcsIHR5cEFnOiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHR5cEFnICE9PSBudWxsICYmICFbNDAsIDUwLCA3MCwgODAsIDEwMCwgMTEwLCAxMjAsIDE4MCwgMjMwLCA1MTAsIDU4MCwgNjIwLCAzMzBdLmNvbmNhdCh0eXBBZyBhcyBudW1iZXIpKVxyXG4gICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vR29yZGljLldlYkFwcC5VdGlsaXR5Lm9wZW5BcHAoXHJcbiAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGl4eDE6IGl4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpeHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgLy8gICAgICAgIGl4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgdHlwQWc6IHR5cEFnLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgLy8gICAgICAgIGJhbkN1cnJlbnRBcHA6IHRydWUsIC8vIHDFmcOtem5hayB6w6FrYXp1IHBvdcW+aXTDrSBha3R1w6FsbsOtIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgbm9BcHBGYWlsOiB0cnVlICAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKSBcclxuICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgLy8gICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgaWYgKHR5cEFnICE9PSBudWxsICYmICFbNDAsIDUwLCA3MCwgODAsIDEwMCwgMTEwLCAxMjAsIDE4MCwgMjMwLCA1MTAsIDU4MCwgNjIwLCAzMzBdLmNvbmNhdCh0eXBBZyBhcyBudW1iZXIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB0ZXN0IG5hIHZ5cGxlbmluaSBpeHBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpeHAgPT09IFwidW5kZWZpbmVkXCIgfHwgaXhwID09PSBudWxsKSByZXR1cm5cclxuXHJcbiAgICAgICAgICAgIC8vV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhpcy5wYXJlbnRDbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogaXhwIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4eDE6IGl4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9peHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvL2l4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cEFnOiB0eXBBZywgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF6ZTogbnVsbCwgIC8vIGbDoXplIHBvxb5hZG92YW7DoSBwcm8gb3RldsWZZW7DrSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgYmFuQ3VycmVudEFwcDogdHJ1ZSwgLy8gcMWZw616bmFrIHrDoWthenUgcG91xb5pdMOtIGFrdHXDoWxuw60gZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9BcHBGYWlsOiBmYWxzZSAgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSkgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhhdCwgeyBTaW1wbGVNb2RlOiBmYWxzZSwgLypJeHBJbml0UHJvVmF6YnVTb3V2aXNlamljaWNoOiBpeHAhLCovIERldGFpbER0bzogeyBpeHA6IGl4cCEgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSB6bWVuXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHVsb3ppdCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGR0b0RhdGFTYXZlOiBHUmVnaXN0cklERHRvID0ge307XHJcbiAgICAgICAgICAgIC8vIHBvc2JpcmFuIGRhdGEgeiBmb3JtdWxhcmVcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0b0RhdGFTYXZlKVxyXG4gICAgICAgICAgICAvLyBwcmVkYW0gZG8gcHJlZGF2YWNpaG8gZHRvIGR0b1xyXG4gICAgICAgICAgICBsZXQgcmFkZWtSZWdpc3RydSA9IHRoaXMuaW5wdXRQYXJhbXMucm93IGFzIEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG87XHJcbiAgICAgICAgICAgIHJhZGVrUmVnaXN0cnUhLml4cCA9IGR0b0RhdGFTYXZlLml4cFxyXG4gICAgICAgICAgICAvL3JhZGVrUmVnaXN0cnU/LnVleF9yZWcgPSBkdG9EYXRhU2F2ZS51ZXhfcmVnO1xyXG4gICAgICAgICAgICByYWRla1JlZ2lzdHJ1IS56a3JfYWcgPSBkdG9EYXRhU2F2ZS56a3JfYWc7XHJcblxyXG4gICAgICAgICAgICBsZXQgaG9kbm90eTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuR2V0R3JpZCh0aGF0KTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBob2Rub3R5ID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkdldEFsbFJvd3MoZ3JpZCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjU4XCIpOyAvL1JDIDMwMjUwMjU4IDogUHJvdsOhZMOtbSB1a2zDoWTDoW7DrS4uLlxyXG4gICAgICAgICAgICB0aGF0LmlzbC5VY3JSZWdpc3RyWlAudXBzZXJ0KHsgbW9udGg6IHRoYXQuaW5wdXRQYXJhbXMubWVzaWMgYXMgbnVtYmVyLCByb3c6IHJhZGVrUmVnaXN0cnUsIGhvZG5vdHk6IGhvZG5vdHkgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0IS50eXBBZyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRQYXJhbXMucm93IS5peHAgPSBkdG9EYXRhU2F2ZS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRQYXJhbXMucm93IS56a3JfYWcgPSBkdG9EYXRhU2F2ZS56a3JfYWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRQYXJhbXMucm93IS50eXBfYWcgPSB0aGF0IS50eXBBZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaG9kbm90eS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoYXQuaW5wdXRQYXJhbXMuQ29sdW1ucyEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW4gPSB0aGF0LmlucHV0UGFyYW1zLkNvbHVtbnMhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5OYW1lID09PSBcIkhcIiArIGl0ZW0uaXhzX3N1ZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRQYXJhbXMucm93IVtcIkhcIiArIGl0ZW0uaXhzX3N1ZF0gPSB0aGF0LmdldFZhbHVlKGl0ZW0udmgsIGNvbHVtbi5UeXAhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0UGFyYW1zLnJvdyFbXCJIXCIgKyBpdGVtLml4c19zdWQgKyBcIl9oXCJdID0gdGhhdC5pbnB1dFBhcmFtcy5yb3chW1wiSFwiICsgaXRlbS5peHNfc3VkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuaW5wdXRQYXJhbXMucm93IVtcImhcIl0gPSBpdGVtLmg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgY29sdW1uID0gdGhhdC5pbnB1dFBhcmFtcy5Db2x1bW5zPy5maW5kKGNvbHVtbiA9PiBcIkhcIiArIGl0ZW0uaXhzX3N1ZCA9PSBjb2x1bW4uQ2FwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmlucHV0UGFyYW1zLnJvdyFbXCJ2aFwiXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmlucHV0UGFyYW1zLnJvdyFbXCJoXCJdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAyNTAyNTlcIiAvL1JDIDMwMjUwMjU5IDogVWxvxb5lbsOtIHByb3ZlZGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXRlOiBcInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXZyYXQgaG9kbm90eSB2IHBvemFkb3ZhbmVtIGZvcm1hdHVcclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldFZhbHVlKHZhbHVlOiBhbnksdHlwZTpudW1iZXIpOiBhbnkge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAxMCkvLyBudW1iZXJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMzApLy8gZGF0dW1cclxuICAgICAgICAgICAgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vbGV0IHMzID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFwiMjAyMi0wMS0wMVQwMDowMDowMC4wMDBaXCIsIFwieXl5eU1NZGRoaG1tXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZyYWdzOnN0cmluZ1tdID0gdmFsdWUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyYWdzLmxlbmd0aCAhPSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc051bWVyaWMoZnJhZ3NbMl0pIHx8ICFpc051bWVyaWMoZnJhZ3NbMV0pIHx8ICFpc051bWVyaWMoZnJhZ3NbMF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChmcmFnc1syXSksIHBhcnNlSW50KGZyYWdzWzFdKS0xLCBwYXJzZUludChmcmFnc1swXSkpOyAvLyBtZXNpY2UgemFjaW5hamkgb2QgMCB2IEpTIVxyXG4gICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5EYXRlVGltZS5pc1ZhbGlkKGRhdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICBsZXQgbW9tID0gbW9tZW50KHZhbHVlLCAnREQuTU0uWVlZWScsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyAgICBpZiAobW9tLmlzVmFsaWQoKSlcclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBtb20udG9EYXRlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gNDApLy8gZGVjXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkOyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSAvLyBzdHJpbmdcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG8+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkhvZG5vdHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMjU2XCIsICAvL1JDIDMwMjUwMjU2IDogUG92aW5uw6lcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uVGVtcGxhdGU6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIChyb3cucG92X3N1ZCE+MCkgPyB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlXCIsIHRleHQ6IFwiQU5PXCIgfSA6IHsgaWNvbjogXCJcIiwgdGV4dDogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IHJvdyA9PiAocm93LnBvdl9zdWQhID4gMCkgPyBuZXcgR29yZGljLlV0aWxzLkljb25CdWlsZGVyKCkuY3JlYXRlSWNvbih7IGljb246IFwiZmEtY2hlY2stY2lyY2xlXCIgfSkgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogcm93ID0+IChyb3cucG92X3N1ZCEgPiAwKSA/IFwianJlczozMDI1MDI1N1wiIC8vUkMgMzAyNTAyNTcgOiBQb3Zpbm7DoSBwb2xvxb5rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczozMDI1MDIzM1wiLCAvL1JDIDMwMjUwMjMzIDogTkVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5MVwiLCAgLy9SQyAzMDI1MDA5MSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6a3JhdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjY3XCIsICAvL1JDIDMwMjUwMjY3IDogWmtyYXRrYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhaFwiLCAvL1JDIDMwMjUwMjQ4IDogU3lzdMOpbW92w6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI0OFwiLCAgLy9SQyAzMDI1MDI0OCA6IFN5c3TDqW1vdsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IHJvdyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuYWh0ID09PSAyIHx8IHJvdy5haHQgPT09IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5VdGlscy5JY29uQnVpbGRlcigpLmNyZWF0ZUljb24oeyBpY29uOiBcImZhLWluZm8tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIiB9KSArIFwiICZuYnNwOyBcIityb3cuYWghO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyb3cuYWh0ID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gbmV3IEdvcmRpYy5VdGlscy5JY29uQnVpbGRlcigpLmNyZWF0ZUljb24oeyBpY29uOiBcImdpLWluZm9cIiB9KSArIFwiICBcIiArcm93LmFoITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLlV0aWxzLkljb25CdWlsZGVyKCkuY3JlYXRlSWNvbih7IGljb246IFwiZmEtaW5mby1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiIH0pICsgXCIgJm5ic3A7IFwiICsgcm93LmFoITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocm93LmFodCA9PT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLlV0aWxzLkljb25CdWlsZGVyKCkuY3JlYXRlSWNvbih7IGljb246IFwiZmEtaW5mby1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiIH0pICsgXCIgJm5ic3A7IFwiICtyb3cuYWghO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93LmFoITtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogcm93ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5haHQgPT09IDIgfHwgcm93LmFodCA9PT0gNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTAyNjBcIjsgLy9SQyAzMDI1MDI2MCA6IFplIHN5c3TDqW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvdy5haHQgPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwMjYxXCI7IC8vUkMgMzAyNTAyNjEgOiBQxZllZG5hc3RhdmVuw6EgaG9kbm90YSAodHZyZMOhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyb3cuYWh0ID09PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDI2MlwiOyAvL1JDIDMwMjUwMjYyIDogUMWZZWRuYXN0YXZlbsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5haCE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjQ3XCIsICAvL1JDIDMwMjUwMjQ3IDogVcW+aXZhdGVsc2vDoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAocm93LCBtZXRhcm93LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm93LmgpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy50eXBfc3VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOiAvLyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyb3cuaCBhcyBhbnksIFwiTlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzA6IC8vIGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJvdy5oIGFzIGFueSkgaW5zdGFuY2VvZiBEYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocm93LmgsIFwiZGQuTU0ueXl5eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3cuaDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDogLy8gc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5oO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6IC8vIGRlY2ltYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyb3cuaCBhcyBhbnksXCJDXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93Lmg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocm93LmFodCA9PT0gMiB8fCByb3cuYWh0ID09PSA0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gbmV3IEdvcmRpYy5VdGlscy5JY29uQnVpbGRlcigpLmNyZWF0ZUljb24oeyBpY29uOiBcImZhLWluZm8tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIiB9KSArIFwiICZuYnNwOyBcIiArIHJvdy5haCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAocm93LmFodCA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9yZXR1cm4gbmV3IEdvcmRpYy5VdGlscy5JY29uQnVpbGRlcigpLmNyZWF0ZUljb24oeyBpY29uOiBcImdpLWluZm9cIiB9KSArIFwiICBcIiArcm93LmFoITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIG5ldyBHb3JkaWMuVXRpbHMuSWNvbkJ1aWxkZXIoKS5jcmVhdGVJY29uKHsgaWNvbjogXCJmYS1pbmZvLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIgfSkgKyBcIiAmbmJzcDsgXCIgKyByb3cuYWghO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgaWYgKHJvdy5haHQgPT09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShyb3cuaCwgXCJkZC5NTS55eXl5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiByb3cuYWghO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6ICghdGhhdC5nbG9iYWxQYXJhbXMuUmFkX1J6cCB8fCAhdGhhdC5nbG9iYWxQYXJhbXMuUlBaX1Bvdm9sZW5pX01lbml0X0hvZG5vdHkpPyB1bmRlZmluZWQ6dGhpcy5jcmVhdGVFZGl0b3JcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2aFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNDlcIiwgIC8vUkMgMzAyNTAyNDkgOiBWeWthem92YW7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZW5pIGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEdldEdyaWQoY29udGVudDogR0NvbnRlbnQpOiBKUXVlcnl8bnVsbCB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gY29udGVudC5lbGVtZW50LmZpbmQoXCIuZ2dyaWQuanMtdWNyRGV0YWlsUmVnaXN0clwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCA9PSAwID8gbnVsbCBhcyBhbnkgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGVkaXRhY25paG8gcG9saWNrYVxyXG4gICAgICAgICAqIEBwYXJhbSBlZGl0b3JDb250ZXh0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVFZGl0b3IoZWRpdG9yQ29udGV4dDogeyBjZWxsSW5mbzogQ2VsbEluZm88R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG8+IH0pOiBHR3JpZENvbHVtbkVkaXRvck9wdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChlZGl0b3JDb250ZXh0LmNlbGxJbmZvLmRhdGEudHlwX3N1ZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDogLy8gbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGFydDogYWxlcnQoXCJzdGFydCBNRFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMCwgdHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhcIiwgY3VzdG9tQ2xhc3M6IFwianMtaFwiLyosIG1vZGVsOiBcIm1vZGVsLmMwPXZhbHVlXCIsKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBcIlwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMwOiAvLyBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdkYXRlYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhcIiwgY3VzdG9tQ2xhc3M6IFwianMtaFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDpcIm1vZGVsLmg9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRWYWx1ZSBhcyBhbnkpIGluc3RhbmNlb2YgRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUoZmllbGRWYWx1ZSwgXCJkZC5NTS55eXl5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuVHlwZTogXCJzdHJpbmdcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogXCJcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMDogLy8gc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGFydDogYWxlcnQoXCJzdGFydCBNRFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaFwiLCBjdXN0b21DbGFzczogXCJqcy1oXCIsLyosIG1vZGVsOiBcIm1vZGVsLmMwPXZhbHVlXCIsKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5UeXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IFwiXCIsXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gZGVjaW1hbFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc3RhcnQ6IGFsZXJ0KFwic3RhcnQgTURcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5kZWNpbWFsKDIsIHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoXCIsIGN1c3RvbUNsYXNzOiBcImpzLWhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5UeXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IFwiXCIsXHJcblxyXG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0OiBhbGVydChcInN0YXJ0IE1EXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoXCIsIGN1c3RvbUNsYXNzOiBcImpzLWhcIi8qLCBtb2RlbDogXCJtb2RlbC5jMD12YWx1ZVwiLCovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcHVzdFZ5cG9jZXQocm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0c3N1ZE1vZER0byk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rzc3VkTW9kRHRvIHtcclxuICAgICAgICAgICAgbGV0IHJlcCA9IHJvdy5zdWRfcmVwO1xyXG4gICAgICAgICAgICBsZXQgaCA9IHJvdy5oPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGggPT09IFwidW5kZWZpbmVkXCIgfHwgaCA9PT0gbnVsbCB8fCBoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhaHQgPSByb3cuYWh0Oy8vcGFyc2VJbnQocm93LmFodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWh0ID09IDQpIHJlcCA9IFwiU1BcIjtcclxuICAgICAgICAgICAgICAgIGggPSByb3cuYWg/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG0gPSB0aGlzLmlucHV0UGFyYW1zLm1lc2ljIS0xO1xyXG4gICAgICAgICAgICBpZiAobT4gMTEpIG0gPSAxMTtcclxuICAgICAgICAgICAgaWYgKG0gPCAwKSBtID0gMDtcclxuICAgICAgICAgICAgLy9sZXQgZGF0dW0gPSBuZXcgRGF0ZSh0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shLCBtLCAxKTtcclxuICAgICAgICAgICAgbGV0IGR0ID0gbmV3IERhdGUodGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rISwgbSwgMSk7XHJcbiAgICAgICAgICAgIGxldCBkYXQgPSBHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuYWRkKGR0LCAxLCBcIm1vbnRoc1wiKTtcclxuICAgICAgICAgICAgZGF0ID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLmFkZChkdCwgLTEsIFwiZGF5c1wiKVxyXG4gICAgICAgICAgICAvL2xldCBkYXQgPSBtb21lbnQoeyB5ZWFyOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shLCBtb250aDogbSwgZGF5OjEgfSkuYWRkKDEsICdtb250aHMnKS5hZGQoLTEsIFwiZGF5c1wiKTtcclxuICAgICAgICAgICAgLy9sZXQgZGF0dW0gPSBkYXQudG9EYXRlKCk7XHJcbiAgICAgICAgICAgIC8vbW9tZW50LlxyXG4gICAgICAgICAgICAvLyAgICAuQWRkTW9udGhzKDEpLkFkZERheXMoLTEpO1xyXG4gICAgICAgICAgICByb3cudmggPSB0aGlzLlZ6b3JlYyhyZXAhLCBoISwgZGF0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Wem9yZWMgcHJvIHbDvXBvxI1ldCBTVUQgaG9kbm90PC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgVnpvcmVjKHN1ZFJlcDogc3RyaW5nLCB2YWw6IHN0cmluZywgYXV0b0RhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSBcIlwiKSByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICBzdWRSZXAgPSBzdWRSZXAudHJpbSgpO1xyXG4gICAgICAgICAgICAvL3RyeSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1ZFJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTUE1cIjogLy9TcGxhdG5vc3QgPSBrIGRhdHUgKyBtxJtzw61jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHQgPSBHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuYWRkKGF1dG9EYXRlLCAtMSAqIGF1dG9EYXRlLmdldERheSgpLCBcImRheXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdCA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5hZGQoZHQsIHBhcnNlSW50KHZhbCkgKyAxLCBcIm1vbnRoc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShkdCwgXCJkZC5NTS55eXl5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgZCA9IGF1dG9EYXRlLnN1YnRyYWN0KGF1dG9EYXRlLmRheSgpLCBcImRheXNcIikuYWRkKHZhbCArIDEsIFwibW9udGhzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kID0gbmV3IG1vbWVudCh7IHllYXIgYXV0b0RhdGUueWVhcigpLCBhdXRvRGF0ZS5tb250aCgpLCAxfSkuQWRkKHZhbCArIDEsIFwibW9udGhzXCIpLkFkZERheXMoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EYXRlVGltZSBkID0gbmV3IERhdGVUaW1lKGF1dG9EYXRlLlllYXIsIGF1dG9EYXRlLk1vbnRoLCAxKS5BZGRNb250aHMoSW50MzIuUGFyc2UodmFsKSArIDEpLkFkZERheXMoLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGR0LmZvcm1hdChcIkRELk1NLllZWVlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBhdXRvRGF0ZS5BZGRNb250aHMoSW50MzIuUGFyc2UodmFsKSkuVG9TdHJpbmcobmV3IEdUYkdEYXRlKCkuUGF0dGVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiU1BEUE1cIjogLy9TcGxhdG5vc3QgPSBrIGRhdHUgKyBkbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0ID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLmFkZChhdXRvRGF0ZSwgcGFyc2VJbnQodmFsKSwgXCJkYXlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRlKGR0LCBcImRkLk1NLnl5eXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkID0gYXV0b0RhdGUuYWRkKHZhbCwgXCJkYXlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EYXRlVGltZSBkID0gYXV0b0RhdGUuQWRkRGF5cyhJbnQzMi5QYXJzZSh2YWwpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGQuZm9ybWF0KFwiREQuTU0uWVlZWVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlNQRENUXCI6IC8vU3BsYXRub3N0ID0ga2UgxI10dnJ0bGV0w60gKyBkbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0ID0gbmV3IERhdGUoYXV0b0RhdGUuZ2V0RnVsbFllYXIoKSwgYXV0b0RhdGUuZ2V0TW9udGgoKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGR0LmdldE1vbnRoKCkgJSAzKSAhPSAwKSBkdCA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5hZGQoZHQsIDEsIFwibW9udGhzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHQgPSBHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuYWRkKGR0LCBwYXJzZUludCh2YWwpLCBcImRheXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUoZHQsIFwiZGQuTU0ueXl5eVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkID0gbW9tZW50KFthdXRvRGF0ZS55ZWFyKCksIGF1dG9EYXRlLm1vbnRoKCksMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy93aGlsZSAoKGQubW9udGgoKSAlIDMpICE9IDApIGQgPSBkLmFkZCgxLCBcIm1vbnRoc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZCA9IGF1dG9EYXRlLmFkZCh2YWwsIFwiZGF5c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy9kID0gZC5BZGREYXlzKEludDMyLlBhcnNlKHZhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZC5mb3JtYXQoXCJERC5NTS5ZWVlZXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiU1BES1JcIjogLy9TcGxhdG5vc3QgPSBrIDEuMTIuICsgZG55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdCA9IG5ldyBEYXRlKGF1dG9EYXRlLmdldEZ1bGxZZWFyKCksIDExLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0ID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLmFkZChkdCwgcGFyc2VJbnQodmFsKSAtIDEsIFwiZGF5c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShkdCwgXCJkZC5NTS55eXl5XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGQgPSBtb21lbnQoW2F1dG9EYXRlLnllYXIoKSwgMTEsIDFdKS5hZGQocGFyc2VJbnQodmFsKSAtIDEsIFwiZGF5c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vRGF0ZVRpbWUgZCA9IG5ldyBEYXRlVGltZShhdXRvRGF0ZS5ZZWFyLCAxMiwgMSkuQWRkRGF5cyhJbnQzMi5QYXJzZSh2YWwpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkLmZvcm1hdChcIkRELk1NLllZWVlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICgodmFsIGFzIGFueSkgaW5zdGFuY2VvZiBEYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUodmFsLCBcImRkLk1NLnl5eXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGb3JtT3B0aW9ucygpOiBHRm9ybU9wdGlvbnMge1xyXG4gICAgICAgICAgICAvL2lmIChtb2RlPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4geyBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMiwgTC0zLTktMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTAsIGJyZWFrcy04MDAtMTE5MFwiLCBuYW1lOiBcImhlYWRGb3JtXCIgfTtcclxuICAgICAgICAgICAgLy9lbHNlIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMy05LTAsIE0tMy05LTAsIFMtMTItMTItMCwgYnJlYWtzLTMwMC01MDBcIiwgbmFtZTogXCJoZWFkRm9ybVwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXBsbmVuaSBkYXRcclxuICAgICAgICAgKiBAcGFyYW0gZm9ybVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZmlsbFZhbHVlcyhmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAvLyB7IGluaXRpYWxWYWx1ZXM6IHRydWV9IC0gbmV2eXZvbGEgc2UgdWRhbG9zdCBjaGFuZ2UgcG8gbmFwbG5lbmkgZGF0XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlICAtIG5ldnl2b2xhIHNlIHZhbGlkYWNlIHogZGF0YWJhemUsIHpkYSBqZSBob2Rub3RhIG9rXHJcblxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5pbnB1dFBhcmFtcywgeyBpbml0aWFsVmFsdWVzOiB0cnVlLCBzZXRGbGFnczogeyB0cmlnZ2VyQ2hhbmdlOiBmYWxzZSB9IH0pIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2VcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG8+KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoaXMuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQubW9kaWZpZWQpIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgcm93OiB0aGF0LmlucHV0UGFyYW1zLnJvdyB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==
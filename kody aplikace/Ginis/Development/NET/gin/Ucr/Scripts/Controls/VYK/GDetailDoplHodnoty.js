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
            /**
             * Typ kopie
             * */
            //const enum GETypKopie {
            //    Predchazejici,
            //    Vybrane
            //}
            var a;
            let GDetailDoplHodnoty = class GDetailDoplHodnoty extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GDetailDoplHodnoty#";
                    // Editovatelny gridu
                    //private editGrid: JQuery;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-ucrDopln";
                    // atribut editace
                    this.editing = false;
                    // znovunacnteni dat
                    this.reload = false;
                }
                prepareContent(options) {
                    if (!options)
                        return;
                    this.init(options);
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init(options) {
                    if (!options)
                        return;
                    let that = this;
                    // pocatecni nastaveni atributu
                    that.reload = false;
                    that.editing = false;
                    this.inputValues = options;
                    this.title = this.inputValues.currentRow.vykaz;
                    // akce
                    this.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionUlozit({
                            enabled: false, visible: false,
                            run: function () {
                                this.setPending(that.Save());
                            }
                        }),
                        actCopy: {
                            name: "actKopy",
                            caption: "jres:30250063", //RC 30250063 : Kopírovat z vybraného období
                            visible: false,
                            enabled: false,
                            icon: "fa-clone",
                            run: function (ev, ctx) {
                                this.setPending(that.CopySelect());
                            }
                        },
                        actCopyPreview: {
                            name: "actCopyPreview",
                            caption: "jres:30250072", //RC 30250072 : Kopírovat z předchozího období
                            icon: "fa-clone",
                            visible: false,
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.CopyPreview());
                            }
                        },
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: false, visible: false, run: function () {
                                that.NovyRadek();
                            }
                        }),
                        actOdstranit: Gordic.Eko.Action.actionOdstranit({
                            enabled: false, visible: false, run: function () {
                                this.setPending(that.OdstranitRadek());
                            }
                        }),
                        actVycistit: {
                            name: "actVycistit",
                            caption: "jres:30250105", //RC 30250105 : Vyčistit
                            icon: "gi-koste",
                            visible: false,
                            enabled: false,
                            run: function (ev, ctx) {
                                that.findFields().gfield("setValue", "");
                                //this.setPending(that.CopyPreview());
                            }
                        },
                    });
                    //if (!that.inputValues.viewMode)
                    //that.myPanel = $.newDiv()
                    //    .appendTo(this.element)
                    //    .gtab({
                    //        title: "jres:30250064", //RC 30250064 : Hodnoty
                    //        opened: true, locked: true, visible:true, // !that.inputValues.viewMode,
                    //        headerClass: that.inputValues.viewMode ? "hidden" : "",
                    //        menuBar: [
                    //            { id: "IDmnuUlozit", action: this.actions.actUlozit, favorite: true },
                    //            { id: "IDmnuNovy", action: this.actions.actNovy, favorite: true },
                    //            { id: "IDmnuOdstranit", action: this.actions.actOdstranit, favorite: true },
                    //            { id: "IDmnuVycistit", action: this.actions.actVycistit, favorite: true },
                    //            { id: "IDmnuKopie", action: this.actions.actCopy, favorite: true },
                    //            { id: "IDmnuKopiePreview", action: this.actions.actCopyPreview, favorite: true },
                    //        ]
                    //    });
                    that.myPanel = this.element;
                    this.menuBar([
                        { id: "IDmnuUlozit", action: this.actions.actUlozit, favorite: true },
                        { id: "IDmnuNovy", action: this.actions.actNovy, favorite: true },
                        { id: "IDmnuOdstranit", action: this.actions.actOdstranit, favorite: true },
                        { id: "IDmnuVycistit", action: this.actions.actVycistit, favorite: true },
                        { id: "IDmnuKopie", action: this.actions.actCopy, favorite: true },
                        { id: "IDmnuKopiePreview", action: this.actions.actCopyPreview, favorite: true },
                    ]);
                    that.loadSloupce(that.inputValues.currentRow)
                        .then((res) => {
                        that.inputValues.cols = res;
                        that.createCols(that.inputValues.currentRow, that.inputValues.cols);
                        return;
                    });
                    if (!that.inputValues.viewMode) {
                        // zjisteni, zda je kopie z minuleho obdobi
                        that.isl.UcrVykazAdm.historie({
                            ixs_vkz: that.inputValues.currentRow.mainId, kod_cast_vkz: that.getId(that.inputValues.currentRow.parentId),
                            por_cislo: parseInt(that.getId(that.inputValues.currentRow.id)),
                            topologie: that.inputValues.topologie
                        }).get()
                            .then(function (result) {
                            //that.actions.actCopy!.update({
                            //    enabled: result.isHistory as boolean
                            //    , visible: result.isHistory as boolean
                            //}
                            //);
                            var text = "jres:30250072"; //RC 30250072 : Kopírovat z předchozího období
                            if (result.isHistory) {
                                text = "jres:30250073"; //RC 30250073 : Kopírovat z předchozího období {0}/{1}
                                text = text.format(result.mesic?.toString(), result.rok?.toString());
                            }
                            that.actions.actCopyPreview.update({
                                enabled: result.isHistory,
                                visible: result.isHistory,
                                caption: text
                            });
                            return;
                        });
                        // zjisteni, zda lze vybirat z jinych obdobi pro kopii
                        that.isl.UcrVykazAdm.listHistorie({
                            ixs_vkz: that.inputValues.currentRow.mainId, kod_cast_vkz: that.getId(that.inputValues.currentRow.parentId),
                            por_cislo: parseInt(that.getId(that.inputValues.currentRow.id)),
                            topologie: that.inputValues.topologie
                        }).get()
                            .then(function (result) {
                            that.actions.actCopy.update({
                                enabled: result.length > 1,
                                visible: result.length > 1
                            });
                            return;
                        });
                        // prikazova lista
                        that.commandBar([
                            {
                                id: "idSave",
                                favorite: true,
                                action: this.actions.actUlozit
                            },
                            {
                                id: "idclosedetail",
                                customClass: "g-button--primary",
                                action: new GAction({ name: "actClose", caption: "jres:30250068", run: function () { that.tryClose(); } }) //RC 30250068 : Zavřít
                            },
                        ]);
                    }
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
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    //if (that.inputValues.currentRow.priz_opak !== 1) {
                    // zjisteni zmen
                    if (that.inputValues.currentRow.priz_opak === 0) {
                        that.editing = false;
                        var fields = that.findFields();
                        for (var i = 0; i < fields.length; i++) {
                            if (fields.gfield("hasChanged")) {
                                that.editing = true;
                                break;
                            }
                        }
                    }
                    if (that.editing && !that.inputValues.viewMode) {
                        // v editačním režimu (tj. i po podání) dotaz na zavření bez uložení
                        this.dialogs.messageBox("jres:30250070" //RC 30250070 : Upozornění
                        , "jres:30250069", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250069 : Opravdu chcete zavřít detail bez uložení?
                            .on("yes", function () {
                            def.resolve({ refresh: that.reload && !that.inputValues.viewMode });
                            //(that!.parentContent as GSeznamDoplnkoveUdaje).$grid.ggrid("focus");
                        })
                            .on("close", def.reject);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        //(that!.parentContent as GSeznamDoplnkoveUdaje).$grid.ggrid("focus");
                        def.resolve({ refresh: that.reload && !that.inputValues.viewMode });
                    }
                    return def.promise();
                }
                /**
                 * Odstranit radek
                 *
                 * */
                OdstranitRadek() {
                    let that = this;
                    let def = $.Deferred();
                    let grid = that.getGrid();
                    if (grid == null)
                        return def.reject().promise();
                    if (Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0) {
                        // aktualni radek
                        var currentRow = that.inputValues.currentRow;
                        Gordic.Eko.WebClient.Common.GetView(grid).updateData(Gordic.Eko.Grid.currentRow(grid), "delete");
                        that.editing = true;
                        return def.resolve();
                        //var saveDto = [];
                        //var dtoSave = Gordic.Eko.WebClient.Common.GetAllRows(that.editGrid);
                        //var row = Gordic.Eko.Grid.currentRow(that.editGrid);
                        //for (var item in row) {
                        //    var name = item;
                        //    //if (!(name.length > 1 && name[0] == 'h')) continue;
                        //    var pol = { typ_du: parseInt(name.substr(1)), por_opak: row["por_opak"], value: "" };
                        //    saveDto.push(pol as never);
                        //}
                        //that.inputValues.editCols = saveDto;
                        //Gordic.Isl.UcrVykazAdm.saveValues({
                        //    ixs_vkz: currentRow.mainId as any, kod_cast_vkz: that.getId(currentRow.parentId as any)
                        //    , por_cislo: parseInt(that.getId(currentRow.id as any)), topologie: that.inputValues.topologie
                        //    , hodnoty: that.inputValues.editCols
                        //}).getData()
                        //    .done(function () {
                        //        that.showFlash({ state: "success", id: "idDeleteVal", timer: 2000, label: "jres:30250067" }) //RC 30250067 : Hodnoty odstraněny
                        //        Gordic.Eko.WebClient.Common.GetView(that.editGrid).updateData(Gordic.Eko.Grid.currentRow(that.editGrid), "delete");
                        //        that.setActions();
                        //        return def.resolve();
                        //    }).
                        //    always(() => { return def.resolve() });
                        //return def.promise();
                    }
                    return def.resolve().promise();
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    if (this.inputValues.currentRow?.priz_opak === 1) {
                        var pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                        this.actions.actOdstranit.update({ visible: pocetZapisu > 0, enabled: pocetZapisu > 0 });
                    }
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getId(src) {
                    var pos = src.indexOf("_");
                    if (pos > 0) {
                        //return src.substr(pos + 1);
                        return src.substring(pos + 1);
                    }
                    return src;
                }
                /**
                 * Nacteni hodnot
                 * @param filtr
                 */
                loadHodnoty(filtr) {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    let data = [];
                    //var resultData: JQueryPromise<Uct.Interface.GVyksvkzDto[]>;            
                    that.isl.UcrVykazAdm.listHodnoty({ ixs_vkz: filtr.mainId, kod_cast_vkz: that.getId(filtr.parentId), por_cislo: parseInt(that.getId(filtr.id)), topologie: this.inputValues.topologie }).getData()
                        .then(function (result) {
                        if (result != null && typeof result !== "undefined" && result.length > 0) {
                            // Prevod hodnot ve strukturu (Name:"",Value:"") do pole ([Name]=Value)
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].values && result[i].values.length > 0) {
                                    for (var j = 0; j < result[i].values.length; j++) {
                                        result[i][result[i].values[j].Name] = result[i].values[j].Value;
                                    }
                                }
                            }
                        }
                        return def.resolve(result);
                    });
                    return def.promise();
                }
                getCombo(pole, filedName, value) {
                    var data = [];
                    var initial = undefined;
                    for (var i = 1; i < pole.length; i++) {
                        var vv = pole[i].split('=');
                        var k, v;
                        if (vv.length > 1) {
                            k = vv[0];
                            v = vv[1];
                        }
                        else
                            k = v = vv[0];
                        var obj = { /*title: vv[1],*/ id: vv[0] };
                        obj[filedName] = vv[0];
                        if (vv.length < 2)
                            vv[1] = obj[filedName];
                        obj[filedName + "title"] = vv[1];
                        data.push(obj);
                        if (vv[0] == value /*input.value*/)
                            initial = obj;
                    }
                    if (data.length > 0 && typeof initial !== "undefined") {
                        var obj2 = { /*title: "(jres:30250071)",*/ id: -1 }; //RC 30250071 : vymazat hodnotu
                        obj2[filedName + "title"] = "(jres:30250071)";
                        obj2[filedName] = "";
                        data.push(obj2);
                    }
                    return { data: data, initial: initial };
                }
                /**
                 * Vytvoreni policka pro zadani hodnoty
                 * @param input
                 */
                createCol(input) {
                    var that = this;
                    if (!this.inputValues.editCols)
                        this.inputValues.editCols = [];
                    this.inputValues.editCols.push({ name: input.cel, por_opak: input.por_opak, combo: (input.pattern_du && input.pattern_du.substring(0, 5) /*input.pattern_du.substr(0, 5)*/ === "#comb" ? true : false) });
                    if (input.type === 2 /* GETypeValue.String */) {
                        if (input.grid) {
                            this.myGridFormat.addTextColumn({
                                name: input.cel,
                                caption: input.title,
                                sortable: false,
                                editor: {
                                    widget: "gformbox", options: {
                                        name: input.cel,
                                        disabled: this.inputValues.viewMode,
                                        model: input.cel + "=value.text",
                                        itemTemplate: "{text}",
                                        dialogOptions: { width: 500 },
                                        mode: "inlineimmediate",
                                        form: new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" })
                                            .addField("gstringbox", {
                                            name: "text",
                                            customClass: "js-ucrFullScreen",
                                            disabled: this.inputValues.viewMode,
                                            validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                            wrap: true,
                                            rows: 3,
                                            autoSize: true
                                        })
                                    }
                                },
                            });
                            //}
                        }
                        else {
                            input.form.addRow({ label: input.title, name: "l" + input.cel }).addField("gstringbox", {
                                customClass: "js-ucrFullScreen",
                                name: input.cel,
                                disabled: this.inputValues.viewMode,
                                validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                initialValue: input.value,
                                wrap: true,
                                rows: 3,
                                autoSize: true //this.inputValues.viewMode
                            });
                        }
                    }
                    else if (input.type === 6 /* GETypeValue.Combo */) {
                        // vytvoreni pole ciselniku
                        var res = this.getCombo(input.pattern_du.split('|'), input.cel, input.data.h1);
                        var data = res.data;
                        var initial = res.initial;
                        if (input.grid) {
                            this.myGridFormat.addTextColumn({
                                name: input.cel,
                                caption: input.title,
                                field: input.cel + "title",
                                sortable: false,
                                editor: {
                                    widget: "gselectbox", options: {
                                        name: input.cel, multi: false, list: false,
                                        dropdown: true,
                                        model: "model." + input.cel + "=value." + input.cel + ";model." + input.cel + "title=value." + input.cel + "title",
                                        itemTemplate: "{" + input.cel + "title}"
                                        //, initialValue: initial
                                        ,
                                        disabled: this.inputValues.viewMode,
                                        data: data
                                    }
                                },
                            });
                        }
                        else {
                            input.form.addRow({ label: input.title, name: "l" + input.cel })
                                .addField("gselectbox", {
                                name: input.cel, multi: false, list: false,
                                dropdown: true,
                                model: "model." + input.cel + "=value." + input.cel + ";model." + input.cel + "title=value." + input.cel + "title",
                                itemTemplate: "{" + input.cel + "title}",
                                initialValue: initial,
                                disabled: this.inputValues.viewMode,
                                data: data
                            });
                        }
                    }
                    else if (input.type === 3 /* GETypeValue.Number */) {
                        if (input.grid) {
                            this.myGridFormat.addTextColumn({
                                name: input.cel,
                                caption: input.title,
                                //formatPreset: "#0,00",
                                cellTemplate: (data) => {
                                    let val = this.normalizeForMumeric(data[input.cel]);
                                    return Gordic.Templates.Formatters.number(val, "C");
                                    //return Gordic.Templates.Formatters.number(data[input.cel], "C");
                                }, //Gordic.Templates.Formatters.dotNetDecimal({ input: input.cel }, "#0,00"),
                                align: "right",
                                sortable: false,
                                editor: {
                                    widget: "gnumberbox", options: {
                                        name: input.cel,
                                        validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                        //itemTemplate: function (inputData) { Gordic.Templates.Formatters.number(inputData, "C") },//Gordic.Templates.Formatters.dotNetDecimal({input.cel},"#0.00"),
                                        disabled: this.inputValues.viewMode,
                                        //format:  "#0,00",
                                        returnType: "string",
                                        emptyValue: "",
                                        decimals: 2,
                                        thousandsSeparator: " ",
                                        decimalSeparator: ","
                                    }
                                }
                            });
                        }
                        else {
                            input.form.addRow({ label: input.title, name: "l" + input.cel }).addField("gnumberbox", {
                                name: input.cel,
                                //disabled: false,
                                disabled: this.inputValues.viewMode,
                                //validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                initialValue: input.value === "" ? undefined : this.normalizeForMumeric(input.value),
                                emptyValue: null,
                                decimals: 2,
                                thousandsSeparator: " ",
                                decimalSeparator: ",",
                                customClass: this.inputValues.viewMode ? "undefined" : "w-2"
                            });
                        }
                    }
                    else if (input.type === 7 /* GETypeValue.File */) {
                        var visible = false;
                        var por_opak = 0;
                        if (input.grid) {
                            //var radek = (Gordic.Eko.Grid.currentRow(that.editGrid) as any);
                            //por_opak = radek.por_opak;
                            //visible = (typeof radek.h1 !== "undefined");                        
                        }
                        else
                            visible = (typeof input.data.h1 !== "undefined");
                        let btnStahnout = {
                            tooltip: "jres:30250103", position: "bottom", //RC 30250103 : Stáhnout soubor
                            icon: "fa-cloud-download",
                            visble: visible,
                            action: new GAction({
                                name: "buttonDownLoad", visible: visible,
                                run: () => {
                                    var dok = new GDocument(that);
                                    var filtr = that.inputValues.currentRow;
                                    let grid = that.getGrid();
                                    if (grid == null)
                                        return;
                                    if (input.grid)
                                        por_opak = Gordic.Eko.Grid.currentRow(grid).por_opak;
                                    dok.download({
                                        DownloaderType: "Gordic.Ucr.WebClient.GFileDownloader",
                                        CustomData: {
                                            ixs_vkz: filtr.mainId, kod_cast_vkz: that.getId(filtr.parentId), por_cislo: parseInt(that.getId(filtr.id)).toString(),
                                            ico: that.inputValues.topologie.ico,
                                            ucs: that.inputValues.topologie.ucs,
                                            /**uus*/
                                            uus: that.inputValues.topologie.uus,
                                            /**nks*/
                                            nks: that.inputValues.topologie.nks,
                                            /**rok*/
                                            rok: that.inputValues.topologie.rok,
                                            /**mesic*/
                                            mesic: that.inputValues.topologie.mesic,
                                            por_opak: por_opak.toString()
                                        },
                                    });
                                }
                            })
                        };
                        if (input.grid) {
                            this.myGridFormat.addTextColumn({
                                name: input.cel,
                                caption: input.title,
                                cellTemplate: (d) => { return d?.filename ?? ""; },
                                sortable: false,
                                editor: {
                                    widget: "gformbox",
                                    options: {
                                        name: input.cel,
                                        disabled: this.inputValues.viewMode,
                                        model: "model.guid=value.guid;model.filename=value.filename", //Tady mapujes dto z gformbox na dto v row.
                                        itemTemplate: "{filename}",
                                        dialogOptions: { width: 500 },
                                        verticalButtons: false,
                                        buttons: [btnStahnout],
                                        //returnType: "string",
                                        //mode: "inlineimmediate",
                                        form: new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" })
                                            .addField("gfilefield", {
                                            name: "filename",
                                            maxFileCount: 1,
                                            acceptExtension: ".pdf,.png,.jpg",
                                            validators: [new Gordic.Validators.Required()], //Tento validator by se mel postarat, ze se pocka na velky soubor.
                                            model: function (op, dto, options) {
                                                //Tady mapujes dto z filefield na gformbox.
                                                if (op === "apply") {
                                                    if (!dto.guid)
                                                        return;
                                                    let val = {
                                                        guid: dto.guid,
                                                        filename: dto.filename
                                                    };
                                                    $(this).gfield("setValue", [val]);
                                                }
                                                else if (op === "collect") {
                                                    let val = $(this).gfield("getValue");
                                                    //if (val.length !== 1) throw new GError("Musi byt jeden soubor!!!"); //TODO: Toto si, Tome, nejak osetri
                                                    dto.guid = val[0].guid;
                                                    dto.filename = val[0].filename;
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        }
                        else {
                            if (this.inputValues.viewMode) {
                                input.form.addRow({ label: input.title, name: "l" + input.cel }).addField("gstringbox", {
                                    name: input.cel,
                                    //disabled: false,
                                    disabled: this.inputValues.viewMode,
                                    //validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                    initialValue: input.value === "" ? undefined : input.value,
                                    customClass: this.inputValues.viewMode ? "undefined" : "w-2"
                                });
                            }
                            else {
                                input.form.addRow({ label: input.title, name: "l" + input.cel })
                                    .addField("gformbox", {
                                    name: "filename",
                                    model: "model.guid=value.guid;model.filename=value.filename", //Tady mapujes dto z gformbox na dto v row.
                                    itemTemplate: "{filename}",
                                    customClass: "js-filename",
                                    itemClass: "js-filename2",
                                    verticalButtons: false,
                                    buttons: [btnStahnout],
                                    //itemClass: "js-file",
                                    defaultValue: { filename: input.value },
                                    form: new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" })
                                        .addField("gfilefield", {
                                        name: "filename",
                                        acceptExtension: ".pdf,.png,.jpg",
                                        maxFileCount: 1,
                                        validators: [new Gordic.Validators.Required()], //Tento validator by se mel postarat, ze se pocka na velky soubor.
                                        model: function (op, dto, options) {
                                            //Tady mapujes dto z filefield na gformbox.
                                            if (op === "apply") {
                                                if (!dto.guid)
                                                    return;
                                                let val = {
                                                    guid: dto.guid,
                                                    filename: dto.filename
                                                };
                                                $(this).gfield("setValue", [val]);
                                            }
                                            else if (op === "collect") {
                                                let val = $(this).gfield("getValue");
                                                //if (val.length !== 1) throw new GError("Musi byt jeden soubor!!!"); //TODO: Toto si, Tome, nejak osetri
                                                dto.guid = val[0].guid;
                                                dto.filename = val[0].filename;
                                            }
                                        }
                                    })
                                });
                            }
                        }
                    }
                    else if (input.type === 0 /* GETypeValue.Date */) {
                        if (input.grid) {
                            this.myGridFormat.addDateColumn({
                                name: input.cel,
                                caption: input.title,
                                sortable: false,
                                editor: {
                                    widget: "gdatebox", options: {
                                        name: input.cel,
                                        validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                        //itemTemplate: function (inputData) { Gordic.Templates.Formatters.number(inputData, "C") },//Gordic.Templates.Formatters.dotNetDecimal({input.cel},"#0.00"),
                                        disabled: this.inputValues.viewMode,
                                        valueType: "date",
                                        returnType: "string",
                                    }
                                }
                            });
                        }
                        else {
                            input.form.addRow({ label: input.title, name: "l" + input.cel }).addField("gdatebox", {
                                name: input.cel,
                                //disabled: false,
                                disabled: this.inputValues.viewMode,
                                //validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                initialValue: input.value === "" ? undefined : input.value,
                                customClass: this.inputValues.viewMode ? "undefined" : "w-2"
                            });
                        }
                    }
                    else if (input.type === 1 /* GETypeValue.DateTime */) {
                        if (input.grid) {
                            this.myGridFormat.addDateColumn({
                                name: input.cel,
                                caption: input.title,
                                sortable: false,
                                editor: {
                                    widget: "gdatebox", options: {
                                        name: input.cel,
                                        validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                        //itemTemplate: function (inputData) { Gordic.Templates.Formatters.number(inputData, "C") },//Gordic.Templates.Formatters.dotNetDecimal({input.cel},"#0.00"),
                                        disabled: this.inputValues.viewMode,
                                        valueType: "datetime",
                                        //format: Gordic.Templates.Formatters.dotNetDecimal(),
                                        returnType: "string",
                                    }
                                }
                            });
                        }
                        else {
                            input.form.addRow({ label: input.title, name: "l" + input.cel }).addField("gdatebox", {
                                name: input.cel,
                                //disabled: false,
                                disabled: this.inputValues.viewMode,
                                //validators: input.maxLen > 0 ? [new Gordic.Validators.Length({ min: 0, max: input.maxLen })] : undefined,
                                initialValue: input.value === "" ? undefined : input.value,
                                valueType: "datetime",
                            });
                        }
                    }
                }
                /**
                 * Vycisteni prvku
                 *
                 * */
                clearControls() {
                    this.myPanel.empty();
                }
                /**
                 *  Zjisteni typu slouce
                 *
                 *
                 * @param pattern
                 */
                getTypeCol(pattern) {
                    if (pattern && pattern.substring(0, 5) === "#comb")
                        return 6 /* GETypeValue.Combo */;
                    else if (pattern && pattern.substring(0, 5) === "#file")
                        return 7 /* GETypeValue.File */;
                    else if (pattern && pattern.replace(/\\/g, "") == "d?d.d?d.dddd")
                        return 0 /* GETypeValue.Date */;
                    else if (pattern && pattern.replace(/\\/g, "") == "-{0,1}(0|[1-9]{1}d{0,14})([,]|[.])d{2}|(0|[1-9]{1}d{0,14})")
                        return 3 /* GETypeValue.Number */;
                    else
                        return 2 /* GETypeValue.String */;
                }
                /**
                 * Vytvoreni sloupcu
                 * @param currentRow
                 * @param data
                 */
                createCols(currentRow, data) {
                    var that = this;
                    //var myForm:Gordic.Forms.Form;
                    // znepristupenni akci
                    that.clearControls();
                    if (!data)
                        return;
                    if (currentRow.priz_opak === 1) {
                        that.myGridFormat = new Gordic.Data.GridFormat();
                    }
                    else {
                        that.myForm = new Gordic.Forms.Form({ name: "formHodnoty", layoutDescriptor: "L2M2S1" });
                        //that.myForm.addSection({ layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0", name: "uzivHodnoty" });
                        that.myForm.addSection({ layoutDescriptor: "L-12-12-12, M-12-12-12, S-12-12-0", name: "uzivHodnoty" });
                    }
                    // nacteni hodnot
                    this.loadHodnoty(currentRow)
                        .then((result) => {
                        if (!data)
                            return;
                        var datadto = [];
                        if (data && typeof data.length !== "undefined" && data.length == 0) {
                            //stare chovani
                            var nazev = currentRow.vykaz;
                            var nazev_vaz = currentRow.nazev_vaz;
                            var delka_du = currentRow.delka_du;
                            var delka_vaz = currentRow.delka_vaz;
                            var nazev_vaz2 = currentRow.nazev_vaz2;
                            var delka_vaz2 = currentRow.delka_vaz2;
                            //var typ: GETypeValue = GETypeValue.String;
                            var typ = that.getTypeCol(currentRow.pattern_du);
                            //if (currentRow.pattern_du && currentRow.pattern_du.substr(0, 5) === "#comb")
                            //    typ = GETypeValue.Combo;
                            //else if (currentRow.pattern_du && currentRow.pattern_du.substr(0, 5) === "#file")
                            //    typ = GETypeValue.File;
                            //else if (currentRow.pattern_du && currentRow.pattern_du.replace(/\\/g, "") == "d?d.d?d.dddd")
                            //    typ = GETypeValue.Date;
                            //else if (currentRow.pattern_du && currentRow.pattern_du.replace(/\\/g, "") == "-{0,1}(0|[1-9]{1}d{0,14})([,]|[.])d{2}|(0|[1-9]{1}d{0,14})")
                            //    typ = GETypeValue.Number;
                            that.defSloupcu.push({
                                type: typ, name: "h0", title: nazev, aktivita: 100, min: 0, max: "", maxLen: (parseInt(delka_du) > 0 ? delka_du : 0),
                                minLen: 0, patern: currentRow.pattern_du,
                                dat_du: currentRow.pattern_du,
                                por_opak: typeof result !== "undefined" && result.length > 0 ? result[0].por_opak : 0
                            });
                            // sloupec h0
                            that.createCol({
                                form: that.myForm, type: typ, cel: "h0", title: nazev, maxLen: (parseInt(delka_du) > 0 ? delka_du : 0), /*format: "",*/
                                grid: currentRow.priz_opak === 1,
                                value: typeof result !== "undefined" && result.length > 0 && typeof result[0].h0 !== "undefined" ? result[0].h0 : "", por_opak: typeof result !== "undefined" && result.length > 0 ? result[0].por_opak : 0,
                                pattern_du: currentRow.pattern_du, data: typeof result !== "undefined" && result.length > 0 ? result[0] : {},
                                min: "", max: "", minLen: 0
                            });
                            if (typeof nazev_vaz !== "undefined" && nazev_vaz != null && nazev_vaz !== "") {
                                typ = that.getTypeCol(currentRow.pattern_vaz);
                                //if (currentRow.pattern_vaz && currentRow.pattern_vaz.replace(/\\/g, "") == "-{0,1}(0|[1-9]{1}d{0,14})([,]|[.])d{2}|(0|[1-9]{1}d{0,14})")
                                //    typ = GETypeValue.Number;
                                that.defSloupcu.push({
                                    type: typ, name: "h1", title: nazev_vaz, aktivita: 100, min: 0, max: delka_vaz, maxLen: delka_vaz, minLen: 0, patern: currentRow.pattern_du,
                                    dat_du: currentRow.pattern_vaz,
                                    por_opak: typeof result !== "undefined" && result.length > 0 ? result[0].por_opak : 0
                                });
                                // sloupec h1
                                that.createCol({
                                    form: that.myForm, type: typ, cel: "h1", title: nazev_vaz, maxLen: (parseInt(delka_vaz) > 0 ? delka_vaz : 0), /*format: "",*/
                                    grid: currentRow.priz_opak === 1,
                                    value: typeof result !== "undefined" && result.length > 0 && typeof result[0].h1 !== "undefined" ? result[0].h1 : "", por_opak: typeof result !== "undefined" && result.length > 0 ? result[0].por_opak : 0,
                                    pattern_du: currentRow.pattern_vaz, data: typeof result !== "undefined" && result.length > 0 ? result[0] : {},
                                    min: 0, max: delka_vaz, minLen: 0
                                });
                            }
                            if (typeof nazev_vaz2 !== "undefined" && nazev_vaz2 != null && nazev_vaz2 !== "") {
                                typ = that.getTypeCol(currentRow.pattern_vaz2);
                                // sloupec h2
                                that.defSloupcu.push({
                                    type: typ, name: "h2", title: nazev_vaz2, aktivita: 100, min: 0, max: "", maxLen: delka_vaz, minLen: 0, patern: currentRow.pattern_du,
                                    dat_du: currentRow.pattern_vaz2,
                                    por_opak: typeof result !== "undefined" && result.length > 0 ? result[0].por_opak : 0
                                });
                                that.createCol({
                                    form: that.myForm, type: typ, cel: "h2", title: nazev_vaz2, maxLen: (parseInt(delka_vaz2) > 0 ? delka_vaz2 : 0), /*format: "",*/
                                    grid: currentRow.priz_opak === 1,
                                    value: typeof result !== "undefined" && result.length > 0 && typeof result[0].h2 !== "undefined" ? result[0].h2 : "", por_opak: typeof result !== "undefined" && result.length > 0 ? result[0].por_opak : 0,
                                    pattern_du: currentRow.pattern_vaz2, data: typeof result !== "undefined" && result.length > 0 ? result[0] : {},
                                    min: 0, max: delka_vaz2, minLen: 0
                                });
                            }
                        }
                        else {
                            for (var i = 0; i < data.length; i++) {
                                var col = data[i];
                                //var name = "h" + col.typ_du?.toString();
                                //var t = col.dat_du;
                                var myresult = { h0: "", por_opak: 0, por_opak1: 0 };
                                var value = "";
                                if (result != null && typeof result !== "undefined" && result.length == 1) {
                                    //for (var y = 0; y < result.length; y++) {
                                    if (typeof result[0][col.name] !== "undefined") {
                                        //if (result[y].por_opak1 == i) {
                                        myresult = result[0];
                                        //myresult.h0 = myresult[col.name];
                                        value = myresult[col.name];
                                    }
                                    //}
                                }
                                else {
                                }
                                that.createCol({
                                    form: that.myForm, type: col.type, cel: col.name, title: col.nazev, maxLen: col.maxLen, value: value, /*format: format,*/
                                    grid: currentRow.priz_opak === 1, por_opak: myresult.por_opak,
                                    pattern_du: col.patern /*currentRow.pattern_du*/, data: myresult,
                                    min: col.min, max: col.max, minLen: col.minLen
                                });
                            }
                        }
                        this.actions.actUlozit.update({ visible: true, enabled: true });
                        if (currentRow.priz_opak === 1 && typeof result !== "undefined" && result != null) {
                            // priprava hodnot, ktere se predaji v poli do gridu
                            for (var row = 0; row < result.length; row++) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].type === 6 /* GETypeValue.Combo */) {
                                        var res = this.getCombo(data[i].patern.split('|'), data[i].name, result[row][data[i].name]);
                                        //data = res.data;
                                        var initial = res.initial;
                                        if (typeof initial !== "undefined") {
                                            result[row][data[i].name + "title"] = initial[data[i].name + "title"];
                                        }
                                    }
                                    else if (data[i].type === 5 /* GETypeValue.Integer */ || data[i].type === 3 /* GETypeValue.Number */ || data[i].type === 4 /* GETypeValue.Decimal */) {
                                        //debugger;
                                        // uprava numericke hodnoty
                                        if (typeof result[row][data[i].name] !== "undefined")
                                            result[row][data[i].name] = that.normalizeForMumeric(result[row][data[i].name]);
                                        //result[row][data[i].name] = result[row][data[i].name].replaceAll(",", ".").replaceAll(" ", "");                                    
                                    }
                                    else if (data[i].type === 7 /* GETypeValue.File */) {
                                        if (typeof result[row][data[i].name] !== "undefined") {
                                            result[row][data[i].name] = result[row][data[i].name].replaceAll(",", ".").replaceAll(" ", "");
                                            result[row]["filename"] = result[row][data[i].name];
                                        }
                                    }
                                    else if (data[i].type === 0 /* GETypeValue.Date */) {
                                        if (typeof result[row][data[i].name] !== "undefined") {
                                            // prevod na datum                                 
                                            var tst = result[row][data[i].name];
                                            let value = tst.replaceAll(" ", "");
                                            let frags = value.split(".");
                                            if (frags.length != 3) {
                                                result[row][data[i].name] = "";
                                                break;
                                                //return;
                                            }
                                            if (!isNumeric(frags[2]) || !isNumeric(frags[1]) || !isNumeric(frags[0])) {
                                                result[row][data[i].name] = "";
                                                break;
                                                //return;
                                            }
                                            var date = new Date(parseInt(frags[2]), parseInt(frags[1]) - 1, parseInt(frags[0])); // mesice zacinaji od 0 v JS!
                                            if (Gordic.Utils.DateTime.isValid(date))
                                                result[row][data[i].name] = date;
                                            else
                                                result[row][data[i].name] = "";
                                            //var tst = result[row][data[i].name];
                                            //tst= tst.replace(" ", "");
                                            //var dat = moment(tst, "D.M.YYYY");
                                            //if (dat.isValid()) {
                                            //    result[row][data[i].name] = dat.toDate();
                                            //}
                                            //else
                                            //    result[row][data[i].name] = "";
                                        }
                                    }
                                }
                                datadto.push(result[row]);
                            }
                            // vytvorit grid
                            const grid = $.newDiv(this.classGrid)
                                //.css("height", "100%")
                                .appendTo(that.myPanel)
                                .ggrid({
                                columnMode: that.myGridFormat.columns.length > 10 ? "full" : "fit",
                                multi: false,
                                data: datadto,
                                //rowNumbers: true,
                                marking: true,
                                navigationMode: (that.inputValues.viewMode ? "row" : "cell"),
                                rowsEnabled: (that.inputValues.viewMode ? false : undefined),
                                columns: that.myGridFormat,
                                profileVisible: true,
                                cellActivate: function (event, info) {
                                    //debugger
                                    if (!that.inputValues.viewMode && currentRow.pattern_du == "#file" && info.cellInfo.column.field === "h0") {
                                        info.cellInfo.column.editor["options"].buttons[0].action.visible(typeof info.cellInfo.data.h1 !== "undefined");
                                    }
                                    //if (info.cellInfo.)
                                },
                                defaultProfile: { rowNumbers: true },
                                //userSettings: that.inputValues.currentRow.id as string,
                                //                        searchColumns: ["popis"],
                            });
                            if (!that.inputValues.viewMode) {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggridcelleditor({
                                    allowCopy: true,
                                    change: () => { that.editing = true; },
                                });
                                grid.ggriddragdrop({
                                    start: (ev, a) => { },
                                    end: function (ev, obj) {
                                        that.editing = true;
                                        // _this.profileChanged = true;
                                    }
                                });
                                //let grid = that.getGrid();
                                //if (grid == null) return;
                                grid.ggridcelleditor('start');
                                $.content(grid).element.find(".js-ucrFullScreen").gautofit();
                            }
                            //grid.gautofit()
                            ;
                            //that.editGrid.ggrid("option", "columns", that.myGridFormat);
                            // zpristupneni akci:
                            //-------------------
                            // novy radek hodnot
                            this.actions.actNovy.update({ visible: true, enabled: true });
                            let pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                            // vymazat radek hodnot
                            this.actions.actOdstranit.update({ visible: pocetZapisu > 0, enabled: pocetZapisu > 0 });
                        }
                        else {
                            // pridane formular
                            let frm = $.newDiv().appendTo(that.myPanel).gform('createFrom', that.myForm);
                            // automaticke roztazeni textboxu
                            if (!this.inputValues.viewMode)
                                $.content(frm).element.find(".js-ucrFullScreen").gautofit();
                            // zobrazeni pole vymazat
                            this.actions.actVycistit.update({ visible: true, enabled: true });
                            // nastaveni focusu na 1. pole
                            var fields = that.findFields();
                            if (fields.length > 0 && !this.inputValues.viewMode) {
                                this.element.findFields().first().gfield('focus');
                            }
                        }
                        //if (currentRow.priz_opak === 1) {
                        //    if (!this.inputValues.viewMode) {
                        //        let grid = that.getGrid();
                        //        if (grid == null) return;
                        //        grid.ggridcelleditor('start');
                        //    }
                        //}
                        //else {
                        //    // zobrazeni pole vymazat
                        //    this.actions.actVycistit!.update({ visible: true, enabled: true });
                        //    // nastaveni focusu na 1. pole
                        //    var fields = that.findFields();
                        //    if (fields.length > 0 && !this.inputValues.viewMode) {
                        //        this.element.findFields().first().gfield('focus');                          
                        //    }
                        //}
                        //if (that.inputValues.viewMode)
                        //    (that!.parentContent as GSeznamDoplnkoveUdaje).$grid.ggrid("focus");
                        return;
                    });
                }
                /**
                 * Nromalizace pro numericke cislo
                 *
                 * @param source
                 */
                normalizeForMumeric(source) {
                    let result = "";
                    let tecka = false;
                    let carka = false;
                    if (source == null || typeof source === "undefined")
                        return "";
                    if (typeof source == "number")
                        return source;
                    if (typeof source !== "string")
                        return "";
                    for (let i = 0; i < source.length; i++) {
                        let znak = source[i];
                        // Kontrola číslice nebo speciálního znaku
                        if ((znak >= "0" && znak <= "9") || znak == "+" || znak == "-" /*|| znak == "." || znak == ","*/) {
                            result += znak;
                        }
                        else if (znak == ".") {
                            result += znak;
                            tecka = true;
                        }
                        else if (znak == ",") {
                            result += znak;
                            carka = true;
                        }
                    }
                    let zanmenko = result == "" ? "" : result.charAt(0);
                    // znamenko na zacatku
                    if (zanmenko === "+" || zanmenko === "-") {
                        let tmpResult = result.length > 1 ? result.substring(1).replaceAll("+", "").replaceAll("-", "")
                            : "";
                        result = (zanmenko === "-" && tmpResult !== "" ? zanmenko : "") + tmpResult;
                    }
                    else {
                        // musim odstranit znemenka nekde mezi cisly
                        result = result.replaceAll("+", "").replaceAll("-", "");
                    }
                    // tecka a carka soucasne v cislu
                    if (tecka && carka) {
                        // americky format - carka: oddelovac tisicu, tecka: desetinna cast                
                        result = result.replaceAll(",", "");
                    }
                    if (carka)
                        result = result.replaceAll(",", ".");
                    result = Number.isNaN(result) ? "" : result;
                    return result;
                }
                /**
                 * Nacteni casti vykazu
                 * @param filtr
                 */
                loadSloupce(filtr) {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    //let data: Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto[] = []
                    that.isl.UcrVykazAdm.listSloupcuVykazu({ ixs_vkz: filtr.mainId, kod_cast_vkz: that.getId(filtr.parentId), por_cislo: parseInt(that.getId(filtr.id)), rok: that.inputValues.rok, mesic: that.inputValues.mesic }).getData()
                        .then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            var col = result[i];
                            var name = "h" + col.typ_du?.toString();
                            let pat = null;
                            var t = col.dat_du;
                            if (t.indexOf('#') >= 0 || t.indexOf('@') >= 0) {
                                //if ((p = t.indexOf(new char[] { '#', '@' })) >= 0) {
                                var p = t.indexOf('#');
                                if (p < 0)
                                    p = t.indexOf('@');
                                pat = t?.substring(p);
                                t = t?.substring(0, p);
                            }
                            if (t == "")
                                t = "S";
                            result[i]["patern"] = pat;
                            if (pat != null) {
                                var meze = pat.split('@');
                                for (var dd = 1; dd < meze.length; dd++) {
                                    var ma = meze[dd].split(":");
                                    if (ma.length != 2)
                                        continue;
                                    switch (ma[0]) {
                                        case "P":
                                            //CheckValue_pat(l_val, kv[1]);
                                            break;
                                        case "LMIN":
                                            {
                                                result["minLen"] = ma[1];
                                                //var v1 = l_val.Length;
                                                //var v2 = Int32.Parse(kv[1]);
                                                //if (v2 > v1)
                                                //    throw new GNonFatalException(21000014, 21050146, v2); //RC-EX 21050146 : Nutno zadat minimálně {0} znaků
                                            }
                                            break;
                                        case "LMAX":
                                            {
                                                result["maxLen"] = ma[1];
                                                //var v1 = l_val.Length;
                                                //var v2 = Int32.Parse(kv[1]);
                                                //if (v2 < v1)
                                                //    throw new GNonFatalException(21000015, 21050147, v2); //RC-EX 21050147 : Nutno zadat maximálně {0} znaků
                                            }
                                            break;
                                        case "NMIN":
                                            {
                                                result["min"] = ma[1];
                                                //var v1 = Decimal.Parse(l_val);
                                                //var v2 = Decimal.Parse(kv[1]);
                                                //if (v2 > v1)
                                                //    throw new GNonFatalException(21000010, 21050145); //RC-EX 21050145 : Hodnota je mimo povolený interval
                                            }
                                            break;
                                        case "NMAX":
                                            {
                                                result["max"] = ma[1];
                                                //var v1 = Decimal.Parse(l_val);
                                                //var v2 = Decimal.Parse(kv[1]);
                                                //if (v2 < v1)
                                                //    throw new GNonFatalException(21000011, 21050145); //RC-EX 21050145 : Hodnota je mimo povolený interval
                                            }
                                            break;
                                        case "DMIN":
                                            {
                                                //var v1 = DateTime.Parse(l_val);
                                                //var v2 = DateTime.Parse(kv[1]);
                                                //if (v2 > v1)
                                                //    throw new GNonFatalException(21000012, 21050145); //RC-EX 21050145 : Hodnota je mimo povolený interval
                                            }
                                            break;
                                        case "DMAX":
                                            {
                                                //var v1 = DateTime.Parse(l_val);
                                                //var v2 = DateTime.Parse(kv[1]);
                                                //if (v2 < v1)
                                                //    throw new GNonFatalException(21000013, 21050145); //RC-EX 21050145 : Hodnota je mimo povolený interval
                                            }
                                            break;
                                    }
                                }
                            }
                            var typ = 2 /* GETypeValue.String */;
                            switch (t[0]) {
                                case 'S':
                                    typ = 2 /* GETypeValue.String */;
                                    break;
                                case 'D':
                                    typ = 0 /* GETypeValue.Date */;
                                    break;
                                case 'T':
                                    typ = 1 /* GETypeValue.DateTime */;
                                    break;
                                case 'N':
                                    typ = 3 /* GETypeValue.Number */;
                                    break;
                                case 'I':
                                    typ = 5 /* GETypeValue.Integer */;
                                    break;
                            }
                            if (pat && pat.substr(0, 5) === "#comb")
                                typ = 6 /* GETypeValue.Combo */;
                            else if (pat && pat.substr(0, 5) === "#file")
                                typ = 7 /* GETypeValue.File */;
                            result[i]["type"] = typ;
                            result[i]["name"] = name;
                            result[i]["title"] = col.nazev;
                        }
                        that.defSloupcu = result;
                        return def.resolve(result);
                    });
                    return def.promise();
                }
                /**
                 * Ulozeni hodnot
                 *
                 * */
                Save() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    var dtoSaveData = {};
                    var saveDto = [];
                    //var dtoSaveDateRow = {};
                    // aktualni radek
                    var currentRow = that.inputValues.currentRow;
                    if (currentRow.priz_opak === 1) {
                        let grid = that.getGrid();
                        if (grid == null)
                            return def.reject().promise();
                        ;
                        // grid
                        var dtoSave = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                        for (var row = 0; row < dtoSave.length; row++) {
                            dtoSave[row]["por_opak"] = row;
                            for (var col = 0; col < that.defSloupcu.length; col++) {
                                var column = that.defSloupcu[col];
                                if (dtoSave[row][column.name] === null || typeof dtoSave[row][column.name] === "undefined") {
                                    dtoSave[row][column.name] = "";
                                }
                                if (column.type === 4 /* GETypeValue.Decimal */ || column.type === 5 /* GETypeValue.Integer */ || column.type === 3 /* GETypeValue.Number */) {
                                    if (typeof dtoSave[row][column.name] === "undefined")
                                        continue;
                                    dtoSave[row][column.name] = dtoSave[row][column.name].replaceAll(" ", "").replaceAll(".", ",");
                                }
                                else if (column.type === 6 /* GETypeValue.Combo */) {
                                    if (dtoSave[row][column.name] != null && typeof dtoSave[row][column.name] !== "undefined") {
                                        //debugger;
                                    }
                                }
                                else if (column.type === 0 /* GETypeValue.Date */) {
                                    if (dtoSave[row][column.name] !== null && typeof dtoSave[row][column.name] !== "undefined") {
                                        // TODO: nutno doresit, pokud hodonta neni datum!!!
                                        try {
                                            let value = dtoSave[row][column.name];
                                            //let frags: string[] = value.split(".");
                                            let result = "";
                                            //if (frags.length == 3 && isNumeric(frags[2]) && isNumeric(frags[1]) && isNumeric(frags[0])) {                                    
                                            //var date = new Date(parseInt(frags[2]), parseInt(frags[1]) - 1, parseInt(frags[0])); // mesice zacinaji od 0 v JS!
                                            if (Gordic.Utils.DateTime.isValid(value))
                                                result = Gordic.Templates.Formatters.date(value, "dd.MM.yyyy");
                                            //     var dat = moment(dtoSave[row][column.name]);
                                            //    if (dat.isValid())
                                            //        dtoSave[row][column.name] = dat.format("D.M.YYYY");
                                            //    else
                                            //        dtoSave[row][column.name] = "";//dtoSave[row][column.name].toLocaleDateString().replace(" ", "");
                                            //}
                                            dtoSave[row][column.name] = result;
                                        }
                                        catch (err) {
                                            dtoSave[row][column.name] = "";
                                        }
                                    }
                                    else
                                        dtoSave[row][column.name] = "";
                                }
                                if (dtoSave[row][column.name] != null && typeof dtoSave[row][column.name] === "object") {
                                    // prevod objektu na hodnotu
                                    if (dtoSave[row][column.name][column.name] == null || typeof dtoSave[row][column.name][column.name] === "undefined")
                                        continue;
                                    dtoSave[row][column.name] = dtoSave[row][column.name][column.name];
                                }
                                if (column.type === 7 /* GETypeValue.File */ && dtoSave[row][column.name] != null && typeof dtoSave[row][column.name] !== "undefined") {
                                    // 5555 je oznaceni souboru, abych to na serveru poznal
                                    //debugger
                                    var pol = { typ_du: 5555, por_opak: dtoSave[row]["por_opak"], value: dtoSave[row]["guid"] };
                                    saveDto.push(pol);
                                }
                                else if (typeof dtoSave[row][column.name] !== "undefined") {
                                    var pol = { typ_du: parseInt(column.name.substring(1) /*column.name.substr(1)*/), por_opak: dtoSave[row]["por_opak"], value: dtoSave[row][column.name] };
                                    saveDto.push(pol);
                                }
                            }
                        }
                        that.inputValues.editCols = saveDto;
                        //debugger;
                    }
                    else {
                        // jednotliva pole
                        if (!that.element.findForms("formHodnoty").gform("isValid"))
                            return def.resolve().promise();
                        // posbirani hodnot z formulare do dto
                        that.myPanel.findFields().gfield("model", "collect", dtoSaveData); // verificationNeeded: false 
                        //debugger;
                        let myValues = [];
                        for (var i = 0; i < that.defSloupcu.length; i++) {
                            var name = that.defSloupcu[i].name;
                            var column = that.defSloupcu[i];
                            if (!(name.length > 1 && name[0] == 'h'))
                                return def.resolve().promise();
                            var value = that.myPanel.findFields(name).gfield("getValue");
                            if (column.type === 0 /* GETypeValue.Date */) {
                                if (value !== null && typeof value !== "undefined") {
                                    // TODO: nutno doresit, pokud hodnota neni datum!!!
                                    try {
                                        //let frags: string[] = value.split(".");
                                        let result = "";
                                        //if (frags.length == 3 && isNumeric(frags[2]) && isNumeric(frags[1]) && isNumeric(frags[0])) {
                                        //    var date = new Date(parseInt(frags[2]), parseInt(frags[1]) - 1, parseInt(frags[0])); // mesice zacinaji od 0 v JS!
                                        if (Gordic.Utils.DateTime.isValid(value))
                                            result = Gordic.Templates.Formatters.date(value, "dd.MM.yyyy");
                                        //}
                                        value = result;
                                        //var dat = moment(value);
                                        //if (dat.isValid())
                                        //    value = dat.format("D.M.YYYY");
                                        //else
                                        //    value = "";//dtoSave[row][column.name].toLocaleDateString().replace(" ", "");
                                    }
                                    catch (err) {
                                        value = "";
                                    }
                                }
                                else
                                    value = "";
                            }
                            //debugger;
                            if (column.type === 7 /* GETypeValue.File */) {
                                //var value = that.myPanel.findFields("filename").gfield("getValue");
                                if (dtoSaveData !== null && typeof dtoSaveData["filename"] && (dtoSaveData["filename"] === null || dtoSaveData["filename"] === "")) {
                                    // vymazani souboru
                                    myValues.push({
                                        name: name, value: "", typ_du: 0, combo: false, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak
                                    });
                                    myValues.push({
                                        name: name, value: "", typ_du: 1, combo: false, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak
                                    });
                                    myValues.push({
                                        name: name, value: "", typ_du: 2, combo: false, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak
                                    });
                                }
                                else if (dtoSaveData !== null && typeof dtoSaveData["guid"] !== "undefined") {
                                    myValues.push({
                                        name: name, value: dtoSaveData["guid"], typ_du: 5555, combo: false, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak
                                    });
                                }
                            }
                            else if (that.defSloupcu[i].type == 6 /* GETypeValue.Combo */) {
                                var value1 = value === null ? "" : value[name + "title"];
                                myValues.push({ name: name, value: value1, typ_du: parseInt(name.substring(1) /*name.substr(1)*/), combo: true, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak });
                                myValues.push({ name: name, typ_du: 1, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak, value: value === null ? "" : value[name], combo: true });
                            }
                            else {
                                myValues.push({ name: name, value: value, typ_du: parseInt(name.substring(1) /*name.substr(1)*/), combo: false, por_opak: typeof column.por_opak === "undefined" || column.por_opak === null ? 0 : column.por_opak });
                            }
                        }
                        that.inputValues.editCols = myValues;
                    }
                    that.isl.UcrVykazAdm.saveValues({
                        ixs_vkz: currentRow.mainId, kod_cast_vkz: that.getId(currentRow.parentId),
                        por_cislo: parseInt(that.getId(currentRow.id)), topologie: that.inputValues.topologie,
                        hodnoty: that.inputValues.editCols
                    }).getData()
                        .then(function () {
                        that.showFlash({ state: "success", id: "idSaveVal", timer: 2000, label: "jres:30250081" }); //RC 30250081 : Hodnoty uloženy
                        // nastaveni znovunacteni vetve stromu
                        that.reload = true;
                        that.editing = false;
                        that.findFields().gfield("confirm");
                        that.tryClose();
                        return def.resolve();
                    }).
                        always(() => { return def.resolve(); });
                    return def.promise();
                }
                /**
                 * Kopirovani predchazejici
                 *
                 * */
                CopySelect() {
                    var that = this;
                    // nacteni seznamu historickych dat
                    return that.isl.UcrVykazAdm.listHistorie({
                        ixs_vkz: that.inputValues.currentRow.mainId, kod_cast_vkz: that.getId(that.inputValues.currentRow.parentId),
                        por_cislo: parseInt(that.getId(that.inputValues.currentRow.id)),
                        topologie: that.inputValues.topologie
                    }).get()
                        .then(function (result) {
                        if (result.length == 0) {
                            that.showFlash({ state: "warning", id: "idWarCopy", timer: 2000, label: "jres:30250066" }); //RC 30250066 : Nenalezeny žádné hodnoty ke kopírování
                            return $.Deferred().resolve().promise();
                        }
                        return that.VyberObdobi(result)
                            .done((result) => {
                            if (result && result.selectedRow && typeof result.selectedRow.mesic !== "undefined")
                                return that.Copy(result.selectedRow.mesic, result.selectedRow.rok);
                            return $.Deferred().resolve().promise();
                        })
                            .catch(() => {
                            $.Deferred().resolve();
                        });
                        //return $.Deferred().resolve().promise();
                    });
                }
                /**
                * Formular pro zadani popisu radku
                * @param {GUctDetail} content
                */
                VyberObdobi(data) {
                    var that = this;
                    var def = $.Deferred();
                    var result = this.dialogs.showModalWindow(Gordic.Ucr.WebClient.GVyberObdobiKopirovani, { data: data } /*, { data: data }*/);
                    result.on("close", function (ev, retVal) {
                        if (retVal) {
                            def.resolve(retVal);
                        }
                        else {
                            def.reject();
                        }
                    });
                    return def.promise();
                }
                /**
                 * Kopirovani predchazejici
                 *
                 * */
                CopyPreview() {
                    var that = this;
                    return that.isl.UcrVykazAdm.historie({
                        ixs_vkz: that.inputValues.currentRow.mainId, kod_cast_vkz: that.getId(that.inputValues.currentRow.parentId),
                        por_cislo: parseInt(that.getId(that.inputValues.currentRow.id)),
                        topologie: that.inputValues.topologie
                    }).get()
                        .then(function (result) {
                        if (!result.isHistory) {
                            that.showFlash({ state: "warning", id: "idWarCopy", timer: 2000, label: "jres:30250066" }); //RC 30250066 : Nenalezeny žádné hodnoty ke kopírování
                            return $.Deferred().resolve().promise();
                        }
                        return that.Copy(result.mesic, result.rok);
                    });
                }
                /**
                 * Kopirovani z minulych let
                 *
                 * */
                Copy(mesic, rok) {
                    var that = this;
                    var def = $.Deferred();
                    var currentRow = that.inputValues.currentRow;
                    //if (typKopie === GETypKopie.Predchazejici) {
                    that.isl.UcrVykazAdm.kopieHodnot({
                        ixs_vkz: currentRow.mainId, kod_cast_vkz: that.getId(currentRow.parentId),
                        por_cislo: parseInt(that.getId(currentRow.id)),
                        topologie: that.inputValues.topologie,
                        mesic: mesic,
                        rok: rok
                    })
                        .get()
                        .then(() => {
                        that.showFlash({ state: "success", id: "idCopy", timer: 2000, label: "jres:30250074" }); //RC 30250074 : Hodnoty zkopírovány
                        that.reload = true;
                        return that.loadSloupce(that.inputValues.currentRow)
                            .then((res) => {
                            that.inputValues.cols = res;
                            that.createCols(that.inputValues.currentRow, that.inputValues.cols);
                            return;
                        });
                        //that.tryClose();
                    })
                        .always(() => {
                        return def.resolve();
                    });
                    return def.promise();
                }
                /**
                 * Novy radek
                 * */
                NovyRadek() {
                    var that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    {
                        var result = {};
                        var porOpak = 0;
                        that.editing = true;
                        if (Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid)) {
                            var dtoSave = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                            for (var i = 0; i < dtoSave.length; i++) {
                                if ($.isNumeric(dtoSave[i]["por_opak"]) && porOpak < parseInt(dtoSave[i]["por_opak"]))
                                    porOpak = parseInt(dtoSave[i]["por_opak"]);
                            }
                            porOpak++;
                        }
                        //var currentRow = Gordic.Eko.Grid.currentRow<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>(this.$grid);
                        for (var i = 0; i < that.inputValues.editCols.length; i++) {
                            result[that.inputValues.editCols[i].name] = "";
                            result["por_opak"] = porOpak;
                            //result["por_opak1"] = (Gordic.Eko.WebClient.Common.CelkovyPocetRadku(this.editGrid))as number + 1;
                            //currentRow?.
                        }
                        Gordic.Eko.WebClient.Common.GetView(grid).updateData(result, "add");
                        //this.editGrid.ggridcelleditor("addRow", result);
                        this.setActions();
                        // dohledani pridaneho radku
                        var a = Gordic.Eko.WebClient.Common.GetView(grid);
                        // data ze gridu
                        var d = a.getDataRows();
                        // dohledani indexu radku
                        var startRow = 0; // index radku
                        for (var i = 0; i < d.length; i++) {
                            if (d[i]["por_opak"] == porOpak) {
                                //nasel jsem
                                startRow = i;
                                //debugger;
                            }
                        }
                        grid.ggridcelleditor('start', { row: startRow, col: 1 });
                        //this.editGrid.ggridcelleditor('start', { row: this.editGrid.ggrid("getView")?.getCount() - 1, col: 1 });
                    }
                }
            };
            GDetailDoplHodnoty = __decorate([
                Decorators.gcontent
            ], GDetailDoplHodnoty);
            WebClient.GDetailDoplHodnoty = GDetailDoplHodnoty;
            let GVyberObdobiKopirovani = class GVyberObdobiKopirovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GUcrVyberObdobi#";
                    /**
                     * Vybrany radek
                     * */
                    this.selectedRow = null;
                }
                prepareContent(data) {
                    var that = this;
                    if (typeof data.data !== "undefined")
                        data = data.data;
                    this.title = "jres:30250078"; //RC 30250078 : Výběr období                    
                    this.actions.addRange({
                        actVyber: {
                            name: "actVyber",
                            caption: "jres:30250079", //RC 30250079 : Vybrat
                            enabled: (data && data.length > 0 ? true : false),
                            visible: true,
                            run: function () {
                                var selectRow = that.selectGrid.ggrid("getSelection");
                                if (selectRow && selectRow.length > 0) {
                                    that.selectedRow = selectRow[0];
                                    that.tryClose();
                                    return;
                                }
                                that.showFlash({ state: "success", id: "idCopy", timer: 2000, label: "jres:30250080" }); //RC 30250080 : Není vybrán žádný řádek
                            }
                        },
                        actCloseVyber: {
                            name: "actCloseVyber",
                            caption: "jres:30250068", //RC 30250068 : Zavřít
                            visible: true,
                            enabled: true,
                            run: function (ev, ctx) {
                                that.selectedRow = null;
                                that.tryClose();
                            }
                        },
                    });
                    that.selectGrid = $.newDiv("js-ucrObdobi")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "fit",
                        multi: false,
                        data: data,
                        marking: false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                let data;
                                if (ctx.cellInfo && ctx.cellInfo.data)
                                    data = ctx.cellInfo.data;
                                else
                                    data = that.selectGrid.ggrid("getSelection")[0];
                                that.selectedRow = data;
                                that.tryClose();
                            }
                        }),
                        columns: new Gordic.Data.GridFormat().addNumberColumn({
                            name: "mesic",
                            caption: "jres:30250076", //RC 30250076 : Měsíc
                        }).addNumberColumn({
                            name: "rok",
                            caption: "jres:30250077", //RC 30250077 : Rok
                        }),
                        profileVisible: false,
                        //defaultProfile: { rowNumbers: true },
                        //userSettings: that.inputValues.currentRow.id as string,
                        //                        searchColumns: ["popis"],
                    }).gautofit();
                    // prikazova lista
                    this.commandBar([
                        {
                            id: "idVybrat",
                            favorite: true,
                            customClass: "g-button--primary",
                            action: this.actions.actVyber
                        },
                        {
                            id: "idclose",
                            action: this.actions.actCloseVyber
                        },
                    ]);
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    return $.Deferred().resolve({ selectedRow: this.selectedRow }).promise();
                }
            };
            GVyberObdobiKopirovani = __decorate([
                Decorators.gcontent
            ], GVyberObdobiKopirovani);
            WebClient.GVyberObdobiKopirovani = GVyberObdobiKopirovani;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERvcGxIb2Rub3R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbERvcGxIb2Rub3R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0Ewd0RmO0FBMXdERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0Ewd0RuQjtJQTF3RGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTB3RDdCO1FBMXdEb0IsV0FBQSxTQUFTO1lBOEIxQjs7aUJBRUs7WUFDTCx5QkFBeUI7WUFDekIsb0JBQW9CO1lBQ3BCLGFBQWE7WUFDYixHQUFHO1lBQ0gsSUFBSSxDQUFtQyxDQUFDO1lBcUN4QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLE9BQUEsWUFBWTtnQkFBcEQ7O29CQUNJLFFBQUcsR0FBRyxxQkFBcUIsQ0FBQztvQkFHNUIscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBQzNCOzt1QkFFRztvQkFDTyxjQUFTLEdBQVcsYUFBYSxDQUFDO29CQU81QyxrQkFBa0I7b0JBQ1YsWUFBTyxHQUFZLEtBQUssQ0FBQztvQkFDakMsb0JBQW9CO29CQUNaLFdBQU0sR0FBWSxLQUFLLENBQUM7Z0JBb2tEcEMsQ0FBQztnQkFqa0RHLGNBQWMsQ0FBQyxPQUFtQztvQkFFOUMsSUFBSSxDQUFDLE9BQU87d0JBQUUsT0FBTztvQkFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNFLElBQUksQ0FBQyxPQUFtQztvQkFFM0MsSUFBSSxDQUFDLE9BQU87d0JBQUUsT0FBTztvQkFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQiwrQkFBK0I7b0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLFdBQVcs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QUNsQixJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNaOzRCQUNJLEVBQUUsRUFBRSxVQUFVOzRCQUNkLFFBQVEsRUFBRSxJQUFJOzRCQUNkLFdBQVcsRUFBRSxtQkFBbUI7NEJBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7eUJBQ2hDO3dCQUNEOzRCQUNJLEVBQUUsRUFBRSxTQUFTOzRCQUViLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWE7eUJBQ3JDO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ksT0FBTztvQkFDVixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdFLENBQUM7YUFHSixDQUFBO1lBdEdZLHNCQUFzQjtnQkFEbEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxzQkFBc0IsQ0FzR2xDO1lBdEdZLGdDQUFzQix5QkFzR2xDLENBQUE7UUFDTCxDQUFDLEVBMXdEb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMHdEN0I7SUFBRCxDQUFDLEVBMXdEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMHdEbkI7QUFBRCxDQUFDLEVBMXdEUyxNQUFNLEtBQU4sTUFBTSxRQTB3RGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHVnlrQ29sSG9kbm90eSBleHRlbmRzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdWeWtDb2xWYWx1ZUR0byB7XHJcbiAgICAgICAgY29tYm86IGJvb2xlYW47XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRGV0YWlsRG9wbEhvZG5vdHlPcHRpb25zIHtcclxuICAgICAgICAvL3R5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgIC8vZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHU2V6bmFtWmFwaXN1U3RhdnVEdG8+O1xyXG4gICAgICAgIC8vZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgIGN1cnJlbnRSb3c6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0bztcclxuICAgICAgICAvL2NvbnRlbnQ6IEdTZXpuYW1Eb3BsbmtvdmVVZGFqZTtcclxuICAgICAgICBjb2xzPzogR1Nsb3VwY2VbXTtcclxuICAgICAgICB2aWV3TW9kZTogYm9vbGVhbjtcclxuICAgICAgICBlZGl0Q29scz86IEdWeWtDb2xIb2Rub3R5W107XHJcbiAgICAgICAgLy9lZGl0Q29scz86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdWeWtDb2xWYWx1ZUR0b1tdO1xyXG4gICAgICAgIHRvcG9sb2dpZTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Z5a2F6VG9wb2xvZ2llRHRvO1xyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG4gICAgICAgIG1lc2ljOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIERvY2FzbmUgbmFzdGF2ZW5pIHRhYnUsIG5ldWtsYWRhIHNlIGRvIFVzZXJTZXR0aW5ncyAqL1xyXG4gICAgICAgIC8vdGFiU2V0dGluZ3M/OiBJR0RldGFpbFN0YXZaYXBpc1JhZGt1VGFiU2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbnVtIEdFVHlwZVZhbHVlIHtcclxuICAgICAgICBEYXRlLFxyXG4gICAgICAgIERhdGVUaW1lLFxyXG4gICAgICAgIFN0cmluZyxcclxuICAgICAgICBOdW1iZXIsXHJcbiAgICAgICAgRGVjaW1hbCxcclxuICAgICAgICBJbnRlZ2VyLFxyXG4gICAgICAgIENvbWJvLFxyXG4gICAgICAgIEZpbGVcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVHlwIGtvcGllXHJcbiAgICAgKiAqL1xyXG4gICAgLy9jb25zdCBlbnVtIEdFVHlwS29waWUge1xyXG4gICAgLy8gICAgUHJlZGNoYXplamljaSxcclxuICAgIC8vICAgIFZ5YnJhbmVcclxuICAgIC8vfVxyXG4gICAgdmFyIGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdWeWtzdmtoRHRvOyAgICBcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Nsb3VwY2UgZXh0ZW5kcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVnlrc3ZraER0byB7XHJcbiAgICAgICAgbWF4OiBhbnk7XHJcbiAgICAgICAgbWluOiBhbnk7XHJcbiAgICAgICAgdHlwZTogR0VUeXBlVmFsdWU7XHJcbiAgICAgICAgcGF0ZXJuOiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIG1heExlbjogbnVtYmVyO1xyXG4gICAgICAgIG1pbkxlbjogbnVtYmVyO1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgcG9yX29wYWs6IG51bWJlcjtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHQ29sc09wdGlvbnMge1xyXG5cclxuICAgICAgICBmb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBtYXg6IGFueTtcclxuICAgICAgICBtaW46IGFueTtcclxuICAgICAgICB0eXBlOiBHRVR5cGVWYWx1ZTtcclxuICAgICAgICBjZWw6IHN0cmluZztcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG1pbkxlbjogbnVtYmVyO1xyXG4gICAgICAgIG1heExlbjogbnVtYmVyO1xyXG4gICAgICAgIC8vZm9ybWF0OiBzdHJpbmc7XHJcbiAgICAgICAgZ3JpZDogYm9vbGVhbjtcclxuICAgICAgICB2YWx1ZT86IGFueTtcclxuICAgICAgICBwb3Jfb3BhazogbnVtYmVyO1xyXG4gICAgICAgIHBhdHRlcm5fZHU/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8vIGhvZG5vdHkgcG9saWNrYVxyXG4gICAgICAgIGRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdWeWtkdmtoSG9kbm90eUR0bztcclxuICAgICAgICAvLyBuYXN0YXZlbiBmb2N1c1xyXG4vLyAgICAgICAgZm9jdXNlZD86IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxEb3BsSG9kbm90eSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgdWlkID0gXCJHRGV0YWlsRG9wbEhvZG5vdHkjXCI7XHJcbiAgICAgICAgLy8gemFrbGFkbmkgcGFuZWxcclxuICAgICAgICBwcml2YXRlIG15UGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLy8gRWRpdG92YXRlbG55IGdyaWR1XHJcbiAgICAgICAgLy9wcml2YXRlIGVkaXRHcmlkOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLXVjckRvcGxuXCI7XHJcbiAgICAgICAgLy8gdnN0dXBuaSBob2Rub3R5XHJcbiAgICAgICAgcHJpdmF0ZSBpbnB1dFZhbHVlczogSUdEZXRhaWxEb3BsSG9kbm90eU9wdGlvbnM7XHJcbiAgICAgICAgLy8gZ3JpZCBmb3JtYXQgaG9kbm90XHJcbiAgICAgICAgcHJpdmF0ZSBteUdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcbiAgICAgICAgLy8gRm9ybXVsYXIgaG9kbm90XHJcbiAgICAgICAgcHJpdmF0ZSBteUZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIC8vIGF0cmlidXQgZWRpdGFjZVxyXG4gICAgICAgIHByaXZhdGUgZWRpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHpub3Z1bmFjbnRlbmkgZGF0XHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIGRlZlNsb3VwY3U6IEdTbG91cGNlW107XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHRGV0YWlsRG9wbEhvZG5vdHlPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdChvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBJbmljaWFsaXphY2UgZm9ybXVsYXJlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgaW5pdChvcHRpb25zOiBJR0RldGFpbERvcGxIb2Rub3R5T3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gcG9jYXRlY25pIG5hc3RhdmVuaSBhdHJpYnV0dVxyXG4gICAgICAgICAgICB0aGF0LnJlbG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGF0LmVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlcyA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5pbnB1dFZhbHVlcy5jdXJyZW50Um93LnZ5a2F6IGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2VcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWxveml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LlNhdmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIGFjdENvcHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEtvcHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNjNcIiwgLy9SQyAzMDI1MDA2MyA6IEtvcMOtcm92YXQgeiB2eWJyYW7DqWhvIG9iZG9iw61cclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5Db3B5U2VsZWN0KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Q29weVByZXZpZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENvcHlQcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDcyXCIsIC8vUkMgMzAyNTAwNzIgOiBLb3DDrXJvdmF0IHogcMWZZWRjaG96w61obyBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LkNvcHlQcmV2aWV3KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uTm92eSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIHZpc2libGU6IGZhbHNlLCBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Ob3Z5UmFkZWsoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2RzdHJhbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgdmlzaWJsZTogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5PZHN0cmFuaXRSYWRlaygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFZ5Y2lzdGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWNpc3RpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEwNVwiLCAvL1JDIDMwMjUwMTA1IDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1rb3N0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZXRQZW5kaW5nKHRoYXQuQ29weVByZXZpZXcoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9pZiAoIXRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUpXHJcbiAgICAgICAgICAgIC8vdGhhdC5teVBhbmVsID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAvLyAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMDY0XCIsIC8vUkMgMzAyNTAwNjQgOiBIb2Rub3R5XHJcbiAgICAgICAgICAgIC8vICAgICAgICBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSwgdmlzaWJsZTp0cnVlLCAvLyAhdGhhdC5pbnB1dFZhbHVlcy52aWV3TW9kZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGhlYWRlckNsYXNzOiB0aGF0LmlucHV0VmFsdWVzLnZpZXdNb2RlID8gXCJoaWRkZW5cIiA6IFwiXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgeyBpZDogXCJJRG1udVVsb3ppdFwiLCBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgeyBpZDogXCJJRG1udU5vdnlcIiwgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Tm92eSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB7IGlkOiBcIklEbW51T2RzdHJhbml0XCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9kc3RyYW5pdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB7IGlkOiBcIklEbW51VnljaXN0aXRcIiwgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VnljaXN0aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHsgaWQ6IFwiSURtbnVLb3BpZVwiLCBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RDb3B5LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHsgaWQ6IFwiSURtbnVLb3BpZVByZXZpZXdcIiwgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Q29weVByZXZpZXcsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBdXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5teVBhbmVsID0gdGhpcy5lbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJJRG1udVVsb3ppdFwiLCBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIklEbW51Tm92eVwiLCBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3ROb3Z5LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJJRG1udU9kc3RyYW5pdFwiLCBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPZHN0cmFuaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIklEbW51VnljaXN0aXRcIiwgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VnljaXN0aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJJRG1udUtvcGllXCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdENvcHksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIklEbW51S29waWVQcmV2aWV3XCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdENvcHlQcmV2aWV3LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmxvYWRTbG91cGNlKHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWVzLmNvbHMgPSByZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbHModGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LCB0aGF0LmlucHV0VmFsdWVzLmNvbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LmlucHV0VmFsdWVzLnZpZXdNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB6amlzdGVuaSwgemRhIGplIGtvcGllIHogbWludWxlaG8gb2Jkb2JpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5VY3JWeWthekFkbS5oaXN0b3JpZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX3ZrejogdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93Lm1haW5JZCBhcyBhbnksIGtvZF9jYXN0X3ZrejogdGhhdC5nZXRJZCh0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cucGFyZW50SWQgYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgICAgICwgcG9yX2Npc2xvOiBwYXJzZUludCh0aGF0LmdldElkKHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5pZCBhcyBhbnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICwgdG9wb2xvZ2llOiB0aGF0LmlucHV0VmFsdWVzLnRvcG9sb2dpZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdENvcHkhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6IHJlc3VsdC5pc0hpc3RvcnkgYXMgYm9vbGVhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAsIHZpc2libGU6IHJlc3VsdC5pc0hpc3RvcnkgYXMgYm9vbGVhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IFwianJlczozMDI1MDA3MlwiOyAvL1JDIDMwMjUwMDcyIDogS29ww61yb3ZhdCB6IHDFmWVkY2hvesOtaG8gb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmlzSGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwianJlczozMDI1MDA3M1wiIC8vUkMgMzAyNTAwNzMgOiBLb3DDrXJvdmF0IHogcMWZZWRjaG96w61obyBvYmRvYsOtIHswfS97MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LmZvcm1hdChyZXN1bHQubWVzaWM/LnRvU3RyaW5nKCksIHJlc3VsdC5yb2s/LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RDb3B5UHJldmlldyEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHJlc3VsdC5pc0hpc3RvcnkgYXMgYm9vbGVhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB2aXNpYmxlOiByZXN1bHQuaXNIaXN0b3J5IGFzIGJvb2xlYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAvLyB6amlzdGVuaSwgemRhIGx6ZSB2eWJpcmF0IHogamlueWNoIG9iZG9iaSBwcm8ga29waWlcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVjclZ5a2F6QWRtLmxpc3RIaXN0b3JpZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX3ZrejogdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93Lm1haW5JZCBhcyBhbnksIGtvZF9jYXN0X3ZrejogdGhhdC5nZXRJZCh0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cucGFyZW50SWQgYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgICAgICwgcG9yX2Npc2xvOiBwYXJzZUludCh0aGF0LmdldElkKHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5pZCBhcyBhbnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICwgdG9wb2xvZ2llOiB0aGF0LmlucHV0VmFsdWVzLnRvcG9sb2dpZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdENvcHkhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiByZXN1bHQubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB2aXNpYmxlOiByZXN1bHQubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcmlrYXpvdmEgbGlzdGFcclxuICAgICAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpZFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFVsb3ppdFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpZGNsb3NlZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImFjdENsb3NlXCIsIGNhcHRpb246IFwianJlczozMDI1MDA2OFwiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pIC8vUkMgMzAyNTAwNjggOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRHcmlkKCk6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCBudWxsIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5cIiArIHRoaXMuY2xhc3NHcmlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCA9PSAwID8gbnVsbCA6IGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pZiAodGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LnByaXpfb3BhayAhPT0gMSkge1xyXG4gICAgICAgICAgICAvLyB6amlzdGVuaSB6bWVuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cucHJpel9vcGFrID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWVsZHMgPSB0aGF0LmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkcy5nZmllbGQoXCJoYXNDaGFuZ2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoYXQuZWRpdGluZyAmJiAhdGhhdC5pbnB1dFZhbHVlcy52aWV3TW9kZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHYgZWRpdGHEjW7DrW0gcmXFvmltdSAodGouIGkgcG8gcG9kw6Fuw60pIGRvdGF6IG5hIHphdsWZZW7DrSBiZXogdWxvxb5lbsOtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAwNzBcIiAvL1JDIDMwMjUwMDcwIDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAwNjlcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAzMDI1MDA2OSA6IE9wcmF2ZHUgY2hjZXRlIHphdsWZw610IGRldGFpbCBiZXogdWxvxb5lbsOtP1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHsgcmVmcmVzaDogdGhhdC5yZWxvYWQgJiYgIXRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKHRoYXQhLnBhcmVudENvbnRlbnQgYXMgR1Nlem5hbURvcGxua292ZVVkYWplKS4kZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZGVmLnJlamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICAvLyh0aGF0IS5wYXJlbnRDb250ZW50IGFzIEdTZXpuYW1Eb3BsbmtvdmVVZGFqZSkuJGdyaWQuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHsgcmVmcmVzaDogdGhhdC5yZWxvYWQgJiYgIXRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9kc3RyYW5pdCByYWRla1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBPZHN0cmFuaXRSYWRlaygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBpZiAoIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbG5pIHJhZGVrXHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFJvdyA9IHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRWaWV3KGdyaWQpLnVwZGF0ZURhdGEoR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3coZ3JpZCksIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgc2F2ZUR0byA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgZHRvU2F2ZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzKHRoYXQuZWRpdEdyaWQpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3codGhhdC5lZGl0R3JpZCk7XHJcbiAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGl0ZW0gaW4gcm93KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YXIgbmFtZSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2lmICghKG5hbWUubGVuZ3RoID4gMSAmJiBuYW1lWzBdID09ICdoJykpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdmFyIHBvbCA9IHsgdHlwX2R1OiBwYXJzZUludChuYW1lLnN1YnN0cigxKSksIHBvcl9vcGFrOiByb3dbXCJwb3Jfb3Bha1wiXSwgdmFsdWU6IFwiXCIgfTtcclxuICAgICAgICAgICAgICAgIC8vICAgIHNhdmVEdG8ucHVzaChwb2wgYXMgbmV2ZXIpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuaW5wdXRWYWx1ZXMuZWRpdENvbHMgPSBzYXZlRHRvO1xyXG4gICAgICAgICAgICAgICAgLy9Hb3JkaWMuSXNsLlVjclZ5a2F6QWRtLnNhdmVWYWx1ZXMoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaXhzX3ZrejogY3VycmVudFJvdy5tYWluSWQgYXMgYW55LCBrb2RfY2FzdF92a3o6IHRoYXQuZ2V0SWQoY3VycmVudFJvdy5wYXJlbnRJZCBhcyBhbnkpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAsIHBvcl9jaXNsbzogcGFyc2VJbnQodGhhdC5nZXRJZChjdXJyZW50Um93LmlkIGFzIGFueSkpLCB0b3BvbG9naWU6IHRoYXQuaW5wdXRWYWx1ZXMudG9wb2xvZ2llXHJcbiAgICAgICAgICAgICAgICAvLyAgICAsIGhvZG5vdHk6IHRoYXQuaW5wdXRWYWx1ZXMuZWRpdENvbHNcclxuICAgICAgICAgICAgICAgIC8vfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBzdGF0ZTogXCJzdWNjZXNzXCIsIGlkOiBcImlkRGVsZXRlVmFsXCIsIHRpbWVyOiAyMDAwLCBsYWJlbDogXCJqcmVzOjMwMjUwMDY3XCIgfSkgLy9SQyAzMDI1MDA2NyA6IEhvZG5vdHkgb2RzdHJhbsSbbnlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0Vmlldyh0aGF0LmVkaXRHcmlkKS51cGRhdGVEYXRhKEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93KHRoYXQuZWRpdEdyaWQpLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnNldEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgYWx3YXlzKCgpID0+IHsgcmV0dXJuIGRlZi5yZXNvbHZlKCkgfSk7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwcmF2YSB2aWRpdGVsbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0VmFsdWVzLmN1cnJlbnRSb3c/LnByaXpfb3BhayA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvY2V0WmFwaXN1ID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9kc3RyYW5pdCEudXBkYXRlKHsgdmlzaWJsZTogcG9jZXRaYXBpc3UgPiAwLCBlbmFibGVkOiBwb2NldFphcGlzdSA+IDAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldm9kIGZvcm1hdHUgdGV4dHUgbmEgaWQgKHh4eF9pZClcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gc3JjXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRJZChzcmM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBzcmMuaW5kZXhPZihcIl9cIik7XHJcbiAgICAgICAgICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBzcmMuc3Vic3RyKHBvcyArIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHJpbmcocG9zICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNyYztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBob2Rub3RcclxuICAgICAgICAgKiBAcGFyYW0gZmlsdHJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRIb2Rub3R5KGZpbHRyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdWeWtkdmtoSG9kbm90eUR0b1tdPiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGE6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0b1tdID0gW11cclxuICAgICAgICAgICAgLy92YXIgcmVzdWx0RGF0YTogSlF1ZXJ5UHJvbWlzZTxVY3QuSW50ZXJmYWNlLkdWeWtzdmt6RHRvW10+OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmlzbC5VY3JWeWthekFkbS5saXN0SG9kbm90eSh7IGl4c192a3o6IGZpbHRyLm1haW5JZCBhcyBhbnksIGtvZF9jYXN0X3ZrejogdGhhdC5nZXRJZChmaWx0ci5wYXJlbnRJZCBhcyBhbnkpLCBwb3JfY2lzbG86IHBhcnNlSW50KHRoYXQuZ2V0SWQoZmlsdHIuaWQgYXMgYW55KSksIHRvcG9sb2dpZTogdGhpcy5pbnB1dFZhbHVlcy50b3BvbG9naWUgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldm9kIGhvZG5vdCB2ZSBzdHJ1a3R1cnUgKE5hbWU6XCJcIixWYWx1ZTpcIlwiKSBkbyBwb2xlIChbTmFtZV09VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2ldLnZhbHVlcyAmJiByZXN1bHRbaV0udmFsdWVzIS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHRbaV0udmFsdWVzIS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbaV1bcmVzdWx0W2ldLnZhbHVlcyFbal0uTmFtZSBhcyBhbnldID0gcmVzdWx0W2ldLnZhbHVlcyFbal0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q29tYm8ocG9sZTogc3RyaW5nW10sZmlsZWROYW1lLHZhbHVlKTphbnkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGluaXRpYWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcG9sZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZ2ID0gcG9sZVtpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGssIHY7XHJcbiAgICAgICAgICAgICAgICBpZiAodnYubGVuZ3RoID4gMSkgeyBrID0gdnZbMF07IHYgPSB2dlsxXTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGsgPSB2ID0gdnZbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0geyAvKnRpdGxlOiB2dlsxXSwqLyBpZDogdnZbMF0gfTtcclxuICAgICAgICAgICAgICAgIG9ialtmaWxlZE5hbWVdID0gdnZbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAodnYubGVuZ3RoIDwgMilcclxuICAgICAgICAgICAgICAgICAgICB2dlsxXSA9IG9ialtmaWxlZE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgb2JqW2ZpbGVkTmFtZStcInRpdGxlXCJdID0gdnZbMV07XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2gob2JqIGFzIG5ldmVyKVxyXG4gICAgICAgICAgICAgICAgaWYgKHZ2WzBdID09IHZhbHVlIC8qaW5wdXQudmFsdWUqLylcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsID0gb2JqIGFzIGFueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwICYmIHR5cGVvZiBpbml0aWFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqMiA9IHsgLyp0aXRsZTogXCIoanJlczozMDI1MDA3MSlcIiwqLyBpZDogLTEgfTsgLy9SQyAzMDI1MDA3MSA6IHZ5bWF6YXQgaG9kbm90dVxyXG4gICAgICAgICAgICAgICAgb2JqMltmaWxlZE5hbWUgKyBcInRpdGxlXCJdID0gXCIoanJlczozMDI1MDA3MSlcIlxyXG4gICAgICAgICAgICAgICAgb2JqMltmaWxlZE5hbWVdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRhdGEucHVzaChvYmoyIGFzIG5ldmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiBkYXRhLCBpbml0aWFsOiBpbml0aWFsfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgcG9saWNrYSBwcm8gemFkYW5pIGhvZG5vdHlcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbChpbnB1dDogR0NvbHNPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlucHV0VmFsdWVzLmVkaXRDb2xzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlcy5lZGl0Q29scyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWVzLmVkaXRDb2xzLnB1c2goeyBuYW1lOiBpbnB1dC5jZWwsIHBvcl9vcGFrOiBpbnB1dC5wb3Jfb3BhaywgY29tYm86IChpbnB1dC5wYXR0ZXJuX2R1ICYmIGlucHV0LnBhdHRlcm5fZHUuc3Vic3RyaW5nKDAsIDUpLyppbnB1dC5wYXR0ZXJuX2R1LnN1YnN0cigwLCA1KSovID09PSBcIiNjb21iXCIgPyB0cnVlIDogZmFsc2UpIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09IEdFVHlwZVZhbHVlLlN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogaW5wdXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZm9ybWJveFwiLCBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXQuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBpbnB1dC5jZWwgKyBcIj12YWx1ZS50ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt0ZXh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgd2lkdGg6IDUwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiaW5saW5laW1tZWRpYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtdWNyRnVsbFNjcmVlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogaW5wdXQubWF4TGVuID4gMCA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAwLCBtYXg6IGlucHV0Lm1heExlbiB9KV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5mb3JtLmFkZFJvdyh7IGxhYmVsOiBpbnB1dC50aXRsZSwgbmFtZTogXCJsXCIgKyBpbnB1dC5jZWwgfSkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6XCJqcy11Y3JGdWxsU2NyZWVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IGlucHV0Lm1heExlbiA+IDAgPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMCwgbWF4OiBpbnB1dC5tYXhMZW4gfSldIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGlucHV0LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLy90aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSA9PT0gR0VUeXBlVmFsdWUuQ29tYm8pIHtcclxuICAgICAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBwb2xlIGNpc2VsbmlrdVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuZ2V0Q29tYm8oaW5wdXQucGF0dGVybl9kdSEuc3BsaXQoJ3wnKSwgaW5wdXQuY2VsLCBpbnB1dC5kYXRhLmgxKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbCA9IHJlcy5pbml0aWFsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LmdyaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXQuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBpbnB1dC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGlucHV0LmNlbCArIFwidGl0bGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dC5jZWwsIG11bHRpOiBmYWxzZSwgbGlzdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5cIiArIGlucHV0LmNlbCArIFwiPXZhbHVlLlwiICsgaW5wdXQuY2VsICsgXCI7bW9kZWwuXCIgKyBpbnB1dC5jZWwgKyBcInRpdGxlPXZhbHVlLlwiICsgaW5wdXQuY2VsICsgXCJ0aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie1wiICsgaW5wdXQuY2VsICsgXCJ0aXRsZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLCBpbml0aWFsVmFsdWU6IGluaXRpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiB0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiBkYXRhXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmZvcm0uYWRkUm93KHsgbGFiZWw6IGlucHV0LnRpdGxlLCBuYW1lOiBcImxcIiArIGlucHV0LmNlbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCwgbXVsdGk6IGZhbHNlLCBsaXN0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5cIiArIGlucHV0LmNlbCArIFwiPXZhbHVlLlwiICsgaW5wdXQuY2VsICsgXCI7bW9kZWwuXCIgKyBpbnB1dC5jZWwgKyBcInRpdGxlPXZhbHVlLlwiICsgaW5wdXQuY2VsICsgXCJ0aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7XCIgKyBpbnB1dC5jZWwgKyBcInRpdGxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGluaXRpYWxWYWx1ZTogaW5pdGlhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogdGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiBkYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlID09PSBHRVR5cGVWYWx1ZS5OdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogaW5wdXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0UHJlc2V0OiBcIiMwLDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLm5vcm1hbGl6ZUZvck11bWVyaWMoZGF0YVtpbnB1dC5jZWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHZhbCBhcyBhbnksIFwiQ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoZGF0YVtpbnB1dC5jZWxdLCBcIkNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAsIC8vR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRvdE5ldERlY2ltYWwoeyBpbnB1dDogaW5wdXQuY2VsIH0sIFwiIzAsMDBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLCBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXQuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IGlucHV0Lm1heExlbiA+IDAgPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMCwgbWF4OiBpbnB1dC5tYXhMZW4gfSldIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaXRlbVRlbXBsYXRlOiBmdW5jdGlvbiAoaW5wdXREYXRhKSB7IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoaW5wdXREYXRhLCBcIkNcIikgfSwvL0dvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kb3ROZXREZWNpbWFsKHtpbnB1dC5jZWx9LFwiIzAuMDBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXQ6ICBcIiMwLDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOlwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhvdXNhbmRzU2VwYXJhdG9yOiBcIiBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBcIixcIlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuZm9ybS5hZGRSb3coeyBsYWJlbDogaW5wdXQudGl0bGUsIG5hbWU6IFwibFwiICsgaW5wdXQuY2VsIH0pLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IGlucHV0Lm1heExlbiA+IDAgPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMCwgbWF4OiBpbnB1dC5tYXhMZW4gfSldIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGlucHV0LnZhbHVlID09PSBcIlwiID8gdW5kZWZpbmVkIDogdGhpcy5ub3JtYWxpemVGb3JNdW1lcmljKCBpbnB1dC52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3I6IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBcIixcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGU/XCJ1bmRlZmluZWRcIjogXCJ3LTJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgPT09IEdFVHlwZVZhbHVlLkZpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcl9vcGFrID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSAoR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3codGhhdC5lZGl0R3JpZCkgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Bvcl9vcGFrID0gcmFkZWsucG9yX29wYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlID0gKHR5cGVvZiByYWRlay5oMSAhPT0gXCJ1bmRlZmluZWRcIik7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZSA9ICh0eXBlb2YgaW5wdXQuZGF0YS5oMSAhPT0gXCJ1bmRlZmluZWRcIik7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuU3RhaG5vdXQ6IGFueSA9e1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDEwM1wiLCBwb3NpdGlvbjogXCJib3R0b21cIiwgLy9SQyAzMDI1MDEwMyA6IFN0w6Fobm91dCBzb3Vib3JcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb3VkLWRvd25sb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzYmxlOiB2aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1dHRvbkRvd25Mb2FkXCIsIHZpc2libGU6IHZpc2libGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2sgPSBuZXcgR0RvY3VtZW50KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRyID0gdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93OyAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZ3JpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3Jfb3BhayA9IChHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdyhncmlkKSBhcyBhbnkpLnBvcl9vcGFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2suZG93bmxvYWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvd25sb2FkZXJUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdGaWxlRG93bmxvYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3ZrejogZmlsdHIubWFpbklkIGFzIGFueSwga29kX2Nhc3Rfdmt6OiB0aGF0LmdldElkKGZpbHRyLnBhcmVudElkIGFzIGFueSksIHBvcl9jaXNsbzogcGFyc2VJbnQodGhhdC5nZXRJZChmaWx0ci5pZCBhcyBhbnkpKS50b1N0cmluZygpLFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5pbnB1dFZhbHVlcy50b3BvbG9naWUuaWNvIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGF0LmlucHV0VmFsdWVzLnRvcG9sb2dpZS51Y3MgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKip1dXMqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dXM6IHRoYXQuaW5wdXRWYWx1ZXMudG9wb2xvZ2llLnV1cyBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKm5rcyovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5rczogdGhhdC5pbnB1dFZhbHVlcy50b3BvbG9naWUubmtzIGFzIGFueSAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKnJvayovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5pbnB1dFZhbHVlcy50b3BvbG9naWUucm9rIGFzIGFueSAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKm1lc2ljKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6IHRoYXQuaW5wdXRWYWx1ZXMudG9wb2xvZ2llLm1lc2ljIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9yX29wYWs6IHBvcl9vcGFrLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZ3JpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dC5jZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGlucHV0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBkPy5maWxlbmFtZSA/PyBcIlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dC5jZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZ3VpZD12YWx1ZS5ndWlkO21vZGVsLmZpbGVuYW1lPXZhbHVlLmZpbGVuYW1lXCIsIC8vVGFkeSBtYXB1amVzIGR0byB6IGdmb3JtYm94IG5hIGR0byB2IHJvdy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2ZpbGVuYW1lfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgd2lkdGg6IDUwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQnV0dG9uczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW2J0blN0YWhub3V0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVyblR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlOiBcImlubGluZWltbWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ZpbGVmaWVsZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbGVuYW1lXCIsICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhGaWxlQ291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHRFeHRlbnNpb246IFwiLnBkZiwucG5nLC5qcGdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vVGVudG8gdmFsaWRhdG9yIGJ5IHNlIG1lbCBwb3N0YXJhdCwgemUgc2UgcG9ja2EgbmEgdmVsa3kgc291Ym9yLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcCwgZHRvLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UYWR5IG1hcHVqZXMgZHRvIHogZmlsZWZpZWxkIG5hIGdmb3JtYm94LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcCA9PT0gXCJhcHBseVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZHRvLmd1aWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1aWQ6IGR0by5ndWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGR0by5maWxlbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbdmFsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wID09PSBcImNvbGxlY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSBhcyBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodmFsLmxlbmd0aCAhPT0gMSkgdGhyb3cgbmV3IEdFcnJvcihcIk11c2kgYnl0IGplZGVuIHNvdWJvciEhIVwiKTsgLy9UT0RPOiBUb3RvIHNpLCBUb21lLCBuZWphayBvc2V0cmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmd1aWQgPSB2YWxbMF0uZ3VpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmZpbGVuYW1lID0gdmFsWzBdLmZpbGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSkgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5mb3JtLmFkZFJvdyh7IGxhYmVsOiBpbnB1dC50aXRsZSwgbmFtZTogXCJsXCIgKyBpbnB1dC5jZWwgfSkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IGlucHV0Lm1heExlbiA+IDAgPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMCwgbWF4OiBpbnB1dC5tYXhMZW4gfSldIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpbnB1dC52YWx1ZSA9PT0gXCJcIiA/IHVuZGVmaW5lZCA6IGlucHV0LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUgPyBcInVuZGVmaW5lZFwiIDogXCJ3LTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmZvcm0uYWRkUm93KHsgbGFiZWw6IGlucHV0LnRpdGxlLCBuYW1lOiBcImxcIiArIGlucHV0LmNlbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2Zvcm1ib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsZW5hbWVcIiwgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmd1aWQ9dmFsdWUuZ3VpZDttb2RlbC5maWxlbmFtZT12YWx1ZS5maWxlbmFtZVwiLCAvL1RhZHkgbWFwdWplcyBkdG8geiBnZm9ybWJveCBuYSBkdG8gdiByb3cuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntmaWxlbmFtZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1maWxlbmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJqcy1maWxlbmFtZTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEJ1dHRvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtidG5TdGFobm91dF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtQ2xhc3M6IFwianMtZmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogeyBmaWxlbmFtZTogaW5wdXQudmFsdWUgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsZW5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdEV4dGVuc2lvbiA6XCIucGRmLC5wbmcsLmpwZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4RmlsZUNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCAvL1RlbnRvIHZhbGlkYXRvciBieSBzZSBtZWwgcG9zdGFyYXQsIHplIHNlIHBvY2thIG5hIHZlbGt5IHNvdWJvci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3AsIGR0bywgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGFkeSBtYXB1amVzIGR0byB6IGZpbGVmaWVsZCBuYSBnZm9ybWJveC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3AgPT09IFwiYXBwbHlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWR0by5ndWlkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlkOiBkdG8uZ3VpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBkdG8uZmlsZW5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgW3ZhbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcCA9PT0gXCJjb2xsZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHZhbC5sZW5ndGggIT09IDEpIHRocm93IG5ldyBHRXJyb3IoXCJNdXNpIGJ5dCBqZWRlbiBzb3Vib3IhISFcIik7IC8vVE9ETzogVG90byBzaSwgVG9tZSwgbmVqYWsgb3NldHJpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5ndWlkID0gdmFsWzBdLmd1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5maWxlbmFtZSA9IHZhbFswXS5maWxlbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcImZpbGVuYW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21heEZpbGVDb3VudDogMSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vVGVudG8gdmFsaWRhdG9yIGJ5IHNlIG1lbCBwb3N0YXJhdCwgemUgc2UgcG9ja2EgbmEgdmVsa3kgc291Ym9yLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogZnVuY3Rpb24gKG9wLCBkdG8sIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vVGFkeSBtYXB1amVzIGR0byB6IGZpbGVmaWVsZCBuYSBnZm9ybWJveC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChvcCA9PT0gXCJhcHBseVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKCFkdG8uZ3VpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCB2YWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGd1aWQ6IGR0by5ndWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWxlbmFtZTogZHRvLmZpbGVuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSBhcyBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbdmFsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBlbHNlIGlmIChvcCA9PT0gXCJjb2xsZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBsZXQgdmFsID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSBhcyBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodmFsLmxlbmd0aCAhPT0gMSkgdGhyb3cgbmV3IEdFcnJvcihcIk11c2kgYnl0IGplZGVuIHNvdWJvciEhIVwiKTsgLy9UT0RPOiBUb3RvIHNpLCBUb21lLCBuZWphayBvc2V0cmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkdG8uZ3VpZCA9IHZhbFswXS5ndWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGR0by5maWxlbmFtZSA9IHZhbFswXS5maWxlbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlID09PSBHRVR5cGVWYWx1ZS5EYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZ3JpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlHcmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dC5jZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGlucHV0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdkYXRlYm94XCIsIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dC5jZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogaW5wdXQubWF4TGVuID4gMCA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAwLCBtYXg6IGlucHV0Lm1heExlbiB9KV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IGZ1bmN0aW9uIChpbnB1dERhdGEpIHsgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihpbnB1dERhdGEsIFwiQ1wiKSB9LC8vR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRvdE5ldERlY2ltYWwoe2lucHV0LmNlbH0sXCIjMC4wMFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblR5cGU6IFwic3RyaW5nXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmZvcm0uYWRkUm93KHsgbGFiZWw6IGlucHV0LnRpdGxlLCBuYW1lOiBcImxcIiArIGlucHV0LmNlbCB9KS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXQuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Rpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogaW5wdXQubWF4TGVuID4gMCA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAwLCBtYXg6IGlucHV0Lm1heExlbiB9KV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogaW5wdXQudmFsdWUgPT09IFwiXCIgPyB1bmRlZmluZWQgOiBpbnB1dC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUgPyBcInVuZGVmaW5lZFwiIDogXCJ3LTJcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSA9PT0gR0VUeXBlVmFsdWUuRGF0ZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5ncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogaW5wdXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2RhdGVib3hcIiwgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBpbnB1dC5tYXhMZW4gPiAwID8gW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDAsIG1heDogaW5wdXQubWF4TGVuIH0pXSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2l0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKGlucHV0RGF0YSkgeyBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKGlucHV0RGF0YSwgXCJDXCIpIH0sLy9Hb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZG90TmV0RGVjaW1hbCh7aW5wdXQuY2VsfSxcIiMwLjAwXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0OiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZG90TmV0RGVjaW1hbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblR5cGU6IFwic3RyaW5nXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmZvcm0uYWRkUm93KHsgbGFiZWw6IGlucHV0LnRpdGxlLCBuYW1lOiBcImxcIiArIGlucHV0LmNlbCB9KS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaW5wdXQuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Rpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogaW5wdXQubWF4TGVuID4gMCA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAwLCBtYXg6IGlucHV0Lm1heExlbiB9KV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogaW5wdXQudmFsdWUgPT09IFwiXCIgPyB1bmRlZmluZWQgOiBpbnB1dC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5Y2lzdGVuaSBwcnZrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjbGVhckNvbnRyb2xzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm15UGFuZWwuZW1wdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBaamlzdGVuaSB0eXB1IHNsb3VjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBwYXR0ZXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRUeXBlQ29sKHBhdHRlcm4/OiBzdHJpbmcgfCBudWxsKTogR0VUeXBlVmFsdWUge1xyXG4gICAgICAgICAgICBpZiAocGF0dGVybiAmJiBwYXR0ZXJuLnN1YnN0cmluZygwLCA1KSA9PT0gXCIjY29tYlwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdFVHlwZVZhbHVlLkNvbWJvO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChwYXR0ZXJuICYmIHBhdHRlcm4uc3Vic3RyaW5nKDAsIDUpID09PSBcIiNmaWxlXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR0VUeXBlVmFsdWUuRmlsZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocGF0dGVybiAmJiBwYXR0ZXJuLnJlcGxhY2UoL1xcXFwvZywgXCJcIikgPT0gXCJkP2QuZD9kLmRkZGRcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBHRVR5cGVWYWx1ZS5EYXRlO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChwYXR0ZXJuICYmIHBhdHRlcm4ucmVwbGFjZSgvXFxcXC9nLCBcIlwiKSA9PSBcIi17MCwxfSgwfFsxLTldezF9ZHswLDE0fSkoWyxdfFsuXSlkezJ9fCgwfFsxLTldezF9ZHswLDE0fSlcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBHRVR5cGVWYWx1ZS5OdW1iZXI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBHRVR5cGVWYWx1ZS5TdHJpbmc7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3Jlbmkgc2xvdXBjdVxyXG4gICAgICAgICAqIEBwYXJhbSBjdXJyZW50Um93XHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoY3VycmVudFJvdzogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvLCBkYXRhOiBHU2xvdXBjZVtdKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy92YXIgbXlGb3JtOkdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgICAgICAvLyB6bmVwcmlzdHVwZW5uaSBha2NpXHJcbiAgICAgICAgICAgIHRoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRSb3cucHJpel9vcGFrID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm15R3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm15Rm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhvZG5vdHlcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy90aGF0Lm15Rm9ybS5hZGRTZWN0aW9uKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTItMTAtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIsIG5hbWU6IFwidXppdkhvZG5vdHlcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQubXlGb3JtLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMTItMTItMTIsIE0tMTItMTItMTIsIFMtMTItMTItMFwiLCBuYW1lOiBcInV6aXZIb2Rub3R5XCIgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBuYWN0ZW5pIGhvZG5vdFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRIb2Rub3R5KGN1cnJlbnRSb3cpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFkdG8gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS5sZW5ndGggIT09IFwidW5kZWZpbmVkXCIgJiYgIGRhdGEubGVuZ3RoID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc3RhcmUgY2hvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmF6ZXYgPSBjdXJyZW50Um93LnZ5a2F6O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmF6ZXZfdmF6ID0gY3VycmVudFJvdy5uYXpldl92YXo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxrYV9kdSA9IGN1cnJlbnRSb3cuZGVsa2FfZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxrYV92YXogPSBjdXJyZW50Um93LmRlbGthX3ZhejtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hemV2X3ZhejIgPSBjdXJyZW50Um93Lm5hemV2X3ZhejI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxrYV92YXoyID0gY3VycmVudFJvdy5kZWxrYV92YXoyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdHlwOiBHRVR5cGVWYWx1ZSA9IEdFVHlwZVZhbHVlLlN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXAgPSB0aGF0LmdldFR5cGVDb2woY3VycmVudFJvdy5wYXR0ZXJuX2R1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY3VycmVudFJvdy5wYXR0ZXJuX2R1ICYmIGN1cnJlbnRSb3cucGF0dGVybl9kdS5zdWJzdHIoMCwgNSkgPT09IFwiI2NvbWJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwID0gR0VUeXBlVmFsdWUuQ29tYm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAoY3VycmVudFJvdy5wYXR0ZXJuX2R1ICYmIGN1cnJlbnRSb3cucGF0dGVybl9kdS5zdWJzdHIoMCwgNSkgPT09IFwiI2ZpbGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwID0gR0VUeXBlVmFsdWUuRmlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlIGlmIChjdXJyZW50Um93LnBhdHRlcm5fZHUgJiYgY3VycmVudFJvdy5wYXR0ZXJuX2R1LnJlcGxhY2UoL1xcXFwvZywgXCJcIikgPT0gXCJkP2QuZD9kLmRkZGRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwID0gR0VUeXBlVmFsdWUuRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlIGlmIChjdXJyZW50Um93LnBhdHRlcm5fZHUgJiYgY3VycmVudFJvdy5wYXR0ZXJuX2R1LnJlcGxhY2UoL1xcXFwvZywgXCJcIikgPT0gXCItezAsMX0oMHxbMS05XXsxfWR7MCwxNH0pKFssXXxbLl0pZHsyfXwoMHxbMS05XXsxfWR7MCwxNH0pXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHR5cCA9IEdFVHlwZVZhbHVlLk51bWJlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmU2xvdXBjdS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cCwgbmFtZTogXCJoMFwiLCB0aXRsZTogbmF6ZXYgYXMgYW55LCBha3Rpdml0YTogMTAwLCBtaW46IDAsIG1heDogXCJcIiwgbWF4TGVuOiAocGFyc2VJbnQoZGVsa2FfZHUgYXMgYW55KSA+IDAgPyBkZWxrYV9kdSA6IDApIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtaW5MZW46IDAsIHBhdGVybjogY3VycmVudFJvdy5wYXR0ZXJuX2R1IGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9kdTogY3VycmVudFJvdy5wYXR0ZXJuX2R1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHBvcl9vcGFrOiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdLnBvcl9vcGFrIGFzIG51bWJlciA6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3VwZWMgaDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVDb2woe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogdGhhdC5teUZvcm0sIHR5cGU6IHR5cCwgY2VsOiBcImgwXCIsIHRpdGxlOiBuYXpldiBhcyBhbnksIG1heExlbjogKHBhcnNlSW50KGRlbGthX2R1IGFzIGFueSkgPiAwID8gZGVsa2FfZHUgOiAwKSBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLypmb3JtYXQ6IFwiXCIsKi8gZ3JpZDogY3VycmVudFJvdy5wcml6X29wYWsgPT09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJnJlc3VsdC5sZW5ndGggPiAwICYmIHR5cGVvZiByZXN1bHRbMF0uaDAgIT09IFwidW5kZWZpbmVkXCIgPyByZXN1bHRbMF0uaDAgOiBcIlwiLCBwb3Jfb3BhazogdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJnJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdLnBvcl9vcGFrIGFzIG51bWJlciA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuX2R1OiBjdXJyZW50Um93LnBhdHRlcm5fZHUsIGRhdGE6IHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiZyZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1pbjogXCJcIiwgbWF4OiBcIlwiLCBtaW5MZW46IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmF6ZXZfdmF6ICE9PSBcInVuZGVmaW5lZFwiICYmIG5hemV2X3ZheiAhPSBudWxsICYmIG5hemV2X3ZheiAhPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cCA9IHRoYXQuZ2V0VHlwZUNvbChjdXJyZW50Um93LnBhdHRlcm5fdmF6KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGN1cnJlbnRSb3cucGF0dGVybl92YXogJiYgY3VycmVudFJvdy5wYXR0ZXJuX3Zhei5yZXBsYWNlKC9cXFxcL2csIFwiXCIpID09IFwiLXswLDF9KDB8WzEtOV17MX1kezAsMTR9KShbLF18Wy5dKWR7Mn18KDB8WzEtOV17MX1kezAsMTR9KVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwID0gR0VUeXBlVmFsdWUuTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZTbG91cGN1LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cCwgbmFtZTogXCJoMVwiLCB0aXRsZTogbmF6ZXZfdmF6IGFzIGFueSwgYWt0aXZpdGE6IDEwMCwgbWluOiAwLCBtYXg6IGRlbGthX3ZheiwgbWF4TGVuOiBkZWxrYV92YXogYXMgbnVtYmVyLCBtaW5MZW46IDAsIHBhdGVybjogY3VycmVudFJvdy5wYXR0ZXJuX2R1IGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfZHU6IGN1cnJlbnRSb3cucGF0dGVybl92YXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHBvcl9vcGFrOiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdLnBvcl9vcGFrIGFzIG51bWJlciA6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdXBlYyBoMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVDb2woXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiB0aGF0Lm15Rm9ybSwgdHlwZTogdHlwLCBjZWw6IFwiaDFcIiwgdGl0bGU6IG5hemV2X3ZheiBhcyBhbnksIG1heExlbjogKHBhcnNlSW50KGRlbGthX3ZheiBhcyBhbnkpID4gMCA/IGRlbGthX3ZheiA6IDApIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIC8qZm9ybWF0OiBcIlwiLCovIGdyaWQ6IGN1cnJlbnRSb3cucHJpel9vcGFrID09PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQubGVuZ3RoID4gMCAmJiB0eXBlb2YgcmVzdWx0WzBdLmgxICE9PSBcInVuZGVmaW5lZFwiID8gcmVzdWx0WzBdLmgxIDogXCJcIiwgcG9yX29wYWs6IHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0ucG9yX29wYWsgYXMgbnVtYmVyIDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHBhdHRlcm5fZHU6IGN1cnJlbnRSb3cucGF0dGVybl92YXosIGRhdGE6IHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1pbjogMCwgbWF4OiBkZWxrYV92YXosIG1pbkxlbjogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuYXpldl92YXoyICE9PSBcInVuZGVmaW5lZFwiICYmIG5hemV2X3ZhejIgIT0gbnVsbCAmJiBuYXpldl92YXoyICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXAgPSB0aGF0LmdldFR5cGVDb2woY3VycmVudFJvdy5wYXR0ZXJuX3ZhejIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdXBlYyBoMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZTbG91cGN1LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cCwgbmFtZTogXCJoMlwiLCB0aXRsZTogbmF6ZXZfdmF6MiBhcyBhbnksIGFrdGl2aXRhOiAxMDAsIG1pbjogMCwgbWF4OiBcIlwiLCBtYXhMZW46IGRlbGthX3ZheiBhcyBudW1iZXIsIG1pbkxlbjogMCwgcGF0ZXJuOiBjdXJyZW50Um93LnBhdHRlcm5fZHUgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9kdTogY3VycmVudFJvdy5wYXR0ZXJuX3ZhejJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHBvcl9vcGFrOiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdLnBvcl9vcGFrIGFzIG51bWJlciA6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVDb2woe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IHRoYXQubXlGb3JtLCB0eXBlOiB0eXAsIGNlbDogXCJoMlwiLCB0aXRsZTogbmF6ZXZfdmF6MiBhcyBhbnksIG1heExlbjogKHBhcnNlSW50KGRlbGthX3ZhejIgYXMgYW55KSA+IDAgPyBkZWxrYV92YXoyIDogMCkgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAvKmZvcm1hdDogXCJcIiwqLyBncmlkOiBjdXJyZW50Um93LnByaXpfb3BhayA9PT0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQubGVuZ3RoID4gMCAmJiB0eXBlb2YgcmVzdWx0WzBdLmgyICE9PSBcInVuZGVmaW5lZFwiID8gcmVzdWx0WzBdLmgyIDogXCJcIiwgcG9yX29wYWs6IHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0ucG9yX29wYWsgYXMgbnVtYmVyIDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcGF0dGVybl9kdTogY3VycmVudFJvdy5wYXR0ZXJuX3ZhejIsIGRhdGE6IHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbWluOiAwLCBtYXg6IGRlbGthX3ZhejIsIG1pbkxlbjogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgbmFtZSA9IFwiaFwiICsgY29sLnR5cF9kdT8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHQgPSBjb2wuZGF0X2R1O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteXJlc3VsdDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Z5a2R2a2hIb2Rub3R5RHRvID0geyBoMDogXCJcIiwgcG9yX29wYWs6IDAsIHBvcl9vcGFrMTogMCB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIHkgPSAwOyB5IDwgcmVzdWx0Lmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0WzBdW2NvbC5uYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyZXN1bHRbeV0ucG9yX29wYWsxID09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15cmVzdWx0ID0gcmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9teXJlc3VsdC5oMCA9IG15cmVzdWx0W2NvbC5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPSBteXJlc3VsdFtjb2wubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29sKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IHRoYXQubXlGb3JtLCB0eXBlOiBjb2wudHlwZSwgY2VsOiBjb2wubmFtZSwgdGl0bGU6IGNvbC5uYXpldiBhcyBhbnksIG1heExlbjogY29sLm1heExlbiwgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLypmb3JtYXQ6IGZvcm1hdCwqLyBncmlkOiBjdXJyZW50Um93LnByaXpfb3BhayA9PT0gMSwgcG9yX29wYWs6IG15cmVzdWx0LnBvcl9vcGFrIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHBhdHRlcm5fZHU6IGNvbC5wYXRlcm4vKmN1cnJlbnRSb3cucGF0dGVybl9kdSovLCBkYXRhOiBteXJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1pbjogY29sLm1pbiwgbWF4OiBjb2wubWF4LCBtaW5MZW46IGNvbC5taW5MZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVsb3ppdCEudXBkYXRlKHsgdmlzaWJsZTogdHJ1ZSwgZW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFJvdy5wcml6X29wYWsgPT09IDEgJiYgdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpcHJhdmEgaG9kbm90LCBrdGVyZSBzZSBwcmVkYWppIHYgcG9saSBkbyBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCByZXN1bHQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0udHlwZSA9PT0gR0VUeXBlVmFsdWUuQ29tYm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuZ2V0Q29tYm8oZGF0YVtpXS5wYXRlcm4uc3BsaXQoJ3wnKSwgZGF0YVtpXS5uYW1lLCByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0aWFsID0gcmVzLmluaXRpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jvd11bZGF0YVtpXS5uYW1lICsgXCJ0aXRsZVwiXSA9IGluaXRpYWxbZGF0YVtpXS5uYW1lICsgXCJ0aXRsZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhW2ldLnR5cGUgPT09IEdFVHlwZVZhbHVlLkludGVnZXIgfHwgZGF0YVtpXS50eXBlID09PSBHRVR5cGVWYWx1ZS5OdW1iZXIgfHwgZGF0YVtpXS50eXBlID09PSBHRVR5cGVWYWx1ZS5EZWNpbWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwcmF2YSBudW1lcmlja2UgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdFtyb3ddW2RhdGFbaV0ubmFtZV0gIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdID0gdGhhdC5ub3JtYWxpemVGb3JNdW1lcmljKHJlc3VsdFtyb3ddW2RhdGFbaV0ubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdID0gcmVzdWx0W3Jvd11bZGF0YVtpXS5uYW1lXS5yZXBsYWNlQWxsKFwiLFwiLCBcIi5cIikucmVwbGFjZUFsbChcIiBcIiwgXCJcIik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbaV0udHlwZSA9PT0gR0VUeXBlVmFsdWUuRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdFtyb3ddW2RhdGFbaV0ubmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyb3ddW2RhdGFbaV0ubmFtZV0gPSByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdLnJlcGxhY2VBbGwoXCIsXCIsIFwiLlwiKS5yZXBsYWNlQWxsKFwiIFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyb3ddW1wiZmlsZW5hbWVcIl0gPSByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhW2ldLnR5cGUgPT09IEdFVHlwZVZhbHVlLkRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmV2b2QgbmEgZGF0dW0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0c3QgPSByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdHN0LnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhZ3M6IHN0cmluZ1tdID0gdmFsdWUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyYWdzLmxlbmd0aCAhPSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jvd11bZGF0YVtpXS5uYW1lXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc051bWVyaWMoZnJhZ3NbMl0pIHx8ICFpc051bWVyaWMoZnJhZ3NbMV0pIHx8ICFpc051bWVyaWMoZnJhZ3NbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jvd11bZGF0YVtpXS5uYW1lXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGZyYWdzWzJdKSwgcGFyc2VJbnQoZnJhZ3NbMV0pIC0gMSwgcGFyc2VJbnQoZnJhZ3NbMF0pKTsgLy8gbWVzaWNlIHphY2luYWppIG9kIDAgdiBKUyFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuaXNWYWxpZChkYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdID0gZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB0c3QgPSByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90c3Q9IHRzdC5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGRhdCA9IG1vbWVudCh0c3QsIFwiRC5NLllZWVlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChkYXQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXN1bHRbcm93XVtkYXRhW2ldLm5hbWVdID0gZGF0LnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJlc3VsdFtyb3ddW2RhdGFbaV0ubmFtZV0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFkdG8ucHVzaChyZXN1bHRbcm93XSBhcyBuZXZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm9yaXQgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5teVBhbmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiB0aGF0Lm15R3JpZEZvcm1hdC5jb2x1bW5zLmxlbmd0aD4xMD9cImZ1bGxcIjogXCJmaXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFkdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6ICh0aGF0LmlucHV0VmFsdWVzLnZpZXdNb2RlID8gXCJyb3dcIiA6IFwiY2VsbFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzRW5hYmxlZDogKHRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUgPyBmYWxzZSA6IHVuZGVmaW5lZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5teUdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoZXZlbnQsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUgJiYgY3VycmVudFJvdy5wYXR0ZXJuX2R1ID09IFwiI2ZpbGVcIiAmJiBpbmZvLmNlbGxJbmZvLmNvbHVtbiEuZmllbGQgPT09IFwiaDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5jb2x1bW4hLmVkaXRvciFbXCJvcHRpb25zXCJdIS5idXR0b25zWzBdLmFjdGlvbi52aXNpYmxlKHR5cGVvZiBpbmZvLmNlbGxJbmZvLmRhdGEuaDEgIT09IFwidW5kZWZpbmVkXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoaW5mby5jZWxsSW5mby4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyByb3dOdW1iZXJzOnRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXJTZXR0aW5nczogdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LmlkIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInBvcGlzXCJdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkY2VsbGVkaXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4geyB0aGF0LmVkaXRpbmcgPSB0cnVlOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ3JpZCBhcyBhbnkpLmdncmlkZHJhZ2Ryb3Aoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAoZXY6IEpRdWVyeUV2ZW50T2JqZWN0LCBhKSA9PiB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoZXYsIG9iajogeyBzdGFydDogbnVtYmVyOyBjb3VudDogbnVtYmVyOyBzaGlmdDogbnVtYmVyIH0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gX3RoaXMucHJvZmlsZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkY2VsbGVkaXRvcignc3RhcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudChncmlkKS5lbGVtZW50LmZpbmQoXCIuanMtdWNyRnVsbFNjcmVlblwiKS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JpZC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lZGl0R3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcImNvbHVtbnNcIiwgdGhhdC5teUdyaWRGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6cHJpc3R1cG5lbmkgYWtjaTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdnkgcmFkZWsgaG9kbm90XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5IS51cGRhdGUoeyB2aXNpYmxlOiB0cnVlLCBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9jZXRaYXBpc3UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5bWF6YXQgcmFkZWsgaG9kbm90XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLnVwZGF0ZSh7IHZpc2libGU6IHBvY2V0WmFwaXN1ID4gMCwgZW5hYmxlZDogcG9jZXRaYXBpc3UgPiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpZGFuZSBmb3JtdWxhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0Lm15UGFuZWwpLmdmb3JtKCdjcmVhdGVGcm9tJywgdGhhdC5teUZvcm0pOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdXRvbWF0aWNrZSByb3p0YXplbmkgdGV4dGJveHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGZybSkuZWxlbWVudC5maW5kKFwiLmpzLXVjckZ1bGxTY3JlZW5cIikuZ2F1dG9maXQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIHBvbGUgdnltYXphdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VnljaXN0aXQhLnVwZGF0ZSh7IHZpc2libGU6IHRydWUsIGVuYWJsZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbmkgZm9jdXN1IG5hIDEuIHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHRoYXQuZmluZEZpZWxkcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPiAwICYmICF0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZpZWxkcygpLmZpcnN0KCkuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoY3VycmVudFJvdy5wcml6X29wYWsgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoIXRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBncmlkLmdncmlkY2VsbGVkaXRvcignc3RhcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyB6b2JyYXplbmkgcG9sZSB2eW1hemF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFZ5Y2lzdGl0IS51cGRhdGUoeyB2aXNpYmxlOiB0cnVlLCBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBuYXN0YXZlbmkgZm9jdXN1IG5hIDEuIHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgZmllbGRzID0gdGhhdC5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChmaWVsZHMubGVuZ3RoID4gMCAmJiAhdGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZpZWxkcygpLmZpcnN0KCkuZ2ZpZWxkKCdmb2N1cycpOyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQuaW5wdXRWYWx1ZXMudmlld01vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgKHRoYXQhLnBhcmVudENvbnRlbnQgYXMgR1Nlem5hbURvcGxua292ZVVkYWplKS4kZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOcm9tYWxpemFjZSBwcm8gbnVtZXJpY2tlIGNpc2xvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHNvdXJjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbm9ybWFsaXplRm9yTXVtZXJpYyhzb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCB0ZWNrYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgY2Fya2EgPSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAoc291cmNlID09IG51bGwgfHwgdHlwZW9mIHNvdXJjZSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09IFwibnVtYmVyXCIpIHJldHVybiBzb3VyY2U7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB6bmFrOiBzdHJpbmcgPSBzb3VyY2VbaV07XHJcbiAgICAgICAgICAgICAgICAvLyBLb250cm9sYSDEjcOtc2xpY2UgbmVibyBzcGVjacOhbG7DrWhvIHpuYWt1XHJcbiAgICAgICAgICAgICAgICBpZiAoKHpuYWsgPj0gXCIwXCIgJiYgem5hayA8PSBcIjlcIiApfHwgem5hayA9PSBcIitcIiB8fCB6bmFrID09IFwiLVwiIC8qfHwgem5hayA9PSBcIi5cIiB8fCB6bmFrID09IFwiLFwiKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gem5haztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHpuYWsgPT0gXCIuXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gem5haztcclxuICAgICAgICAgICAgICAgICAgICB0ZWNrYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh6bmFrID09IFwiLFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHpuYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Fya2EgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgemFubWVua28gPSByZXN1bHQ9PVwiXCIgPyBcIlwiOnJlc3VsdC5jaGFyQXQoMCk7XHJcbiAgICAgICAgICAgIC8vIHpuYW1lbmtvIG5hIHphY2F0a3VcclxuICAgICAgICAgICAgaWYgKHphbm1lbmtvID09PSBcIitcIiB8fCB6YW5tZW5rbyA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBSZXN1bHQ6IHN0cmluZyA9IHJlc3VsdC5sZW5ndGggPiAxID8gKHJlc3VsdC5zdWJzdHJpbmcoMSkgYXMgYW55KS5yZXBsYWNlQWxsKFwiK1wiLCBcIlwiKS5yZXBsYWNlQWxsKFwiLVwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgOlwiXCI7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAoemFubWVua28gPT09IFwiLVwiICYmIHRtcFJlc3VsdCE9PVwiXCIgPyB6YW5tZW5rbzpcIlwiKSArIHRtcFJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG11c2ltIG9kc3RyYW5pdCB6bmVtZW5rYSBuZWtkZSBtZXppIGNpc2x5XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0IGFzIGFueSkucmVwbGFjZUFsbChcIitcIiwgXCJcIikucmVwbGFjZUFsbChcIi1cIiwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGVja2EgYSBjYXJrYSBzb3VjYXNuZSB2IGNpc2x1XHJcbiAgICAgICAgICAgIGlmICh0ZWNrYSAmJiBjYXJrYSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYW1lcmlja3kgZm9ybWF0IC0gY2Fya2E6IG9kZGVsb3ZhYyB0aXNpY3UsIHRlY2thOiBkZXNldGlubmEgY2FzdCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9KHJlc3VsdCBhcyBhbnkpLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYXJrYSkgXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0IGFzIGFueSkucmVwbGFjZUFsbChcIixcIiwgXCIuXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzdWx0ID0gTnVtYmVyLmlzTmFOKHJlc3VsdCkgPyBcIlwiIDogcmVzdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBjYXN0aSB2eWthenVcclxuICAgICAgICAgKiBAcGFyYW0gZmlsdHJcclxuICAgICAgICAgKi9cclxuICAgICAgICBsb2FkU2xvdXBjZShmaWx0cjogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvKTogSlF1ZXJ5UHJvbWlzZTxHU2xvdXBjZVtdPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IGRhdGE6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0b1tdID0gW11cclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlVjclZ5a2F6QWRtLmxpc3RTbG91cGN1VnlrYXp1KHsgaXhzX3ZrejogZmlsdHIubWFpbklkIGFzIGFueSwga29kX2Nhc3Rfdmt6OiB0aGF0LmdldElkKGZpbHRyLnBhcmVudElkIGFzIGFueSksIHBvcl9jaXNsbzogcGFyc2VJbnQodGhhdC5nZXRJZChmaWx0ci5pZCBhcyBhbnkpKSwgcm9rOiB0aGF0LmlucHV0VmFsdWVzLnJvaywgbWVzaWM6IHRoYXQuaW5wdXRWYWx1ZXMubWVzaWMgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSByZXN1bHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gXCJoXCIgKyBjb2wudHlwX2R1Py50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0OiBhbnkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGNvbC5kYXRfZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0IS5pbmRleE9mKCcjJykgPj0gMCB8fCB0IS5pbmRleE9mKCdAJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoKHAgPSB0LmluZGV4T2YobmV3IGNoYXJbXSB7ICcjJywgJ0AnIH0pKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHQhLmluZGV4T2YoJyMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwIDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gdCEuaW5kZXhPZignQCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0ID0gdD8uc3Vic3RyaW5nKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHQ/LnN1YnN0cmluZygwLCBwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSBcIlwiKSB0ID0gXCJTXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXVtcInBhdGVyblwiXSA9IHBhdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXQhPW51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXplID0gKHBhdCBhcyBzdHJpbmcpLnNwbGl0KCdAJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkZCA9IDE7IGRkIDwgbWV6ZS5sZW5ndGg7IGRkKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWEgPSBtZXplW2RkXS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hLmxlbmd0aCAhPSAyKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1hWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrVmFsdWVfcGF0KGxfdmFsLCBrdlsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxNSU5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbXCJtaW5MZW5cIl0gPSBtYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MSA9IGxfdmFsLkxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MiA9IEludDMyLlBhcnNlKGt2WzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh2MiA+IHYxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRocm93IG5ldyBHTm9uRmF0YWxFeGNlcHRpb24oMjEwMDAwMTQsIDIxMDUwMTQ2LCB2Mik7IC8vUkMtRVggMjEwNTAxNDYgOiBOdXRubyB6YWRhdCBtaW5pbcOhbG7EmyB7MH0gem5ha8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxNQVhcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbXCJtYXhMZW5cIl0gPSBtYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MSA9IGxfdmFsLkxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MiA9IEludDMyLlBhcnNlKGt2WzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh2MiA8IHYxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRocm93IG5ldyBHTm9uRmF0YWxFeGNlcHRpb24oMjEwMDAwMTUsIDIxMDUwMTQ3LCB2Mik7IC8vUkMtRVggMjEwNTAxNDcgOiBOdXRubyB6YWRhdCBtYXhpbcOhbG7EmyB7MH0gem5ha8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk5NSU5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbXCJtaW5cIl0gPSBtYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MSA9IERlY2ltYWwuUGFyc2UobF92YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHYyID0gRGVjaW1hbC5QYXJzZShrdlsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodjIgPiB2MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aHJvdyBuZXcgR05vbkZhdGFsRXhjZXB0aW9uKDIxMDAwMDEwLCAyMTA1MDE0NSk7IC8vUkMtRVggMjEwNTAxNDUgOiBIb2Rub3RhIGplIG1pbW8gcG92b2xlbsO9IGludGVydmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk5NQVhcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbXCJtYXhcIl0gPSBtYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MSA9IERlY2ltYWwuUGFyc2UobF92YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHYyID0gRGVjaW1hbC5QYXJzZShrdlsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodjIgPCB2MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aHJvdyBuZXcgR05vbkZhdGFsRXhjZXB0aW9uKDIxMDAwMDExLCAyMTA1MDE0NSk7IC8vUkMtRVggMjEwNTAxNDUgOiBIb2Rub3RhIGplIG1pbW8gcG92b2xlbsO9IGludGVydmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkRNSU5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MSA9IERhdGVUaW1lLlBhcnNlKGxfdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2MiA9IERhdGVUaW1lLlBhcnNlKGt2WzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh2MiA+IHYxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRocm93IG5ldyBHTm9uRmF0YWxFeGNlcHRpb24oMjEwMDAwMTIsIDIxMDUwMTQ1KTsgLy9SQy1FWCAyMTA1MDE0NSA6IEhvZG5vdGEgamUgbWltbyBwb3ZvbGVuw70gaW50ZXJ2YWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRE1BWFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHYxID0gRGF0ZVRpbWUuUGFyc2UobF92YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHYyID0gRGF0ZVRpbWUuUGFyc2Uoa3ZbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHYyIDwgdjEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhyb3cgbmV3IEdOb25GYXRhbEV4Y2VwdGlvbigyMTAwMDAxMywgMjEwNTAxNDUpOyAvL1JDLUVYIDIxMDUwMTQ1IDogSG9kbm90YSBqZSBtaW1vIHBvdm9sZW7DvSBpbnRlcnZhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXA6IEdFVHlwZVZhbHVlID0gR0VUeXBlVmFsdWUuU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHQhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXAgPSBHRVR5cGVWYWx1ZS5TdHJpbmc7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwID0gR0VUeXBlVmFsdWUuRGF0ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdUJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXAgPSBHRVR5cGVWYWx1ZS5EYXRlVGltZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdOJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXAgPSBHRVR5cGVWYWx1ZS5OdW1iZXI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnSSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwID0gR0VUeXBlVmFsdWUuSW50ZWdlcjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdCAmJiBwYXQuc3Vic3RyKDAsIDUpID09PSBcIiNjb21iXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXAgPSBHRVR5cGVWYWx1ZS5Db21ibztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGF0ICYmIHBhdC5zdWJzdHIoMCwgNSkgPT09IFwiI2ZpbGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cCA9IEdFVHlwZVZhbHVlLkZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXVtcInR5cGVcIl0gPSB0eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXVtcIm5hbWVcIl0gPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbaV1bXCJ0aXRsZVwiXSA9IGNvbC5uYXpldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZlNsb3VwY3UgPSByZXN1bHQgYXMgR1Nsb3VwY2VbXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5mYWlsKChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSBob2Rub3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgU2F2ZSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGR0b1NhdmVEYXRhID0ge307XHJcbiAgICAgICAgICAgIHZhciBzYXZlRHRvID0gW107XHJcbiAgICAgICAgICAgIC8vdmFyIGR0b1NhdmVEYXRlUm93ID0ge307XHJcbiAgICAgICAgICAgIC8vIGFrdHVhbG5pIHJhZGVrXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Um93ID0gdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFJvdy5wcml6X29wYWsgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTs7XHJcbiAgICAgICAgICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgICAgICAgICB2YXIgZHRvU2F2ZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzKGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgKGR0b1NhdmUgYXMgYW55KS5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHRvU2F2ZVtyb3ddW1wicG9yX29wYWtcIl0gPSByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgdGhhdC5kZWZTbG91cGN1Lmxlbmd0aDsgY29sKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbiA9IHRoYXQuZGVmU2xvdXBjdVtjb2xdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gPT09IG51bGwgfHwgdHlwZW9mIGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gPVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gR0VUeXBlVmFsdWUuRGVjaW1hbCB8fCBjb2x1bW4udHlwZSA9PT0gR0VUeXBlVmFsdWUuSW50ZWdlciB8fCBjb2x1bW4udHlwZSA9PT0gR0VUeXBlVmFsdWUuTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXSA9IGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0ucmVwbGFjZUFsbChcIiBcIiwgXCJcIikucmVwbGFjZUFsbChcIi5cIiwgXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtbi50eXBlID09PSBHRVR5cGVWYWx1ZS5Db21ibykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gIT0gbnVsbCAmJiB0eXBlb2YgZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2x1bW4udHlwZSA9PT0gR0VUeXBlVmFsdWUuRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gIT09IG51bGwgJiYgdHlwZW9mIGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBudXRubyBkb3Jlc2l0LCBwb2t1ZCBob2RvbnRhIG5lbmkgZGF0dW0hISFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgZnJhZ3M6IHN0cmluZ1tdID0gdmFsdWUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoZnJhZ3MubGVuZ3RoID09IDMgJiYgaXNOdW1lcmljKGZyYWdzWzJdKSAmJiBpc051bWVyaWMoZnJhZ3NbMV0pICYmIGlzTnVtZXJpYyhmcmFnc1swXSkpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChmcmFnc1syXSksIHBhcnNlSW50KGZyYWdzWzFdKSAtIDEsIHBhcnNlSW50KGZyYWdzWzBdKSk7IC8vIG1lc2ljZSB6YWNpbmFqaSBvZCAwIHYgSlMhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLkRhdGVUaW1lLmlzVmFsaWQodmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRlKHZhbHVlLCBcImRkLk1NLnl5eXlcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmFyIGRhdCA9IG1vbWVudChkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGRhdC5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdID0gZGF0LmZvcm1hdChcIkQuTS5ZWVlZXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdID0gXCJcIjsvL2R0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0udG9Mb2NhbGVEYXRlU3RyaW5nKCkucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXSAhPSBudWxsICYmIHR5cGVvZiBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmV2b2Qgb2JqZWt0dSBuYSBob2Rub3R1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXVtjb2x1bW4ubmFtZV0gPT0gbnVsbCB8fCB0eXBlb2YgZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXVtjb2x1bW4ubmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXSA9IGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV1bY29sdW1uLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gR0VUeXBlVmFsdWUuRmlsZSAmJiBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdICE9IG51bGwgJiYgdHlwZW9mIGR0b1NhdmVbcm93XVtjb2x1bW4ubmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDU1NTUgamUgb3puYWNlbmkgc291Ym9ydSwgYWJ5Y2ggdG8gbmEgc2VydmVydSBwb3puYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2wgPSB7IHR5cF9kdTogNTU1NSwgcG9yX29wYWs6IGR0b1NhdmVbcm93XVtcInBvcl9vcGFrXCJdLCB2YWx1ZTogZHRvU2F2ZVtyb3ddW1wiZ3VpZFwiXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZUR0by5wdXNoKHBvbCBhcyBuZXZlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9sID0geyB0eXBfZHU6IHBhcnNlSW50KGNvbHVtbi5uYW1lLnN1YnN0cmluZygxKS8qY29sdW1uLm5hbWUuc3Vic3RyKDEpKi8pLCBwb3Jfb3BhazogZHRvU2F2ZVtyb3ddW1wicG9yX29wYWtcIl0sIHZhbHVlOiBkdG9TYXZlW3Jvd11bY29sdW1uLm5hbWVdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlRHRvLnB1c2gocG9sIGFzIG5ldmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWVzLmVkaXRDb2xzID0gc2F2ZUR0bztcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBqZWRub3RsaXZhIHBvbGVcclxuICAgICAgICAgICAgICAgIGlmICghdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1Ib2Rub3R5XCIpLmdmb3JtKFwiaXNWYWxpZFwiKSkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9zYmlyYW5pIGhvZG5vdCB6IGZvcm11bGFyZSBkbyBkdG9cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm15UGFuZWwuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9TYXZlRGF0YSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXlWYWx1ZXM6R1Z5a0NvbEhvZG5vdHlbXT1bXTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC5kZWZTbG91cGN1IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdGhhdC5kZWZTbG91cGN1IVtpXS5uYW1lIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gdGhhdC5kZWZTbG91cGN1IVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShuYW1lLmxlbmd0aCA+IDEgJiYgbmFtZVswXSA9PSAnaCcpKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhhdC5teVBhbmVsLmZpbmRGaWVsZHMobmFtZSkuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSBHRVR5cGVWYWx1ZS5EYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG51dG5vIGRvcmVzaXQsIHBva3VkIGhvZG5vdGEgbmVuaSBkYXR1bSEhIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgZnJhZ3M6IHN0cmluZ1tdID0gdmFsdWUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGZyYWdzLmxlbmd0aCA9PSAzICYmIGlzTnVtZXJpYyhmcmFnc1syXSkgJiYgaXNOdW1lcmljKGZyYWdzWzFdKSAmJiBpc051bWVyaWMoZnJhZ3NbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChmcmFnc1syXSksIHBhcnNlSW50KGZyYWdzWzFdKSAtIDEsIHBhcnNlSW50KGZyYWdzWzBdKSk7IC8vIG1lc2ljZSB6YWNpbmFqaSBvZCAwIHYgSlMhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5EYXRlVGltZS5pc1ZhbGlkKHZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUodmFsdWUsIFwiZGQuTU0ueXl5eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkYXQgPSBtb21lbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdC5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWUgPSBkYXQuZm9ybWF0KFwiRC5NLllZWVlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWUgPSBcIlwiOy8vZHRvU2F2ZVtyb3ddW2NvbHVtbi5uYW1lXS50b0xvY2FsZURhdGVTdHJpbmcoKS5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gR0VUeXBlVmFsdWUuRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2YWx1ZSA9IHRoYXQubXlQYW5lbC5maW5kRmllbGRzKFwiZmlsZW5hbWVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG9TYXZlRGF0YSAhPT0gbnVsbCAmJiB0eXBlb2YgZHRvU2F2ZURhdGFbXCJmaWxlbmFtZVwiXSAmJiAoZHRvU2F2ZURhdGFbXCJmaWxlbmFtZVwiXSA9PT0gbnVsbCB8fGR0b1NhdmVEYXRhW1wiZmlsZW5hbWVcIl0gPT09IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eW1hemFuaSBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteVZhbHVlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLCB2YWx1ZTogXCJcIiwgdHlwX2R1OiAwLCBjb21ibzogZmFsc2UsIHBvcl9vcGFrOiB0eXBlb2YgY29sdW1uLnBvcl9vcGFrID09PSBcInVuZGVmaW5lZFwiIHx8IGNvbHVtbi5wb3Jfb3BhayA9PT0gbnVsbCA/IDAgOiBjb2x1bW4ucG9yX29wYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15VmFsdWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsIHZhbHVlOiBcIlwiLCB0eXBfZHU6IDEsIGNvbWJvOiBmYWxzZSwgcG9yX29wYWs6IHR5cGVvZiBjb2x1bW4ucG9yX29wYWsgPT09IFwidW5kZWZpbmVkXCIgfHwgY29sdW1uLnBvcl9vcGFrID09PSBudWxsID8gMCA6IGNvbHVtbi5wb3Jfb3Bha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteVZhbHVlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLCB2YWx1ZTogXCJcIiwgdHlwX2R1OiAyLCBjb21ibzogZmFsc2UsIHBvcl9vcGFrOiB0eXBlb2YgY29sdW1uLnBvcl9vcGFrID09PSBcInVuZGVmaW5lZFwiIHx8IGNvbHVtbi5wb3Jfb3BhayA9PT0gbnVsbCA/IDAgOiBjb2x1bW4ucG9yX29wYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkdG9TYXZlRGF0YSAhPT1udWxsICYmIHR5cGVvZiBkdG9TYXZlRGF0YVtcImd1aWRcIl0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15VmFsdWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsIHZhbHVlOiBkdG9TYXZlRGF0YVtcImd1aWRcIl0sIHR5cF9kdTogNTU1NSwgY29tYm86IGZhbHNlLCBwb3Jfb3BhazogdHlwZW9mIGNvbHVtbi5wb3Jfb3BhayA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjb2x1bW4ucG9yX29wYWsgPT09IG51bGwgPyAwIDogY29sdW1uLnBvcl9vcGFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGF0LmRlZlNsb3VwY3UhW2ldLnR5cGUgPT0gR0VUeXBlVmFsdWUuQ29tYm8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZTEgPSB2YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiB2YWx1ZVtuYW1lICsgXCJ0aXRsZVwiXSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VmFsdWVzLnB1c2goeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUxLCB0eXBfZHU6IHBhcnNlSW50KG5hbWUuc3Vic3RyaW5nKDEpLypuYW1lLnN1YnN0cigxKSovKSwgY29tYm86IHRydWUsIHBvcl9vcGFrOiB0eXBlb2YgY29sdW1uLnBvcl9vcGFrID09PSBcInVuZGVmaW5lZFwiIHx8IGNvbHVtbi5wb3Jfb3BhayA9PT0gbnVsbCA/IDAgOiBjb2x1bW4ucG9yX29wYWsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteVZhbHVlcy5wdXNoKHsgbmFtZTogbmFtZSwgdHlwX2R1OiAxLCBwb3Jfb3BhazogdHlwZW9mIGNvbHVtbi5wb3Jfb3BhayA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjb2x1bW4ucG9yX29wYWsgPT09IG51bGwgPyAwIDogY29sdW1uLnBvcl9vcGFrLCB2YWx1ZTogdmFsdWUgPT09IG51bGwgPyBcIlwiIDogdmFsdWVbbmFtZV0gYXMgYW55LCBjb21ibzogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VmFsdWVzLnB1c2goeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUsIHR5cF9kdTogcGFyc2VJbnQobmFtZS5zdWJzdHJpbmcoMSkvKm5hbWUuc3Vic3RyKDEpKi8pLCBjb21ibzogZmFsc2UsIHBvcl9vcGFrOiB0eXBlb2YgY29sdW1uLnBvcl9vcGFrID09PSBcInVuZGVmaW5lZFwiIHx8IGNvbHVtbi5wb3Jfb3BhayA9PT0gbnVsbCA/IDAgOiBjb2x1bW4ucG9yX29wYWsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWVzLmVkaXRDb2xzID0gbXlWYWx1ZXM7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5VY3JWeWthekFkbS5zYXZlVmFsdWVzKHtcclxuICAgICAgICAgICAgICAgIGl4c192a3o6IGN1cnJlbnRSb3cubWFpbklkIGFzIGFueSwga29kX2Nhc3Rfdmt6OiB0aGF0LmdldElkKGN1cnJlbnRSb3cucGFyZW50SWQgYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgLCBwb3JfY2lzbG86IHBhcnNlSW50KHRoYXQuZ2V0SWQoY3VycmVudFJvdy5pZCBhcyBhbnkpKSwgdG9wb2xvZ2llOiB0aGF0LmlucHV0VmFsdWVzLnRvcG9sb2dpZVxyXG4gICAgICAgICAgICAgICAgLCBob2Rub3R5OiB0aGF0LmlucHV0VmFsdWVzLmVkaXRDb2xzIGFzIGFueVxyXG4gICAgICAgICAgICB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgaWQ6IFwiaWRTYXZlVmFsXCIsIHRpbWVyOiAyMDAwLCBsYWJlbDogXCJqcmVzOjMwMjUwMDgxXCIgfSkgLy9SQyAzMDI1MDA4MSA6IEhvZG5vdHkgdWxvxb5lbnlcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbmkgem5vdnVuYWN0ZW5pIHZldHZlIHN0cm9tdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjb25maXJtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICAgICAgYWx3YXlzKCgpID0+IHsgcmV0dXJuIGRlZi5yZXNvbHZlKCkgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29waXJvdmFuaSBwcmVkY2hhemVqaWNpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIENvcHlTZWxlY3QoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIG5hY3Rlbmkgc2V6bmFtdSBoaXN0b3JpY2t5Y2ggZGF0XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5VY3JWeWthekFkbS5saXN0SGlzdG9yaWUoe1xyXG4gICAgICAgICAgICAgICAgaXhzX3ZrejogdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93Lm1haW5JZCBhcyBhbnksIGtvZF9jYXN0X3ZrejogdGhhdC5nZXRJZCh0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cucGFyZW50SWQgYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgLCBwb3JfY2lzbG86IHBhcnNlSW50KHRoYXQuZ2V0SWQodGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LmlkIGFzIGFueSkpXHJcbiAgICAgICAgICAgICAgICAsIHRvcG9sb2dpZTogdGhhdC5pbnB1dFZhbHVlcy50b3BvbG9naWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGg9PTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBzdGF0ZTogXCJ3YXJuaW5nXCIsIGlkOiBcImlkV2FyQ29weVwiLCB0aW1lcjogMjAwMCwgbGFiZWw6IFwianJlczozMDI1MDA2NlwiIH0pIC8vUkMgMzAyNTAwNjYgOiBOZW5hbGV6ZW55IMW+w6FkbsOpIGhvZG5vdHkga2Uga29ww61yb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlZ5YmVyT2Jkb2JpKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuc2VsZWN0ZWRSb3cgJiYgdHlwZW9mIHJlc3VsdC5zZWxlY3RlZFJvdy5tZXNpYyAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5Db3B5KHJlc3VsdC5zZWxlY3RlZFJvdy5tZXNpYyBhcyBudW1iZXIsIHJlc3VsdC5zZWxlY3RlZFJvdy5yb2sgYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZvcm11bGFyIHBybyB6YWRhbmkgcG9waXN1IHJhZGt1XHJcbiAgICAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgVnliZXJPYmRvYmkoZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdWeWJlck9iZG9iaUtvcGlyb3ZhbmksIHsgZGF0YTogZGF0YSB9LyosIHsgZGF0YTogZGF0YSB9Ki8pO1xyXG4gICAgICAgICAgICByZXN1bHQub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvcGlyb3ZhbmkgcHJlZGNoYXplamljaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBDb3B5UHJldmlldygpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlVjclZ5a2F6QWRtLmhpc3RvcmllKHtcclxuICAgICAgICAgICAgICAgIGl4c192a3o6IHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5tYWluSWQgYXMgYW55LCBrb2RfY2FzdF92a3o6IHRoYXQuZ2V0SWQodGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LnBhcmVudElkIGFzIGFueSlcclxuICAgICAgICAgICAgICAgICwgcG9yX2Npc2xvOiBwYXJzZUludCh0aGF0LmdldElkKHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5pZCBhcyBhbnkpKVxyXG4gICAgICAgICAgICAgICAgLCB0b3BvbG9naWU6IHRoYXQuaW5wdXRWYWx1ZXMudG9wb2xvZ2llXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmlzSGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IHN0YXRlOiBcIndhcm5pbmdcIiwgaWQ6IFwiaWRXYXJDb3B5XCIsIHRpbWVyOiAyMDAwLCBsYWJlbDogXCJqcmVzOjMwMjUwMDY2XCIgfSkgLy9SQyAzMDI1MDA2NiA6IE5lbmFsZXplbnkgxb7DoWRuw6kgaG9kbm90eSBrZSBrb3DDrXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuQ29weShyZXN1bHQubWVzaWMgYXMgbnVtYmVyLCByZXN1bHQucm9rIGFzIG51bWJlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb3Bpcm92YW5pIHogbWludWx5Y2ggbGV0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIENvcHkobWVzaWM6IG51bWJlciwgcm9rOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFJvdyA9IHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdztcclxuICAgICAgICAgICAgLy9pZiAodHlwS29waWUgPT09IEdFVHlwS29waWUuUHJlZGNoYXplamljaSkge1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuVWNyVnlrYXpBZG0ua29waWVIb2Rub3Qoe1xyXG4gICAgICAgICAgICAgICAgaXhzX3ZrejogY3VycmVudFJvdy5tYWluSWQgYXMgYW55LCBrb2RfY2FzdF92a3o6IHRoYXQuZ2V0SWQoY3VycmVudFJvdy5wYXJlbnRJZCBhcyBhbnkpXHJcbiAgICAgICAgICAgICAgICAsIHBvcl9jaXNsbzogcGFyc2VJbnQodGhhdC5nZXRJZChjdXJyZW50Um93LmlkIGFzIGFueSkpXHJcbiAgICAgICAgICAgICAgICAsIHRvcG9sb2dpZTogdGhhdC5pbnB1dFZhbHVlcy50b3BvbG9naWVcclxuICAgICAgICAgICAgICAgICwgbWVzaWM6IG1lc2ljXHJcbiAgICAgICAgICAgICAgICAsIHJvazogcm9rIFxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBpZDogXCJpZENvcHlcIiwgdGltZXI6IDIwMDAsIGxhYmVsOiBcImpyZXM6MzAyNTAwNzRcIiB9KSAvL1JDIDMwMjUwMDc0IDogSG9kbm90eSB6a29ww61yb3bDoW55XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRTbG91cGNlKHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFZhbHVlcy5jb2xzID0gcmVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbHModGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LCB0aGF0LmlucHV0VmFsdWVzLmNvbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTm92eSByYWRla1xyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOb3Z5UmFkZWsoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9yT3BhayA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVkaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkdG9TYXZlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkdldEFsbFJvd3MoZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdG9TYXZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggJC5pc051bWVyaWMoZHRvU2F2ZVtpXVtcInBvcl9vcGFrXCJdKSAmJiBwb3JPcGFrIDwgcGFyc2VJbnQoZHRvU2F2ZVtpXVtcInBvcl9vcGFrXCJdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvck9wYWsgPSBwYXJzZUludChkdG9TYXZlW2ldW1wicG9yX29wYWtcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb3JPcGFrKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjdXJyZW50Um93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC5pbnB1dFZhbHVlcy5lZGl0Q29scyEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbdGhhdC5pbnB1dFZhbHVlcy5lZGl0Q29scyFbaV0ubmFtZSBhcyBhbnldID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbXCJwb3Jfb3Bha1wiXSA9IHBvck9wYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXN1bHRbXCJwb3Jfb3BhazFcIl0gPSAoR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KHRoaXMuZWRpdEdyaWQpKWFzIG51bWJlciArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXJyZW50Um93Py5cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0VmlldyhncmlkKS51cGRhdGVEYXRhKHJlc3VsdCwgXCJhZGRcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5lZGl0R3JpZC5nZ3JpZGNlbGxlZGl0b3IoXCJhZGRSb3dcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgLy8gZG9obGVkYW5pIHByaWRhbmVobyByYWRrdVxyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0VmlldyhncmlkKTtcclxuICAgICAgICAgICAgICAgIC8vIGRhdGEgemUgZ3JpZHVcclxuICAgICAgICAgICAgICAgIHZhciBkID0gYS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICAgICAgLy8gZG9obGVkYW5pIGluZGV4dSByYWRrdVxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0Um93ID0gMDsgLy8gaW5kZXggcmFka3VcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkW2ldW1wicG9yX29wYWtcIl0gPT0gcG9yT3Bhaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25hc2VsIGpzZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRSb3cgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkY2VsbGVkaXRvcignc3RhcnQnLCB7cm93OiBzdGFydFJvdyAsY29sOjF9KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5lZGl0R3JpZC5nZ3JpZGNlbGxlZGl0b3IoJ3N0YXJ0JywgeyByb3c6IHRoaXMuZWRpdEdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpPy5nZXRDb3VudCgpIC0gMSwgY29sOiAxIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJPYmRvYmlLb3Bpcm92YW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICB1aWQgPSBcIkdVY3JWeWJlck9iZG9iaSNcIjtcclxuICAgICAgICBwcml2YXRlIHNlbGVjdEdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47ICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeWJyYW55IHJhZGVrXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHNlbGVjdGVkUm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyTGlzdE9iZER0byB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChkYXRhKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmRhdGEgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMDI1MDA3OFwiOyAvL1JDIDMwMjUwMDc4IDogVsO9YsSbciBvYmRvYsOtICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFZ5YmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA3OVwiLCAvL1JDIDMwMjUwMDc5IDogVnlicmF0XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlKSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0Um93ID0gdGhhdC5zZWxlY3RHcmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JMaXN0T2JkRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdFJvdyAmJiBzZWxlY3RSb3cubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWxlY3RlZFJvdyA9IHNlbGVjdFJvd1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgaWQ6IFwiaWRDb3B5XCIsIHRpbWVyOiAyMDAwLCBsYWJlbDogXCJqcmVzOjMwMjUwMDgwXCIgfSk7IC8vUkMgMzAyNTAwODAgOiBOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZVZ5YmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVZ5YmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDY4XCIsIC8vUkMgMzAyNTAwNjggOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnNlbGVjdEdyaWQgPSAkLm5ld0RpdihcImpzLXVjck9iZG9iaVwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6XCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBtYXJraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyTGlzdE9iZER0byB8IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICYmIGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhhdC5zZWxlY3RHcmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JMaXN0T2JkRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VsZWN0ZWRSb3cgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Vjckxpc3RPYmREdG8+KCkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNzZcIiwgLy9SQyAzMDI1MDA3NiA6IE3Em3PDrWNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDc3XCIsIC8vUkMgMzAyNTAwNzcgOiBSb2tcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdFByb2ZpbGU6IHsgcm93TnVtYmVyczogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlclNldHRpbmdzOiB0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cuaWQgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wicG9waXNcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoKTtcclxuICAgICAgICAgICAgLy8gcHJpa2F6b3ZhIGxpc3RhXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaWRWeWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5YmVyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImlkY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RDbG9zZVZ5YmVyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7IHNlbGVjdGVkUm93OiB0aGlzLnNlbGVjdGVkUm93IH0pLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufSJdfQ==
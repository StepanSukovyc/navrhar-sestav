"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GRozSeznamAHlavicekTab = class GRozSeznamAHlavicekTab extends Gordic.GContentBase {
                constructor() {
                    //////////////////////////////////////////
                    //#region Atributy
                    //////////////////////////////////////////
                    super(...arguments);
                    // nutno nacist
                    this.needLoad = false;
                }
                //taskId = "ROZSeznamdokladu";
                //////////////////////////////////////////
                //#region Metoda onContentReady
                onContentReady() {
                    console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicekTab.onContentReady", this);
                    this.needLoad = true;
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    var that = this;
                    // Definice akci
                    that.fillAkceSeznamu();
                    // Pridani akci do menubaru
                    that.createMenuBar();
                    // Pridani filtrovaciho panelu
                    //that.createFilterPanel(that);
                    // Zaregistrovani nahledu seznamu
                    that.registerPreview();
                    // Vytvoreni gridu a naplneni objektu nactenymi daty
                    that.createGrid();
                    // načtení dat do gridu
                    //that.pristupnostAkciSeznamu();   
                    // úvodní rozbor přístupnosti tlačítek a akcí na seznamu
                    if (that.needLoad)
                        that.actions.actObcerstvit.run();
                    //else
                    //  that.pristupnostAkciSeznamu(); 
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda akceSeznamu
                fillAkceSeznamu() {
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.akceSeznamu", this);
                    var that = this;
                    // Nejprve vytvorim jednotlive akce, ktere priradim do kolekce
                    // that.actions: GActionList
                    // !! POZOR, neumi priradit kolekci, musi se to po jednom !!
                    that.actions.addRange({
                        actNova: Gordic.Eko.Action.actionNovy({
                            enabled: false,
                            run: function (ev, ctx) {
                                console.log("actNova", ctx);
                                this.setPending(that.openDetail(null));
                                //// Vsechny vstupni parametry gcontentu (jsou oznaceny atributem [JsonProperty])
                                //that.navigate('Gordic.Roz.WebClient.GRozDetailAHlavicka', { ixs_ahl: null })
                                //    .on("close", function (retVal: any) {
                                //        debugger;
                                //        if (retVal != null && retVal.returnValue && retVal.returnValue === true) {
                                //            that.loadData();
                                //        }
                                //    });
                            }
                        }),
                        actVymazat: Gordic.Eko.Action.actionOdstranit({
                            enabled: false,
                            run: function (ev, ctx) {
                                console.log("actVymazat", ctx);
                                var row;
                                // Dle podminek si zjisti aktivni radek
                                if (ctx.cellInfo != null) { // double click z gridu
                                    row = ctx.cellInfo.data; // data, ze kterych byl vytvoren radek
                                }
                                else if (ctx !== null && ctx.comparatorItem != null) { // pokud bylo spuštěno z porovnávače, bude předán comparatorItem
                                    row = ctx.comparatorItem;
                                }
                                else { //jinak je potřeba načíst vysvícený řádek v gridu
                                    row = Gordic.Eko.Grid.currentRow(that.$grid);
                                    //row = that.$grid.ggrid("activeRow");
                                }
                                if (row === null) {
                                    //                            if (selection.length == 0)
                                    that.dialogs.messageBox("jres:30250067", //RC 30250067 : Upozornění
                                    "jres:30250105"); //RC 30250105 : Není vybrán žádný řádek!
                                    return;
                                }
                                // Vsechny vstupni parametry gcontentu (jsou oznaceny atributem [JsonProperty])
                                that.delete(row);
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: true, // povolit pouze pokud existuji data
                            run: function (ev, ctx) {
                                console.log("actDetail", ctx);
                                var row;
                                // Dle podminek si zjisti aktivni radek
                                if (ctx.cellInfo != null) { // double click z gridu
                                    row = ctx.cellInfo.data; // data, ze kterych byl vytvoren radek
                                }
                                else if (ctx !== null && ctx.comparatorItem != null) { // pokud bylo spuštěno z porovnávače, bude předán comparatorItem
                                    row = ctx.comparatorItem;
                                }
                                else { //jinak je potřeba načíst vysvícený řádek v gridu
                                    row = Gordic.Eko.Grid.currentRow(that.$grid);
                                    //row = that.$grid.ggrid("activeRow");
                                }
                                if (row === null) {
                                    //                            if (selection.length == 0)
                                    that.dialogs.messageBox("jres:30250067", //RC 30250067 : Upozornění
                                    "jres:30250105"); //RC 30250105 : Není vybrán žádný řádek!
                                    return;
                                }
                                // Pro aktivni radek zobraz detail
                                that.openDetail(row.ixs_ahl);
                                //that.navigate('Gordic.Roz.WebClient.GRozDetailAHlavicka', { ixs_ahl: row.ixs_ahl })
                                //    .on("close", function (retVal: any) {
                                //        debugger;
                                //        if (retVal != null && retVal.returnValue && retVal.returnValue === true) {
                                //            that.loadData();
                                //        }
                                //    });
                            }
                        }),
                        actDoklady: {
                            name: "actDoklady",
                            caption: "jres:30250331", //that.akceSeznamu.DetailText, //RC 30250331 : Doklady
                            visible: false,
                            //icon: Gordic.Gin.Icons.ActionEnum.zobrazitDetail,
                            enabled: false, // povolit pouze pokud existuji data
                            run: function (ev, ctx) {
                            }
                        },
                        actOtevrit: {
                            name: "actOtevrit",
                            caption: "jres:30250332", //that.akceSeznamu.DetailText, //RC 30250332 : Otevřít
                            //icon: Gordic.Gin.Icons.ActionEnum.zobrazitDetail,
                            enabled: false, // povolit pouze pokud existuji data
                            run: function (ev, ctx) {
                                let mythis = this;
                                that.getGrid().ggrid("getSelection");
                                var radek = Gordic.Eko.Grid.currentRow(that.getGrid());
                                if (radek != null) {
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250335".format(radek.nazev, radek.ixs_ahl)) //RC 30250335 : Opravdu chcete otevřít hlavičku {0} ({1})?
                                        .then(function (result) {
                                        if (result === "YES") {
                                            mythis.setPending(that.otevrit(radek.ixs_ahl));
                                        }
                                    });
                                }
                            }
                        },
                        actUzavrit: {
                            name: "actUzavrit",
                            caption: "jres:30250333", //that.akceSeznamu.DetailText, //RC 30250333 : Uzavřít
                            //icon: Gordic.Gin.Icons.ActionEnum.zobrazitDetail,
                            enabled: false, // povolit pouze pokud existuji data
                            run: function (ev, ctx) {
                                let mythis = this;
                                that.getGrid().ggrid("getSelection");
                                var radek = Gordic.Eko.Grid.currentRow(that.getGrid());
                                if (radek != null) {
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250336".format(radek.nazev, radek.ixs_ahl)) //RC 30250336 : Opravdu chcete uzavřít hlavičku {0} ({1})?
                                        .then(function (result) {
                                        if (result === "YES") {
                                            mythis.setPending(that.uzavrit(radek.ixs_ahl));
                                        }
                                    });
                                }
                            }
                        },
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({
                            enabled: true, run: function (ev, ctx) {
                                console.log("actObcerstvit", ctx);
                                that.loadData();
                            }
                        }),
                    });
                    // 
                    // that.actions obsahuje akce vlozene vyse. Je to kolekce akci
                }
                //#endregion
                //////////////////////////////////////////
                /***
                 * Definovane akce pridam do menu (atribut favorite zobrazi polozku v hornim panelu)
                 *
                 */
                createMenuBar() {
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.createMenuBar", this);
                    this.menuBar([
                        { action: this.actions.actNova, favorite: true },
                        { action: this.actions.actDetail, favorite: true },
                        { action: this.actions.actObcerstvit, favorite: true },
                        { action: this.actions.actDoklady, favorite: true },
                        { action: this.actions.actVymazat, favorite: true },
                        { action: this.actions.actOtevrit, favorite: true },
                        { action: this.actions.actUzavrit, favorite: true }
                    ]);
                }
                //////////////////////////////////////////
                //#region Metoda createGrid
                createGrid() {
                    console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicekTab.createGrid", this);
                    var that = this;
                    let view = new Gordic.Isl.View(that.isl.RozDokladHlavickaA.list(
                    //{ rq: { Druh: null, Rok: null, FiltrStav: Gordic.Uct.Interface.VsechnyHlavicky } }
                    ).use((req, next, ctx) => {
                        req.filters = { Druh: null, Rok: null, FiltrStav: 0 /* Gordic.Uct.Interface.GERozFiltrAHlavicekStav.VsechnyHlavicky */ };
                        return next(req).then((result) => {
                            this.pristupnostAkciSeznamu(result.meta);
                            return result;
                        });
                    }), {
                        filterPanel: that.$filterForm,
                        key: "ixs_ahl",
                        startEmpty: true,
                        onResponse: rq => { return rq; }
                    });
                    // Podmineny format
                    var condFormat = undefined;
                    condFormat = [
                        {
                            description: "jres:30250337", //RC 30250337 : Pořízená
                            formula: "@a_stav==0",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.green
                        },
                        {
                            description: "jres:30250338", //RC 30250338 : Použitá
                            formula: "@a_stav>0 and @a_stav<20",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        },
                        {
                            description: "jres:30250339", //RC 30250339 : Uzavřená
                            formula: "@a_stav>19",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.gray
                        },
                    ];
                    // Grid si ulozim do modularni promenne, abych se na nej nemusel vsude odkazovat
                    that.$grid = $.newDiv("js-seznamHlavicek") // Vytvor div pro grid
                        //                .css("height", "calc(100% - " + $filterForm.height() + "px)") // nastav mu vysku
                        .css("height", "100%")
                        .appendTo(this.element) // vloz grid do this.element
                        .ggrid({
                        //#region ColumnMode - typ zobrazeni gridu
                        columnMode: "fit", // absolutni sirky sloupcu (default fit - responzivni) / full
                        //#endregion
                        //#region Multi - moznost vyberu vice radku
                        multi: false,
                        //#endregion
                        data: view,
                        //#region defaultAction - nastavení DEFAULT akce pro DVOJKLIK na gridu nebo ENTER
                        defaultAction: that.actions.actDetail,
                        //#endregion
                        //#region searchColumns - sloupce, podle kterých se vyhledává v searchboxu
                        searchColumns: ["ixs_ahl", "popis"],
                        //#endregion
                        // #region GridFormat
                        columns: that.createGridFormat(),
                        // #endregion
                        defaultProfile: { condFormats: condFormat },
                        // zmena aktivniho radku
                        selection: function (ev, info) {
                            if (info.count > 0) {
                                let rows = info.getSelection();
                                if (rows.length > 0) {
                                    that.pristupnostAkciSeznamu(undefined, rows[0]);
                                    that.previewController?.show(rows[0]);
                                }
                            }
                        },
                    })
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: false,
                    });
                }
                //#endregion
                //////////////////////////////////////////
                /**
                 * Vytovreni gridformatu
                 *
                 */
                createGridFormat() {
                    let grdFormat = new Gordic.Data.GridFormat()
                        // Pid dokladu
                        .addTextColumn({
                        name: "ixs_ahl",
                        caption: "jres:30250184", //RC 30250184 : Identifikátor
                        width: 120,
                        fixedWidth: true,
                        customClass: "ui-disabled"
                    })
                        // Cisla a-hlavicky
                        .addTextColumn({
                        name: "a_cislo",
                        caption: "jres:30250185" //RC 30250185 : Číslo hlavičky
                    })
                        // Nazev
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:30250186" //RC 30250186 : Název
                    })
                        // Prijmy
                        .addMD({
                        caption: "jres:30250187", //RC 30250187 : Příjmy
                    })
                        // Vydaje
                        .addDal({
                        caption: "jres:30250188", //RC 30250188 : Výdaje 
                    })
                        // Stav a-hlavicky - text
                        .addTextColumn({
                        name: "stav",
                        caption: "jres:30250189" //RC 30250189 : Stav
                    })
                        // Stav a-hlavicky - cislo
                        .addNumberColumn({
                        name: "a_stav",
                        caption: "jres:30250189" //RC 30250189 : Stav
                        ,
                        hidden: true
                    })
                        // Druh a-hlavicky
                        .addTextColumn({
                        name: "druh",
                        caption: "jres:30250190" //RC 30250190 : Druh
                    })
                        // Datum evidence
                        .addDateTimeColumn({
                        name: "dat_evid",
                        caption: "jres:30250191" //RC 30250191 : Datum založení
                    });
                    return grdFormat;
                }
                //////////////////////////////////////////
                //#region Metoda registerPreview
                registerPreview() {
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.registerPreview", this);
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    var that = this;
                    // Nastaveni options pro preview
                    //var optionsPreview = {
                    //    tabs: [
                    //        Gordic.Previews.getDefaultPreviewTab({
                    //            viewId: "roz:Doklad" // id preview, které má být zobrazeno, případně funkce která podle loadParams vrátí viewId
                    //        }),
                    //        Gordic.Previews.getFilePreviewTab({
                    //            ixpProvider: function (loadParams) { return loadParams.ixp; }               // funkce, která má za úkol poskytnout ixp pro načtení el. obrazu
                    //        })]
                    //}
                    let optionsPreview = {
                        useSubtask: false,
                        panelOptions: {
                            caption: "jres:30250348", //RC 31100217 : Náhled detailu
                            side: "right"
                        },
                        tabs: [{
                                caption: "jres:30250348", //RC 30250348 : Náhled detailu
                                customLoad: (tab, dto) => {
                                    let elm = $.newDiv().gcontent(Gordic.Roz.WebClient.GRozDetailAHlavicka, { parentContent: this }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
                                    //let tabSettings = dto.tabSettings;
                                    delete dto.tabSettings;
                                    $(tab).empty().append(elm);
                                    $.content(elm).init(dto.ixs_ahl);
                                }
                            }]
                    };
                    that.previewController = new Gordic.Previews.GPreviewController(this.element, optionsPreview);
                    that.previewController.registerPanel();
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda pristupnostAkciSeznam
                pristupnostAkciSeznamu(permisions, currentRow = undefined) {
                    console.log("Gordic.Roz.WebClient.GSeznamAHlavicekTab.pristupnostAkciSeznamu", this);
                    let that = this;
                    if (typeof permisions === "undefined")
                        permisions = this.permissions;
                    else
                        this.permissions = permisions;
                    //if (typeof permisions === "undefined")
                    //    permisions = this.permisions;
                    //else
                    //    this.permisions = permisions;
                    // podani
                    that.actions.actNova?.updatePermission(permisions.CanCreate);
                    // zobrazit detail
                    that.actions.actDetail?.updatePermission(permisions.CanShowDetail);
                    // vymazani hlavicky
                    that.actions.actVymazat?.updatePermission(permisions.CanDelete);
                    // zobrazeni dokladu
                    that.actions.actDoklady?.updatePermission(permisions.CanDocuments);
                    // otevreni hlavicky
                    that.actions.actOtevrit?.update({ enabled: false });
                    // uzavrit hlavicky
                    that.actions.actUzavrit?.update({ enabled: false });
                    if (typeof currentRow !== "undefined") {
                        // dle stavu hlavicky zpristupnim akce
                        if (currentRow.a_stav == 0) {
                        }
                        else if (currentRow.a_stav < 20) {
                            // uzavrit hlavicky
                            that.actions.actUzavrit?.update({ visible: true });
                            that.actions.actUzavrit?.updatePermission(permisions.CanClose);
                            if (permisions.CanDelete)
                                that.actions.actVymazat?.update({ enabled: false });
                        }
                        else if (currentRow.a_stav > 10) {
                            // otevreni hlavicky
                            that.actions.actOtevrit?.update({ visible: true });
                            that.actions.actOtevrit?.updatePermission(permisions.CanOpen);
                            if (permisions.CanDelete)
                                that.actions.actVymazat?.update({ enabled: false });
                        }
                    }
                    that.previewController.enable(typeof currentRow !== "undefined");
                    return;
                }
                ;
                loadData() {
                    console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.loadData", this);
                    var that = this;
                    let view = this.getGrid().ggrid("getView");
                    view.requestData();
                }
                getGrid() {
                    var data = this.element.find(".ggrid.js-seznamHlavicek");
                    return (data.length == 0 ? null : data);
                }
                //#endregion
                //////////////////////////////////////////
                delete(radek) {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.delete", this);
                    var that = this;
                    var deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                    this.dialogs.confirm("jres:30250175".format(radek.nazev, radek.ixs_ahl)) //RC 30250175 : Opravdu chcete smazat hlavičku {0} ({1})?
                        .on("close", (ev, obj) => {
                        if (obj === "yes") {
                            that.beginOperation("jres:30250166"); //RC 30250166 :  Probíhá mazání
                            return Gordic.Isl.RozDokladHlavickaA.delete({ identifikator: radek.ixs_ahl })
                                .get()
                                .then((result) => {
                                // preberu hodnoty
                                // obcerstveni formulare
                                that.endOperation();
                                that.showFlash({ id: "flashDelete", icon: "gi-tick", label: "jres:30250167", customClass: "g-state-success" }); //RC 30250167 : Záznam byl úspěšně vymazán
                                that.loadData();
                                console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.delete - dokonceno");
                                return deferrer.resolve();
                                //return deffer.promise();
                            }, (jqXHR, type, obj) => {
                                //debugger;
                                that.endOperation();
                            }).always(() => { that.endOperation(); });
                        }
                        else
                            return deferrer.resolve();
                    });
                    return deferrer.promise();
                }
                /***
                 *
                 * Uzavreni hlavicky
                 */
                uzavrit(indetifikator) {
                    let that = this;
                    return this.isl.RozDokladHlavickaA.uzavrit({ identifikator: indetifikator }).get()
                        .then(() => that.reloadRow(indetifikator));
                }
                /***
                 *
                 * Uzavreni hlavicky
                 */
                otevrit(indetifikator) {
                    let that = this;
                    return this.isl.RozDokladHlavickaA.otevrit({ identifikator: indetifikator }).get()
                        .then(() => that.reloadRow(indetifikator));
                }
                //////////////////////////////////////////
                //#region Metoda loadData
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda openDetail
                openDetail(ixs_ahl) {
                    let that = this;
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.openDetail", this);
                    let def = $.Deferred();
                    that.navigate('Gordic.Roz.WebClient.GRozDetailAHlavicka', { ixs_ahl: ixs_ahl })
                        .on("close", function (retVal) {
                        debugger;
                        if (retVal != null && retVal.returnValue && retVal.returnValue != "") {
                            return that.reloadRow(retVal.returnValue).then(() => def.resolve());
                        }
                        else
                            return def.resolve();
                    });
                    return def.promise();
                }
                //#endregion
                //////////////////////////////////////////
                /**
                 * Nahrazni radku z DB
                 *
                 * @param indentifikator
                 */
                reloadRow(indentifikator) {
                    let that = this;
                    let view = that.getGrid().ggrid("getView");
                    return that.isl.RozDokladHlavickaA.list({ ixs_ahl: { o: "=", v: indentifikator } })
                        .getData()
                        .then((result) => {
                        if (result.length > 0)
                            view.updateData(result[0], "update");
                        return;
                    });
                    //return view.requestData({ Filters: { ixp: { o: "=", v: pidDokladu } } })
                    //    .always(() => {
                    //        content!.endOperation();
                    //        debugger;
                    //        (content as GUctSeznam).$grid.ggrid("activeRow", { ixp: pidDokladu })
                    //    });
                }
            };
            GRozSeznamAHlavicekTab = __decorate([
                gcontent
            ], GRozSeznamAHlavicekTab);
            WebClient.GRozSeznamAHlavicekTab = GRozSeznamAHlavicekTab;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvelNlem5hbUFIbGF2aWNla1RhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdSb3pTZXpuYW1BSGxhdmljZWtUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXFuQmY7QUFybkJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFuQm5CO0lBcm5CZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcW5CN0I7UUFybkJvQixXQUFBLFNBQVM7WUFFMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLE9BQUEsWUFBWTtnQkFBeEQ7b0JBQ0ksMENBQTBDO29CQUMxQyxrQkFBa0I7b0JBQ2xCLDBDQUEwQzs7b0JBSTFDLGVBQWU7b0JBQ1AsYUFBUSxHQUFZLEtBQUssQ0FBQztnQkF1bUJ2QyxDQUFDO2dCQTVsQkksOEJBQThCO2dCQUU5QiwwQ0FBMEM7Z0JBQzFDLCtCQUErQjtnQkFDeEIsY0FBYztvQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFaEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLDhFQUE4RTtvQkFDOUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixnQkFBZ0I7b0JBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFFdkIsMkJBQTJCO29CQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7b0JBRXBCLDhCQUE4QjtvQkFDOUIsK0JBQStCO29CQUUvQixpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFFdkIsb0RBQW9EO29CQUNwRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLHVCQUF1QjtvQkFDdkIsbUNBQW1DO29CQUNuQyx3REFBd0Q7b0JBRXhELElBQUksSUFBSSxDQUFDLFFBQVE7d0JBQ2IsSUFBSSxDQUFDLE9BQVEsQ0FBQyxhQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3ZDLE1BQU07b0JBQ0osbUNBQW1DO2dCQUN6QyxDQUFDO2dCQUNELFlBQVk7Z0JBQ1osMENBQTBDO2dCQUcxQywwQ0FBMEM7Z0JBQzFDLDRCQUE0QjtnQkFDcEIsZUFBZTtvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQiw4REFBOEQ7b0JBQzlELDRCQUE0QjtvQkFDNUIsNERBQTREO29CQUszRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDbEMsT0FBTyxFQUFFLEtBQUs7NEJBQ1osR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDdkMsaUZBQWlGO2dDQUNqRiw4RUFBOEU7Z0NBQzlFLDJDQUEyQztnQ0FDM0MsbUJBQW1CO2dDQUNuQixvRkFBb0Y7Z0NBQ3BGLDhCQUE4QjtnQ0FDOUIsV0FBVztnQ0FDWCxTQUFTOzRCQUNiLENBQUM7eUJBQ0osQ0FBQzt3QkFFQSxVQUFVLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOzRCQUM1QyxPQUFPLEVBQUUsS0FBSzs0QkFDWixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQy9CLElBQUksR0FBd0MsQ0FBQztnQ0FDN0MsdUNBQXVDO2dDQUN2QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7b0NBQy9DLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLHNDQUFzQztnQ0FDbkUsQ0FBQztxQ0FBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGdFQUFnRTtvQ0FDckgsR0FBRyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUM7Z0NBQzdCLENBQUM7cUNBQU0sQ0FBQyxDQUFBLGlEQUFpRDtvQ0FDckQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFRLENBQUM7b0NBQ3BELHNDQUFzQztnQ0FDMUMsQ0FBQztnQ0FDRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQ0FDZix3REFBd0Q7b0NBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSwwQkFBMEI7b0NBQy9ELGVBQWUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO29DQUM5RCxPQUFPO2dDQUNYLENBQUM7Z0NBQ0QsK0VBQStFO2dDQUMvRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNyQixDQUFDO3lCQUNKLENBQUM7d0JBR0EsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxvQ0FBb0M7NEJBQ25ELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDOUIsSUFBSSxHQUF3QyxDQUFDO2dDQUU3Qyx1Q0FBdUM7Z0NBQ3ZDLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QjtvQ0FDL0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsc0NBQXNDO2dDQUNuRSxDQUFDO3FDQUFNLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsZ0VBQWdFO29DQUNySCxHQUFHLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQztnQ0FDN0IsQ0FBQztxQ0FBTSxDQUFDLENBQUEsaURBQWlEO29DQUNyRCxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVEsQ0FBQztvQ0FDcEQsc0NBQXNDO2dDQUMxQyxDQUFDO2dDQUNELElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO29DQUNmLHdEQUF3RDtvQ0FDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLDBCQUEwQjtvQ0FDL0QsZUFBZSxDQUFDLENBQUMsQ0FBQyx3Q0FBd0M7b0NBQzlELE9BQU87Z0NBQ1gsQ0FBQztnQ0FDRCxrQ0FBa0M7Z0NBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUM3QixxRkFBcUY7Z0NBQ3JGLDJDQUEyQztnQ0FDM0MsbUJBQW1CO2dDQUNuQixvRkFBb0Y7Z0NBQ3BGLDhCQUE4QjtnQ0FDOUIsV0FBVztnQ0FDWCxTQUFTOzRCQUViLENBQUM7eUJBQ0osQ0FBQzt3QkFFQSxVQUFVLEVBQUM7NEJBQ1QsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUMsc0RBQXNEOzRCQUMvRSxPQUFPLEVBQUMsS0FBSzs0QkFDYixtREFBbUQ7NEJBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsb0NBQW9DOzRCQUNwRCxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFFdEIsQ0FBQzt5QkFDSjt3QkFDQyxVQUFVLEVBQUU7NEJBQ1YsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUMsc0RBQXNEOzRCQUMvRSxtREFBbUQ7NEJBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsb0NBQW9DOzRCQUNwRCxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2dDQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO2dDQUNwQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQXNDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dDQUM1RixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBTSxFQUFFLEtBQUssQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLDBEQUEwRDt5Q0FDbkosSUFBSSxDQUFDLFVBQVUsTUFBTTt3Q0FDbEIsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7NENBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFNLENBQUMsT0FBaUIsQ0FBQyxDQUFDLENBQUM7d0NBQzlELENBQUM7b0NBQ0wsQ0FBQyxDQUNBLENBQUM7Z0NBRVYsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKO3dCQUNDLFVBQVUsRUFBRTs0QkFDVixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsT0FBTyxFQUFFLGVBQWUsRUFBQyxzREFBc0Q7NEJBQy9FLG1EQUFtRDs0QkFDbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxvQ0FBb0M7NEJBQ3BELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0NBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7Z0NBQ3BDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBc0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0NBQzVGLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUVoQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFNLEVBQUUsS0FBSyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUMsMERBQTBEO3lDQUNuSixJQUFJLENBQUMsVUFBVSxNQUFNO3dDQUNsQixJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUUsQ0FBQzs0Q0FDbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQU0sQ0FBQyxPQUFpQixDQUFDLENBQUMsQ0FBQzt3Q0FDOUQsQ0FBQztvQ0FDTCxDQUFDLENBQ0EsQ0FBQztnQ0FDVixDQUFDOzRCQUdMLENBQUM7eUJBQ0o7d0JBQ0MsYUFBYSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDOzRCQUNoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUFDLENBQUM7eUJBQUUsQ0FBQztxQkFFaEMsQ0FBQyxDQUFDO29CQUVKLEdBQUc7b0JBQ0gsOERBQThEO2dCQUVsRSxDQUFDO2dCQUNELFlBQVk7Z0JBQ1osMENBQTBDO2dCQUUxQzs7O21CQUdHO2dCQUNLLGFBQWE7b0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1QsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDaEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDbEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDdEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDbkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDbkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDbkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtxQkFHdEQsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsMENBQTBDO2dCQUMxQywyQkFBMkI7Z0JBQ25CLFVBQVU7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUk7b0JBQzVCLG9GQUFvRjtxQkFFdkYsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dCQUNyQixHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsc0VBQThELEVBQUUsQ0FBQTt3QkFDaEgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSyxDQUFDLENBQUM7NEJBQzFDLE9BQU8sTUFBTSxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsRUFDRjt3QkFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7d0JBQzdCLEdBQUcsRUFBRSxTQUFTO3dCQUNkLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ25DLENBQ0osQ0FBQztvQkFDRixtQkFBbUI7b0JBQ25CLElBQUksVUFBVSxHQUFnRSxTQUFTLENBQUM7b0JBQ3hGLFVBQVUsR0FBRzt3QkFDYjs0QkFDSSxXQUFXLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjs0QkFDbEQsT0FBTyxFQUFFLFlBQVk7NEJBRXpCLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUs7eUJBQ2hFO3dCQUNEOzRCQUNJLFdBQVcsRUFBRSxlQUFlLEVBQUUsdUJBQXVCOzRCQUNyRCxPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJO3lCQUMvRDt3QkFDRDs0QkFDSSxXQUFXLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjs0QkFDdEQsT0FBTyxFQUFFLFlBQVk7NEJBQ3JCLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUk7eUJBQy9EO3FCQUVBLENBQUM7b0JBRUYsZ0ZBQWdGO29CQUNoRixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxzQkFBc0I7d0JBQzdELGtHQUFrRzt5QkFDakcsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7eUJBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsNEJBQTRCO3lCQUNuRCxLQUFLLENBQUM7d0JBQ0gsMENBQTBDO3dCQUMxQyxVQUFVLEVBQUUsS0FBSyxFQUFNLDZEQUE2RDt3QkFDcEYsWUFBWTt3QkFFWiwyQ0FBMkM7d0JBQzNDLEtBQUssRUFBRSxLQUFLO3dCQUNaLFlBQVk7d0JBQ1osSUFBSSxFQUFFLElBQUk7d0JBRVYsaUZBQWlGO3dCQUNqRixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO3dCQUNyQyxZQUFZO3dCQUVaLDBFQUEwRTt3QkFDMUUsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQzt3QkFDbkMsWUFBWTt3QkFFWixxQkFBcUI7d0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ2hDLGFBQWE7d0JBRWIsY0FBYyxFQUFFLEVBQUcsV0FBVyxFQUFFLFVBQVUsRUFBRTt3QkFFNUMsd0JBQXdCO3dCQUN4QixTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSTs0QkFFekIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO2dDQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0NBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQ0FDbEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDaEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDMUMsQ0FBQzs0QkFDTCxDQUFDO3dCQUVMLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxRQUFRLENBQ0w7d0JBQ0ksaUJBQWlCO3dCQUNqQixpQkFBaUIsRUFBRSxJQUFJO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLGVBQWUsRUFBRSxLQUFLO3FCQUN6QixDQUNKLENBQ0E7Z0JBR1QsQ0FBQztnQkFDRCxZQUFZO2dCQUNaLDBDQUEwQztnQkFDMUM7OzttQkFHRztnQkFDSyxnQkFBZ0I7b0JBQ3BCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQXVDO3dCQUM3RSxjQUFjO3lCQUNiLGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjt3QkFDdkQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLFdBQVcsRUFBRSxhQUFhO3FCQUM3QixDQUFDO3dCQUNGLG1CQUFtQjt5QkFDbEIsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLENBQUMsOEJBQThCO3FCQUMxRCxDQUFDO3dCQUNGLFFBQVE7eUJBQ1AsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLENBQUMscUJBQXFCO3FCQUNqRCxDQUFDO3dCQUNGLFNBQVM7eUJBQ1IsS0FBSyxDQUFDO3dCQUNILE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3FCQUNuRCxDQUFDO3dCQUNGLFNBQVM7eUJBQ1IsTUFBTSxDQUFDO3dCQUNKLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCO3FCQUNwRCxDQUFDO3dCQUVGLHlCQUF5Qjt5QkFDeEIsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxNQUFNO3dCQUNaLE9BQU8sRUFBRSxlQUFlLENBQUMsb0JBQW9CO3FCQUNoRCxDQUFDO3dCQUNGLDBCQUEwQjt5QkFDekIsZUFBZSxDQUFDO3dCQUNiLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxlQUFlLENBQUMsb0JBQW9COzt3QkFDM0MsTUFBTSxFQUFFLElBQUk7cUJBQ2pCLENBQUM7d0JBQ0Ysa0JBQWtCO3lCQUNqQixhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLGVBQWUsQ0FBQyxvQkFBb0I7cUJBQ2hELENBQUM7d0JBQ0YsaUJBQWlCO3lCQUNoQixpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsQ0FBQyw4QkFBOEI7cUJBQzFELENBQUMsQ0FBQTtvQkFFTixPQUFPLFNBQVMsQ0FBQztnQkFDckIsQ0FBQztnQkFFRCwwQ0FBMEM7Z0JBQzFDLGdDQUFnQztnQkFDeEIsZUFBZTtvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFNUUsOEVBQThFO29CQUM5RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLGdDQUFnQztvQkFDaEMsd0JBQXdCO29CQUN4QixhQUFhO29CQUNiLGdEQUFnRDtvQkFDaEQsNkhBQTZIO29CQUM3SCxhQUFhO29CQUNiLDZDQUE2QztvQkFDN0MsMkpBQTJKO29CQUMzSixhQUFhO29CQUNiLEdBQUc7b0JBQ0gsSUFBSSxjQUFjLEdBQUU7d0JBQ2hCLFVBQVUsRUFBRSxLQUFLO3dCQUNiLFlBQVksRUFBRTs0QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4Qjs0QkFDeEQsSUFBSSxFQUFFLE9BQU87eUJBQ3BCO3dCQUNELElBQUksRUFBRSxDQUFDO2dDQUNILE9BQU8sRUFBRSxlQUFlLEVBQUUsOEJBQThCO2dDQUN4RCxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0NBQ3JCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDtvQ0FDM0osb0NBQW9DO29DQUNwQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUM7b0NBRXZCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBRTNCLENBQUMsQ0FBQyxPQUFPLENBQXNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzFELENBQUM7NkJBQ0osQ0FBQztxQkFDTCxDQUFBO29CQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDOUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQyxDQUFDO2dCQUVELFlBQVk7Z0JBQ1osMENBQTBDO2dCQUUxQywwQ0FBMEM7Z0JBQzFDLHNDQUFzQztnQkFDOUIsc0JBQXNCLENBQUMsVUFBMkUsRUFBRSxhQUE4RCxTQUFTO29CQUMvSyxPQUFPLENBQUMsR0FBRyxDQUFDLGlFQUFpRSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNyRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksT0FBTyxVQUFVLEtBQUssV0FBVzt3QkFDakMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O3dCQUU5QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztvQkFDbEMsd0NBQXdDO29CQUN4QyxtQ0FBbUM7b0JBQ25DLE1BQU07b0JBQ04sbUNBQW1DO29CQUNuQyxTQUFTO29CQUNULElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0Qsa0JBQWtCO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ25FLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoRSxvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFbkUsb0JBQW9CO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDcEQsbUJBQW1CO29CQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFHcEQsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLEVBQUUsQ0FBQzt3QkFDcEMsc0NBQXNDO3dCQUN0QyxJQUFJLFVBQVUsQ0FBQyxNQUFnQixJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUV2QyxDQUFDOzZCQUNJLElBQUksVUFBVSxDQUFDLE1BQWdCLEdBQUcsRUFBRSxFQUFFLENBQUM7NEJBQ3hDLG1CQUFtQjs0QkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDL0QsSUFBSSxVQUFVLENBQUMsU0FBUztnQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzVELENBQUM7NkJBQ0ksSUFBSSxVQUFVLENBQUMsTUFBZ0IsR0FBRyxFQUFFLEVBQUUsQ0FBQzs0QkFDeEMsb0JBQW9COzRCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUM5RCxJQUFJLFVBQVUsQ0FBQyxTQUFTO2dDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDNUQsQ0FBQztvQkFDTCxDQUFDO29CQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssV0FBVyxDQUFDLENBQUM7b0JBS2pFLE9BQU87Z0JBRVgsQ0FBQztnQkFBQSxDQUFDO2dCQUVNLFFBQVE7b0JBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBbUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUV2QixDQUFDO2dCQUNPLE9BQU87b0JBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDekQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO2dCQUVELFlBQVk7Z0JBQ1osMENBQTBDO2dCQUVsQyxNQUFNLENBQUMsS0FBMEM7b0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUEsc0RBQXNEO29CQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFNLEVBQUUsS0FBSyxDQUFDLE9BQWMsQ0FBQyxDQUFDLENBQUMseURBQXlEO3lCQUNySSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQVcsRUFBRSxFQUFFO3dCQUM3QixJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQzs0QkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLCtCQUErQjs0QkFFckUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsT0FBYyxFQUFFLENBQUM7aUNBQy9FLEdBQUcsRUFBRTtpQ0FDTCxJQUFJLENBQ0QsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQ0FDUCxrQkFBa0I7Z0NBQ2xCLHdCQUF3QjtnQ0FDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dDQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQSxDQUFDLDBDQUEwQztnQ0FDekosSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7Z0NBQzNFLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMxQiwwQkFBMEI7NEJBQzlCLENBQUMsRUFJRCxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2pCLFdBQVc7Z0NBQ1gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQ0osQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3ZDO3dCQUNULENBQUM7OzRCQUVHLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNsQyxDQUFDLENBQUMsQ0FBQztvQkFDUCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDOUIsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNLLE9BQU8sQ0FBQyxhQUFxQjtvQkFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFO3lCQUM3RSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssT0FBTyxDQUFDLGFBQXFCO29CQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUU7eUJBQzdFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBR0QsMENBQTBDO2dCQUMxQyx5QkFBeUI7Z0JBR3pCLFlBQVk7Z0JBQ1osMENBQTBDO2dCQUUxQywwQ0FBMEM7Z0JBQzFDLDJCQUEyQjtnQkFDbkIsVUFBVSxDQUFDLE9BQWtDO29CQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3ZFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQ0FBMEMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzt5QkFDMUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLE1BQVc7d0JBQzlCLFFBQVEsQ0FBQzt3QkFFVCxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxDQUFDOzRCQUNuRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDdkUsQ0FBQzs7NEJBRUcsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzdCLENBQUMsQ0FBQyxDQUFDO29CQUNQLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNELFlBQVk7Z0JBQ1osMENBQTBDO2dCQUcxQzs7OzttQkFJRztnQkFDSyxTQUFTLENBQUMsY0FBc0I7b0JBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQW1CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDO3lCQUM5RSxPQUFPLEVBQUU7eUJBQ1QsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBRWIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUM7NEJBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3pDLE9BQU87b0JBQ2YsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsMEVBQTBFO29CQUMxRSxxQkFBcUI7b0JBQ3JCLGtDQUFrQztvQkFDbEMsbUJBQW1CO29CQUNuQiwrRUFBK0U7b0JBQy9FLFNBQVM7Z0JBRWIsQ0FBQzthQUVMLENBQUE7WUEvbUJhLHNCQUFzQjtnQkFEbEMsUUFBUTtlQUNJLHNCQUFzQixDQSttQm5DO1lBL21CYSxnQ0FBc0IseUJBK21CbkMsQ0FBQTtRQUNKLENBQUMsRUFybkJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxbkI3QjtJQUFELENBQUMsRUFybkJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxbkJuQjtBQUFELENBQUMsRUFybkJTLE1BQU0sS0FBTixNQUFNLFFBcW5CZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUm96LldlYkNsaWVudCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm96U2V6bmFtQUhsYXZpY2VrVGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gQXRyaWJ1dHlcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5OyAvLyBIVE1MRWxlbWVudCwgbmVwb3Zpbm5lLCBkb3BsbmVubyBwb3pkZWppXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuICAgICAgICAvLyBudXRubyBuYWNpc3RcclxuICAgICAgICBwcml2YXRlIG5lZWRMb2FkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBwZXJtaXNzaW9uczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekFIbGF2aWNrYVBlcm1pc3Npb25zU2V6bmFtO1xyXG4gICAgICAgIC8vIFRvdG8gdXZpZGltLCBqZXN0bGkgYnVkdSBwb3RyZWJvdmF0IHBvemRlamlcclxuICAgICAgICAvL3ByaXZhdGUgZGF0YTogR29yZGljLkVrby5JbnRlcmZhY2UuR1JvenNwaWREdG9bXTsgLy8gRGF0YSBuYWN0ZW5hIHByZWQgc3B1c3RlbmltIENvbnRlbnRSZWFkeVxyXG4gICAgICAgIC8vcHJpdmF0ZSBJeHNGdW46IHN0cmluZzsgLy8gUGlkIHByaWhsYXNlbmVobyBwcmFjb3ZuaWthXHJcbiAgICAgICAgLy9wcml2YXRlIEl4cERlbjogc3RyaW5nOyAvLyBQaWQgYWt0dWFsbmkgcm96cG9jdG92ZSBrbmloeVxyXG5cclxuICAgICAgICAvLyBHbG9iYWxuaSBuYXN0YXZlbmlcclxuICAgICAgICBwdWJsaWMgR2xvYmFsRHRvOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96R2xvYmFsc0R0bztcclxuICAgICAgICBwdWJsaWMgJGZpbHRlckZvcm06IGFueTtcclxuXHJcbiAgICAgICAgLy90YXNrSWQgPSBcIlJPWlNlem5hbWRva2xhZHVcIjtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIDogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1JvelNlem5hbUFIbGF2aWNla1RhYi5vbkNvbnRlbnRSZWFkeVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmVlZExvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBUaGlzIHNlIG5ldXN0YWxlIG1lbmkgZGxlIG9iamVrdHUuIFpkZSBzaSB0ZWR5IHVsb3ppbSBvZGtheiBuYSBjZWx5IENvbnRlbnRcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBEZWZpbmljZSBha2NpXHJcbiAgICAgICAgICAgIHRoYXQuZmlsbEFrY2VTZXpuYW11KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBQcmlkYW5pIGFrY2kgZG8gbWVudWJhcnVcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51QmFyKClcclxuXHJcbiAgICAgICAgICAgIC8vIFByaWRhbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAgICAvL3RoYXQuY3JlYXRlRmlsdGVyUGFuZWwodGhhdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBaYXJlZ2lzdHJvdmFuaSBuYWhsZWR1IHNlem5hbXVcclxuICAgICAgICAgICAgdGhhdC5yZWdpc3RlclByZXZpZXcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZ5dHZvcmVuaSBncmlkdSBhIG5hcGxuZW5pIG9iamVrdHUgbmFjdGVueW1pIGRhdHlcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IGRvIGdyaWR1XHJcbiAgICAgICAgICAgIC8vdGhhdC5wcmlzdHVwbm9zdEFrY2lTZXpuYW11KCk7ICAgXHJcbiAgICAgICAgICAgIC8vIMO6dm9kbsOtIHJvemJvciBwxZnDrXN0dXBub3N0aSB0bGHEjcOtdGVrIGEgYWtjw60gbmEgc2V6bmFtdVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQubmVlZExvYWQpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMhLmFjdE9iY2Vyc3R2aXQhLnJ1bigpO1xyXG4gICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgICAvLyAgdGhhdC5wcmlzdHVwbm9zdEFrY2lTZXpuYW11KCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZGEgYWtjZVNlem5hbXVcclxuICAgICAgICBwcml2YXRlIGZpbGxBa2NlU2V6bmFtdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVRhYi5ha2NlU2V6bmFtdVwiLCB0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gTmVqcHJ2ZSB2eXR2b3JpbSBqZWRub3RsaXZlIGFrY2UsIGt0ZXJlIHByaXJhZGltIGRvIGtvbGVrY2VcclxuICAgICAgICAgICAgLy8gdGhhdC5hY3Rpb25zOiBHQWN0aW9uTGlzdFxyXG4gICAgICAgICAgICAvLyAhISBQT1pPUiwgbmV1bWkgcHJpcmFkaXQga29sZWtjaSwgbXVzaSBzZSB0byBwbyBqZWRub20gISFcclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgIGFjdE5vdmE6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAsIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0Tm92YVwiLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQub3BlbkRldGFpbChudWxsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vIFZzZWNobnkgdnN0dXBuaSBwYXJhbWV0cnkgZ2NvbnRlbnR1IChqc291IG96bmFjZW55IGF0cmlidXRlbSBbSnNvblByb3BlcnR5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uYXZpZ2F0ZSgnR29yZGljLlJvei5XZWJDbGllbnQuR1JvekRldGFpbEFIbGF2aWNrYScsIHsgaXhzX2FobDogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJldFZhbDogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsICYmIHJldFZhbC5yZXR1cm5WYWx1ZSAmJiByZXRWYWwucmV0dXJuVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgLCBhY3RWeW1hemF0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PZHN0cmFuaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAsIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0VnltYXphdFwiLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvenNhaGxPdXREdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEbGUgcG9kbWluZWsgc2kgemppc3RpIGFrdGl2bmkgcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8gIT0gbnVsbCkgeyAvLyBkb3VibGUgY2xpY2sgeiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAvLyBkYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdHggIT09IG51bGwgJiYgY3R4LmNvbXBhcmF0b3JJdGVtICE9IG51bGwpIHsgLy8gcG9rdWQgYnlsbyBzcHXFoXTEm25vIHogcG9yb3Zuw6F2YcSNZSwgYnVkZSBwxZllZMOhbiBjb21wYXJhdG9ySXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5jb21wYXJhdG9ySXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly9qaW5hayBqZSBwb3TFmWViYSBuYcSNw61zdCB2eXN2w61jZW7DvSDFmcOhZGVrIHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdyh0aGF0LiRncmlkKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yb3cgPSB0aGF0LiRncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDY3XCIsIC8vUkMgMzAyNTAwNjcgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMTA1XCIpOyAvL1JDIDMwMjUwMTA1IDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSDFmcOhZGVrIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZzZWNobnkgdnN0dXBuaSBwYXJhbWV0cnkgZ2NvbnRlbnR1IChqc291IG96bmFjZW55IGF0cmlidXRlbSBbSnNvblByb3BlcnR5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVsZXRlKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgLCBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIHBvdm9saXQgcG91emUgcG9rdWQgZXhpc3R1amkgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdERldGFpbFwiLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvenNhaGxPdXREdG87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGxlIHBvZG1pbmVrIHNpIHpqaXN0aSBha3Rpdm5pIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICE9IG51bGwpIHsgLy8gZG91YmxlIGNsaWNrIHogZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgLy8gZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3R4ICE9PSBudWxsICYmIGN0eC5jb21wYXJhdG9ySXRlbSAhPSBudWxsKSB7IC8vIHBva3VkIGJ5bG8gc3B1xaF0xJtubyB6IHBvcm92bsOhdmHEjWUsIGJ1ZGUgcMWZZWTDoW4gY29tcGFyYXRvckl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguY29tcGFyYXRvckl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8vamluYWsgamUgcG90xZllYmEgbmHEjcOtc3QgdnlzdsOtY2Vuw70gxZnDoWRlayB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3codGhhdC4kZ3JpZCkgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcm93ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDA2N1wiLCAvL1JDIDMwMjUwMDY3IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDEwNVwiKTsgLy9SQyAzMDI1MDEwNSA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm8gYWt0aXZuaSByYWRlayB6b2JyYXogZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZW5EZXRhaWwocm93Lml4c19haGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5hdmlnYXRlKCdHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thJywgeyBpeHNfYWhsOiByb3cuaXhzX2FobCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJldFZhbDogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsICYmIHJldFZhbC5yZXR1cm5WYWx1ZSAmJiByZXRWYWwucmV0dXJuVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICwgYWN0RG9rbGFkeTp7XHJcbiAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMzFcIiwvL3RoYXQuYWtjZVNlem5hbXUuRGV0YWlsVGV4dCwgLy9SQyAzMDI1MDMzMSA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0uem9icmF6aXREZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCAvLyBwb3ZvbGl0IHBvdXplIHBva3VkIGV4aXN0dWppIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAsIGFjdE90ZXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPdGV2cml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMzMlwiLC8vdGhhdC5ha2NlU2V6bmFtdS5EZXRhaWxUZXh0LCAvL1JDIDMwMjUwMzMyIDogT3RldsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnpvYnJheml0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgLy8gcG92b2xpdCBwb3V6ZSBwb2t1ZCBleGlzdHVqaSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBteXRoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRHcmlkKCkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pzYWhsT3V0RHRvPih0aGF0LmdldEdyaWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAzMzVcIi5mb3JtYXQocmFkZWsubmF6ZXYhLCByYWRlay5peHNfYWhsISkpIC8vUkMgMzAyNTAzMzUgOiBPcHJhdmR1IGNoY2V0ZSBvdGV2xZnDrXQgaGxhdmnEjWt1IHswfSAoezF9KT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15dGhpcy5zZXRQZW5kaW5nKHRoYXQub3RldnJpdChyYWRlayEuaXhzX2FobCBhcyBzdHJpbmcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICwgYWN0VXphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFV6YXZyaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzMzXCIsLy90aGF0LmFrY2VTZXpuYW11LkRldGFpbFRleHQsIC8vUkMgMzAyNTAzMzMgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0uem9icmF6aXREZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCAvLyBwb3ZvbGl0IHBvdXplIHBva3VkIGV4aXN0dWppIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG15dGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdldEdyaWQoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvenNhaGxPdXREdG8+KHRoYXQuZ2V0R3JpZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoYXQsIFwianJlczozMDI1MDMzNlwiLmZvcm1hdChyYWRlay5uYXpldiEsIHJhZGVrLml4c19haGwhKSkgLy9SQyAzMDI1MDMzNiA6IE9wcmF2ZHUgY2hjZXRlIHV6YXbFmcOtdCBobGF2acSNa3UgezB9ICh7MX0pP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIllFU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXl0aGlzLnNldFBlbmRpbmcodGhhdC51emF2cml0KHJhZGVrIS5peHNfYWhsIGFzIHN0cmluZykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAsIGFjdE9iY2Vyc3R2aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdE9iY2Vyc3R2aXRcIiwgY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTsgfSB9KSxcclxuXHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAvLyB0aGF0LmFjdGlvbnMgb2JzYWh1amUgYWtjZSB2bG96ZW5lIHZ5c2UuIEplIHRvIGtvbGVrY2UgYWtjaVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qKipcclxuICAgICAgICAgKiBEZWZpbm92YW5lIGFrY2UgcHJpZGFtIGRvIG1lbnUgKGF0cmlidXQgZmF2b3JpdGUgem9icmF6aSBwb2xvemt1IHYgaG9ybmltIHBhbmVsdSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1Nlem5hbURva2xhZHVUYWIuY3JlYXRlTWVudUJhclwiLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Tm92YSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPYmNlcnN0dml0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RG9rbGFkeSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VnltYXphdCwgZmF2b3JpdGU6IHRydWUgfSAsICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE90ZXZyaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFV6YXZyaXQsIGZhdm9yaXRlOiB0cnVlIH1cclxuXHJcblxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZGEgY3JlYXRlR3JpZFxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIDogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1JvelNlem5hbUFIbGF2aWNla1RhYi5jcmVhdGVHcmlkXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvenNhaGxPdXREdG8+KFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUm96RG9rbGFkSGxhdmlja2FBLmxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IHJxOiB7IERydWg6IG51bGwsIFJvazogbnVsbCwgRmlsdHJTdGF2OiBHb3JkaWMuVWN0LkludGVyZmFjZS5Wc2VjaG55SGxhdmlja3kgfSB9XHJcblxyXG4gICAgICAgICAgICAgICAgKS51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZpbHRlcnMgPSB7IERydWg6IG51bGwsIFJvazogbnVsbCwgRmlsdHJTdGF2OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJvekZpbHRyQUhsYXZpY2VrU3Rhdi5Wc2VjaG55SGxhdmlja3kgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KHJlcSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpc3R1cG5vc3RBa2NpU2V6bmFtdShyZXN1bHQubWV0YSEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGFuZWw6IHRoYXQuJGZpbHRlckZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIml4c19haGxcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IHJxID0+IHsgcmV0dXJuIHJxOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyBQb2RtaW5lbnkgZm9ybWF0XHJcbiAgICAgICAgICAgIHZhciBjb25kRm9ybWF0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgY29uZEZvcm1hdCA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDMzN1wiLCAvL1JDIDMwMjUwMzM3IDogUG/FmcOtemVuw6FcclxuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBhX3N0YXY9PTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuZ3JlZW5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDMzOFwiLCAvL1JDIDMwMjUwMzM4IDogUG91xb5pdMOhXHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBhX3N0YXY+MCBhbmQgQGFfc3RhdjwyMFwiLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWUgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAzMzlcIiwgLy9SQyAzMDI1MDMzOSA6IFV6YXbFmWVuw6FcclxuICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGFfc3Rhdj4xOVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgLy8gR3JpZCBzaSB1bG96aW0gZG8gbW9kdWxhcm5pIHByb21lbm5lLCBhYnljaCBzZSBuYSBuZWogbmVtdXNlbCB2c3VkZSBvZGthem92YXRcclxuICAgICAgICAgICAgdGhhdC4kZ3JpZCA9ICQubmV3RGl2KFwianMtc2V6bmFtSGxhdmljZWtcIikgLy8gVnl0dm9yIGRpdiBwcm8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIFwiICsgJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXYgbXUgdnlza3VcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KSAvLyB2bG96IGdyaWQgZG8gdGhpcy5lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoeyAvLyBzdHJ1a3R1cmEgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gQ29sdW1uTW9kZSAtIHR5cCB6b2JyYXplbmkgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgLy8gYWJzb2x1dG5pIHNpcmt5IHNsb3VwY3UgKGRlZmF1bHQgZml0IC0gcmVzcG9ueml2bmkpIC8gZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gTXVsdGkgLSBtb3pub3N0IHZ5YmVydSB2aWNlIHJhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBkZWZhdWx0QWN0aW9uIC0gbmFzdGF2ZW7DrSBERUZBVUxUIGFrY2UgcHJvIERWT0pLTElLIG5hIGdyaWR1IG5lYm8gRU5URVJcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gc2VhcmNoQ29sdW1ucyAtIHNsb3VwY2UsIHBvZGxlIGt0ZXLDvWNoIHNlIHZ5aGxlZMOhdsOhIHYgc2VhcmNoYm94dVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIml4c19haGxcIiwgXCJwb3Bpc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gI3JlZ2lvbiBHcmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyAgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXQgfSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHptZW5hIGFrdGl2bmlobyByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZ1bmtjZSBuYSByZWFrY2kgemHFoWtydG51dMOtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5jb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dzID0gaW5mby5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaXN0dXBub3N0QWtjaVNlem5hbXUodW5kZWZpbmVkLCByb3dzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyPy5zaG93KHJvd3NbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkZWtvKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291xI10b3bDvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbG91aMO9IHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdEFsbG93ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXRvdnJlbmkgZ3JpZGZvcm1hdHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96c2FobE91dER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgZ3JkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvenNhaGxPdXREdG8+KClcclxuICAgICAgICAgICAgICAgIC8vIFBpZCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfYWhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg0XCIsIC8vUkMgMzAyNTAxODQgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gQ2lzbGEgYS1obGF2aWNreVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYV9jaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4NVwiIC8vUkMgMzAyNTAxODUgOiDEjMOtc2xvIGhsYXZpxI1reVxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBOYXpldlxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODZcIiAvL1JDIDMwMjUwMTg2IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gUHJpam15XHJcbiAgICAgICAgICAgICAgICAuYWRkTUQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4N1wiLCAvL1JDIDMwMjUwMTg3IDogUMWZw61qbXlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBWeWRhamVcclxuICAgICAgICAgICAgICAgIC5hZGREYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4OFwiLCAvL1JDIDMwMjUwMTg4IDogVsO9ZGFqZSBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIFN0YXYgYS1obGF2aWNreSAtIHRleHRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODlcIiAvL1JDIDMwMjUwMTg5IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFN0YXYgYS1obGF2aWNreSAtIGNpc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFfc3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4OVwiIC8vUkMgMzAyNTAxODkgOiBTdGF2XHJcbiAgICAgICAgICAgICAgICAgICAgLCBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBEcnVoIGEtaGxhdmlja3lcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxOTBcIiAvL1JDIDMwMjUwMTkwIDogRHJ1aFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIERhdHVtIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2V2aWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxOTFcIiAvL1JDIDMwMjUwMTkxIDogRGF0dW0gemFsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIHJlZ2lzdGVyUHJldmlld1xyXG4gICAgICAgIHByaXZhdGUgcmVnaXN0ZXJQcmV2aWV3KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdTZXpuYW1Eb2tsYWR1VGFiLnJlZ2lzdGVyUHJldmlld1wiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgc2UgbmV1c3RhbGUgbWVuaSBkbGUgb2JqZWt0dS4gWmRlIHNpIHRlZHkgdWxvemltIG9ka2F6IG5hIGNlbHkgQ29udGVudFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbmkgb3B0aW9ucyBwcm8gcHJldmlld1xyXG4gICAgICAgICAgICAvL3ZhciBvcHRpb25zUHJldmlldyA9IHtcclxuICAgICAgICAgICAgLy8gICAgdGFiczogW1xyXG4gICAgICAgICAgICAvLyAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2aWV3SWQ6IFwicm96OkRva2xhZFwiIC8vIGlkIHByZXZpZXcsIGt0ZXLDqSBtw6EgYsO9dCB6b2JyYXplbm8sIHDFmcOtcGFkbsSbIGZ1bmtjZSBrdGVyw6EgcG9kbGUgbG9hZFBhcmFtcyB2csOhdMOtIHZpZXdJZFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RmlsZVByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGl4cFByb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gbG9hZFBhcmFtcy5peHA7IH0gICAgICAgICAgICAgICAvLyBmdW5rY2UsIGt0ZXLDoSBtw6EgemEgw7prb2wgcG9za3l0bm91dCBpeHAgcHJvIG5hxI10ZW7DrSBlbC4gb2JyYXp1XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KV1cclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zUHJldmlldyA9e1xyXG4gICAgICAgICAgICAgICAgdXNlU3VidGFzazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWxPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM0OFwiLCAvL1JDIDMxMTAwMjE3IDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGU6IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzQ4XCIsIC8vUkMgMzAyNTAzNDggOiBOw6FobGVkIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiAodGFiLCBkdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsbSA9ICQubmV3RGl2KCkuZ2NvbnRlbnQoR29yZGljLlJvei5XZWJDbGllbnQuR1JvekRldGFpbEFIbGF2aWNrYSwgeyBwYXJlbnRDb250ZW50OiB0aGlzIH0pOyAvL051dG5lIHBybyBzcHJhdm5lIHNwb2plbmkgcyBrb250ZXh0ZW0gaGxhdm5paG8gY29udGVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdGFiU2V0dGluZ3MgPSBkdG8udGFiU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkdG8udGFiU2V0dGluZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRhYikuZW1wdHkoKS5hcHBlbmQoZWxtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHUm96RGV0YWlsQUhsYXZpY2thPihlbG0pLmluaXQoZHRvLml4c19haGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwgb3B0aW9uc1ByZXZpZXcpO1xyXG4gICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnJlZ2lzdGVyUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIHByaXN0dXBub3N0QWtjaVNlem5hbVxyXG4gICAgICAgIHByaXZhdGUgcHJpc3R1cG5vc3RBa2NpU2V6bmFtdShwZXJtaXNpb25zOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96QUhsYXZpY2thUGVybWlzc2lvbnNTZXpuYW0gfCB1bmRlZmluZWQsIGN1cnJlbnRSb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pzYWhsT3V0RHRvIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1Nlem5hbUFIbGF2aWNla1RhYi5wcmlzdHVwbm9zdEFrY2lTZXpuYW11XCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGVybWlzaW9ucyA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHBlcm1pc2lvbnMgPSB0aGlzLnBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zID0gcGVybWlzaW9ucztcclxuICAgICAgICAgICAgLy9pZiAodHlwZW9mIHBlcm1pc2lvbnMgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIC8vICAgIHBlcm1pc2lvbnMgPSB0aGlzLnBlcm1pc2lvbnM7XHJcbiAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnBlcm1pc2lvbnMgPSBwZXJtaXNpb25zO1xyXG4gICAgICAgICAgICAvLyBwb2RhbmlcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5vdmE/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5DYW5DcmVhdGUpO1xyXG4gICAgICAgICAgICAvLyB6b2JyYXppdCBkZXRhaWxcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLkNhblNob3dEZXRhaWwpO1xyXG4gICAgICAgICAgICAvLyB2eW1hemFuaSBobGF2aWNreVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnltYXphdD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLkNhbkRlbGV0ZSk7XHJcbiAgICAgICAgICAgIC8vIHpvYnJhemVuaSBkb2tsYWR1XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REb2tsYWR5Py51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc2lvbnMuQ2FuRG9jdW1lbnRzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG90ZXZyZW5pIGhsYXZpY2t5XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPdGV2cml0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgLy8gdXphdnJpdCBobGF2aWNreVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VXphdnJpdD8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50Um93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkbGUgc3RhdnUgaGxhdmlja3kgenByaXN0dXBuaW0gYWtjZVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRSb3cuYV9zdGF2IGFzIG51bWJlciA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFJvdy5hX3N0YXYgYXMgbnVtYmVyIDwgMjApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1emF2cml0IGhsYXZpY2t5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFV6YXZyaXQ/LnVwZGF0ZSh7IHZpc2libGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFV6YXZyaXQ/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5DYW5DbG9zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pc2lvbnMuQ2FuRGVsZXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnltYXphdD8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Um93LmFfc3RhdiBhcyBudW1iZXIgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG90ZXZyZW5pIGhsYXZpY2t5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE90ZXZyaXQ/LnVwZGF0ZSh7IHZpc2libGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE90ZXZyaXQ/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5DYW5PcGVuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWlzaW9ucy5DYW5EZWxldGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RWeW1hemF0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0eXBlb2YgY3VycmVudFJvdyAhPT0gXCJ1bmRlZmluZWRcIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiBcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgbG9hZERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pTZXpuYW1BSGxhdmljZWsubG9hZERhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHZpZXc6IERhdGEuVmlldzxhbnk+ID0gdGhpcy5nZXRHcmlkKCkuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuZ2dyaWQuanMtc2V6bmFtSGxhdmljZWtcIik7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgYXMgYW55IDogZGF0YSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWxldGUocmFkZWs6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pzYWhsT3V0RHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thLmRlbGV0ZVwiLCB0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7Ly8ucHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMDI1MDE3NVwiLmZvcm1hdChyYWRlay5uYXpldiEsIHJhZGVrLml4c19haGwgYXMgYW55KSkgLy9SQyAzMDI1MDE3NSA6IE9wcmF2ZHUgY2hjZXRlIHNtYXphdCBobGF2acSNa3UgezB9ICh7MX0pP1xyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCBvYmo6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxNjZcIik7IC8vUkMgMzAyNTAxNjYgOiAgUHJvYsOtaMOhIG1hesOhbsOtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5Sb3pEb2tsYWRIbGF2aWNrYUEuZGVsZXRlKHsgaWRlbnRpZmlrYXRvcjogcmFkZWsuaXhzX2FobCBhcyBhbnkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JjZXJzdHZlbmkgZm9ybXVsYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hEZWxldGVcIiwgaWNvbjogXCJnaS10aWNrXCIsIGxhYmVsOiBcImpyZXM6MzAyNTAxNjdcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIgfSkgLy9SQyAzMDI1MDE2NyA6IFrDoXpuYW0gYnlsIMO6c3DEm8WhbsSbIHZ5bWF6w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thLmRlbGV0ZSAtIGRva29uY2Vub1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGpxWEhSLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFV6YXZyZW5pIGhsYXZpY2t5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1emF2cml0KGluZGV0aWZpa2F0b3I6IHN0cmluZyk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlJvekRva2xhZEhsYXZpY2thQS51emF2cml0KHsgaWRlbnRpZmlrYXRvcjogaW5kZXRpZmlrYXRvciB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gIHRoYXQucmVsb2FkUm93KGluZGV0aWZpa2F0b3IpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFV6YXZyZW5pIGhsYXZpY2t5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvdGV2cml0KGluZGV0aWZpa2F0b3I6IHN0cmluZyk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlJvekRva2xhZEhsYXZpY2thQS5vdGV2cml0KHsgaWRlbnRpZmlrYXRvcjogaW5kZXRpZmlrYXRvciB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhhdC5yZWxvYWRSb3coaW5kZXRpZmlrYXRvcikpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZGEgbG9hZERhdGFcclxuXHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIG9wZW5EZXRhaWxcclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoaXhzX2FobDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVRhYi5vcGVuRGV0YWlsXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKCdHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thJywgeyBpeHNfYWhsOiBpeHNfYWhsIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmV0VmFsOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwgJiYgcmV0VmFsLnJldHVyblZhbHVlICYmIHJldFZhbC5yZXR1cm5WYWx1ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnJlbG9hZFJvdyhyZXRWYWwucmV0dXJuVmFsdWUpLnRoZW4oKCkgPT5kZWYucmVzb2x2ZSgpKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyYXpuaSByYWRrdSB6IERCXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGluZGVudGlmaWthdG9yXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWRSb3coaW5kZW50aWZpa2F0b3I6IHN0cmluZyk6SlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdmlldzogRGF0YS5WaWV3PGFueT4gPSB0aGF0LmdldEdyaWQoKS5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Sb3pEb2tsYWRIbGF2aWNrYUEubGlzdCh7IGl4c19haGw6IHsgbzogXCI9XCIsIHY6IGluZGVudGlmaWthdG9yIH0gfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEocmVzdWx0WzBdLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3JldHVybiB2aWV3LnJlcXVlc3REYXRhKHsgRmlsdGVyczogeyBpeHA6IHsgbzogXCI9XCIsIHY6IHBpZERva2xhZHUgfSB9IH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY29udGVudCEuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gICAgICAgIChjb250ZW50IGFzIEdVY3RTZXpuYW0pLiRncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHsgaXhwOiBwaWREb2tsYWR1IH0pXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICB9XHJcbn0iXX0=
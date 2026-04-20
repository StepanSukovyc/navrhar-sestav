"use strict";
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var Pruvodce;
            (function (Pruvodce) {
                /**
                 * aktualizacePoctuDokladu
                 *
                 * @param {MetaRow<Gordic.Uct.Interface.GUctselectedRowsDto>[]} doklady
                 */
                function aktualizacePoctuDokladu(content, doklady) {
                    let warningCount = 0;
                    let errorCount = 0;
                    let succesCount = 0;
                    // zaskrtnuti moznych dokladu
                    doklady.forEach(function (meta) {
                        meta.checked = meta.data.ResultOperation === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */ && meta.data.Selected;
                        if (meta.data.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */)
                            errorCount++;
                        else if (meta.data.ResultOperation === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */)
                            warningCount++;
                        else
                            succesCount++;
                    });
                    // aktualizace poctu dle stavu dokladu
                    content.badgeAll.update({ value: doklady.length.toString() });
                    content.badgeError.update({ value: errorCount.toString() });
                    content.badgeSuccess.update({ value: succesCount.toString() });
                    content.badgeWarning.update({ value: warningCount.toString() });
                    //content.$grid.ggrid("refreshRows");
                }
                Pruvodce.aktualizacePoctuDokladu = aktualizacePoctuDokladu;
                // ****************************************************
                //   Funkce pro zaškrtnutí zvolených dokladů v gridu
                // ****************************************************
                function zaskrtniRadky(content, data, kind) {
                    for (var i = 0, l = data.length; i < l; i++) { // projedu všechny řádky z gridu
                        var item = data[i]; // řádek z gridu
                        if (kind === 203 /* Gordic.Uct.Interface.GEResultOperation.Info */) // INFO = všechny doklady
                            item.checked = true; // zaškrtnout řádek
                        else if (item.data.ResultOperation === kind) // je doklad v požadovaném stavu
                            item.checked = true; // zaškrtnout řádek
                        //else                                                                                // není to v pořádku
                        //    item.checked = false;                                                           // odškrtnout řádek
                    }
                    //dataView.refresh();                                                                     // občerstvení dat
                    content.$grid.ggrid("refreshRows"); // občerstvení dat do gridu
                }
                Pruvodce.zaskrtniRadky = zaskrtniRadky;
                /**
                 * Pocateni inicializace 1. kroku
                 *
                 * @param content
                 */
                function inicializace(content, contentDiv, baged = true, reloadData) {
                    var that = content;
                    // definice okna
                    let html = $.newDiv().appendTo(contentDiv /*cnt.element*/).gform("createFrom", new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0")
                    //.addSection("Vyberte doklady k proúčtování")
                    );
                    // vytvoření gridu
                    that.$grid = createGrid(content, contentDiv /*cnt.element*/, true, false, reloadData);
                    that.Pruvodce.enableStep(content, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: false, index: 2 }], { back: { enabled: true }, next: { enabled: true } });
                    let view = new Gordic.Data.View(that.selectedRows, { key: "ixp" });
                    // nastavení dat a překreslení gridu
                    that.$grid.ggrid("setData", view);
                    //// oznaceni validnich radku                                
                    //view.getDataRows(true).forEach(function (meta) {
                    //    meta.Selected = meta.Selected && meta.data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Success;
                    //});
                    var data = view.getDataRows(true);
                    if (baged) {
                        that.actAll = new GAction({
                            //icon:"fa-check-circle g-state-info g-state-text",                                                                     // VŠECHNY DOKLADY
                            name: "actAll", caption: "jres:30250493", // RC 29750228 : Všechny doklady //RC 30250493 : Všechny doklady
                            run: function () { zaskrtniRadky(content, data, 203 /* Gordic.Uct.Interface.GEResultOperation.Info */); }
                        }); // zaškrtnutí všech dokladů
                        that.actSuccess = new GAction({
                            name: "actSuccess", caption: "jres:30250494", // RC 29750222 : Vyhovující doklady //RC 30250494 : Vyhovující doklady
                            //icon: "fa-check-circle g-state-success g-state-text",
                            run: function () { zaskrtniRadky(content, data, 200 /* Gordic.Uct.Interface.GEResultOperation.Success */); }
                        }); // zaškrtnutí success dokladů
                        that.actWarning = new GAction({
                            name: "actWarning", caption: "jres:30250495", // RC 29750236 : Doklady s upozorněním //RC 30250495 : Doklady s upozorněním
                            //icon: "fa-exclamation-triangle g-state-warning g-state-text",
                            run: function () { zaskrtniRadky(content, data, 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */); }
                        }); // zaškrtnutí warning dokladů
                        that.actError = new GAction({
                            name: "actError", caption: "jres:30250496", // RC 29750223 : Nevyhovující doklady //RC 30250496 : Nevyhovující doklady
                            //icon: "fa-times-circle g-state-error g-state-text",
                            run: function () { zaskrtniRadky(content, data, 400 /* Gordic.Uct.Interface.GEResultOperation.Error */); }
                        }); // zaškrtnutí error dokladů          
                        that.badgeAll = new GObservableObject({ value: "0", customClass: "g-state-background g-state-info" });
                        that.badgeSuccess = new GObservableObject({ value: "0", customClass: "g-state-background g-state-success" });
                        that.badgeWarning = new GObservableObject({ value: "0", customClass: "g-state-background g-state-warning" });
                        that.badgeError = new GObservableObject({ value: "0", customClass: "g-state-background g-state-error" });
                        // Zobrazení výsledků
                        if (typeof that.myStatusBar === "undefined" || that.myStatusBar == null) { // div s výsledkem ještě neexistuje
                            that.myStatusBar = $.newDiv("statusbar") // zobrazení výsledkové lišty
                                .insertBefore(html) // vložení před grid
                                .gbuttonpanel({
                                params: [{ action: that.actAll, badge: that.badgeAll }, // všechny doklady
                                    { action: that.actSuccess, badge: that.badgeSuccess }, // OK doklady
                                    { action: that.actWarning, badge: that.badgeWarning }, // warnings doklady
                                    { action: that.actError, badge: that.badgeError }] // KO doklady
                            });
                        }
                        else { // div s výsledkem již existuje
                            that.myStatusBar.show(); // zobrazím ho    
                        }
                        aktualizacePoctuDokladu(content, view.getDataRows(true));
                    }
                    content.$grid.ggrid("refreshRows");
                    //that.$grid.ggrid("refreshRows");
                }
                Pruvodce.inicializace = inicializace;
                /**
                *
                *  Vytvoreni gridu
                *
                * createGrid
                *
                * @param {JQuery} content
                * @param {boolean} multi (default = false)
                * @param {boolean} result (default = false) - vysledny grid
                * @returns {JQuery}
                */
                function createGrid(content, contentDiv, multi = false, result = false, reloadData) {
                    // vyhledavaci sloupce
                    let searchColumns = ["popis", "ac", "ac_ag", "ixp", "drd", "ktgTypNazev", "stav_txt", "ixs_fun_nazev"];
                    // definice gridu
                    let rownGrid = $.newDiv("js-WizadrGrid").appendTo(contentDiv);
                    if (multi) {
                        rownGrid = rownGrid // $("<div class='js-WizadrGrid'>")
                            //.css("height", "calc(100% - " + $filterForm.height() + "px)")
                            //.css("height", "100%")
                            //.appendTo(content)
                            .ggrid({
                            columnMode: "full" // fit (defaultne by melo byt toto), full
                            ,
                            multiMenu: [{
                                    action: new GAction({
                                        name: "actSelectOk", caption: "jres:30250476", //RC 30250476 : Vybrat vyhovující
                                        icon: "fa-check-circle g-state-success g-state-text",
                                        run: function () {
                                            zaskrtniRadky(content, content.$grid.ggrid("getView").getDataRows(true), 200 /* Interface.GEResultOperation.Success */);
                                        }
                                    })
                                },
                                {
                                    action: new GAction({
                                        name: "actSelectWarning", caption: "jres:30250477", //RC 30250477 : Vybrat s varováním
                                        icon: "fa-exclamation-triangle g-state-warning g-state-text",
                                        run: function () {
                                            zaskrtniRadky(content, content.$grid.ggrid("getView").getDataRows(true), 206 /* Interface.GEResultOperation.Warning */);
                                        }
                                    })
                                },
                                //{ action: that.actError },
                                {
                                    action: new GAction({
                                        name: "actSelectError", caption: "jres:30250478", //RC 30250478 : Vybrat nevyhovující
                                        icon: "fa-times-circle g-state-error g-state-text",
                                        run: function () {
                                            zaskrtniRadky(content, content.$grid.ggrid("getView").getDataRows(true), 400 /* Interface.GEResultOperation.Error */);
                                        }
                                    })
                                }
                            ],
                            multi: multi,
                            cellActivate: function (ev, obj) {
                                // načtení zápisů 
                                if (obj.cellInfo && typeof reloadData !== "undefined")
                                    reloadData(content);
                            }
                            // zmena vyberu radku
                            ,
                            selection: function (ev, ctx) {
                                enabledAction(content);
                            }
                            //, rowsChecked: "Selected"
                            //, rowsEnabled: function (meta) {
                            //    return meta && meta.data && meta.data.Error === false;
                            //}
                            // delegat pro zmenu stylu radku pri vykreslovani
                            //, rowsClass: rowsClass
                            //sloupce, podle kterych se vyhledava v searchboxu
                            //, searchColumns: searchColumns
                            //Definice sloupcu
                            ,
                            columns: createColumns(result),
                        });
                    }
                    else {
                        rownGrid = rownGrid // $("<div class='js-WizadrGrid'>")
                            //.css("height", "calc(100% - " + $filterForm.height() + "px)")
                            //.css("height", "100%")
                            //.appendTo(content)
                            .ggrid({
                            columnMode: "full" // fit (defaultne by melo byt toto), full
                            ,
                            multi: multi
                            // delegat pro zmenu stylu radku pri vykreslovani
                            //, rowsClass: rowsClass
                            //sloupce, podle kterych se vyhledava v searchboxu
                            //, searchColumns: searchColumns
                            //#region Definice sloupcu
                            ,
                            columns: createColumns(result),
                        });
                    }
                    return rownGrid.gautofit();
                    //this.$grid.resize();
                }
                Pruvodce.createGrid = createGrid;
                /**
                * enabledAction
                *
                *  Povoleni akce
                */
                function enabledAction(content) {
                    //let that = content;
                    var currentStep = content.Pruvodce.getStep(content);
                    if (currentStep == 0) {
                        content.Pruvodce.enableStep(content, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: false, index: 2 }], { back: { enabled: true }, next: { enabled: isValidData(content) } });
                    }
                }
                Pruvodce.enabledAction = enabledAction;
                /***
                    *
                    *  Kontrola dat pred vlastni operaci
                    *
                    */
                function isValidData(content) {
                    let result = true;
                    if (typeof content.$grid === "undefined" || content.$grid === null)
                        return false;
                    var oznaceneRadky = Gordic.Eko.Grid.checkedRows(content.$grid, true);
                    if (typeof oznaceneRadky === "undefined" || oznaceneRadky === null || oznaceneRadky.length === 0)
                        return false;
                    oznaceneRadky.forEach((radek, index) => {
                        if (radek.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) {
                            result = false;
                            return result;
                        }
                    });
                    return result;
                }
                Pruvodce.isValidData = isValidData;
                /**
                *  Definice sloupcu
                * createColumns
                *
                * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctselectedRowsDto>}
                */
                function createColumns(result = false, withResultAtributs = true) {
                    var columns = new Gordic.Data.GridFormat();
                    if (withResultAtributs) {
                        columns.addIconColumn({
                            name: "ResultOperation", caption: "", width: 40, // vlastnosti přidaného sloupce
                            hidden: false,
                            iconTemplate: function (data) {
                                if (data.ResultOperation === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) // vyhovující doklad
                                 {
                                    if (result)
                                        return { icon: "fa-check-circle g-state-success g-state-text", tooltip: "jres:30250503" }; //RC 30250503 : OK
                                    else
                                        return { icon: "fa-check-circle g-state-success g-state-text", tooltip: "jres:30250482" }; //RC 30250482 : Vyhovující doklad pro hromadnou operaci
                                }
                                else if (data.ResultOperation === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */) // vyhovující doklad s upozorněním
                                    return { icon: "fa-exclamation-triangle g-state-warning g-state-text", tooltip: "jres:30250483" }; //RC 30250483 : Doklad s upozorněním
                                else if (data.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) // nevyhovující doklad
                                    return { icon: "fa-times-circle g-state-error g-state-text", tooltip: "jres:30250484" }; //RC 30250484 : Nevyhovující doklad pro hromadnou operaci
                                else // žádný výsledek neexistuje
                                    return { icon: "", text: "", tooltip: "" }; // neutrální doklad
                            }
                        })
                            .addTextColumn({
                            name: "ErrMsg", caption: "jres:30250560", width: 170, // vlastnosti přidaného sloupce //RC 30250560 : Výsledek
                            hidden: false,
                            cellTemplate: function (data, metarow, info) {
                                if (data.ResultOperation === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) // vyhovující doklad
                                 {
                                    if (result)
                                        return "jres:30250561"; //RC 30250561 : Akce provedena
                                    else
                                        return "jres:30250482"; //RC 30250482 : Vyhovující doklad pro hromadnou operaci
                                }
                                else if (data.ResultOperation === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */) // vyhovující doklad s upozorněním
                                    return data.ResultMsg;
                                else if (data.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) // nevyhovující doklad
                                    return data.ResultMsg;
                                else // žádný výsledek neexistuje
                                    return "";
                            }
                        });
                    }
                    Gordic.Eko.Grid.Column.addPid(columns, { name: "ixp" });
                    Gordic.Eko.Grid.Column.addAgendoveCislo(columns, { name: "ac_ag" });
                    Gordic.Eko.Grid.Column.addEvidencniCislo(columns, { name: "ac" });
                    Gordic.Eko.Grid.Column.addDruhDokladu(columns, { name: "drd" });
                    Gordic.Eko.Grid.Column.addRok(columns, { name: "rok" });
                    Gordic.Eko.Grid.Column.addMesic(columns, { name: "mesic" });
                    Gordic.Eko.Grid.Column.addDen(columns, { name: "den" });
                    Gordic.Eko.Grid.Column.addCisloDokladu(columns, { name: "ac_ixe" });
                    Gordic.Eko.Grid.Column.addTypDokladu(columns, { name: "ktgTypNazev" });
                    Gordic.Eko.Grid.Column.addStavDokladu(columns, { name: "stav_txt" });
                    Gordic.Eko.Grid.Column.addCastka(columns, { name: "c" });
                    columns.addCurrencyColumn({
                        name: "c0",
                        caption: "jres:30250019" //RC 30250019 : MD
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250131" //RC 30250131 : Dal
                    });
                    Gordic.Eko.Grid.Column.addZpracovatel(columns, { name: "ixs_fun_nazev" });
                    Gordic.Eko.Grid.Column.addPopis(columns, { name: "popis" });
                    return columns;
                }
                Pruvodce.createColumns = createColumns;
                /**
                 *  Definice sloupcu
                 * createColumns
                 *
                 * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>}
                 */
                function createColumnsMetaData() {
                    let grdFormat = new Gordic.Data.GridFormat();
                    Gordic.Eko.Grid.Column.addPid(grdFormat);
                    //.addTextColumn({
                    //    name: "ixp",
                    //    caption: "jres:30250026", //RC 30250026 : Identifikátor
                    //    width: 120,
                    //    fixedWidth: true,
                    //    //customClass: "ui-disabled"
                    //})
                    grdFormat
                        .addIconColumn({
                        name: "ErrMsg", caption: "jres:30250437", width: 170, // vlastnosti přidaného sloupce //RC 30250437 : Výsledek
                        hidden: false,
                        iconTemplate: function (data) {
                            if (data.ResultOperation === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) // vyhovující doklad
                                return { icon: "fa-check-circle g-state-success g-state-text", text: "OK", tooltip: "" };
                            else if (data.ResultOperation === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */) // vyhovující doklad s upozrněním
                                return {
                                    icon: "fa-check-circle g-state-warning g-state-text", text: "jres:30250444" //RC 30250444 : Byly zjištěny nesrovnalosti při kontrole metadat dle NSESS.
                                    ,
                                    tooltip: "jres:30250447m" //RC 30250447 : Doklad s upozornění
                                };
                            else if (data.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) // nevyhovující doklad
                                return {
                                    icon: "fa-times-circle g-state-error g-state-text", text: "jres:30250444", //RC 30250444 : Byly zjištěny nesrovnalosti při kontrole metadat dle NSESS.
                                    tooltip: "jres:30250448" //RC 30250448 : Nevyhovující doklad
                                };
                            else // žádný výsledek neexistuje
                                return { icon: "", text: "", tooltip: "" }; // neutrální doklad
                        }
                    });
                    Gordic.Eko.Grid.Column.addAgendoveCislo(grdFormat);
                    Gordic.Eko.Grid.Column.addEvidencniCislo(grdFormat);
                    Gordic.Eko.Grid.Column.addDruhDokladu(grdFormat);
                    Gordic.Eko.Grid.Column.addRok(grdFormat);
                    Gordic.Eko.Grid.Column.addMesic(grdFormat);
                    Gordic.Eko.Grid.Column.addDen(grdFormat);
                    Gordic.Eko.Grid.Column.addCisloDokladu(grdFormat);
                    Gordic.Eko.Grid.Column.addTypDokladu(grdFormat, { name: "ktgTypNazev" });
                    Gordic.Eko.Grid.Column.addStavDokladu(grdFormat, { name: "stav_txt" });
                    Gordic.Eko.Grid.Column.addCastka(grdFormat, {
                        name: "c",
                        fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.c */,
                    });
                    Gordic.Eko.Grid.Column.addMD(grdFormat, { fragment: "c0" /* Interface.GUctSeznamDokladuDtoFragments.c0 */ });
                    Gordic.Eko.Grid.Column.addDal(grdFormat, { fragment: "c1" /* Interface.GUctSeznamDokladuDtoFragments.c1 */ });
                    Gordic.Eko.Grid.Column.addZpracovatel(grdFormat, { name: "ixs_fun_nazev", fragment: "ixs_fun_nazev" /* Interface.GUctSeznamDokladuDtoFragments.ixs_fun_nazev */ });
                    Gordic.Eko.Grid.Column.addPopis(grdFormat);
                    ;
                    return grdFormat;
                }
                Pruvodce.createColumnsMetaData = createColumnsMetaData;
                /**
                * Test, jestli je možné okno zavřít
                *
                * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
                */
                function closing(content) {
                    // ukončení je možné v kterékoliv fázi
                    // TODO: pokud by nebyla obsluha potřeba, tak celou metodu smazat
                    let that = content;
                    // deferred object pro close
                    let defClose = $.Deferred();
                    /*
                    cnt.dialogs.confirm("Opravdu chcete zrušit průvodce?").on("close", (ev, obj: string) => {
                        if (obj === "yes") {
                            that.successClose = false;
            
                        }
                    });*/
                    if (that["successClose"] === false) {
                        that.dialogs.messageBox("dotaz", "jres:30250339", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250339 : Opravdu chcete ukočit průvodce?
                            .on("yes", function () { defClose.resolve(that); })
                            .on("close", defClose.reject);
                        return defClose.promise();
                    }
                    // může se zavřít vždy
                    return defClose.resolve(that).promise();
                }
                Pruvodce.closing = closing;
            })(Pruvodce = WebClient.Pruvodce || (WebClient.Pruvodce = {}));
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdEhyb21hZG5lT3BlcmFjZV9NZXRvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0SHJvbWFkbmVPcGVyYWNlX01ldG9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBOGFmO0FBOWFELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThhbkI7SUE5YWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThhN0I7UUE5YW9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQThhdEM7WUE5YThCLFdBQUEsUUFBUTtnQkFHL0I7Ozs7bUJBSUc7Z0JBQ1AsU0FBZ0IsdUJBQXVCLENBQUMsT0FBOEIsRUFBRSxPQUE2RDtvQkFFakksSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ25CLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFFcEIsNkJBQTZCO29CQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTt3QkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsNkRBQW1ELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFlLENBQUM7d0JBQ3pILElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLDJEQUFpRDs0QkFDMUUsVUFBVSxFQUFFLENBQUM7NkJBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsNkRBQW1EOzRCQUNqRixZQUFZLEVBQUUsQ0FBQzs7NEJBRWYsV0FBVyxFQUFFLENBQUM7b0JBRXRCLENBQUMsQ0FDQSxDQUFDO29CQUNGLHNDQUFzQztvQkFDdEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzVELE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQy9ELE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ2hFLHFDQUFxQztnQkFDekMsQ0FBQztnQkF4QmUsZ0NBQXVCLDBCQXdCdEMsQ0FBQTtnQkFDRyx1REFBdUQ7Z0JBQ3ZELG9EQUFvRDtnQkFDcEQsdURBQXVEO2dCQUMzRCxTQUFnQixhQUFhLENBQUMsT0FBOEIsRUFBRSxJQUEwRCxFQUFFLElBQTRDO29CQUNsSyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBMEMsZ0NBQWdDO3dCQUNwSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBaUUsZ0JBQWdCO3dCQUNwRyxJQUFJLElBQUksMERBQWdELEVBQTBDLHlCQUF5Qjs0QkFDdkgsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBNEQsbUJBQW1COzZCQUNsRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxLQUFLLElBQUksRUFBb0QsZ0NBQWdDOzRCQUMzSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUE0RCxtQkFBbUI7d0JBQ3ZHLDBHQUEwRzt3QkFDMUcseUdBQXlHO29CQUM3RyxDQUFDO29CQUNELDRHQUE0RztvQkFDNUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBd0QsMkJBQTJCO2dCQUMxSCxDQUFDO2dCQVplLHNCQUFhLGdCQVk1QixDQUFBO2dCQUNEOzs7O21CQUlHO2dCQUNILFNBQWdCLFlBQVksQ0FBeUQsT0FBK0IsRUFBRSxVQUErQixFQUFFLFFBQWlCLElBQUksRUFBRSxVQUFxQjtvQkFFL0wsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDO29CQUNuQixnQkFBZ0I7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFBLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQztvQkFDekksOENBQThDO3FCQUNqRCxDQUFDO29CQUNGLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQSxlQUFlLEVBQUUsSUFBSSxFQUFDLEtBQUssRUFBRyxVQUFVLENBQUMsQ0FBQztvQkFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUVsTCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDbkUsb0NBQW9DO29CQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRWxDLDZEQUE2RDtvQkFDN0Qsa0RBQWtEO29CQUNsRCxvSEFBb0g7b0JBQ3BILEtBQUs7b0JBRUwsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDOzRCQUN0QiwwSUFBMEk7NEJBQzFJLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBcUQsZ0VBQWdFOzRCQUM3SixHQUFHLEVBQUUsY0FBYyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksd0RBQThDLENBQUMsQ0FBQyxDQUFDO3lCQUNsRyxDQUFDLENBQUMsQ0FBRywyQkFBMkI7d0JBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUM7NEJBQzFCLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBaUQsc0VBQXNFOzRCQUNuSyx1REFBdUQ7NEJBQ3ZELEdBQUcsRUFBRSxjQUFjLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSwyREFBaUQsQ0FBQyxDQUFDLENBQUM7eUJBQ3JHLENBQUMsQ0FBQyxDQUFBLDZCQUE2Qjt3QkFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQzs0QkFDMUIsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFpRCw0RUFBNEU7NEJBQ3pLLCtEQUErRDs0QkFDL0QsR0FBRyxFQUFFLGNBQWMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLDJEQUFpRCxDQUFDLENBQUMsQ0FBQzt5QkFDckcsQ0FBQyxDQUFDLENBQUEsNkJBQTZCO3dCQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDOzRCQUN4QixJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQW1ELDBFQUEwRTs0QkFDdksscURBQXFEOzRCQUNyRCxHQUFHLEVBQUUsY0FBYyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUkseURBQStDLENBQUMsQ0FBQyxDQUFDO3lCQUNuRyxDQUFDLENBQUMsQ0FBRSxxQ0FBcUM7d0JBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBZ0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7d0JBQ3JILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxpQkFBaUIsQ0FBZ0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxvQ0FBb0MsRUFBRSxDQUFDLENBQUM7d0JBQzVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxpQkFBaUIsQ0FBZ0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxvQ0FBb0MsRUFBRSxDQUFDLENBQUM7d0JBQzVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBZ0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7d0JBRXhILHFCQUFxQjt3QkFDckIsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBc0QsbUNBQW1DOzRCQUMvSixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQWtDLDZCQUE2QjtpQ0FDbEcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUE0QyxvQkFBb0I7aUNBQ2xGLFlBQVksQ0FBQztnQ0FDVixNQUFNLEVBQ0YsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQWMsa0JBQWtCO29DQUM5RSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQU0sYUFBYTtvQ0FDeEUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFNLG1CQUFtQjtvQ0FDOUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQVMsYUFBYTs2QkFDL0UsQ0FBQyxDQUFBO3dCQUNWLENBQUM7NkJBQU0sQ0FBQyxDQUFvRSwrQkFBK0I7NEJBQ3ZHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBeUQsa0JBQWtCO3dCQUN2RyxDQUFDO3dCQUNELHVCQUF1QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzdELENBQUM7b0JBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBR25DLGtDQUFrQztnQkFDdEMsQ0FBQztnQkFyRWUscUJBQVksZUFxRTNCLENBQUE7Z0JBQ0Q7Ozs7Ozs7Ozs7a0JBVUU7Z0JBQ0YsU0FBZ0IsVUFBVSxDQUFDLE9BQXlELEVBQUUsVUFBa0IsRUFBRSxRQUFpQixLQUFLLEVBQUUsU0FBa0IsS0FBSyxFQUFFLFVBQXFCO29CQUd4SyxzQkFBc0I7b0JBQ3RCLElBQUksYUFBYSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO29CQUV2RyxpQkFBaUI7b0JBQ3JCLElBQUksUUFBUSxHQUF3QixDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDUixRQUFRLEdBQUcsUUFBUSxDQUFBLG1DQUFtQzs0QkFDbEQsK0RBQStEOzRCQUMvRCx3QkFBd0I7NEJBQ3hCLG9CQUFvQjs2QkFDbkIsS0FBSyxDQUFDOzRCQUNILFVBQVUsRUFBRSxNQUFNLENBQUsseUNBQXlDOzs0QkFDOUQsU0FBUyxFQUFFLENBQUM7b0NBQ1YsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDO3dDQUVoQixJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUNBQWlDO3dDQUNoRixJQUFJLEVBQUUsOENBQThDO3dDQUNwRCxHQUFHLEVBQUU7NENBQ0QsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBcUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnREFDakUsQ0FBQTt3Q0FDOUMsQ0FBQztxQ0FDSixDQUFDO2lDQUNGO2dDQUNBO29DQUNJLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQzt3Q0FDaEIsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dDQUN0RixJQUFJLEVBQUUsc0RBQXNEO3dDQUM1RCxHQUFHLEVBQUU7NENBQ0QsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBcUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnREFDakUsQ0FBQTt3Q0FDbEQsQ0FBQztxQ0FDSixDQUFDO2lDQUNEO2dDQUNELDRCQUE0QjtnQ0FDNUI7b0NBQ0ksTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDO3dDQUNoQixJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUM7d0NBQ3JGLElBQUksRUFBRSw0Q0FBNEM7d0NBQ2hELEdBQUcsRUFBRTs0Q0FDSCxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFxQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDhDQUNuRSxDQUFBO3dDQUM1QyxDQUFDO3FDQUNKLENBQUM7aUNBQ0w7NkJBQ0o7NEJBQ0MsS0FBSyxFQUFFLEtBQUs7NEJBQ2IsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQzVCLGtCQUFrQjtnQ0FDbEIsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVc7b0NBQUcsVUFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDN0YsQ0FBQzs0QkFDRCxxQkFBcUI7OzRCQUNuQixTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FFMUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMzQixDQUFDOzRCQUNELDJCQUEyQjs0QkFDM0Isa0NBQWtDOzRCQUNsQyw0REFBNEQ7NEJBQzVELEdBQUc7NEJBRUgsaURBQWlEOzRCQUNqRCx3QkFBd0I7NEJBQ3hCLGtEQUFrRDs0QkFDbEQsZ0NBQWdDOzRCQUNoQyxrQkFBa0I7OzRCQUNoQixPQUFPLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQzt5QkFDbkMsQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixRQUFRLEdBQUcsUUFBUSxDQUFBLG1DQUFtQzs0QkFDbEQsK0RBQStEOzRCQUMvRCx3QkFBd0I7NEJBQ3hCLG9CQUFvQjs2QkFDbkIsS0FBSyxDQUFDOzRCQUNILFVBQVUsRUFBRSxNQUFNLENBQUsseUNBQXlDOzs0QkFDOUQsS0FBSyxFQUFFLEtBQUs7NEJBQ2QsaURBQWlEOzRCQUNqRCx3QkFBd0I7NEJBQ3hCLGtEQUFrRDs0QkFDbEQsZ0NBQWdDOzRCQUNoQywwQkFBMEI7OzRCQUN4QixPQUFPLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQzt5QkFDbkMsQ0FBQyxDQUFDO29CQUVYLENBQUM7b0JBQ0QsT0FBTyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzNCLHNCQUFzQjtnQkFDMUIsQ0FBQztnQkExRlcsbUJBQVUsYUEwRnJCLENBQUE7Z0JBRUw7Ozs7a0JBSUU7Z0JBQ0YsU0FBZ0IsYUFBYSxDQUF5RCxPQUErQjtvQkFDakgscUJBQXFCO29CQUNyQixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxXQUFXLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDek0sQ0FBQztnQkFDTCxDQUFDO2dCQU5lLHNCQUFhLGdCQU01QixDQUFBO2dCQUNEOzs7O3NCQUlNO2dCQUNOLFNBQWdCLFdBQVcsQ0FBQyxPQUF5RDtvQkFFakYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssS0FBSyxXQUFXLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJO3dCQUFFLE9BQU8sS0FBSyxDQUFDO29CQUNqRixJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQTRDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hILElBQUksT0FBTyxhQUFhLEtBQUssV0FBVyxJQUFHLGFBQWEsS0FBSyxJQUFJLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDO3dCQUFFLE9BQU8sS0FBSyxDQUFDO29CQUM5RyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUNuQyxJQUFJLEtBQUssQ0FBQyxlQUFlLDJEQUFpRCxFQUFFLENBQUM7NEJBQ3pFLE1BQU0sR0FBRyxLQUFLLENBQUM7NEJBQ2YsT0FBTyxNQUFNLENBQUM7d0JBQ2xCLENBQUM7b0JBRUwsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBZGUsb0JBQVcsY0FjMUIsQ0FBQTtnQkFDRDs7Ozs7a0JBS0U7Z0JBQ0YsU0FBZ0IsYUFBYSxDQUFDLFNBQWtCLEtBQUssRUFBRSxxQkFBOEIsSUFBSTtvQkFDckYsSUFBSSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBNkMsQ0FBQTtvQkFFakYsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO3dCQUVyQixPQUFPLENBQUMsYUFBYSxDQUFDOzRCQUN0QixJQUFJLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUF1QiwrQkFBK0I7NEJBQ3JHLE1BQU0sRUFBRSxLQUFLOzRCQUNiLFlBQVksRUFBRSxVQUFVLElBQUk7Z0NBQ3hCLElBQUksSUFBSSxDQUFDLGVBQWUsNkRBQW1ELEVBQVcsb0JBQW9CO2lDQUMxRyxDQUFDO29DQUNHLElBQUksTUFBTTt3Q0FDTixPQUFPLEVBQUUsSUFBSSxFQUFFLDhDQUE4QyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQjs7d0NBRTdHLE9BQU8sRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsdURBQXVEO2dDQUMxSixDQUFDO3FDQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsNkRBQW1ELEVBQU0sa0NBQWtDO29DQUNwSCxPQUFPLEVBQUUsSUFBSSxFQUFFLHNEQUFzRCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLG9DQUFvQztxQ0FDdEksSUFBSSxJQUFJLENBQUMsZUFBZSwyREFBaUQsRUFBUSxzQkFBc0I7b0NBQ3hHLE9BQU8sRUFBRSxJQUFJLEVBQUUsNENBQTRDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMseURBQXlEO3FDQUNsRiw0QkFBNEI7b0NBQzVGLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBUyxDQUFDLENBQXFCLG1CQUFtQjs0QkFDbEcsQ0FBQzt5QkFDSixDQUFDOzZCQUNPLGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBdUIsd0RBQXdEOzRCQUNuSSxNQUFNLEVBQUUsS0FBSzs0QkFDYixZQUFZLEVBQUUsVUFBVSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUk7Z0NBQ3ZDLElBQUksSUFBSSxDQUFDLGVBQWUsNkRBQW1ELEVBQVcsb0JBQW9CO2lDQUMxRyxDQUFDO29DQUNHLElBQUksTUFBTTt3Q0FDTixPQUFPLGVBQWUsQ0FBQyxDQUFDLDhCQUE4Qjs7d0NBRXRELE9BQU8sZUFBZSxDQUFDLENBQUMsdURBQXVEO2dDQUN2RixDQUFDO3FDQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsNkRBQW1ELEVBQU0sa0NBQWtDO29DQUNwSCxPQUFPLElBQUksQ0FBQyxTQUFnQixDQUFDO3FDQUM1QixJQUFJLElBQUksQ0FBQyxlQUFlLDJEQUFpRCxFQUFRLHNCQUFzQjtvQ0FDeEcsT0FBTyxJQUFJLENBQUMsU0FBZ0IsQ0FBQztxQ0FDbUMsNEJBQTRCO29DQUM1RixPQUFPLEVBQVMsQ0FBQzs0QkFDekIsQ0FBQzt5QkFDSixDQUFDLENBQUE7b0JBQ2QsQ0FBQztvQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUV4RCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDckUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFD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YVMsTUFBTSxLQUFOLE1BQU0sUUE4YWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjdC5XZWJDbGllbnQuUHJ1dm9kY2Uge1xyXG4gXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGFrdHVhbGl6YWNlUG9jdHVEb2tsYWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtNZXRhUm93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RzZWxlY3RlZFJvd3NEdG8+W119IGRva2xhZHlcclxuICAgICAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBha3R1YWxpemFjZVBvY3R1RG9rbGFkdShjb250ZW50OiBHSHJvbWFkbmVPcGVyYWNlPGFueT4sIGRva2xhZHk6IE1ldGFSb3c8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG8+W10pIHtcclxuXHJcbiAgICAgICAgbGV0IHdhcm5pbmdDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGVycm9yQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCBzdWNjZXNDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHphc2tydG51dGkgbW96bnljaCBkb2tsYWR1XHJcbiAgICAgICAgZG9rbGFkeS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgIG1ldGEuY2hlY2tlZCA9IG1ldGEuZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLlN1Y2Nlc3MgJiYgbWV0YS5kYXRhLlNlbGVjdGVkIGFzIGFueTtcclxuICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLkVycm9yKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JDb3VudCsrO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChtZXRhLmRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5XYXJuaW5nKVxyXG4gICAgICAgICAgICAgICAgd2FybmluZ0NvdW50Kys7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc0NvdW50Kys7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGFrdHVhbGl6YWNlIHBvY3R1IGRsZSBzdGF2dSBkb2tsYWR1XHJcbiAgICAgICAgY29udGVudC5iYWRnZUFsbC51cGRhdGUoeyB2YWx1ZTogZG9rbGFkeS5sZW5ndGgudG9TdHJpbmcoKSB9KTtcclxuICAgICAgICBjb250ZW50LmJhZGdlRXJyb3IudXBkYXRlKHsgdmFsdWU6IGVycm9yQ291bnQudG9TdHJpbmcoKSB9KTtcclxuICAgICAgICBjb250ZW50LmJhZGdlU3VjY2Vzcy51cGRhdGUoeyB2YWx1ZTogc3VjY2VzQ291bnQudG9TdHJpbmcoKSB9KTtcclxuICAgICAgICBjb250ZW50LmJhZGdlV2FybmluZy51cGRhdGUoeyB2YWx1ZTogd2FybmluZ0NvdW50LnRvU3RyaW5nKCkgfSk7XHJcbiAgICAgICAgLy9jb250ZW50LiRncmlkLmdncmlkKFwicmVmcmVzaFJvd3NcIik7XHJcbiAgICB9XHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgIC8vICAgRnVua2NlIHBybyB6YcWha3J0bnV0w60genZvbGVuw71jaCBkb2tsYWTFryB2IGdyaWR1XHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHphc2tydG5pUmFka3koY29udGVudDogR0hyb21hZG5lT3BlcmFjZTxhbnk+LCBkYXRhOiBNZXRhUm93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPltdLCBraW5kOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9qZWR1IHbFoWVjaG55IMWZw6Fka3kgeiBncmlkdVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFbaV07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDFmcOhZGVrIHogZ3JpZHVcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLkluZm8pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJTkZPID0gdsWhZWNobnkgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YcWha3J0bm91dCDFmcOhZGVrXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0uZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IGtpbmQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gamUgZG9rbGFkIHYgcG/FvmFkb3ZhbsOpbSBzdGF2dVxyXG4gICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YcWha3J0bm91dCDFmcOhZGVrXHJcbiAgICAgICAgICAgIC8vZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVuw60gdG8gdiBwb8WZw6Fka3VcclxuICAgICAgICAgICAgLy8gICAgaXRlbS5jaGVja2VkID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZMWha3J0bm91dCDFmcOhZGVrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZGF0YVZpZXcucmVmcmVzaCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ixI1lcnN0dmVuw60gZGF0XHJcbiAgICAgICAgY29udGVudC4kZ3JpZC5nZ3JpZChcInJlZnJlc2hSb3dzXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2LEjWVyc3R2ZW7DrSBkYXQgZG8gZ3JpZHVcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUG9jYXRlbmkgaW5pY2lhbGl6YWNlIDEuIGtyb2t1IFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaW5pY2lhbGl6YWNlPFRSb3cgZXh0ZW5kcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4oY29udGVudDogR0hyb21hZG5lT3BlcmFjZTxUUm93PiwgY29udGVudERpdjogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgYmFnZWQ6IGJvb2xlYW4gPSB0cnVlLCByZWxvYWREYXRhPzogRnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSBjb250ZW50O1xyXG4gICAgICAgIC8vIGRlZmluaWNlIG9rbmFcclxuICAgICAgICBsZXQgaHRtbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oY29udGVudERpdi8qY250LmVsZW1lbnQqLykuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIpXHJcbiAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJWeWJlcnRlIGRva2xhZHkgayBwcm/DusSNdG92w6Fuw61cIilcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIHZ5dHZvxZllbsOtIGdyaWR1XHJcbiAgICAgICAgdGhhdC4kZ3JpZCA9IGNyZWF0ZUdyaWQoY29udGVudCwgY29udGVudERpdi8qY250LmVsZW1lbnQqLywgdHJ1ZSxmYWxzZSAsIHJlbG9hZERhdGEpO1xyXG4gICAgICAgIHRoYXQuUHJ1dm9kY2UuZW5hYmxlU3RlcChjb250ZW50LCBbeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMCB9LCB7IGVuYWJsZWQ6IHRydWUsIGluZGV4OiAxIH0sIHsgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAyIH1dLCB7IGJhY2s6IHsgZW5hYmxlZDogdHJ1ZSB9LCBuZXh0OiB7IGVuYWJsZWQ6IHRydWUgfSB9KTtcclxuXHJcbiAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LnNlbGVjdGVkUm93cywgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcblxyXG4gICAgICAgIC8vLy8gb3puYWNlbmkgdmFsaWRuaWNoIHJhZGt1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvL3ZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgICAgIC8vICAgIG1ldGEuU2VsZWN0ZWQgPSBtZXRhLlNlbGVjdGVkICYmIG1ldGEuZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLlN1Y2Nlc3M7XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGEgPSB2aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgIGlmIChiYWdlZCkge1xyXG4gICAgICAgICAgICB0aGF0LmFjdEFsbCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIC8vaWNvbjpcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLWluZm8gZy1zdGF0ZS10ZXh0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVsWgRUNITlkgRE9LTEFEWVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RBbGxcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDkzXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDI5NzUwMjI4IDogVsWhZWNobnkgZG9rbGFkeSAvL1JDIDMwMjUwNDkzIDogVsWhZWNobnkgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHphc2tydG5pUmFka3koY29udGVudCwgZGF0YSwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uSW5mbyk7IH1cclxuICAgICAgICAgICAgfSk7ICAgLy8gemHFoWtydG51dMOtIHbFoWVjaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICB0aGF0LmFjdFN1Y2Nlc3MgPSBuZXcgR0FjdGlvbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU1VDQ0VTU1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTdWNjZXNzXCIsIGNhcHRpb246IFwianJlczozMDI1MDQ5NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDI5NzUwMjIyIDogVnlob3Z1asOtY8OtIGRva2xhZHkgLy9SQyAzMDI1MDQ5NCA6IFZ5aG92dWrDrWPDrSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAvL2ljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB6YXNrcnRuaVJhZGt5KGNvbnRlbnQsIGRhdGEsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLlN1Y2Nlc3MpOyB9XHJcbiAgICAgICAgICAgIH0pOy8vIHphxaFrcnRudXTDrSBzdWNjZXNzIGRva2xhZMWvXHJcbiAgICAgICAgICAgIHRoYXQuYWN0V2FybmluZyA9IG5ldyBHQWN0aW9uKHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXQVJOSU5HXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFdhcm5pbmdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDk1XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAyMzYgOiBEb2tsYWR5IHMgdXBvem9ybsSbbsOtbSAvL1JDIDMwMjUwNDk1IDogRG9rbGFkeSBzIHVwb3pvcm7Em27DrW1cclxuICAgICAgICAgICAgICAgIC8vaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgemFza3J0bmlSYWRreShjb250ZW50LCBkYXRhLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5XYXJuaW5nKTsgfVxyXG4gICAgICAgICAgICB9KTsvLyB6YcWha3J0bnV0w60gd2FybmluZyBkb2tsYWTFr1xyXG4gICAgICAgICAgICB0aGF0LmFjdEVycm9yID0gbmV3IEdBY3Rpb24oeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRVJST1JcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RXJyb3JcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDk2XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSQyAyOTc1MDIyMyA6IE5ldnlob3Z1asOtY8OtIGRva2xhZHkgLy9SQyAzMDI1MDQ5NiA6IE5ldnlob3Z1asOtY8OtIGRva2xhZHlcclxuICAgICAgICAgICAgICAgIC8vaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB6YXNrcnRuaVJhZGt5KGNvbnRlbnQsIGRhdGEsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLkVycm9yKTsgfVxyXG4gICAgICAgICAgICB9KTsgIC8vIHphxaFrcnRudXTDrSBlcnJvciBkb2tsYWTFryAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmFkZ2VBbGwgPSBuZXcgR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz4oeyB2YWx1ZTogXCIwXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluZm9cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5iYWRnZVN1Y2Nlc3MgPSBuZXcgR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz4oeyB2YWx1ZTogXCIwXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXN1Y2Nlc3NcIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5iYWRnZVdhcm5pbmcgPSBuZXcgR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz4oeyB2YWx1ZTogXCIwXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXdhcm5pbmdcIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5iYWRnZUVycm9yID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+KHsgdmFsdWU6IFwiMFwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1lcnJvclwiIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gWm9icmF6ZW7DrSB2w71zbGVka8WvXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5teVN0YXR1c0JhciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGF0Lm15U3RhdHVzQmFyID09IG51bGwpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkaXYgcyB2w71zbGVka2VtIGplxaF0xJsgbmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5teVN0YXR1c0JhciA9ICQubmV3RGl2KFwic3RhdHVzYmFyXCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuw60gdsO9c2xlZGtvdsOpIGxpxaF0eVxyXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRCZWZvcmUoaHRtbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZsb8W+ZW7DrSBwxZllZCBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgLmdidXR0b25wYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt7IGFjdGlvbjogdGhhdC5hY3RBbGwsIGJhZGdlOiB0aGF0LmJhZGdlQWxsIH0sICAgICAgICAgICAgIC8vIHbFoWVjaG55IGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdFN1Y2Nlc3MsIGJhZGdlOiB0aGF0LmJhZGdlU3VjY2VzcyB9LCAgICAgLy8gT0sgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0V2FybmluZywgYmFkZ2U6IHRoYXQuYmFkZ2VXYXJuaW5nIH0sICAgICAvLyB3YXJuaW5ncyBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3RFcnJvciwgYmFkZ2U6IHRoYXQuYmFkZ2VFcnJvciB9XSAgICAgICAgIC8vIEtPIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGl2IHMgdsO9c2xlZGtlbSBqacW+IGV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm15U3RhdHVzQmFyLnNob3coKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXrDrW0gaG8gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWt0dWFsaXphY2VQb2N0dURva2xhZHUoY29udGVudCwgdmlldy5nZXREYXRhUm93cyh0cnVlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250ZW50LiRncmlkLmdncmlkKFwicmVmcmVzaFJvd3NcIik7ICAgICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwicmVmcmVzaFJvd3NcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogIFxyXG4gICAgKiAgVnl0dm9yZW5pIGdyaWR1XHJcbiAgICAqICBcclxuICAgICogY3JlYXRlR3JpZFxyXG4gICAgKiBcclxuICAgICogQHBhcmFtIHtKUXVlcnl9IGNvbnRlbnRcclxuICAgICogQHBhcmFtIHtib29sZWFufSBtdWx0aSAoZGVmYXVsdCA9IGZhbHNlKVxyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlc3VsdCAoZGVmYXVsdCA9IGZhbHNlKSAtIHZ5c2xlZG55IGdyaWRcclxuICAgICogQHJldHVybnMge0pRdWVyeX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZChjb250ZW50OiBHSHJvbWFkbmVPcGVyYWNlPEludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4sIGNvbnRlbnREaXY6IEpRdWVyeSwgbXVsdGk6IGJvb2xlYW4gPSBmYWxzZSwgcmVzdWx0OiBib29sZWFuID0gZmFsc2UsIHJlbG9hZERhdGE/OiBGdW5jdGlvbik6IEpRdWVyeSB7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gdnlobGVkYXZhY2kgc2xvdXBjZVxyXG4gICAgICAgICAgICBsZXQgc2VhcmNoQ29sdW1ucyA9IFtcInBvcGlzXCIsIFwiYWNcIiwgXCJhY19hZ1wiLCBcIml4cFwiLCBcImRyZFwiLCBcImt0Z1R5cE5hemV2XCIsIFwic3Rhdl90eHRcIiwgXCJpeHNfZnVuX25hemV2XCJdO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgZ3JpZHVcclxuICAgICAgICBsZXQgcm93bkdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkLm5ld0RpdihcImpzLVdpemFkckdyaWRcIikuYXBwZW5kVG8oY29udGVudERpdik7XHJcbiAgICAgICAgICAgIGlmIChtdWx0aSkge1xyXG4gICAgICAgICAgICAgICAgcm93bkdyaWQgPSByb3duR3JpZC8vICQoXCI8ZGl2IGNsYXNzPSdqcy1XaXphZHJHcmlkJz5cIilcclxuICAgICAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArICRmaWx0ZXJGb3JtLmhlaWdodCgpICsgXCJweClcIilcclxuICAgICAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYXBwZW5kVG8oY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aU1lbnU6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNlbGVjdE9rXCIsIGNhcHRpb246IFwianJlczozMDI1MDQ3NlwiLCAvL1JDIDMwMjUwNDc2IDogVnlicmF0IHZ5aG92dWrDrWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgemFza3J0bmlSYWRreShjb250ZW50LCBjb250ZW50LiRncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uU3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNlbGVjdFdhcm5pbmdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc3XCIsIC8vUkMgMzAyNTA0NzcgOiBWeWJyYXQgcyB2YXJvdsOhbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6YXNrcnRuaVJhZGt5KGNvbnRlbnQsIGNvbnRlbnQuJGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uV2FybmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBhY3Rpb246IHRoYXQuYWN0RXJyb3IgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTZWxlY3RFcnJvclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzhcIiwgLy9SQyAzMDI1MDQ3OCA6IFZ5YnJhdCBuZXZ5aG92dWrDrWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6YXNrcnRuaVJhZGt5KGNvbnRlbnQsIGNvbnRlbnQuJGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGk6IG11bHRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxjZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa8gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmNlbGxJbmZvICYmIHR5cGVvZiByZWxvYWREYXRhICE9PSBcInVuZGVmaW5lZFwiKSAocmVsb2FkRGF0YSBhcyBGdW5jdGlvbikoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem1lbmEgdnliZXJ1IHJhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWRBY3Rpb24oY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHJvd3NDaGVja2VkOiBcIlNlbGVjdGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHJvd3NFbmFibGVkOiBmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gbWV0YSAmJiBtZXRhLmRhdGEgJiYgbWV0YS5kYXRhLkVycm9yID09PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxlZ2F0IHBybyB6bWVudSBzdHlsdSByYWRrdSBwcmkgdnlrcmVzbG92YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLCByb3dzQ2xhc3M6IHJvd3NDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Nsb3VwY2UsIHBvZGxlIGt0ZXJ5Y2ggc2UgdnlobGVkYXZhIHYgc2VhcmNoYm94dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLywgc2VhcmNoQ29sdW1uczogc2VhcmNoQ29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0RlZmluaWNlIHNsb3VwY3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBjb2x1bW5zOiBjcmVhdGVDb2x1bW5zKHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3duR3JpZCA9IHJvd25HcmlkLy8gJChcIjxkaXYgY2xhc3M9J2pzLVdpemFkckdyaWQnPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIFwiICsgJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAvLy5hcHBlbmRUbyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpOiBtdWx0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxlZ2F0IHBybyB6bWVudSBzdHlsdSByYWRrdSBwcmkgdnlrcmVzbG92YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLCByb3dzQ2xhc3M6IHJvd3NDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Nsb3VwY2UsIHBvZGxlIGt0ZXJ5Y2ggc2UgdnlobGVkYXZhIHYgc2VhcmNoYm94dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLywgc2VhcmNoQ29sdW1uczogc2VhcmNoQ29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gRGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGNvbHVtbnM6IGNyZWF0ZUNvbHVtbnMocmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJvd25HcmlkLmdhdXRvZml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy4kZ3JpZC5yZXNpemUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIGVuYWJsZWRBY3Rpb25cclxuICAgICogXHJcbiAgICAqICBQb3ZvbGVuaSBha2NlXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZWRBY3Rpb248VFJvdyBleHRlbmRzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPihjb250ZW50OiBHSHJvbWFkbmVPcGVyYWNlPFRSb3c+KSB7XHJcbiAgICAgICAgLy9sZXQgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTdGVwID0gY29udGVudC5QcnV2b2RjZS5nZXRTdGVwKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuUHJ1dm9kY2UuZW5hYmxlU3RlcChjb250ZW50LCBbeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMCB9LCB7IGVuYWJsZWQ6IHRydWUsIGluZGV4OiAxIH0sIHsgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAyIH1dLCB7IGJhY2s6IHsgZW5hYmxlZDogdHJ1ZSB9LCBuZXh0OiB7IGVuYWJsZWQ6IGlzVmFsaWREYXRhKGNvbnRlbnQpIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICAgICogXHJcbiAgICAgICAgKiAgS29udHJvbGEgZGF0IHByZWQgdmxhc3RuaSBvcGVyYWNpXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWREYXRhKGNvbnRlbnQ6IEdIcm9tYWRuZU9wZXJhY2U8SW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQuJGdyaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgY29udGVudC4kZ3JpZCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBvem5hY2VuZVJhZGt5ID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPihjb250ZW50LiRncmlkLCB0cnVlKTtcclxuICAgICAgICBpZiAodHlwZW9mIG96bmFjZW5lUmFka3kgPT09IFwidW5kZWZpbmVkXCJ8fCBvem5hY2VuZVJhZGt5ID09PSBudWxsIHx8IG96bmFjZW5lUmFka3kubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgb3puYWNlbmVSYWRreS5mb3JFYWNoKChyYWRlaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJhZGVrLlJlc3VsdE9wZXJhdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogIERlZmluaWNlIHNsb3VwY3VcclxuICAgICogY3JlYXRlQ29sdW1uc1xyXG4gICAgKiBcclxuICAgICogQHJldHVybnMge0dvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNlbGVjdGVkUm93c0R0bz59XHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbHVtbnMocmVzdWx0OiBib29sZWFuID0gZmFsc2UsIHdpdGhSZXN1bHRBdHJpYnV0czogYm9vbGVhbiA9IHRydWUpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPiB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4oKVxyXG5cclxuICAgICAgICAgICAgaWYgKHdpdGhSZXN1bHRBdHJpYnV0cykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMuYWRkSWNvbkNvbHVtbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gdsO9c2xlZGtvdsOpaG8gc2xvdXBjZSBkbyBncmlkdSB3aXphcmR1XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlJlc3VsdE9wZXJhdGlvblwiLCBjYXB0aW9uOiBcIlwiLCB3aWR0aDogNDAsICAgICAgICAgICAgICAgICAgICAgIC8vIHZsYXN0bm9zdGkgcMWZaWRhbsOpaG8gc2xvdXBjZVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3VwZWMgZG8gZ3JpZHUgdGltdSBJQ09OXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5TdWNjZXNzKSAgICAgICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA1MDNcIiB9OyAvL1JDIDMwMjUwNTAzIDogT0tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0ODJcIiB9OyAvL1JDIDMwMjUwNDgyIDogVnlob3Z1asOtY8OtIGRva2xhZCBwcm8gaHJvbWFkbm91IG9wZXJhY2lcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLldhcm5pbmcpICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkIHMgdXBvem9ybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdG9vbHRpcDogXCJqcmVzOjMwMjUwNDgzXCIgfTsgLy9SQyAzMDI1MDQ4MyA6IERva2xhZCBzIHVwb3pvcm7Em27DrW1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLlJlc3VsdE9wZXJhdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uRXJyb3IpICAgICAgIC8vIG5ldnlob3Z1asOtY8OtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0ODRcIiB9OyAvL1JDIDMwMjUwNDg0IDogTmV2eWhvdnVqw61jw60gZG9rbGFkIHBybyBocm9tYWRub3Ugb3BlcmFjaVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gxb7DoWRuw70gdsO9c2xlZGVrIG5lZXhpc3R1amVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJcIiwgdGV4dDogXCJcIiwgdG9vbHRpcDogXCJcIiB9IGFzIGFueTsgICAgICAgICAgICAgICAgICAgICAvLyBuZXV0csOhbG7DrSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gdsO9c2xlZGtvdsOpaG8gc2xvdXBjZSBkbyBncmlkdSB3aXphcmR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRXJyTXNnXCIsIGNhcHRpb246IFwianJlczozMDI1MDU2MFwiLCB3aWR0aDogMTcwLCAgICAgICAgICAgICAgICAgICAgICAvLyB2bGFzdG5vc3RpIHDFmWlkYW7DqWhvIHNsb3VwY2UgLy9SQyAzMDI1MDU2MCA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhLCBtZXRhcm93LCBpbmZvKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbG91cGVjIGRvIGdyaWR1IHRpbXUgSUNPTlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5TdWNjZXNzKSAgICAgICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDU2MVwiOyAvL1JDIDMwMjUwNTYxIDogQWtjZSBwcm92ZWRlbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0ODJcIjsgLy9SQyAzMDI1MDQ4MiA6IFZ5aG92dWrDrWPDrSBkb2tsYWQgcHJvIGhyb21hZG5vdSBvcGVyYWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLlJlc3VsdE9wZXJhdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uV2FybmluZykgICAgIC8vIHZ5aG92dWrDrWPDrSBkb2tsYWQgcyB1cG96b3JuxJtuw61tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuUmVzdWx0TXNnIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuUmVzdWx0TXNnIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gxb7DoWRuw70gdsO9c2xlZGVrIG5lZXhpc3R1amVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBpZChjb2x1bW5zLCB7IG5hbWU6IFwiaXhwXCIgfSk7XHJcblxyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkQWdlbmRvdmVDaXNsbyhjb2x1bW5zLCB7IG5hbWU6IFwiYWNfYWdcIiB9KTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEV2aWRlbmNuaUNpc2xvKGNvbHVtbnMsIHsgbmFtZTogXCJhY1wiIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkRHJ1aERva2xhZHUoY29sdW1ucywgeyBuYW1lOiBcImRyZFwiIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGNvbHVtbnMsIHsgbmFtZTogXCJyb2tcIiB9KTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZE1lc2ljKGNvbHVtbnMsIHsgbmFtZTogXCJtZXNpY1wiIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkRGVuKGNvbHVtbnMsIHsgbmFtZTogXCJkZW5cIiB9KTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENpc2xvRG9rbGFkdShjb2x1bW5zLCB7IG5hbWU6IFwiYWNfaXhlXCIgfSk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRUeXBEb2tsYWR1KGNvbHVtbnMsIHsgbmFtZTogXCJrdGdUeXBOYXpldlwiIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkU3RhdkRva2xhZHUoY29sdW1ucywgeyBuYW1lOiBcInN0YXZfdHh0XCIgfSk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRDYXN0a2EoY29sdW1ucywgeyBuYW1lOiBcImNcIiB9KTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE5XCIgLy9SQyAzMDI1MDAxOSA6IE1EXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEzMVwiIC8vUkMgMzAyNTAxMzEgOiBEYWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRacHJhY292YXRlbChjb2x1bW5zLCB7IG5hbWU6IFwiaXhzX2Z1bl9uYXpldlwiIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUG9waXMoY29sdW1ucywgeyBuYW1lOiBcInBvcGlzXCIgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogY3JlYXRlQ29sdW1uc1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPn1cclxuICAgICAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb2x1bW5zTWV0YURhdGEoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCA8IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvID4ge1xyXG4gICAgICAgIGxldCBncmRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4oKTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBpZChncmRGb3JtYXQpO1xyXG4gICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDI2XCIsIC8vUkMgMzAyNTAwMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAvLyAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAvL2N1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCJcclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgIGdyZEZvcm1hdFxyXG4gICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gdsO9c2xlZGtvdsOpaG8gc2xvdXBjZSBkbyBncmlkdSB3aXphcmR1XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkVyck1zZ1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MzdcIiwgd2lkdGg6IDE3MCwgICAgICAgICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aSBwxZlpZGFuw6lobyBzbG91cGNlIC8vUkMgMzAyNTA0MzcgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbG91cGVjIGRvIGdyaWR1IHRpbXUgSUNPTlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlJlc3VsdE9wZXJhdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uU3VjY2VzcykgICAgICAgICAgLy8gdnlob3Z1asOtY8OtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiT0tcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5XYXJuaW5nKSAgICAgLy8gdnlob3Z1asOtY8OtIGRva2xhZCBzIHVwb3pybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcImpyZXM6MzAyNTA0NDRcIi8vUkMgMzAyNTA0NDQgOiBCeWx5IHpqacWhdMSbbnkgbmVzcm92bmFsb3N0aSBwxZlpIGtvbnRyb2xlIG1ldGFkYXQgZGxlIE5TRVNTLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0NDdtXCIgLy9SQyAzMDI1MDQ0NyA6IERva2xhZCBzIHVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcImpyZXM6MzAyNTA0NDRcIiwgLy9SQyAzMDI1MDQ0NCA6IEJ5bHkgemppxaF0xJtueSBuZXNyb3ZuYWxvc3RpIHDFmWkga29udHJvbGUgbWV0YWRhdCBkbGUgTlNFU1MuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA0NDhcIiAvL1JDIDMwMjUwNDQ4IDogTmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDFvsOhZG7DvSB2w71zbGVkZWsgbmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBcIlwiLCB0b29sdGlwOiBcIlwiIH07ICAgICAgICAgICAgICAgICAgICAgLy8gbmV1dHLDoWxuw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEFnZW5kb3ZlQ2lzbG8oZ3JkRm9ybWF0KTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEV2aWRlbmNuaUNpc2xvKGdyZEZvcm1hdCk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREcnVoRG9rbGFkdShncmRGb3JtYXQpO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGdyZEZvcm1hdCk7XHJcblxyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkTWVzaWMoZ3JkRm9ybWF0KTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZERlbihncmRGb3JtYXQpO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkQ2lzbG9Eb2tsYWR1KGdyZEZvcm1hdCk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRUeXBEb2tsYWR1KGdyZEZvcm1hdCwgeyBuYW1lOiBcImt0Z1R5cE5hemV2XCIgfSk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRTdGF2RG9rbGFkdShncmRGb3JtYXQsIHsgbmFtZTogXCJzdGF2X3R4dFwiIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkQ2FzdGthKGdyZEZvcm1hdCwge1xyXG4gICAgICAgICAgICBuYW1lOiBcImNcIixcclxuICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5jLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkTUQoZ3JkRm9ybWF0LCB7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYzAgfSk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREYWwoZ3JkRm9ybWF0LCB7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYzEgfSk7XHJcbiAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRacHJhY292YXRlbChncmRGb3JtYXQsIHsgbmFtZTogXCJpeHNfZnVuX25hemV2XCIsIGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuaXhzX2Z1bl9uYXpldiB9KTtcclxuICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBvcGlzKGdyZEZvcm1hdCk7XHJcblxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgcmV0dXJuIGdyZEZvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgKiBcclxuICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55Pn0gcHJvbWlzZSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNsb3NpbmcoY29udGVudDogR0NvbnRlbnQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAvLyB1a29uxI1lbsOtIGplIG1vxb5uw6kgdiBrdGVyw6lrb2xpdiBmw6F6aVxyXG4gICAgICAgIC8vIFRPRE86IHBva3VkIGJ5IG5lYnlsYSBvYnNsdWhhIHBvdMWZZWJhLCB0YWsgY2Vsb3UgbWV0b2R1IHNtYXphdFxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIC8vIGRlZmVycmVkIG9iamVjdCBwcm8gY2xvc2VcclxuICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICBjbnQuZGlhbG9ncy5jb25maXJtKFwiT3ByYXZkdSBjaGNldGUgenJ1xaFpdCBwcsWvdm9kY2U/XCIpLm9uKFwiY2xvc2VcIiwgKGV2LCBvYmo6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAob2JqID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDbG9zZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgICAgaWYgKHRoYXRbXCJzdWNjZXNzQ2xvc2VcIl0gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiZG90YXpcIiwgXCJqcmVzOjMwMjUwMzM5XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMzAyNTAzMzkgOiBPcHJhdmR1IGNoY2V0ZSB1a2/EjWl0IHByxa92b2RjZT9cclxuXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkgeyBkZWZDbG9zZS5yZXNvbHZlKHRoYXQpIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZGVmQ2xvc2UucmVqZWN0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbcWvxb5lIHNlIHphdsWZw610IHbFvmR5XHJcbiAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlc29sdmUodGhhdCkucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
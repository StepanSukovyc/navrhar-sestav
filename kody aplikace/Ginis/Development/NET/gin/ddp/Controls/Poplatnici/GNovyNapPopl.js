"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNovyNapPopl.ts                        </Name>
//    <Description> Okno pro výběr poplatníků pro napojení                      </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-22                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno pro výběr poplatníků pro napojení
             * @author Martin Hanuš
             */
            let GNovyNapPopl = class GNovyNapPopl extends Gordic.GContentBase {
                /** Základní metoda pro content */
                onContentReady() {
                    const that = this;
                    that.beginOperation("Načítám okno...");
                    that.createCommandBar();
                    that.createFilterForm();
                    that.createMainGrid();
                    that.endOperation();
                }
                /** Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok()
                                    .always(() => {
                                    that.endOperation();
                                })
                                    .done((retIxp) => {
                                    that.close(retIxp);
                                });
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /** Metoda pro definici filtračního formuláře  */
                createFilterForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "formNovyNapPopl", tabOptions: { title: "Filtry", opened: true }, layoutDescriptor: "L1M1S1" })
                        .addSection()
                        //.addRow("Identifikátor")
                        //.addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        //    name: "ixpDdp",
                        //    disabled: true,
                        //    //initialValue: that.Ixp,
                        //    defaultValue: that.Ixp
                        //})
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        placeholder: "Identifikátor"
                    })
                        .addRow("VS")
                        .addField("gstringbox", {
                        name: "vs",
                        placeholder: "Celý VS"
                    })
                        .addRow("Název")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "nazev",
                        placeholder: "Název subjektu",
                        validators: [new Gordic.Validators.Length({ min: 2 })],
                    })
                        .addRow("Příjmení")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "prijmeni",
                        placeholder: "Příjmení",
                        validators: [new Gordic.Validators.Length({ min: 2 })],
                    })
                        .addRow("Jméno")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "jmeno",
                        placeholder: "Jméno",
                        validators: [new Gordic.Validators.Length({ min: 2 })],
                    })
                        .addRow("RČ")
                        .addField("gstringbox", {
                        name: "rc",
                        disabled: !(that.Params.gin_esu_rcvyhl && that.Params.gin_esu_rczobr),
                        placeholder: "Celé rodné číslo bez lomítka",
                        validators: [new Gordic.Validators.RodneCislo({})]
                    })
                        .addRow("IČO")
                        .addField("gstringbox", {
                        name: "ico",
                        placeholder: "Celé IČO",
                        validators: [new Gordic.Validators.Length({ min: 5, max: 10 })],
                    })
                        .addRow("Ulice")
                        .addField("gstringbox", {
                        name: "ulice",
                        placeholder: "Ulice",
                    })
                        .addRow("Č. p.")
                        .addField("gstringbox", {
                        name: "cpop",
                        placeholder: "Č. popisné",
                    })
                        .addRow("Č. Or.")
                        .addField("gstringbox", {
                        name: "cor",
                        placeholder: "Č. orientační",
                    })
                        .addRow("Část obce")
                        .addField("gstringbox", {
                        name: "cast_obce",
                        placeholder: "Část obce",
                    })
                        .addRow("Obec")
                        .addField("gstringbox", {
                        name: "obec",
                        placeholder: "Obec",
                    })
                        .addRow().addField("gcheck", {
                        name: "zDotcenych",
                        label: "Hledat v dotč. subj. případu",
                        tooltip: "Hledat v dotčených subjubjektech případu",
                        emptyValue: false,
                    })
                        .addRow().addField("gcheck", {
                        name: "cbUdajeZHlavicky",
                        label: "Použít údaje z plátce/poplatníka",
                        tooltip: "Použít údaje z plátce",
                        change: (ev, ret) => {
                            /*$(ev)*/ that.findFields("ulice").gfield("setValue", (ret.value == true) ? that.dtoPripad.ExterniSubjekt?.ulice : null);
                            /*$(ev)*/ that.findFields("cast_obce").gfield("setValue", (ret.value == true) ? that.dtoPripad.ExterniSubjekt?.cast_obce : null);
                            /*$(ev)*/ that.findFields("obec").gfield("setValue", (ret.value == true) ? that.dtoPripad.ExterniSubjekt?.obec : null);
                            /*$(ev)*/ that.findFields("cpop").gfield("setValue", (ret.value == true) ? that.dtoPripad.ExterniSubjekt?.cpop : null);
                            /*$(ev)*/ that.findFields("cor").gfield("setValue", (ret.value == true) ? that.dtoPripad.ExterniSubjekt?.cor : null);
                        }
                    });
                    that.filter = $.newDiv().appendTo(that.element).
                        gfilterpanel({
                        forms: [mainForm],
                        favorites: "all",
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            obj.filter.ixpDdp = that.Ixp;
                            obj.filter.inTypPhlPlatce = that.b_inTypPhlPlatce ?? true;
                            obj.filter.poplatnici = that.b_napojit ?? false;
                            obj.filter.bezNapojenych = that.b_vyberPoplatnika ?? true;
                            that.loadData(obj.filter);
                        }
                    });
                    //that.view = new Gordic.Isl.View<Ddp.Interface.LK.Isl.GDdpSpidDto>(
                    //    that.isl.PripadPoplatnici.listSeznamPoplatnikuProNapojeni(rq => rq),
                    //    {
                    //        filterPanel: that.filter,
                    //        startEmpty: true
                    //    });
                }
                loadData(data) {
                    const that = this;
                    if (!that.view) {
                        that.view = new Gordic.Isl.View(that.isl.PripadPoplatnici.listSeznamPoplatnikuProNapojeni(rq => {
                            return {
                                filters: data
                                //{
                                //    ixpDdp: that.Ixp,
                                //}
                            };
                        }));
                        that.grid.ggrid("setData", that.view);
                        that.view.getLoadingPromise().done(function () {
                            let polozky = that.view.getDataRows(); //.filter(x => x.radek_uhr! < 0);
                        });
                    }
                    else {
                        that.view.requestData().done(function (ret) {
                            let polozky = that.view.getDataRows(); //.filter(x => x.radek_uhr! < 40);
                        });
                    }
                }
                /** Metoda pro definici gridu okna */
                createMainGrid() {
                    const that = this;
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({ name: "ixp", caption: "Identifikátor", width: 12 })
                        .addTextColumn({ name: "vs", caption: "VS", width: 10 })
                        .addTextColumn({ name: "jmeno", caption: "Jméno", width: 10 })
                        .addTextColumn({ name: "prijmeni", caption: "Příjmení", width: 10 })
                        .addTextColumn({ name: "ico", caption: "IČO", width: 8 })
                        .addTextColumn({ name: "nazev", caption: "Název", width: 20 })
                        .addTextColumn({ name: "popis", caption: "Popis", width: 20 });
                    if (that.Params.gin_esu_rczobr) {
                        gridFormat.addTextColumn({ name: "rc", caption: "RČ", width: 10 });
                    }
                    that.grid = $.newDiv()
                        .appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        data: that.view, // that.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        multi: true,
                        //TODO: vytvořit grid format v Common.GridFormats.###
                        columns: gridFormat,
                    });
                    //.ggrid<Gordic.Fuc.Interface.GUeTeNksUusDto>({
                    //    // TODO: grid dodělat
                    //    columnMode: "full",     // fit (defaultne by melo byt toto), full
                    //    // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                    //    // defaultAction: 
                    //    //searchColumns: ["vs", "c", "typ_ag", "ac"],
                    //    columns: Common.GridFormats.Predkontace(that) //new Gordic.Data.GridFormat<Gordic.Fuc.Interface.GUeTeDto>().addSortedEkoCfuSet(that)
                    //})
                }
                //** Akce po kliknutí na tlačítko uložit - napojí poplatníky k případu */
                ok() {
                    const that = this;
                    var def = $.Deferred();
                    //var rows: Ddp.Interface.LK.Isl.GDdpSpidDto[] = []; // = new Ddp.Interface.LK.Isl.GDdpSpidDto[];
                    var rows = that.grid.ggrid("getSelection");
                    //var row = that.grid.ggrid<Ddp.Interface.LK.Isl.GDdpSpidDto>("getSelection")[0];
                    if (rows != null) {
                        if (that.b_napojit) {
                            // získání datumu napojení z uživatelského nastavení
                            var datumNapojeni;
                            that.isl.DdpUserSettings.priznakyDatumu({ save: false }).get().done(function (priznakNacteniDatumu) {
                                if (priznakNacteniDatumu) { //pokud je příznak true, tak můžeme načíst data z usersettings
                                    datumNapojeni = that.globalSettings.get("Global.Ddp.ObecneSettings.DatumNapojeni");
                                }
                                else
                                    datumNapojeni = null;
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDatum", { ID: "DDPGDatum#", DateBoxMode: 1, Datum: datumNapojeni }, "Výběr data napojení", 380, 150)
                                    .on("close", (_obj, retVal) => {
                                    if (retVal) {
                                        that.beginOperation("Probíhá napojení případu...");
                                        var l_datum = retVal.datum;
                                        var smt = [];
                                        rows.forEach((row, index) => {
                                            row.l_napojit = true;
                                            smt.push(that.kontrolaNapoctuPredNapojenin(row, l_datum)
                                                .done(function (ret) {
                                                row.l_napojit = ret;
                                            }));
                                        });
                                        Promise.all(smt).then(() => {
                                            that.napojeniPripadu(rows, l_datum)
                                                .done(() => { def.resolve(); })
                                                .fail(() => { def.reject(); }); //TODO: ošetřit možné chyby z metody pro napojení
                                        });
                                    }
                                    else
                                        def.reject(); // chyba když není datum
                                });
                            });
                        }
                        else {
                            let row = that.grid.ggrid("getSelection")[0];
                            return def.resolve(row.ixp).promise();
                        }
                    }
                    else {
                        return def.reject().promise(); // chyba nevybraných řádků 
                    }
                    return def.promise();
                }
                kontrolaNapoctuPredNapojenin(row, l_datum) {
                    const that = this;
                    var def = $.Deferred();
                    that.isl.PripadPoplatnici.kontrolaNapoctuPriNapojeni(rq => {
                        return {
                            rq: row,
                            l_datum: l_datum,
                        };
                    }).get()
                        .done(function (ret) {
                        if (!ret.lzeNapojit) {
                            that.dialogs.confirm("Chyba", ret.text)
                                .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    def.resolve(true);
                                }
                                else
                                    def.resolve(false);
                            });
                        }
                        else
                            def.resolve(true);
                    });
                    return def.promise();
                }
                napojeniPripadu(rows, l_datum) {
                    const that = this;
                    var def = $.Deferred();
                    that.isl.PripadPoplatnici.napojPripady(rq => {
                        return {
                            rq: rows,
                            l_datum: l_datum,
                            m_IxpDdp: that.Ixp,
                            m_bVyberPoplatnika: that.b_vyberPoplatnika,
                            l_rezVyp: that.dtoTypPhl.rez_vyp
                        };
                    }).get()
                        .done(function (ret) {
                        //?-------------------------------POVEDLO SE
                        def.resolve();
                    })
                        .fail(function (jqXHR, typ, obj) {
                        //?-------------------------------NĚCO SE NEPOVEDLO
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage);
                        }
                        def.reject();
                    });
                    return def.promise();
                }
            };
            GNovyNapPopl = __decorate([
                Decorators.gcontent
            ], GNovyNapPopl);
            WebClient.GNovyNapPopl = GNovyNapPopl;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05vdnlOYXBQb3BsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05vdnlOYXBQb3BsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBNFhmO0FBNVhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRYbkI7SUE1WGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRYN0I7UUE1WG9CLFdBQUEsU0FBUztZQUMxQjs7O2VBR0c7WUFFSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO2dCQTJDMUMsa0NBQWtDO2dCQUNsQyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUV2QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFFdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixDQUFDO2dCQUVELDhFQUE4RTtnQkFDOUUsZ0JBQWdCO29CQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUVSLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxFQUFFLEVBQUU7cUNBQ0osTUFBTSxDQUFDLEdBQUcsRUFBRTtvQ0FDVCxJQUFJLENBQUMsWUFBWSxFQUFF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SGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOb3Z5TmFwUG9wbC50cyAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyB2w71ixJtyIHBvcGxhdG7DrWvFryBwcm8gbmFwb2plbsOtICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMTEtMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKiogXHJcbiAgICAgKiBPa25vIHBybyB2w71ixJtyIHBvcGxhdG7DrWvFryBwcm8gbmFwb2plbsOtXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBIYW51xaFcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTm92eU5hcFBvcGwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvLy0tLU5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgIC8qKiBOYWRwaXMgb2tuYSAqL1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBaw6FrbGFkbsOtIGdyaWQgb2tuYSAocHJvIHDFmWVka29udGFjZSkgKi9cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIGJfaW5UeXBQaGxQbGF0Y2U6IGJvb2xlYW47XHJcbiAgICAgICAgYl9uYXBvaml0OiBib29sZWFuO1xyXG4gICAgICAgIGJfdnliZXJQb3BsYXRuaWthOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJU0wgVmlld1xyXG4gICAgICAgICAqIEB0eXBlIHtJc2wuVmlldzxEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBJc2wuVmlldzxEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz47XHJcbiAgICAgICAgLy9wcml2YXRlIHZpZXc6IGFueTtcclxuXHJcbiAgICAgICAgLy8tLS1QSyBkYXRhXHJcbiAgICAgICAgLyoqIFBpZCBQxZnDrXBhZHUgRERQICovXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFBLIFR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBUeXBfUGhsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBQYXJhbWV0cnkgYXBsaWthY2UgKi9cclxuICAgICAgICBwcml2YXRlIFBhcmFtczogR29yZGljLkRkcC5JbnRlcmZhY2UuR0RkcFBhcmFtZXRyeUR0bztcclxuICAgICAgICAvLy0tLURUTyBvYmpla3R5XHJcbiAgICAgICAgLyoqIERUTyBQxZnDrXBhZHUgKi9cclxuICAgICAgICBkdG9QcmlwYWQ6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvO1xyXG4gICAgICAgIC8qKiBEVE8gVHlwdSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIGR0b1R5cFBobDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvO1xyXG5cclxuICAgICAgICAvLy0tLU5hc3RhdmVuw60gcGhsICAgXHJcbiAgICAgICAgLyoqIFJvayAqL1xyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBVY3MgKi9cclxuICAgICAgICB1Y3M6IHN0cmluZztcclxuICAgICAgICAvKiogScSNbyAqL1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogWsOha2xhZG7DrSBtZXRvZGEgcHJvIGNvbnRlbnQgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbSBva25vLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1haW5HcmlkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gY29tbWFuZCBiYXJ1IHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmEgKi9cclxuICAgICAgICBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldEl4cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UocmV0SXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBNZXRvZGEgcHJvIGRlZmluaWNpIGZpbHRyYcSNbsOtaG8gZm9ybXVsw6HFmWUgICovXHJcbiAgICAgICAgY3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybU5vdnlOYXBQb3BsXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiRmlsdHJ5XCIsIG9wZW5lZDogdHJ1ZSB9LCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIml4cERkcFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2luaXRpYWxWYWx1ZTogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZWZhdWx0VmFsdWU6IHRoYXQuSXhwXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiSWRlbnRpZmlrw6F0b3JcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWU1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNlbMO9IFZTXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCI9XCJdLCB1c2VyT3BlcmF0b3JzOiBbXSB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJOw6F6ZXYgc3ViamVrdHVcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMiB9KV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmcOtam1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsICBQcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKHsgZGVmYXVsdE9wZXJhdG9yOiBcIkxJS0VcIiwgb3BlcmF0b3JzOiBbXCJMSUtFXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWptZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUMWZw61qbWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMiB9KV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkptw6lub1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKHsgZGVmYXVsdE9wZXJhdG9yOiBcIkxJS0VcIiwgb3BlcmF0b3JzOiBbXCJMSUtFXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImptZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiSm3DqW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDIgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSxIxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEodGhhdC5QYXJhbXMuZ2luX2VzdV9yY3Z5aGwgJiYgdGhhdC5QYXJhbXMuZ2luX2VzdV9yY3pvYnIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNlbMOpIHJvZG7DqSDEjcOtc2xvIGJleiBsb23DrXRrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUm9kbmVDaXNsbyh7fSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIknEjE9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNlbMOpIEnEjE9cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogNSwgbWF4OiAxMCB9KV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlVsaWNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVsaWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVWxpY2VcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIwuIHAuXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNwb3BcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLEjC4gcG9waXNuw6lcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIwuIE9yLlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb3JcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLEjC4gb3JpZW50YcSNbsOtXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdCBvYmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXN0X29iY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLEjMOhc3Qgb2JjZVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPYmVjXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvYmVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiT2JlY1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6RG90Y2VueWNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGxlZGF0IHYgZG90xI0uIHN1YmouIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGxlZGF0IHYgZG90xI1lbsO9Y2ggc3VianViamVrdGVjaCBwxZnDrXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2JVZGFqZVpIbGF2aWNreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvdcW+w610IMO6ZGFqZSB6IHBsw6F0Y2UvcG9wbGF0bsOta2FcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlBvdcW+w610IMO6ZGFqZSB6IHBsw6F0Y2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldixyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyokKGV2KSovdGhhdC5maW5kRmllbGRzKFwidWxpY2VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgKHJldC52YWx1ZSA9PSB0cnVlKSA/IHRoYXQuZHRvUHJpcGFkLkV4dGVybmlTdWJqZWt0Py51bGljZSA6IG51bGwgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyokKGV2KSovdGhhdC5maW5kRmllbGRzKFwiY2FzdF9vYmNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIChyZXQudmFsdWUgPT0gdHJ1ZSkgPyB0aGF0LmR0b1ByaXBhZC5FeHRlcm5pU3ViamVrdD8uY2FzdF9vYmNlIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qJChldikqL3RoYXQuZmluZEZpZWxkcyhcIm9iZWNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgKHJldC52YWx1ZSA9PSB0cnVlKSA/IHRoYXQuZHRvUHJpcGFkLkV4dGVybmlTdWJqZWt0Py5vYmVjIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qJChldikqL3RoYXQuZmluZEZpZWxkcyhcImNwb3BcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgKHJldC52YWx1ZSA9PSB0cnVlKSA/IHRoYXQuZHRvUHJpcGFkLkV4dGVybmlTdWJqZWt0Py5jcG9wIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qJChldikqL3RoYXQuZmluZEZpZWxkcyhcImNvclwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCAocmV0LnZhbHVlID09IHRydWUpID8gdGhhdC5kdG9QcmlwYWQuRXh0ZXJuaVN1Ympla3Q/LmNvciA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbHRlciA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFttYWluRm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5maWx0ZXIuaXhwRGRwID0gdGhhdC5JeHA7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZmlsdGVyLmluVHlwUGhsUGxhdGNlID0gdGhhdC5iX2luVHlwUGhsUGxhdGNlID8/IHRydWU7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZmlsdGVyLnBvcGxhdG5pY2kgPSB0aGF0LmJfbmFwb2ppdCA/PyBmYWxzZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5maWx0ZXIuYmV6TmFwb2plbnljaCA9IHRoYXQuYl92eWJlclBvcGxhdG5pa2EgPz8gdHJ1ZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEob2JqLmZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldzxEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz4oXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuaXNsLlByaXBhZFBvcGxhdG5pY2kubGlzdFNlem5hbVBvcGxhdG5pa3VQcm9OYXBvamVuaShycSA9PiBycSksXHJcbiAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlclBhbmVsOiB0aGF0LmZpbHRlcixcclxuICAgICAgICAgICAgLy8gICAgICAgIHN0YXJ0RW1wdHk6IHRydWVcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkRGF0YShkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQudmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuTEsuSXNsLkdEZHBTcGlkRHRvPih0aGF0LmlzbC5QcmlwYWRQb3BsYXRuaWNpLmxpc3RTZXpuYW1Qb3BsYXRuaWt1UHJvTmFwb2plbmkocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGRhdGEgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpeHBEZHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3LmdldExvYWRpbmdQcm9taXNlKCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvbG96a3kgPSB0aGF0LnZpZXcuZ2V0RGF0YVJvd3MoKTsgLy8uZmlsdGVyKHggPT4geC5yYWRla191aHIhIDwgMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2xvemt5ID0gdGhhdC52aWV3LmdldERhdGFSb3dzKCk7IC8vLmZpbHRlcih4ID0+IHgucmFkZWtfdWhyISA8IDQwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTWV0b2RhIHBybyBkZWZpbmljaSBncmlkdSBva25hICovXHJcbiAgICAgICAgY3JlYXRlTWFpbkdyaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcIklkZW50aWZpa8OhdG9yXCIgLCB3aWR0aDogMTJ9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInZzXCIsIGNhcHRpb246IFwiVlNcIiAsIHdpZHRoOiAxMH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiam1lbm9cIiwgY2FwdGlvbjogXCJKbcOpbm9cIiAsIHdpZHRoOiAxMH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicHJpam1lbmlcIiwgY2FwdGlvbjogXCJQxZnDrWptZW7DrVwiICwgd2lkdGg6IDEwfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpY29cIiwgY2FwdGlvbjogXCJJxIxPXCIgLCB3aWR0aDogOH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJOw6F6ZXZcIiAsIHdpZHRoOiAyMH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG9waXNcIiwgY2FwdGlvbjogXCJQb3Bpc1wiICwgd2lkdGg6IDIwfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgaWYgKHRoYXQuUGFyYW1zLmdpbl9lc3VfcmN6b2JyKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInJjXCIsIGNhcHRpb246IFwiUsSMXCIsIHdpZHRoOiAxMCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3LCAgICAgICAgLy8gdGhhdC5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbEhlbHBlclRlbXBsYXRlOiBcInthY31cIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiB2eXR2b8WZaXQgZ3JpZCBmb3JtYXQgdiBDb21tb24uR3JpZEZvcm1hdHMuIyMjXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HVWVUZU5rc1V1c0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gVE9ETzogZ3JpZCBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDoSBkZWZhdWx0bsOtIGFrY2U/IGplc3RsaSBhbm8sIHRhayBidcSPIG9wcmF2YSBwb2xvxb5reSBuZWJvIG7Em2pha8O9IG5vdsO9IGRldGFpbCBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gZGVmYXVsdEFjdGlvbjogXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByZWRrb250YWNlKHRoYXQpIC8vbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1VlVGVEdG8+KCkuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoYXQpXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyoqIEFrY2UgcG8ga2xpa251dMOtIG5hIHRsYcSNw610a28gdWxvxb5pdCAtIG5hcG9qw60gcG9wbGF0bsOta3kgayBwxZnDrXBhZHUgKi9cclxuICAgICAgICBvaygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQ8YW55PigpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgcm93czogRGRwLkludGVyZmFjZS5MSy5Jc2wuR0RkcFNwaWREdG9bXSA9IFtdOyAvLyA9IG5ldyBEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0b1tdO1xyXG4gICAgICAgICAgICB2YXIgcm93cyA9IHRoYXQuZ3JpZC5nZ3JpZDxEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIC8vdmFyIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgIGlmIChyb3dzICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5iX25hcG9qaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6w61za8OhbsOtIGRhdHVtdSBuYXBvamVuw60geiB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXR1bU5hcG9qZW5pOiBudWxsIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5EZHBVc2VyU2V0dGluZ3MucHJpem5ha3lEYXR1bXUoeyBzYXZlOiBmYWxzZSB9KS5nZXQoKS5kb25lKGZ1bmN0aW9uIChwcml6bmFrTmFjdGVuaURhdHVtdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpem5ha05hY3RlbmlEYXR1bXUpIHsgLy9wb2t1ZCBqZSBwxZnDrXpuYWsgdHJ1ZSwgdGFrIG3Fr8W+ZW1lIG5hxI3DrXN0IGRhdGEgeiB1c2Vyc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtTmFwb2plbmkgPSB0aGF0Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLkRhdHVtTmFwb2plbmlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBkYXR1bU5hcG9qZW5pID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGF0dW1cIiwgeyBJRDogXCJERFBHRGF0dW0jXCIsIERhdGVCb3hNb2RlOiAxLCBEYXR1bTogZGF0dW1OYXBvamVuaSB9LCBcIlbDvWLEm3IgZGF0YSBuYXBvamVuw61cIiwgMzgwLCAxNTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX29iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIG5hcG9qZW7DrSBwxZnDrXBhZHUuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RhdHVtID0gcmV0VmFsLmRhdHVtO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNtdDogYW55ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmxfbmFwb2ppdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbXQucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhTmFwb2N0dVByZWROYXBvamVuaW4ocm93LCBsX2RhdHVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cubF9uYXBvaml0ID0gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoc210KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFwb2plbmlQcmlwYWR1KHJvd3MsIGxfZGF0dW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4geyBkZWYucmVzb2x2ZSgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmLnJlamVjdCgpOyB9KSAvL1RPRE86IG/FoWV0xZlpdCBtb8W+bsOpIGNoeWJ5IHogbWV0b2R5IHBybyBuYXBvamVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTsgLy8gY2h5YmEga2R5xb4gbmVuw60gZGF0dW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJvdy5peHApLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpOyAvLyBjaHliYSBuZXZ5YnJhbsO9Y2ggxZnDoWRrxa8gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrb250cm9sYU5hcG9jdHVQcmVkTmFwb2plbmluKHJvdzogRGRwLkludGVyZmFjZS5MSy5Jc2wuR0RkcFNwaWREdG8sIGxfZGF0dW0pOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFBvcGxhdG5pY2kua29udHJvbGFOYXBvY3R1UHJpTmFwb2plbmkocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBycTogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgIGxfZGF0dW06IGxfZGF0dW0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQubHplTmFwb2ppdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIkNoeWJhXCIsIHJldC50ZXh0ISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hcG9qZW5pUHJpcGFkdShyb3dzOiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwU3BpZER0b1tdLCBsX2RhdHVtKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZDx2b2lkPigpO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRQb3BsYXRuaWNpLm5hcG9qUHJpcGFkeShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJxOiByb3dzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxfZGF0dW06IGxfZGF0dW0sXHJcbiAgICAgICAgICAgICAgICAgICAgbV9JeHBEZHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1fYlZ5YmVyUG9wbGF0bmlrYTogdGhhdC5iX3Z5YmVyUG9wbGF0bmlrYSxcclxuICAgICAgICAgICAgICAgICAgICBsX3JlelZ5cDogdGhhdC5kdG9UeXBQaGwucmV6X3Z5cCFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUE9WRURMTyBTRVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1OxJpDTyBTRSBORVBPVkVETE9cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59Il19
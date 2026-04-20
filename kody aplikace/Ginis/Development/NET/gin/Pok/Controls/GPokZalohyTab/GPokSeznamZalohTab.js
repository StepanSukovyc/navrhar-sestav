"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokSeznamZalohTab = class GPokSeznamZalohTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    if (this.ixsEsuDokladu)
                        this.beginOperation();
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "pokSeznamZalohFiltrForm" })
                        .addRow("jres:31302405") //RC 31302405 : ESU
                        .addField("gselectbox", {
                        name: "ixs_esu",
                        model: "ixs_esu=ixs_esu",
                        initialValue: { ixs_esu: this.ixsEsuDokladu }
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: 1, Logovani: {
                            Ixp: "0000X0000003",
                            DuvodHledaniTxt: "Filtr pokladních záloh",
                            AktZnacka: 'aktZnacka',
                            DuvodHledani: 40
                        }
                    }))
                        .addRow("jres:31302005") //RC 31302005 : PID
                        .addField("gstringbox", { name: "pid" })
                        .addRow("jres:31302167") //RC 31302167 : Datum podání
                        .addField("gintervalbox", { name: "dat_podani" })
                        .addRow("jres:31302407") //RC 31302407 : Pár. symbol
                        .addField("gstringbox", { name: "par_symbol" })
                        .addRow("jres:31302012") //RC 31302012 : Agendové číslo
                        .addField("gstringbox", { name: "ac" })
                        .addRow("jres:31302013") //RC 31302013 : Popis
                        .addField("gstringbox", { name: "popis" })
                        .addRow()
                        .addField("gcheck", { name: "minuly_rok", label: "jres:31302408" }) //RC 31302408 : Zobrazit nevyúčtované zálohy z minulého roku     
                        .addRow()
                        .addField("gcheck", { name: "ostatni_knihy", label: "jres:31302409" }); //RC 31302409 : Zobrazit nevyúčtované zálohy z ostatních knih
                    this.filter = $("<div>").appendTo(this.element).
                        gfilterpanel({
                        forms: [
                            headerForm
                        ],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            this.vyhledat(obj.filter);
                        }
                    });
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat(),
                        multi: true,
                        defaultAction: new GAction({
                            name: "gridRowSelectedRow",
                            run: function (ev, ctx) {
                                var row = ctx.cellInfo.data;
                                if (row) {
                                    that.vyuctovatZalohu();
                                }
                            }
                        })
                    });
                    that.actions.addRange({
                        //actVyhledat: {
                        //    caption: "jres:31302232", //RC 31302232 : Vyhledat
                        //    icon: "gi-magglass",
                        //    run: function (ev, ctx) {
                        //        that.vyhledat();
                        //    }
                        //},
                        actVyuctivatZalohu: {
                            caption: "jres:31302043", //RC 31302043 : Vyúčtování zálohy
                            icon: "gi-calc",
                            run: function (ev, ctx) {
                                that.vyuctovatZalohu();
                            }
                        },
                        actDetailZalohy: {
                            caption: "Detail zálohy",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                var radek = that.grid.ggrid("getSelection")[0];
                                if (radek) {
                                    var detailWindow = that.navigate("Gordic.Pok.WebClient.GPokDetailDokladuTab", {
                                        ixp: radek.ixp,
                                        newPodani: false
                                    });
                                }
                            }
                        },
                        actTisk: {
                            caption: "Tisk",
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskZalohy();
                            }
                        },
                    });
                    this.menuBar([
                        //   { action: this.actions.actVyhledat, favorite: true }   , 
                        { action: this.actions.actVyuctivatZalohu, favorite: true },
                        { action: this.actions.actDetailZalohy, favorite: true },
                        { action: this.actions.actTisk, favorite: true }
                    ]);
                    this.findForms().gform("waitForValues")
                        .always(() => {
                        this.endOperation();
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp", caption: "jres:31302005" }); //RC 31302005 : PID
                    gridFormat.addTextColumn({ name: "ktg_typ_zkr", caption: "jres:31302403" }); //RC 31302403 : Typ dok.
                    gridFormat.addDateColumn({ name: "dat_evid", caption: "jres:31302167" }); //RC 31302167 : Datum podání
                    gridFormat.addTextColumn({ name: "ac", caption: "jres:31302371" }); //RC 31302371 : Agendové č.
                    gridFormat.addTextColumn({ name: "popis", caption: "jres:31302013" }); //RC 31302013 : Popis
                    gridFormat.addCurrencyColumn({ name: "c_celkem", caption: "jres:31302364" }); //RC 31302364 : Částka
                    if (this.priznakPoz)
                        gridFormat.addTextColumn({ name: "nazev_ref", caption: "jres:31302404" }); //RC 31302404 : Referent
                    gridFormat.addTextColumn({ name: "nazev", caption: "jres:31302405" }); //RC 31302405 : ESU
                    gridFormat.addTextColumn({ name: "nazev_knihy", caption: "jres:31302030" }); //RC 31302030 : Název knihy
                    gridFormat.addNumberColumn({ name: "rok_knihy", caption: "jres:31302406" }); //RC 31302406 : Rok knihy
                    return gridFormat;
                }
                tiskZalohy() {
                    var that = this;
                    var actVnitrniTiskZalohy = GAction.createPrintAction({
                        name: "actPokZalohy",
                        caption: "Tisk",
                        tema: "pok_ptm_zalohy",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:Zalohy",
                        reportStarting: function (rep) {
                            rep.customDto = { ixp_den: that.ekoBook.ixp_den };
                        }
                    });
                    actVnitrniTiskZalohy.run();
                }
                vyhledat(filterDto) {
                    var that = this;
                    that.beginOperation();
                    that.isl.PokDoklad.listZalohy(rq => {
                        return {
                            filters: {
                                ixs_esu: filterDto.ixs_esu,
                                ixp: filterDto.pid,
                                dat_od: filterDto.dat_podani ? filterDto.dat_podani.start : null,
                                dat_do: filterDto.dat_podani ? filterDto.dat_podani.end : null,
                                vs: filterDto.par_symbol,
                                ac: filterDto.ac,
                                popis: filterDto.popis,
                                minuly_rok: filterDto.minuly_rok,
                                ostatni_knihy: filterDto.ostatni_knihy
                            }
                        };
                    })
                        .get()
                        .done(function (data) {
                        var view = new Gordic.Data.View(data.data);
                        view.process(new Gordic.Data.ComputedFieldsProcessor(function (rows) {
                            rows.forEach(function (row) {
                                if (row.data.ktg_typ == 1500)
                                    row.data.ktg_typ_zkr = "P";
                                else
                                    row.data.ktg_typ_zkr = "V";
                            });
                        }));
                        that.grid.ggrid("setData", view);
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (obj.baseType === "Gordic.General.GHplValidationException" || obj.exceptionType === "Gordic.General.GHplValidationException") {
                            obj.handled = true;
                            Gordic.Pok.WebClient.GPokFlash.showFlashError(that, obj.baseMessage);
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                vyuctovatZalohu() {
                    var that = this;
                    var radek = that.grid.ggrid("getSelection")[0];
                    if (radek == null) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "Není vybrána žádná záloha k vyúčtování");
                        return;
                    }
                    if (this.ixpNovehoDokladu == '' || this.ixpNovehoDokladu == null) { // pokud dělám vyúčtování ze seznamu záloh, nemám podaný nový doklad
                        Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniDokladu(this, true, that.GinGenIxp, 10 /* Hpl.Interface.DruhDokladu.nedanovy */, 1500 /* Hpl.Interface.KategorieTypu.prijmovy */, false)
                            .done(function (ixp) {
                            var detailWindow = that.navigate("Gordic.Pok.WebClient.GPokDetailDokladuTab", {
                                ixp: ixp,
                                newPodani: false,
                                vyuctovaniZalohyPri: true,
                                ixpZaloha: radek.ixp
                            });
                        })
                            .fail(function (zprava) {
                            Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, zprava);
                        });
                    }
                    else { // pokud dělám vyúčtování z detialu dokladu, tak použiji ten doklad co už mám
                        // možná ještě trochu upravit
                        //udělat close, který bude vracet v close pid zálohy a zareagovat na to na detailu dokladu
                        //var detailWindow = that.navigate("Gordic.Pok.WebClient.GPokDetailDokladuTab", {
                        //    ixp: this.ixpNovehoDokladu,
                        //    newPodani: false,
                        //    vyuctovaniZalohyPri: true,
                        //    ixpZaloha: radek.ixp
                        //});
                        that.close(radek.ixp);
                    }
                }
            };
            GPokSeznamZalohTab = __decorate([
                Decorators.gcontent
            ], GPokSeznamZalohTab);
            WebClient.GPokSeznamZalohTab = GPokSeznamZalohTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Nlem5hbVphbG9oVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1Nlem5hbVphbG9oVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyU2Y7QUEzU0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMlNuQjtJQTNTZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMlM3QjtRQTNTb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxZQUFpRDtnQkFVckYsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksSUFBSSxDQUFDLGFBQWE7d0JBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFFMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUcsYUFBYSxFQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFdEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxDQUFDO3lCQUN0RSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsbUJBQW1CO3lCQUMzQyxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsaUJBQWlCO3dCQUN4QixZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtxQkFDaEQsRUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ3hCLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFOzRCQUNkLEdBQUcsRUFBRSxjQUFjOzRCQUNuQixlQUFlLEVBQUUsd0JBQXdCOzRCQUN6QyxTQUFTLEVBQUUs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VUFBVSxHQUFXOzRCQUV2QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDJDQUEyQyxFQUFFO2dDQUMxRSxHQUFHLEVBQUUsR0FBRztnQ0FDUixTQUFTLEVBQUUsS0FBSztnQ0FDaEIsbUJBQW1CLEVBQUUsSUFBSTtnQ0FDekIsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHOzZCQUN2QixDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDOzZCQUNELElBQUksQ0FBQyxVQUFVLE1BQWM7NEJBRTFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ2xFLENBQUMsQ0FBQyxDQUFDO29CQUVYLENBQUM7eUJBQ0ksQ0FBQyxDQUFDLDZFQUE2RTt3QkFFaEYsNkJBQTZCO3dCQUM3QiwwRkFBMEY7d0JBQzFGLGlGQUFpRjt3QkFDakYsaUNBQWlDO3dCQUNqQyx1QkFBdUI7d0JBQ3ZCLGdDQUFnQzt3QkFDaEMsMEJBQTBCO3dCQUMxQixLQUFLO3dCQUVMLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUUxQixDQUFDO2dCQUdMLENBQUM7YUFFSixDQUFBO1lBdFNZLGtCQUFrQjtnQkFEOUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxrQkFBa0IsQ0FzUzlCO1lBdFNZLDRCQUFrQixxQkFzUzlCLENBQUE7UUFFTCxDQUFDLEVBM1NvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEyUzdCO0lBQUQsQ0FBQyxFQTNTZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMlNuQjtBQUFELENBQUMsRUEzU1MsTUFBTSxLQUFOLE1BQU0sUUEyU2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1Nlem5hbVphbG9oVGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlPEdvcmRpYy5Fa28uVXRpbHMuSUdFa29Cb29rRXh0ZW5zaW9uPntcclxuXHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBwcml6bmFrUG96OiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgaXhwTm92ZWhvRG9rbGFkdTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgaXhzRXN1RG9rbGFkdTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIEdpbkdlbkl4cDogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLml4c0VzdURva2xhZHUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsICBkZWZhdWx0QWN0aW9uIDogdHJ1ZSB9XSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicG9rU2V6bmFtWmFsb2hGaWx0ckZvcm1cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDI0MDVcIikgLy9SQyAzMTMwMjQwNSA6IEVTVVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGl4c19lc3U6IHRoaXMuaXhzRXN1RG9rbGFkdSB9ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiAxLCBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBcIjAwMDBYMDAwMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIkZpbHRyIHBva2xhZG7DrWNoIHrDoWxvaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiAnYWt0Wm5hY2thJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogNDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIwMDVcIikgLy9SQyAzMTMwMjAwNSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicGlkXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMTY3XCIpIC8vUkMgMzEzMDIxNjcgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsIHsgbmFtZTogXCJkYXRfcG9kYW5pXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDA3XCIpIC8vUkMgMzEzMDI0MDcgOiBQw6FyLiBzeW1ib2xcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBhcl9zeW1ib2xcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIwMTJcIikgLy9SQyAzMTMwMjAxMiA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJhY1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjAxM1wiKSAvL1JDIDMxMzAyMDEzIDogUG9waXNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvcGlzXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJtaW51bHlfcm9rXCIsIGxhYmVsOiBcImpyZXM6MzEzMDI0MDhcIiB9KSAgICAgICAvL1JDIDMxMzAyNDA4IDogWm9icmF6aXQgbmV2ecO6xI10b3ZhbsOpIHrDoWxvaHkgeiBtaW51bMOpaG8gcm9rdSAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwib3N0YXRuaV9rbmloeVwiLCBsYWJlbDogXCJqcmVzOjMxMzAyNDA5XCIgfSk7Ly9SQyAzMTMwMjQwOSA6IFpvYnJheml0IG5ldnnDusSNdG92YW7DqSB6w6Fsb2h5IHogb3N0YXRuw61jaCBrbmloXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlciA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLlxyXG4gICAgICAgICAgICAgICAgZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5aGxlZGF0KG9iai5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2taYWxvaHlEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSwgIC8vIHRoaXMubW9kZWxQb2xvemt5WzBdICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCJ7YWN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNlYXJjaENvbHVtbnM6IFtcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkUm93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eXVjdG92YXRaYWxvaHUoKTtcclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICAvL2FjdFZ5aGxlZGF0OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMzJcIiwgLy9SQyAzMTMwMjIzMiA6IFZ5aGxlZGF0XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpY29uOiBcImdpLW1hZ2dsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC52eWhsZWRhdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgYWN0Vnl1Y3RpdmF0WmFsb2h1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDQzXCIsLy9SQyAzMTMwMjA0MyA6IFZ5w7rEjXRvdsOhbsOtIHrDoWxvaHlcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWNhbGNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnl1Y3RvdmF0WmFsb2h1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbFphbG9oeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsIHrDoWxvaHlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1phbG9oeUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByYWRlay5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VGlzazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLCBcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50aXNrWmFsb2h5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgLy8gICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5aGxlZGF0LCBmYXZvcml0ZTogdHJ1ZSB9ICAgLCBcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Vnl1Y3RpdmF0WmFsb2h1LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWxaYWxvaHksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFRpc2ssIGZhdm9yaXRlOiB0cnVlIH0gXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rWmFsb2h5RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1phbG9oeUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMTMwMjAwNVwiIH0pOyAvL1JDIDMxMzAyMDA1IDogUElEXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia3RnX3R5cF96a3JcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDAzXCIgfSk7IC8vUkMgMzEzMDI0MDMgOiBUeXAgZG9rLlxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcImRhdF9ldmlkXCIsIGNhcHRpb246IFwianJlczozMTMwMjE2N1wiIH0pIC8vUkMgMzEzMDIxNjcgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFjXCIsIGNhcHRpb246IFwianJlczozMTMwMjM3MVwiIH0pOyAvL1JDIDMxMzAyMzcxIDogQWdlbmRvdsOpIMSNLlxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwianJlczozMTMwMjAxM1wiIH0pOyAgLy9SQyAzMTMwMjAxMyA6IFBvcGlzXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfY2Vsa2VtXCIsIGNhcHRpb246IFwianJlczozMTMwMjM2NFwiIH0pIC8vUkMgMzEzMDIzNjQgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcml6bmFrUG96KVxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldl9yZWZcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDA0XCIgfSk7ICAvL1JDIDMxMzAyNDA0IDogUmVmZXJlbnRcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDI0MDVcIiB9KTsgIC8vUkMgMzEzMDI0MDUgOiBFU1VcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldl9rbmloeVwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIwMzBcIiB9KTsgIC8vUkMgMzEzMDIwMzAgOiBOw6F6ZXYga25paHlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJva19rbmloeVwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDI0MDZcIiB9KTsvL1JDIDMxMzAyNDA2IDogUm9rIGtuaWh5XHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrWmFsb2h5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGFjdFZuaXRybmlUaXNrWmFsb2h5ID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFBva1phbG9oeVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsIFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJwb2tfcHRtX3phbG9oeVwiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOlphbG9oeVwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgaXhwX2RlbiA6IHRoYXQuZWtvQm9vay5peHBfZGVuIH07XHJcbiAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2taYWxvaHkucnVuKCk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdnlobGVkYXQoZmlsdGVyRHRvOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5saXN0WmFsb2h5KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiBmaWx0ZXJEdG8uaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBmaWx0ZXJEdG8ucGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRfb2Q6IGZpbHRlckR0by5kYXRfcG9kYW5pISA/IGZpbHRlckR0by5kYXRfcG9kYW5pIS5zdGFydCA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9kbzogZmlsdGVyRHRvLmRhdF9wb2RhbmkhID8gZmlsdGVyRHRvLmRhdF9wb2RhbmkhLmVuZCEgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2czogZmlsdGVyRHRvLnBhcl9zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjOiBmaWx0ZXJEdG8uYWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcGlzOiBmaWx0ZXJEdG8ucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnVseV9yb2s6IGZpbHRlckR0by5taW51bHlfcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvc3RhdG5pX2tuaWh5OiBmaWx0ZXJEdG8ub3N0YXRuaV9rbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnByb2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG5ldyBHb3JkaWMuRGF0YS5Db21wdXRlZEZpZWxkc1Byb2Nlc3NvcjxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rWmFsb2h5RHRvPihmdW5jdGlvbiAocm93cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdGEua3RnX3R5cCA9PSAxNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0YS5rdGdfdHlwX3prciA9IFwiUFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEua3RnX3R5cF96a3IgPSBcIlZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgb2JqLmV4Y2VwdGlvblR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hFcnJvcih0aGF0LCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZ5dWN0b3ZhdFphbG9odSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJhZGVrID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2taYWxvaHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJhZGVrID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwiTmVuw60gdnlicsOhbmEgxb7DoWRuw6EgesOhbG9oYSBrIHZ5w7rEjXRvdsOhbsOtXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5peHBOb3ZlaG9Eb2tsYWR1ID09ICcnIHx8IHRoaXMuaXhwTm92ZWhvRG9rbGFkdSA9PSBudWxsKSB7IC8vIHBva3VkIGTEm2zDoW0gdnnDusSNdG92w6Fuw60gemUgc2V6bmFtdSB6w6Fsb2gsIG5lbcOhbSBwb2RhbsO9IG5vdsO9IGRva2xhZFxyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJEb2tsYWQucHJvbWlzZVBvZGFuaURva2xhZHUodGhpcywgdHJ1ZSwgdGhhdC5HaW5HZW5JeHAsIEhwbC5JbnRlcmZhY2UuRHJ1aERva2xhZHUubmVkYW5vdnksIEhwbC5JbnRlcmZhY2UuS2F0ZWdvcmllVHlwdS5wcmlqbW92eSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGl4cDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsV2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5dWN0b3ZhbmlaYWxvaHlQcmk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBaYWxvaGE6IHJhZGVrLml4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh6cHJhdmE6IHN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgenByYXZhKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IC8vIHBva3VkIGTEm2zDoW0gdnnDusSNdG92w6Fuw60geiBkZXRpYWx1IGRva2xhZHUsIHRhayBwb3XFvmlqaSB0ZW4gZG9rbGFkIGNvIHXFviBtw6FtXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbW/Fvm7DoSBqZcWhdMSbIHRyb2NodSB1cHJhdml0XHJcbiAgICAgICAgICAgICAgICAvL3VkxJtsYXQgY2xvc2UsIGt0ZXLDvSBidWRlIHZyYWNldCB2IGNsb3NlIHBpZCB6w6Fsb2h5IGEgemFyZWFnb3ZhdCBuYSB0byBuYSBkZXRhaWx1IGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpeHA6IHRoaXMuaXhwTm92ZWhvRG9rbGFkdSxcclxuICAgICAgICAgICAgICAgIC8vICAgIG5ld1BvZGFuaTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB2eXVjdG92YW5pWmFsb2h5UHJpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaXhwWmFsb2hhOiByYWRlay5peHBcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyYWRlay5peHApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=
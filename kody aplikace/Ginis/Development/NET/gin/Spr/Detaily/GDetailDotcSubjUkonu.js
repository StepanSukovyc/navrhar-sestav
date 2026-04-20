"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            /**
             * GDetail
             *
             * @author Petr Dytrich
             */
            let GDetailDotcSubjUkonu = class GDetailDotcSubjUkonu extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            //ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu
                            ixp_ukon: this.IxpUkon, ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: this.TypVazby, lic_zast: this.LicZast, por_zast: this.PorZast
                        };
                    this.loadData(this).done(function () {
                        that.setRezim(that.Rezim, that);
                    });
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("dotcenySubjektUkonuDetail", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        actions: {
                            actVypocetLhuty: {
                                caption: "jres:25200293", //RC 25200293 : Lhůta
                                tooltip: "jres:25200294", //RC 25200294 : Přepočet/ Výpočet lhůty
                                run: function (ev, obj) {
                                    Gordic.Spr.Dialogs.VypocetLhutyDlg(that, {
                                        DatumZahajeni: that.findFields("dat_potvrz").gfield("getValue"),
                                        PocetDnu: new Decimal(15),
                                        ShowOkButton: true
                                    }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                        .done(function (ret) {
                                        if (ret != undefined && ret.VypocetLhuty != undefined) {
                                            that.findFields("dat_lh_odv").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                                        }
                                    });
                                },
                            },
                            actOverISEP: {
                                caption: "jres:25200295", //RC 25200295 : Ověření objektu v ISEP
                                run: function (ev, obj) {
                                    that.navigate(["Gordic.Spr.WebApp.GDetailOvereniVISEP", {}], {
                                        IxpSpis: that.IxpSpis,
                                        IxpUkon: that.IxpUkon,
                                        IxsEsu: that.IxsEsu,
                                    });
                                    //    .done(function (ret) {
                                    //        if (ret != undefined && ret.VypocetLhuty != undefined) {
                                    //            //$(ev.target).findFields("dat_lh_odv").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                                    //            that.findFields("dat_lh_odv").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                                    //        }
                                    //    });
                                },
                            },
                            actZapisISEP: {
                                caption: "jres:25200296", //RC 25200296 : Zápis subjektu do ISEP
                                run: function (ev, obj) {
                                    // realizovat Spr_ZapsatDoISEP ve Gordic.Spr.WebClient\Gin\Spr\Detail\Ukony\DotcSubjUkonu\DetailDotcSubjUkonu.js
                                },
                            }
                        },
                        menuBar: [
                            {
                                id: "menuSubjekt", caption: "jres:25200390", type: "static", after: "akce", children: [
                                    { id: "vypocetLhuta", action: "actVypocetLhuty", favorite: true },
                                    { id: "overISEP", action: "actOverISEP", favorite: false },
                                    { id: "zapisISEP", action: "actZapisISEP", favorite: false },
                                ]
                            }
                        ]
                    }, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    var that = this;
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25200392"; //RC 25200392 : Následující záznam<br>ID: {ixs_esu}
                    this.detailMoveComponentPrevTemplate = "jres:25200391"; //RC 25200391 : Předchozí záznam<br>ID: {ixs_esu}
                    this.enableFields = function (enable) {
                        that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                        that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */));
                        that.findFields("ixs_dva").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */));
                    };
                    this.enableActions = function (enable) {
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                        that.actions["actVypocetLhuty"].enabled(enable);
                        that.actions["actOverISEP"].enabled(!enable && that.LzeISEP);
                        that.actions["actZapisISEP"].enabled(!enable && that.LzeISEP && that.model.s_lze_isep == 1);
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200277", opened: true, layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0" }) //RC 25200277 : Detail dotčeného subjektu správního úkonu
                        .addSection({ customClass: "SectionNoPaddingBottom" })
                        .addRow("jres:25200137", true) //RC 25200137 : Subjekt
                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        Logovani: {
                            // zadání logovacích údaju je nutnost hlavně IXP
                            Ixp: that.IxpSpis,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                            AktZnacka: "",
                            DuvodHledaniTxt: WebApp.VyberEsu_DuvodHledaniTxt
                        }
                    }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25300002", true) //RC 25300002 : Druh subjektu
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                        name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { typ_vazby: [0 /* Gordic.Spr.Interface.TypSubjektuEnum.ObecnaVazba */] }
                    })
                        .addSection({ customClass: "SectionNoPaddingTop SectionNoPaddingBottom" })
                        .addRow()
                        .addField("gcheck", "w-5 w-L-4", {
                        label: "jres:25300039", name: "s_odes", customClass: "enabled", //RC 25300039 : Doručovat
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addField("gcheck", "w-5 w-L-4", {
                        label: "jres:25200280", name: "s_m_odv", customClass: "enabled",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    }) //RC 25200280 : Možnost odvolání
                        .addRow("Vypravení")
                        .addField("gcheck", "w-L-1 w-M-1 w-S-1", {
                        name: "s_vypraveno", model: "model.s_vypraveno", disabled: true, modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_vypraveni", model: "dat_vypraveni", valueType: "date", disabled: true })
                        .addRow("Doručení")
                        .addField("gcheck", "w-L-1 w-M-1 w-S-1", {
                        name: "s_doruceno", model: "model.s_doruceno", disabled: true, modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_doruceni", model: "dat_doruceni", valueType: "date", disabled: true })
                        .addRow("jres:25200288") //RC 25200288 : Lhůta pro odvolání
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_lh_odv", model: "model.dat_lh_odv=value", valueType: "date", customClass: "enabled" })
                        .addRow("Odvolání")
                        .addField("gcheck", "w-L-1 w-M-1 w-S-1", {
                        label: "", name: "s_odv", customClass: "enabled",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    }) //RC 25200283 : Odvolání
                        .addRow("Datum odvolání")
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_odvolani", model: "model.dat_odvolani=value", valueType: "date", customClass: "enabled" })
                        .addField("gcheck", "w-5 w-L-4", {
                        label: "jres:25200284", name: "s_po_lh", customClass: "enabled",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    }) //RC 25200284 : Odvolání bylo po lhůtě
                        .addSection()
                        .addRow("jres:25200291") //RC 25200291 : Rozsah odvolání
                        .addField("gradio", {
                        name: "s_r_odv", customClass: "enabled",
                        initialValue: '0',
                        radios: [
                            { value: '0', label: 'jres:25200289' }, //RC 25200289 : proti celému rozhodnutí
                            { value: '1', label: 'jres:25200290' }, //RC 25200290 : proti části
                        ]
                    })
                        .addRow("jres:25200285") //RC 25200285 : Výroky odvolání
                        .addField("gstringbox", { name: "vyr_odv", customClass: "enabled", rows: 4 })
                        .addSection()
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 });
                    return form;
                }
            };
            GDetailDotcSubjUkonu = __decorate([
                gcontent
            ], GDetailDotcSubjUkonu);
            WebApp.GDetailDotcSubjUkonu = GDetailDotcSubjUkonu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERvdGNTdWJqVWtvbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsRG90Y1N1YmpVa29udS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNk9mO0FBN09ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZPbkI7SUE3T2dCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQTZPMUI7UUE3T29CLFdBQUEsTUFBTTtZQUN2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7O2VBSUc7WUFFSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLE9BQUEscUJBQXdDO2dCQVc5RSxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRzs0QkFDakIsOENBQThDOzRCQUM5QyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87eUJBQ2pKLENBQUM7b0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFBQSxDQUFDO2dCQUVGOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFD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QUMsRUFBRSxDQUFDLENBQzdFO29CQUNMLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0osQ0FBQTtZQW5PWSxvQkFBb0I7Z0JBRGhDLFFBQVE7ZUFDSSxvQkFBb0IsQ0FtT2hDO1lBbk9ZLDJCQUFvQix1QkFtT2hDLENBQUE7UUFDTCxDQUFDLEVBN09vQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUE2TzFCO0lBQUQsQ0FBQyxFQTdPZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNk9uQjtBQUFELENBQUMsRUE3T1MsTUFBTSxLQUFOLE1BQU0sUUE2T2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdEZXRhaWxcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBQZXRyIER5dHJpY2hcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbERvdGNTdWJqVWtvbnUgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNOZXc+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICBJeHBVa29uOiBzdHJpbmc7XHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIEl4c0VzdTogc3RyaW5nO1xyXG4gICAgICAgIFR5cFZhemJ5OiBudW1iZXI7XHJcbiAgICAgICAgTGljWmFzdDogc3RyaW5nO1xyXG4gICAgICAgIFBvclphc3Q6IG51bWJlcjtcclxuICAgICAgICBMemVJU0VQOiBib29sZWFuO1xyXG4gICAgICAgIEdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJlemltID0gdGhpcy5SZXppbURldGFpbHU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbE1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaXhwX3NwaXM6IHRoaXMuSXhwU3BpcywgaXhzX2VzdTogdGhpcy5JeHNFc3VcclxuICAgICAgICAgICAgICAgICAgICBpeHBfdWtvbjogdGhpcy5JeHBVa29uLCBpeHBfc3BpczogdGhpcy5JeHBTcGlzLCBpeHNfZXN1OiB0aGlzLkl4c0VzdSwgdHlwX3ZhemJ5OiB0aGlzLlR5cFZhemJ5LCBsaWNfemFzdDogdGhpcy5MaWNaYXN0LCBwb3JfemFzdDogdGhpcy5Qb3JaYXN0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRSZXppbSh0aGF0LlJlemltLCB0aGF0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiZG90Y2VueVN1Ympla3RVa29udURldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZ5cG9jZXRMaHV0eTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDI5M1wiLCAvL1JDIDI1MjAwMjkzIDogTGjFr3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNTIwMDI5NFwiLCAvL1JDIDI1MjAwMjk0IDogUMWZZXBvxI1ldC8gVsO9cG/EjWV0IGxoxa90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuU3ByLkRpYWxvZ3MuVnlwb2NldExodXR5RGxnKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXR1bVphaGFqZW5pOiB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfcG90dnJ6XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb2NldERudTogbmV3IERlY2ltYWwoMTUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93T2tCdXR0b246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0ICE9IHVuZGVmaW5lZCAmJiByZXQuVnlwb2NldExodXR5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X2xoX29kdlwiKS5nZGF0ZWJveChcInNldFZhbHVlXCIsIHJldC5WeXBvY2V0TGh1dHkuZGF0X2xodXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0T3ZlcklTRVA6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyOTVcIiwgLy9SQyAyNTIwMDI5NSA6IE92xJvFmWVuw60gb2JqZWt0dSB2IElTRVBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuU3ByLldlYkFwcC5HRGV0YWlsT3ZlcmVuaVZJU0VQXCIsIHt9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwVWtvbjogdGhhdC5JeHBVa29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNFc3U6IHRoYXQuSXhzRXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHJldCAhPSB1bmRlZmluZWQgJiYgcmV0LlZ5cG9jZXRMaHV0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8kKGV2LnRhcmdldCkuZmluZEZpZWxkcyhcImRhdF9saF9vZHZcIikuZ2RhdGVib3goXCJzZXRWYWx1ZVwiLCByZXQuVnlwb2NldExodXR5LmRhdF9saHV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdF9saF9vZHZcIikuZ2RhdGVib3goXCJzZXRWYWx1ZVwiLCByZXQuVnlwb2NldExodXR5LmRhdF9saHV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RaYXBpc0lTRVA6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyOTZcIiwgLy9SQyAyNTIwMDI5NiA6IFrDoXBpcyBzdWJqZWt0dSBkbyBJU0VQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlYWxpem92YXQgU3ByX1phcHNhdERvSVNFUCB2ZSBHb3JkaWMuU3ByLldlYkNsaWVudFxcR2luXFxTcHJcXERldGFpbFxcVWtvbnlcXERvdGNTdWJqVWtvbnVcXERldGFpbERvdGNTdWJqVWtvbnUuanNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVudVN1Ympla3RcIiwgY2FwdGlvbjogXCJqcmVzOjI1MjAwMzkwXCIsIHR5cGU6IFwic3RhdGljXCIsIGFmdGVyOiBcImFrY2VcIiwgY2hpbGRyZW46IFsgLy9SQyAyNTIwMDM5MCA6IFN1Ympla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwidnlwb2NldExodXRhXCIsIGFjdGlvbjogXCJhY3RWeXBvY2V0TGh1dHlcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwib3ZlcklTRVBcIiwgYWN0aW9uOiBcImFjdE92ZXJJU0VQXCIsIGZhdm9yaXRlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJ6YXBpc0lTRVBcIiwgYWN0aW9uOiBcImFjdFphcGlzSVNFUFwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5rY2UgZGV0YWlsYnVpbGRlcnUsIHNwdcWhdMSbbsOhIHBvIG1lcmdlIGtvbXBvbmVudFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50R3JpZFJjID0gdGhpcy5HcmlkUmMhO1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnROZXh0VGVtcGxhdGUgPSBcImpyZXM6MjUyMDAzOTJcIjsgLy9SQyAyNTIwMDM5MiA6IE7DoXNsZWR1asOtY8OtIHrDoXpuYW08YnI+SUQ6IHtpeHNfZXN1fVxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnRQcmV2VGVtcGxhdGUgPSBcImpyZXM6MjUyMDAzOTFcIjsgLy9SQyAyNTIwMDM5MSA6IFDFmWVkY2hvesOtIHrDoXpuYW08YnI+SUQ6IHtpeHNfZXN1fVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgLy8gc25pemkgcG9jZXQgdm9sYW5pIGZpbmRGaWVsZHMsIG5hc3RhdmkgY2Vsb3UgY3VzdG9tQ2xhc3MgXCJlbmFibGVkXCIgbmFqZWRub3VcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuRWRpdGFjZSkpOyBcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19kdmFcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuRWRpdGFjZSkpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsTW92ZUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9uc1tcImFjdFZ5cG9jZXRMaHV0eVwiXSEuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zW1wiYWN0T3ZlcklTRVBcIl0hLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lkx6ZUlTRVApO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zW1wiYWN0WmFwaXNJU0VQXCJdIS5lbmFibGVkKCFlbmFibGUgJiYgdGhhdC5MemVJU0VQICYmIHRoYXQubW9kZWwuc19semVfaXNlcCA9PSAxKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUZvcm0oKTogXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjI1MjAwMjc3XCIsIG9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTItMTAtMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIgfSkgLy9SQyAyNTIwMDI3NyA6IERldGFpbCBkb3TEjWVuw6lobyBzdWJqZWt0dSBzcHLDoXZuw61obyDDumtvbnVcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwiU2VjdGlvbk5vUGFkZGluZ0JvdHRvbVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDEzN1wiLCB0cnVlKSAvL1JDIDI1MjAwMTM3IDogU3ViamVrdFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSxcclxuICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWTDoW7DrSBsb2dvdmFjw61jaCDDumRhanUgamUgbnV0bm9zdCBobGF2bsSbIElYUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaURvdGNlbmVob1N1Ympla3R1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogVnliZXJFc3VfRHV2b2RIbGVkYW5pVHh0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksIHsgbmFtZTogXCJpeHNfZXN1XCIsIG1vZGVsOiBcIm1vZGVsLml4c19lc3U9dmFsdWUuaXhzX2VzdVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MzAwMDAyXCIsIHRydWUpIC8vUkMgMjUzMDAwMDIgOiBEcnVoIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzZHZhU3ByRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFcIiwgbW9kZWw6IFwibW9kZWwuaXhzX2R2YT12YWx1ZS5peHNfZHZhXCIsIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyB0eXBfdmF6Ynk6IFtHb3JkaWMuU3ByLkludGVyZmFjZS5UeXBTdWJqZWt0dUVudW0uT2JlY25hVmF6YmFdIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcIlNlY3Rpb25Ob1BhZGRpbmdUb3AgU2VjdGlvbk5vUGFkZGluZ0JvdHRvbVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNSB3LUwtNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNTMwMDAzOVwiLCBuYW1lOiBcInNfb2Rlc1wiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIC8vUkMgMjUzMDAwMzkgOiBEb3J1xI1vdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy01IHctTC00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI1MjAwMjgwXCIsIG5hbWU6IFwic19tX29kdlwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvL1JDIDI1MjAwMjgwIDogTW/Fvm5vc3Qgb2R2b2zDoW7DrVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWeXByYXZlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LUwtMSB3LU0tMSB3LVMtMVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3Z5cHJhdmVub1wiLCBtb2RlbDogXCJtb2RlbC5zX3Z5cHJhdmVub1wiLCBkaXNhYmxlZDogdHJ1ZSwgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LUwtMyB3LU0tNiB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF92eXByYXZlbmlcIiwgbW9kZWw6IFwiZGF0X3Z5cHJhdmVuaVwiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRvcnXEjWVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctTC0xIHctTS0xIHctUy0xXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfZG9ydWNlbm9cIiwgbW9kZWw6IFwibW9kZWwuc19kb3J1Y2Vub1wiLCBkaXNhYmxlZDogdHJ1ZSwgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LUwtMyB3LU0tNiB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF9kb3J1Y2VuaVwiLCBtb2RlbDogXCJkYXRfZG9ydWNlbmlcIiwgdmFsdWVUeXBlOiBcImRhdGVcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAyODhcIikgLy9SQyAyNTIwMDI4OCA6IExoxa90YSBwcm8gb2R2b2zDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LUwtMyB3LU0tNiB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF9saF9vZHZcIiwgbW9kZWw6IFwibW9kZWwuZGF0X2xoX29kdj12YWx1ZVwiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCJ9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZHZvbMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LUwtMSB3LU0tMSB3LVMtMVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiXCIsIG5hbWU6IFwic19vZHZcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAyNTIwMDI4MyA6IE9kdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBvZHZvbMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctTC0zIHctTS02IHctUy0xMlwiLCB7IG5hbWU6IFwiZGF0X29kdm9sYW5pXCIsIG1vZGVsOiBcIm1vZGVsLmRhdF9vZHZvbGFuaT12YWx1ZVwiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNSB3LUwtNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNTIwMDI4NFwiLCBuYW1lOiBcInNfcG9fbGhcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAyNTIwMDI4NCA6IE9kdm9sw6Fuw60gYnlsbyBwbyBsaMWvdMSbXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDI5MVwiKSAvL1JDIDI1MjAwMjkxIDogUm96c2FoIG9kdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3Jfb2R2XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzAnLCBsYWJlbDogJ2pyZXM6MjUyMDAyODknIH0sIC8vUkMgMjUyMDAyODkgOiBwcm90aSBjZWzDqW11IHJvemhvZG51dMOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdqcmVzOjI1MjAwMjkwJyB9LCAvL1JDIDI1MjAwMjkwIDogcHJvdGkgxI3DoXN0aVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDI4NVwiKSAvL1JDIDI1MjAwMjg1IDogVsO9cm9reSBvZHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ2eXJfb2R2XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgcm93czogNCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwNThcIikgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCByb3dzOiA0IH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
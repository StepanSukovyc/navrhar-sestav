namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailDotcSubjUkonu extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpUkon: string;
        IxpSpis: string;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
        LzeISEP: boolean;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
                        
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View)
                this.originalModel = {
                    //ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu
                    ixp_ukon: this.IxpUkon, ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: this.TypVazby, lic_zast: this.LicZast, por_zast: this.PorZast
                };
            this.loadData(this).done(function () {
                that.setRezim(that.Rezim, that);
            });
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            builder.withComponent<this>("dotcenySubjektUkonuDetail", {
                tabs:
                {
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                        }
                    },
                },
                actions:
                {
                    actVypocetLhuty:
                    {
                        caption: "jres:25200293", //RC 25200293 : Lhůta
                        tooltip: "jres:25200294", //RC 25200294 : Přepočet/ Výpočet lhůty
                        run: function (ev, obj) {
                            Gordic.Spr.Dialogs.VypocetLhutyDlg(
                                that,
                                {
                                    DatumZahajeni: that.findFields("dat_potvrz").gfield("getValue"),
                                    PocetDnu: new Decimal(15),
                                    ShowOkButton: true
                                },
                                Gordic.Global.Enums.ModOtevreni.showModalWindow
                            )
                                .done(function (ret) {
                                    if (ret != undefined && ret.VypocetLhuty != undefined) {
                                        that.findFields("dat_lh_odv").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                                    }
                                });
                        },
                    },
                    actOverISEP:
                    {
                        caption: "jres:25200295", //RC 25200295 : Ověření objektu v ISEP
                        run: function (ev, obj) {
                            that.navigate(["Gordic.Spr.WebApp.GDetailOvereniVISEP", {}],
                                {
                                    IxpSpis: that.IxpSpis,
                                    IxpUkon: that.IxpUkon,
                                    IxsEsu: that.IxsEsu,
                                })
                            //    .done(function (ret) {
                            //        if (ret != undefined && ret.VypocetLhuty != undefined) {
                            //            //$(ev.target).findFields("dat_lh_odv").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                            //            that.findFields("dat_lh_odv").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                            //        }
                            //    });
                        },
                    },
                    actZapisISEP:
                    {
                        caption: "jres:25200296", //RC 25200296 : Zápis subjektu do ISEP
                        run: function (ev, obj) {
                            // realizovat Spr_ZapsatDoISEP ve Gordic.Spr.WebClient\Gin\Spr\Detail\Ukony\DotcSubjUkonu\DetailDotcSubjUkonu.js
                        },
                    }
                },
                menuBar: [
                    {
                        id: "menuSubjekt", caption: "jres:25200390", type: "static", after: "akce", children: [ //RC 25200390 : Subjekt
                            { id: "vypocetLhuta", action: "actVypocetLhuty", favorite: true },
                            { id: "overISEP", action: "actOverISEP", favorite: false },
                            { id: "zapisISEP", action: "actZapisISEP", favorite: false },
                        ]
                    }


                ]
            }, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
            var that = this;
            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25200392"; //RC 25200392 : Následující záznam<br>ID: {ixs_esu}
            this.detailMoveComponentPrevTemplate = "jres:25200391"; //RC 25200391 : Předchozí záznam<br>ID: {ixs_esu}

            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); 
                that.findFields("ixs_dva").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); 
            }
            this.enableActions = function (enable: boolean) {                
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
                that.actions["actVypocetLhuty"]!.enabled(enable);
                that.actions["actOverISEP"]!.enabled(!enable && that.LzeISEP);
                that.actions["actZapisISEP"]!.enabled(!enable && that.LzeISEP && that.model.s_lze_isep == 1);
            };
        };

        createForm(): Gordic.Forms.Form {
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
                        DuvodHledaniTxt: VyberEsu_DuvodHledaniTxt
                    }
                }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25300002", true) //RC 25300002 : Druh subjektu
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                    name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", dropdown: true,
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { typ_vazby: [Gordic.Spr.Interface.TypSubjektuEnum.ObecnaVazba] }
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
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_lh_odv", model: "model.dat_lh_odv=value", valueType: "date", customClass: "enabled"})

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
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 })
                ;
            return form;
        }
    }
}
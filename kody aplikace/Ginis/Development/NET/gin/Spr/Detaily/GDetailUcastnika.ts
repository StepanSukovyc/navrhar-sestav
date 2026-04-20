namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailUcastnika extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpSpis: string;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
        
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
                        
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View)
                this.originalModel = {
                    ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: this.TypVazby, lic_zast: this.LicZast, por_zast: this.PorZast
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
            builder.withComponent<this>("ucastnikDetail", {
                //headerForm: this.createForm(),
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
                    actZastupci: {
                        caption: "jres:25200316", //RC 25200316 : Zástupci
                        run: function (ev, obj) {
                            that.navigate(["Gordic.Spr.WebApp.GSeznamVazebSubjektu", {}],
                                {
                                    IxpSpis: that.IxpSpis,
                                    TypVzVazby: Gordic.Spr.Interface.TypVzVazbyEnum.Zastupci,
                                    IxsEsu: that.IxsEsu,
                                    TypVazby: that.TypVazby,
                                    LicZast: that.LicZast,
                                    PorZast: that.PorZast
                                })
                        }
                    }
                },
                menuBar: [
                    {
                        id: "menuUcastnik", caption: "jres:25200403", type: "static", after: "akce", children: [ //RC 25200403 : Účastník
                            { id: "menuZastupci", action: "actZastupci", favorite: true }
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
            var _afterDelete = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions) {
                content.tryClose();
            };

            var that = this;

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25200392"; //RC 25200392 : Následující záznam<br>ID: {ixs_esu}
            this.detailMoveComponentPrevTemplate = "jres:25200391"; //RC 25200391 : Předchozí záznam<br>ID: {ixs_esu}
            this.afterDelete = _afterDelete;

            this.enableFields = function (enable: boolean) {                
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); //vypnuti moznosti editace
            };

            this.enableActions = function (enable: boolean) {                
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
                that.actions["actZastupci"]!.enabled(!enable);
            };            
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var form = new Gordic.Forms.Form({ tabLabel: "jres:25200059", opened: true })  //RC 25200059 : Účastník správního řízení
                .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0" }) 
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
                }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "disabled", validators: [new Gordic.Validators.Required()] })


                .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0" })
                .addRow("jres:25500001", true) //RC 25500001 : Druh subjektu
                .addField("gselectbox", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                    name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { typ_vazby: this.TypVazby }
                })

                .addRow()
                .addField("gcheck", "w-5 w-L-4", {
                    label: "jres:25300039", name: "s_odes", customClass: "enabled", //RC 25300039 : Doručovat
                    modelValueTransform: {
                        apply: function (modelValue) { return modelValue === 1; },
                        collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                    }
                })

                .addSection({ customClass: "w-L-6 w-M-6", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" }) 
                .addRow("jres:25500002", true) //RC 25500002 : Jazyková práva
                .addField("gselectbox", Gordic.Prefabs.Select.sprcucjDto(), {
                    name: "typ_ucj", model: "model.typ_ucj=value.typ_ucj", customClass: "enabled", dropdown: true,
                    serverFilters: { typ_ucj: [10, 20, 30] }, validators: [new Gordic.Validators.Required()]
                }) 
                .addRow("jres:25500003", true) //RC 25500003 : Procesní způsobilost
                .addField("gselectbox", Gordic.Prefabs.Select.sprctpzDto(), {
                    name: "typ_pz", model: "model.typ_pz=value.typ_pz", customClass: "enabled", dropdown: true,
                    serverFilters: { typ_pz: [10, 20, 30, 40] }, validators: [new Gordic.Validators.Required()]
                })

                .addSection({ customClass: "w-L-6 w-M-6", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" }) 
                .addRow("jres:25500004", true) //RC 25500004 : Znalost českého jazyka
                .addField("gselectbox", Gordic.Prefabs.Select.sprcscjDto(), {
                    name: "s_cj_jazyk", model: "model.s_cj_jazyk=value.s_cj_jazyk", customClass: "enabled", dropdown: true,
                    validators: [new Gordic.Validators.Required()]
                }) 
                .addRow("jres:25500005", true) //RC 25500005 : Důvod dotč.proc.zp.
                .addField("gselectbox", Gordic.Prefabs.Select.sprcdpzDto(), {
                    name: "duv_dotc", model: "model.duv_dotc=value.duv_dotc", customClass: "enabled", dropdown: true,
                    validators: [new Gordic.Validators.Required()]
                })
                
                .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0" }) 
                .addRow("jres:25500006") //RC 25500006 : Místo pobytu
                .addField("gstringbox", { name: "misto_pob", customClass: "enabled" })
                .addRow("jres:25200058") //RC 25200058 : Poznámka
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", autoSize: false, allowResize: true, rows: 5 })
                
            return form;
        }
    }
}
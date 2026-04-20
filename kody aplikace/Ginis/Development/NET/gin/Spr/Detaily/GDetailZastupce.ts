namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailZastupce extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpSpis: string;
        IxsEsu: string;
        LicZast: string;
        PorZast: number;
        SSLCjSpis: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
                        
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View)
                this.originalModel = {
                    ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: Gordic.Spr.Interface.TypSubjektuEnum.Zastupce, lic_zast: this.LicZast, por_zast: this.PorZast
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

            builder.withComponent<this>("zastupceDetail", {
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
                    actZastupovani: {
                        caption: "jres:25200168", //RC 25200168 : Zastupování
                        run: function (ev, obj) {
                            that.navigate(["Gordic.Spr.WebApp.GSeznamVazebSubjektu", {}],
                                {
                                    IxpSpis: that.IxpSpis,
                                    TypVzVazby: Gordic.Spr.Interface.TypVzVazbyEnum.Zastupovani,
                                    IxsEsu: that.IxsEsu,
                                    TypVazby: Gordic.Spr.Interface.TypSubjektuEnum.Zastupce,
                                    LicZast: that.LicZast,
                                    PorZast: that.PorZast
                                })
                        }
                    }
                },
                menuBar: [
                    {
                        id: "menuZastupce", caption: "jres:25200402", type: "static", after: "akce", children: [ //RC 25200402 : Zástupce
                            { id: "menuZastupovani", action: "actZastupovani", favorite: true }
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
            var _afterDelete = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions) {
                content.tryClose();
            };

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
            this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam
            this.afterDelete = _afterDelete;

            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); 
            }
            this.enableActions = function (enable: boolean) {                
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
                that.actions["actZastupovani"]!.enabled(!enable);
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");

            var form = new Gordic.Forms.Form({ tabLabel: "jres:25200164", opened: true }) //RC 25200164 : Zástupce ve správním řízení
                .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0" })
                .addRow("jres:25200137", true) //RC 25200137 : Subjekt
                .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                    typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                    Logovani: {
                        // zadání logovacích údaju je nutnost hlavně IXP
                        Ixp: that.IxpSpis,
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                        AktZnacka: that.SSLCjSpis,
                        DuvodHledaniTxt: VyberEsu_DuvodHledaniTxt
                    }
                }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25300004", true) //RC 25300004 : Druh zástupce
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                    name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { typ_vazby: [Gordic.Spr.Interface.TypSubjektuEnum.Zastupce] }
                })
                .addRow("Číslo zástupce")
                .addField("gstringbox", { name: "cislo_cak", customClass: "enabled" })
                .addRow()
                .addField("gcheck", "w-5 w-L-4", {
                    label: "jres:25300039", name: "s_odes", customClass: "enabled", //RC 25300039 : Doručovat
                    modelValueTransform: {
                        apply: function (modelValue) { return modelValue === 1; },
                        collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                    }
                })
                .addRow("jres:25200058") //RC 25200058 : Poznámka
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 })
                ;
            return form;
        }
    }
}
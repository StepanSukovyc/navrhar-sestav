namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailOUO extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpSpis: string;
        IxsOuo: string;
        IxsDsr: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
                        
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = {
                ixp_spis: this.IxpSpis, ixs_ouo: this.IxsOuo
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

            builder.withComponent<this>("ouoDetail", {
                tabs:
                {
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                        }
                    },
                }
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
                that.findFields("ixs_ouo").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); 
            }
            this.enableActions = function (enable: boolean) {                
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var form = new Gordic.Forms.Form({ tabLabel: "jres:25200196", opened: true }) //RC 25200196 : Detail oprávněné úřední osoby
                .addSection({ customClass: "w-12", layoutDescriptor: "L-3-9-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25200197") //RC 25200197 : Oprávněná úř. osoba
                .addField("gselectbox", Gordic.Prefabs.Select.sprsouoDto(), {
                    name: "ixs_ouo", model: "model.ixs_ouo=value.ixs_ouo", dropdown: false,
                    serverFilters: { ixs_dsr: [that.IxsDsr] },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required"
                })
                .addRow("jres:25200205") //RC 25200205 : Účinnost
                .addField("gselectbox", Gordic.Prefabs.Select.sprcuciDto(), {
                    name: "ucinnost", model: "model.ucinnost=value.ucinnost", customClass: "enabled",
                    serverFilters: { ucinnost: "> 0" },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                })
                .addRow("jres:25200206") //RC 25200206 : Důvod určení
                .addField("gselectbox", Gordic.Prefabs.Select.sprcdurDto(), {
                    name: "duv_urc", model: "model.duv_urc=value.duv_urc", customClass: "enabled",
                    serverFilters: { duv_urc: "> 0" },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                })
                .addRow("jres:25200207") //RC 25200207 : Datum pověření, ID
                .addField("gdatebox", "w-6", { name: "dat_roz_pov", model: "model.dat_roz_pov=value", valueType: "date", customClass: "enabled" })
                .addField("gstringbox", "w-6", Gordic.Gin.Prefabs.Field.Identifikator({
                    fieldOpt: { name: "ixp_pov", customClass: "enabled", validators: [new Gordic.Validators.Ixs()] },
                    isPid: true
                }, true))
                .addRow("jres:25200208") //RC 25200208 : Datum odvolání, ID
                .addField("gdatebox", "w-6", { name: "dat_roz_odv", model: "model.dat_roz_odv=value", valueType: "date", customClass: "enabled" })
                .addField("gstringbox", "w-6", Gordic.Gin.Prefabs.Field.Identifikator({
                    fieldOpt: { name: "ixp_odv", customClass: "enabled", validators: [new Gordic.Validators.Ixs()] },
                    isPid: true
                }, true))
                .addRow("jres:25200058") //RC 25200058 : Poznámka
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 })
                ;
            return form;
        }
    }
}
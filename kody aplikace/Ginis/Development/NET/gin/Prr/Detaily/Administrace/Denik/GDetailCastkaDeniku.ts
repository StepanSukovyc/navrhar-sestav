namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailCastkaDeniku extends GDetailBuilderContent<
    Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> &
    Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> &
    Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>
    > implements IGContent {
        IxsRad?: string;
        TypUda?: number;
        TypPla?: number;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;


        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixs_rad: this.IxsRad, typ_uda: this.TypUda, typ_pla: this.TypPla };
            else this.model = { ixs_rad: this.IxsRad };

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
            builder.withComponent<this>("DetailCastkaDeniku", {

                tabs:
                {
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                        }
                    }
                },
                actions:
                {
                },
                menuBar: [

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
            this.detailMoveComponentNextTemplate = "jres:25800069"; //RC 25800069 : Následující záznam<br>{typ_uda_txt} - {typ_pla_txt} - {castka}
            this.detailMoveComponentPrevTemplate = "jres:25800070"; //RC 25800070 : Předchozí záznam<br>{typ_uda_txt} - {typ_pla_txt} - {castka}


            this.enableFields = function (enable: boolean) {
                this.findFields(".enabled").gfield("option", "disabled", !enable)
                this.findFields("typ_uda").gfield("option", "disabled", !enable || that.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)
                this.findFields("typ_pla").gfield("option", "disabled", !enable || that.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)
            };

            this.enableActions = function (enable: boolean) {
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");

            var typUda = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 310, 320, 330, 340, 345, 350, 370, 380, 390, 400, 410];
            if (that.Mp) typUda = [0, 50, 110, 120, 130, 140, 150, 160, 210, 240, 250, 260, 270, 340, 345, 350, 360];

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-2-10-0, S-12-12-0", opened: true })
                .addSection()
                .addRow("jres:25800064", true) //RC 25800064 : Typ události
                .addField("gselectbox", Gordic.Prefabs.Select.prrcuda(), {
                    name: "typ_uda", model: "model.typ_uda=value.typ_uda", disabled: this.readOnly, serverFilters: { typ_uda: typUda }, dropdown: true,
                    validators: [new Gordic.Validators.Base({ validate: function (val, source) { return val.typ_uda != 0; }, message: "jres:25800097" })] //RC 25800097 : Hondota nesmí být neurčeno
                })
                .addRow("jres:25800065", true) //RC 25800065 : Typ částky
                .addField("gselectbox", Gordic.Prefabs.Select.prrctpl(), {
                    name: "typ_pla", model: "model.typ_pla=value.typ_pla", disabled: this.readOnly, serverFilters: { typ_pla: [0, 10, 20] }, dropdown: true,
                    validators: [new Gordic.Validators.Base({ validate: function (val, source) { return val.typ_pla != 0; }, message: "jres:25800097" })] //RC 25800097 : Hondota nesmí být neurčeno
                })
                .addRow("jres:25800066", true) //RC 25800066 : Částka
                .addField("gnumberbox", { name: "castka", customClass: "enabled", disabled: this.readOnly})
                .addRow("jres:25800063") //RC 25800063 : Poznámka
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", disabled: this.readOnly })
                .addRow("jres:25800025") //RC 25800025 : Aktivita
                .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly });
            return form;
        }
    }
}
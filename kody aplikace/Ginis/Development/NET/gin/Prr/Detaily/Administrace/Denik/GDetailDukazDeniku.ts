namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailDukazDeniku extends GDetailBuilderContent<
            Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> &
            Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> &
            Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>
        > implements IGContent {        
        IxsRad?: string;
        PorCislo?: number;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;


        onContentReady() {            
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixs_rad: this.IxsRad, por_cislo: this.PorCislo };
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
            builder.withComponent<this>("DetailDukazDeniku", {
               
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
                    {
                        id: "xx", caption: "XXXX", type: "static"
                    }
                ],
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
            this.detailMoveComponentNextTemplate = "jres:25800021"; //RC 25800021 : Následující záznam<br>Název: {nazev}
            this.detailMoveComponentPrevTemplate = "jres:25800022"; //RC 25800022 : Předchozí záznam<br>Název: {nazev}

            
            this.enableFields = function (enable: boolean) {
                this.findFields(".enabled").gfield("option", "disabled", !enable)
            };

            this.enableActions = function (enable: boolean) {
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            
            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M1S1, L-2-10-0, M-2-10-0, S-12-12-0", opened: true })
                .addSection()           
                .addRow("jres:25800004", true) //RC 25800004 : Název
                .addField("gstringbox", { name: "nazev", customClass: "enabled", disabled: this.readOnly, })
                .addRow("jres:25800063") //RC 25800063 : Poznámka
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", disabled: this.readOnly, })
                .addRow("jres:25800060") //RC 25800060 : Pořadí
                .addField("gnumberbox", { name: "poradi", customClass: "enabled", disabled: this.readOnly, emptyValue: null })
                .addRow("jres:25800025") //RC 25800025 : Aktivita
                .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly });
                
            return form;
        }
    }
}
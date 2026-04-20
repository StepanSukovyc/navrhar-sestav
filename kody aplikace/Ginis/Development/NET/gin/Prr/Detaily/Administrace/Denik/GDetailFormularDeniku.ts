namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailFormularDeniku extends GDetailBuilderContent<
            Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>>
        > implements IGContent {        
        IxsRad?: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {            
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixs_rad: this.IxsRad };
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
            builder.withComponent<this>("DetailFormularDeniku", {
               
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

            this.onlyNew = true;
            
            this.enableFields = function (enable: boolean) {
                this.findFields(".enabled").gfield("option", "disabled", !enable)
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            
            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0", opened: true })
                .addSection()
                .addRow("jres:25800051", true) //RC 25800051 : Formulář
                .addField("gselectbox", Gordic.Prefabs.Select.prrsfrm(),
                    {
                        dropdown: false,
                        name: "sablona",
                        customClass: "enabled",
                        model: "model.sablona=value.sablona",
                        disabled: this.readOnly,
                        serverFilters: {                                              
                            s_mp: that.Mp ? 1 : 0,
                            ixs_rad: that.IxsRad,
                            aktivita: 100
                        }
                    }
                );               
            return form;
        }
    }
}
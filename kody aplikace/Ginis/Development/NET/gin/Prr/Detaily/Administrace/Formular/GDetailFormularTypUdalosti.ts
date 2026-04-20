namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailFormularTypUdalosti extends GDetailBuilderContent<
            Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>>
        > implements IGContent {        
        Sablona?: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {            
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { sablona: this.Sablona };
            else this.model = { sablona: this.Sablona };

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
            builder.withComponent<this>("DetailFormularTypUdalosti", {
               
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

            var typUda = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 310, 320, 330, 340, 345, 350, 370, 380, 390, 400, 410];
            var typUdaTxt = "jres:25800064"; //RC 25800064 : Typ události

            if (that.Mp) {
                typUda = [0, 50, 110, 120, 130, 140, 150, 160, 210, 240, 250, 260, 270, 340, 345, 350, 360];
                typUdaTxt = "jres:25800095"; //RC 25800095 : Typ řešení
            }
            

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0", opened: true })
                .addSection()
                .addRow("jres:25800064", true) //RC 25800064 : Typ události
                .addField("gselectbox", Gordic.Prefabs.Select.prrcuda(),
                    {
                        dropdown: true,
                        name: "typ_uda",
                        customClass: "enabled",
                        model: "model.typ_uda=value.typ_uda",
                        disabled: this.readOnly,
                        serverFilters: { typ_uda: typUda },
                        validators: [new Gordic.Validators.Base({ validate: function (val, source) { return val.typ_uda != 0; }, message: "jres:25800097" })] //RC 25800097 : Hondota nesmí být neurčeno
                    }
                );               
            return form;
        }
    }
}
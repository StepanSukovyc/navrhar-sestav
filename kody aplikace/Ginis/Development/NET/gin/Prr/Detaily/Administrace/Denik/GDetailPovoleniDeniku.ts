namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailPovoleniDeniku extends GDetailBuilderContent<
            Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> &
            Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> &
            Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>
        > implements IGContent {        
        IxsRad?: string;
        IxsFun?: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        ProDenik: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;


        onContentReady() {            
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixs_rad: this.IxsRad, ixs_fun: this.IxsFun };
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
            builder.withComponent<this>("DetailPovoleniDeniku", {
               
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
            this.detailMoveComponentNextTemplate = "jres:25800047"; //RC 25800047 : Následující záznam<br>Název: {nazev} - {ginsfun_nazev}
            this.detailMoveComponentPrevTemplate = "jres:25800048"; //RC 25800048 : Předchozí záznam<br>Název: {nazev} - {ginsfun_nazev}

            
            this.enableFields = function (enable: boolean) {
                this.findFields(".enabled").gfield("option", "disabled", !enable)
                this.findFields("ixs_rad").gfield("option", "disabled", !enable || that.ProDenik || that.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)
                this.findFields("ixs_fun").gfield("option", "disabled", !enable || that.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)
            };

            this.enableActions = function (enable: boolean) {
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var typDen = 10;
            if (that.Mp) typDen = 20;
            
            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M1S1, L-4-8-0, M-4-8-0, S-12-12-0", opened: true })
                .addSection()           
                .addRow("jres:25800020", true) //RC 25800020 : Deník
                .addField("gselectbox", Gordic.Prefabs.Select.prrsrad(), { dropdown: false, name: "ixs_rad", model: "model.ixs_rad=value.ixs_rad", disabled: this.readOnly, serverFilters: { typ_den: typDen, aktivita: 100 } })
                .addRow("jres:25800028", true) //RC 25800028 : Funkce
                .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), { dropdown: false, name: "ixs_fun", model: "model.ixs_fun=value.ixs_fun", disabled: this.readOnly })
                .addRow()
                .addField("gcheck", { label: "jres:25800046", name: "pouze_prohlizet", customClass: "enabled", disabled: this.readOnly })//RC 25800046 : Pouze prohlížet
                .addRow("jres:25800025") //RC 25800025 : Aktivita
                .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly });
            return form;
        }
    }
}
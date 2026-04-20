namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailLhuty extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        
        IxpSpis: string;
        PorCislo: number;

        stav: number;
        zp_roz: number;

        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View)
                this.originalModel = { 
                    ixp_spis: this.IxpSpis, por_cislo: this.PorCislo
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
            builder.withComponent<this>("lhutaDetail", {
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
            var _afterDelete = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions) {
                content.tryClose();
            };

            var that = this;

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
            this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam
            this.afterDelete = _afterDelete;

            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                that.findFields("stav").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); //vypnuti moznosti editace
                that.findFields("zp_roz").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); //vypnuti moznosti editace
            };

            this.enableActions = function (enable: boolean) {
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
                that.actions.actNew?.visible(false); //zruseni zobrazeni policek horniho menu
            };
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var form = new Gordic.Forms.Form({ tabLabel: "jres:25500008", opened: true })  //RC 25500008 : Detail lhůty (termínu)
                .addSection()
                .addRow("jres:25200202")//RC 25200202 : Stav řízení
                .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprcstaDto(), {
                    name: "stav", model: "model.stav=value.stav", dropdown: true, 
                    serverFilters: { stav: "> 0" }
                }) 
                .addRow("jres:25200203") //RC 25200203 : Způsob rozhodnutí
                .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprczprDto(), {
                    name: "zp_roz", model: "model.zp_roz=value.zp_roz", dropdown: true, 
                }) 
                .addRow("jres:25500009") //RC 25500009 : Lhůta, termín
                .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprctrmDto(), {
                    name: "typ_term", model: "model.typ_term=value.typ_term", customClass: "enabled", dropdown: true
                })

                .addRow("jres:25500010") //RC 25500010 : Datum od
                .addField("gdatebox", "w-11", { name: "dat_od", customClass: "enabled"})
                .addRow("jres:25500011") //RC 25500011 : Datum do
                .addField("gdatebox", "w-11", { name: "dat_do", customClass: "enabled" })

                .addSection()
                .addRow("jres:25200070") //RC 25200070 : Stav lhůty
                .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprcslhDto(), {
                    name: "stav_lh", model: "model.stav_lh=value.stav_lh", customClass: "enabled", dropdown: true
                })
                .addRow("jres:25500012") //RC 25500012 : Datum ukončení
                .addField("gdatebox", "w-11", { name: "dat_konlh", customClass: "enabled"})

                .addSection()
                .addRow("jres:25200058") //RC 25200058 : Poznámka
                .addField("gstringbox", "w-11", { name: "poznamka", customClass: "enabled", autoSize: false, allowResize: true, rows: 5 })

            return form;
        }
    }
}
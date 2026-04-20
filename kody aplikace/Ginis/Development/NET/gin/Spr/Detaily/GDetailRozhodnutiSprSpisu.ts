namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailRozhodnutiSprSpisu extends GDetailBuilderContent implements IGContent {
        IxpSpis: string;
        model: any;

        onContentReady() {
            var that = this;
            that.findFields().gfield("model", "apply", that.model, { initialValues: true })
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;
            builder.withComponent<this>("GDetailRozhodnutiSprSpisu", {
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
                    actSave:
                    {
                        caption: "jres:25300027", //RC 25300027 : Rozhodnout
                        icon: "gi-save",
                        run: function (this: GAction, ev, ctx) {
                            let currentContent = $.content<GContent>(this);
                            that.save().done(function (zmena) {
                                currentContent.tryClose({ Zmena: zmena }); 
                            });
                        }
                    },
                    actStorno:
                    {
                        caption: "jres:25500220",  //RC 25500220 : Zrušit
                        icon: "gi-doruc",
                        run: function (this: GAction, ev, ctx) {
                            let currentContent = $.content<GContent>(this);
                            currentContent.tryClose();
                        }
                    }
                },
                menuBar: [
                ],
                commandBar: [
                    { action: "actSave", favorite: true, primary: true },
                    { action: "actStorno", favorite: true }
                ]
            }, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {

        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            
            var layout; 
            if (that.model.datumRozhodnutiPoznamka === "Datum rozhodnutí")
                layout = "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0";
            else // Datum vypravení vyřizujícího dokumentu
                layout = "L1M1S1, L-4-8-0, M-6-6-0, S-12-12-0";

            var form = new Gordic.Forms.Form({ opened: true }) 
                .addSection({ layoutDescriptor: layout }) 
                .addRow(that.model.datumRozhodnutiPoznamka, true)
                .addField("gdatebox", "w-11", { name: "datumRozhodnuti", disabled: this.model.vyrizeno, validators: [new Gordic.Validators.Required()] }) 

            return form;

        }

        // ulozeni 
        save(): JQuery.Promise<any> {
            var that = this;
            var prom = $.Deferred();

            that.findForms()!.gform("waitForValues")
                .then((o) => {
                    if (that.findForms()!.gform("isValid")) { //Toto provede validaci
                        that.findFields().gfield("model", "collect", that.model);

                        that.call("SaveData", {

                            ixpSpis: this.IxpSpis,
                            datZmena: that.model.datZmena,
                            datumRozhodnuti: that.model.datumRozhodnuti,
                            vyrizeno: that.model.vyrizeno
                        })
                            .done(function (zmena) {
                                prom.resolve(zmena);
                            })
                            .fail(function (xhr, type, obj) {
                                if (type === "validation") {
                                    obj.handled = true;
                                    that.findForms().findFields().gfield("model", "validations", obj);
                                }
                                prom.reject();
                            });
                    };
                }); 
           
            
            return prom.promise();
        }
    }
}

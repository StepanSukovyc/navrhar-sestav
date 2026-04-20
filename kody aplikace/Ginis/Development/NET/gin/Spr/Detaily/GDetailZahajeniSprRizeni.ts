namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailZahajeniSprRizeni extends GDetailBuilderContent implements IGContent {
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
            builder.withComponent<this>("GDetailZahajeniSprRizeni", {
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
                        caption: "jres:25300052", //RC 25300052 : Zahájit
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

            var form = new Gordic.Forms.Form({ opened: true })
                .addSection({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                .addRow("jres:25300053", true) //RC 25300053 : Datum zahájení
                .addField("gdatebox", "w-11", { name: "datumZahajeni", disabled: false, validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25300054", true) //RC 25300054 : Lhůta pro rozhodnutí
                .addField("gdatebox", "w-11", { name: "datumLhuta", disabled: false, validators: [new Gordic.Validators.Required()] })
                .addSection(" ")
                .addText(that.model.poznamkaDoruceni)

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
                            datumZahajeni: that.model.datumZahajeni,
                            datumLhuta: that.model.datumLhuta,
                            ixpUkonZahajeni: that.model.ixpUkonZahajeni
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

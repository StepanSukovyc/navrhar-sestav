namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailVyrizeniSprSpisu extends GDetailBuilderContent implements IGContent {
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
            builder.withComponent<this>("GDetailVyrizeniSprSpisu", {
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
                        caption: "jres:25500205", //RC 25500205 : Vyřídit
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
            if (that.model.datumVyrizeniPoznamka === "Datum vyřízení")
                layout = "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0";
            else // Datum vypravení vyřizujícího dokumentu
                layout = "L1M1S1, L-4-8-0, M-6-6-0, S-12-12-0";

            var form = new Gordic.Forms.Form({ opened: true }) 
                .addSection({ layoutDescriptor: layout }) 
                .addRow(that.model.datumVyrizeniPoznamka, true)
                .addField("gdatebox", "w-11", { name: "datumVyrizeni", disabled: this.model.vyrizeno, validators: [new Gordic.Validators.Required()] }) 

                .addSection({ layoutDescriptor: layout }) 
                .addRow("jres:25500211", true) //RC 25500211 : Způsob vyřízení
                .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sslszvs(), {
                    dropdown: true,
                    model: "model.zpusobVyrizeni = value.zp_vyriz", // that.model.zpusobVyrizeni
                    name: "zpusobVyrizeni",
                    disabled: this.model.vyrizeno,
                    serverFilters: {
                        aktivita: [100]
                    },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required"
                }) // gsslszvs - ciselnik

                .addRow("jres:25500209", true) //RC 25500209 : Zpracovatel
                .addField("gselectbox", "w-11", Gordic.Gin.Fields.ginsfunSSU(
                    {
                        validators: [new Gordic.Validators.Required()],
                        disabled: this.model.vyrizeno,
                        name: "ixsFunResitel", // ixsFunResitel
                        model: "model.ixsFunResitel=value.ixs_fun", //ixsFunResitel
                        itemTemplate: function (output: any) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100]
                        },
                        flag: "required"
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))

                .addRow("jres:25500215", true)  //RC 25500215 : Schvalovatel
                .addField("gselectbox", "w-11", Gordic.Gin.Fields.ginsfunSSU(
                    {
                        validators: [new Gordic.Validators.Required()],
                        disabled: this.model.vyrizeno,
                        name: "ixsFunSchval", //ixsFunSchval
                        model: "model.ixsFunSchval = value.ixs_fun", //ixsFunSchval
                        itemTemplate: function (output: any) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100]
                        },
                        flag: "required"
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))

                .addRow("jres:25200058") //RC 25200058 : Poznámka
                .addField("gstringbox", "w-11", { name: "poznamka", disabled: this.model.vyrizeno, autoSize: false, allowResize: true, rows: 10, customClass: "enabled" })

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
                            zpusobVyrizeni: that.model.zpusobVyrizeni,
                            datumVyrizeni: that.model.datumVyrizeni,
                            poznamkaVyrizeni: that.model.poznamka,
                            ixsFunSchval: that.model.ixsFunSchval,
                            ixsFunResitel: that.model.ixsFunResitel,
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

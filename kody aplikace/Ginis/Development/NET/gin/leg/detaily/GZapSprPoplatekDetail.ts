namespace Gordic.Leg.WebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GZapSprPoplatekDetail extends GDetailBuilderContent implements IGContent //<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>
    {

        IxsVid: string;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        model: any;

        //Eko
        eko_ico: string;
        eko_ucs: string;
        eko_rok: string;

        onContentReady(this: this & GContent<IGContentBase, any>, serverData: Object): void {
            var that = this;

            // naplnění fields
            that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
        }

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void {
            
        }

        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;
            console.log("init");

            builder.withComponent<this>("GDetailOsobyLeg", {
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
                    actSave: {
                        caption: "jres:25500111", //RC 25500111 : Založit
                        icon: "gi-save",
                        run: function () {
                            var prom = $.Deferred();
                            if (that.findForms()!.gform("isValid")) {
                                that.findFields().gfield("model", "collect", that.model); // naplneni modelu
                                // ulozeni do nastaveni
                                ulozPosledniPouzite();
                                that.call("UlozSprPoplatek", { model: that.model }).done((ev, retVal) => {
                                    let currentContent = $.content<GContent>(this);
                                    currentContent.tryClose(ev);
                                })
                            }
                            
                        }
                    },
                    actStorno: {
                        caption: "jres:25500109", //RC 25500109 : Zavřít
                        icon: "fa-times",
                        run: function (this: GAction, ev, ctx) {
                            let currentContent = $.content<GContent>(this);
                            currentContent.tryClose();
                        }
                    }
                },
                menuBar: [
                    { action: "actSave", favorite: true, primary: true },
                    { action: "actStorno", favorite: true }
                ],
                commandBar: [
                    { action: "actSave", favorite: true, primary: true },
                    { action: "actStorno", favorite: true }
                ]
            }, true);

            var ulozPosledniPouzite = function () {
                Gordic.Leg.Globals.PosledniPouzite.UlozPosledniSprPoplatek(that.globalSettings, that.model); 
            }
        }

        // hlavni form
        createForm(): Gordic.Forms.Form {
            console.log("GZapSprPoplatekDetail.Form");
            var that = this;

            var form = new Gordic.Forms.Form()
                .addSection()
                .addRow("jres:25500098") //RC 25500098 : Plátce
                //.addField("gselectbox", "w-10", Gordic.Esu.Prefabs.vyberEsu({
                //    typ: Esu.Globals.Enums.TypZobrazeniKaroteka.Normal,
                //    Logovani: {
                //        AktZnacka: "", Ixp: "0000P000000N",
                //        DuvodHledani: Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                //        DuvodHledaniTxt: "Vyhledání plátce"
                //    },
                //}), { name: "platce", model: "model.platce=value.ixs_esu", flag: "requied", validators: [new Gordic.Validators.Required()], strict: false })

                .addField("gselectbox", "w-10", Gordic.Esu.Prefabs.vyberEsu({
                    typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsuOrZo,
                    Logovani: {
                        // zadání logovacích údaju je nutnost hlavně IXP
                        Ixp: "0000X0000003", // defaultni hodnota 
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                        AktZnacka: "",
                        DuvodHledaniTxt: "Ztotožnění "
                    }
                }), {
                    name: "platce",
                    model: "model.platce=value.ixs_esu",
                    flag: "requied",
                    customClass: "enabled",
                    validators: [new Gordic.Validators.Required()],
                    strict: false
                    //change: function (ev, val) {
                    //    that.findFields("platce").gstringbox("setValue", val.value?.nazev);
                    //}
                })

                //.addField("gselectbox", "w-10", Gordic.Prefabs.Select.ginsesu(), { name: "platce", model: "model.platce=value.ixs_esu", validators: [new Gordic.Validators.Required()], flag: "requied", strict: false })
                .addRow("jres:25500099") //RC 25500099 : Kniha
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.poksden(), {
                    name: "kniha", model: "model.kniha=value.ixp_den", //initialValue: that.model.kniha,
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { ico: this.eko_ico, ucs: this.eko_ucs, rok: this.eko_rok }
                })
                .addRow("jres:25500100") //RC 25500100 : Pokladní
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.pokvrfuDto(), { 
                    //name: "pokladni", model: "model.pokladni=value.ixs_fun, model.kniha=>value.ixp_den, model.subrada=value.subrada", //initialValue: that.model.pokladni,
                    name: "pokladni", model: "model.pokladni=value.ixs_fun, model.kniha=value.ixp_den, model.subrada=value.subrada, ", //, model.kniha=value.ixp_den
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { ixp_den: new Gordic.Forms.Dependency("kniha", "ixp_den", true)}, //serverFilters: { ixp_den: ixp_den } // kniha.ixs_den
                })
                .addRow("jres:25500101") //RC 25500101 : Kontace
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.pokvkonDto(), {
                    name: "kontace", model: "model.kontace=value.ixs_kon, model.ixsVpk=value.ixs_vpk", //initialValue: that.model.kontace,
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { ixs_vpk: new Gordic.Forms.Dependency("kniha", "ixs_vpk", true) }, //serverFilters: { ixs_vpk: ixs_vpk } // kniha.ixs_vpk
                })
                .addRow("jres:25500102") //RC 25500102 : Variabilní symbol
                .addField("gstringbox", "w-10", { name: "var_symbol" })//, model: "model.var_symbol=value.var_symbol" })
                .addRow("jres:25500113")  //RC 25500113 : Popis
                .addField("gstringbox", "w-10", { name: "popis" })//, model: "model.popis=value.popis" })
                .addRow("jres:25500105")  //RC 25500105 : Poplatek (Kč)
                .addField("gnumberbox", "w-10", Gordic.Prefabs.Number.currency(), { name: "poplatek", validators: [new Gordic.Validators.Required()] })
            //Lze pouzit custom funkci function(masterValue) => thisValue
            return form;
        }
        
    }
}


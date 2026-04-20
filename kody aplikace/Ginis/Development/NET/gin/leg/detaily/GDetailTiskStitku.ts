namespace Gordic.Leg.WebClient {7
    var gcontent = Decorators.gcontent

    @gcontent
    export class GDetailTiskStitku extends GContentBase implements IGContent {

        private form: JQuery<HTMLElement>;
        model: any;

        l_sStitek: string;
        l_sFiltrAlv: string;
        l_sTypStitku: string;

        data: any;
        wrp: any;


        onContentReady() {
            var that = this;

            that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
        }

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void {
            //var that = this;
        }

        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;
            // wrp pro graficke zobrazeni počtu štítků
            that.wrp = $("<div style='display: flex;flex-wrap: wrap;width: 6.9rem;border: groove;'>").appendTo(this.element); //6.25rem
            // tvorba buttons
            //that.createButtons(0);
            that.namyButtonSwitch(that.model.typ_stitku);

            builder.withComponent<this>("GDetailOsobyLeg", {
                //headerForm: that.createForm(),
                tabs:
                {
                    
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                            that.find(".js-div").replaceWith(that.wrp);
                        }
                    },

                },
                actions:
                {
                    actTisk: GAction.createPrintAction({
                        name: "actTisk",
                        caption: "Tisk",
                        tema: "leg_ptm_sti",
                        customDto: function () {
                            return that.getCustomDtoProTisk();
                        },
                        serverRestrictionAlfMethod: "Gordic.Leg.WebClient.GDetailTiskStitku:GetRestrictionAlf",
                        serverRestrictionAlvMethod: "Gordic.Leg.WebClient.GDetailTiskStitku:GetRestrictionAlv",
                        serverParameterMethod: "Gordic.Leg.WebClient.GDetailTiskStitku:ServerParameterMethod"

                    }),
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
                    { action: "actTisk", favorite: true, primary: true },
                    { action: "actStorno", favorite: true }
                ],
                commandBar: [
                    { action: "actTisk", favorite: true, primary: true },
                    { action: "actStorno", favorite: true }
                ]
            }, true);
        }

        private getCustomDtoProTisk(): Gordic.Leg.WebClient.GTiskStitkuDto {
            var that = this;
            
            // ulozeni do nastaveni
            if (that.findForms()!.gform("isValid")) {
                that.findFields().gfield("model", "collect", that.model); // naplneni modelu
                this.ulozPosledniPouzite();
                //Gordic.Leg.Globals.PosledniPouzite.UlozPosledniProTisk(that.globalSettings, that.model);
            }
            // typ stitku 
            switch (that.model.typ_stitku) {
                case '0':
                    that.model.stitek = "7";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "1";
                    break;
                case '1':
                    that.model.stitek = "6";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "2";
                    break;
                case '2':
                    that.model.stitek = "5";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "3";
                    break;
                case '3':
                    that.model.stitek = "4";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "4";
                    break;
                case '4':
                    that.model.stitek = "2";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "5";
                    break;
                case '5':
                    that.model.stitek = "C";
                    that.model.filtrAlv = "%CEL%";
                    that.model.typStitku = "6";
                    break;
                case '6':
                    that.model.stitek = "";
                    that.model.filtrAlv = "%KOT%";
                    that.model.typStitku = "7";
                    break;
                case '7':
                    that.model.stitek = "8";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "8";
                    break;
                case '8':
                    that.model.stitek = "9";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "9";                    
                    break;
                case '9':
                    that.model.stitek = "10";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "10";                    
                    break;
                case '10' :
                    that.model.stitek = "11";
                    that.model.filtrAlv = "%STI%";
                    that.model.typStitku = "11";
                    break;
                default:
                    that.model.stitek = "";
                    that.model.filtrAlv = "";
                    that.model.typStitku = "";
                    break
            }

            that.model.data = that.data;

            return that.model;
        }

        // uložení posledních použitých parametrů do nastavení
        private ulozPosledniPouzite(): void {
            var that = this;
            Gordic.Leg.Globals.PosledniPouzite.UlozPosledniProTisk(that.globalSettings, that.model);
        }

        // form
        createForm(): Gordic.Forms.Form {
            var that = this;

            var form = new Gordic.Forms.Form({})
            

            form.addSection({ label: "jres:25500199" }) //, layoutDescriptor: "L2M2S2, S-0-2-0, M-0-2-0, L-0-2-0" //RC 25500199 : Typ štítků
                .addField("gradio", {
                    name: "typ_stitku", 
                    //initialValue: '0',
                    radios: [
                        { value: '0', label: 'jres:25500205' },   //RC 25500205 : 2 x 7 (105 x 42,4)
                        { value: '1', label: 'jres:25500206' },   //RC 25500206 : 2 x 6 (105 x 48)
                        { value: '2', label: 'jres:25500207' },   //RC 25500207 : 2 x 5 (105 x 57)
                        { value: '3', label: 'jres:25500208' },   //RC 25500208 : 2 x 4 (105 x 74)
                        { value: '4', label: 'jres:25500209' },   //RC 25500209 : 2 x 2 (105 x 148)
                        { value: '5', label: 'jres:25500210' },   //RC 25500210 : Celá stránka
                        { value: '6', label: 'jres:25500211' },   //RC 25500211 : Kotouč (80 x 50)
                        { value: '7', label: 'jres:25500212' },   //RC 25500212 : Kniha 2x6
                        { value: '8', label: 'jres:25500258' },   //RC 25500258 : Kniha 2x5
                        { value: '9', label: 'jres:25500255' },   //RC 25500255 : 2x6 Štítek + kniha
                        { value: '10', label: 'jres:25500256' },   //RC 25500256 : 2x5 Štítek + kniha
                    ],
                    change: function (ev, retVal) {
                        //that.findFields("pocet_opak").gfield("option", { disabled: false })
                        that.namyButtonSwitch(retVal.value);
                    }
                })
                .addRow("jres:25500200") //RC 25500200 : Číslo štítku, kterým se má začít
                .addField("gnumberbox", "w-4", {
                    name: "cislo_od", disabled: true, change: function (ev, retVal) {
                        that.model.cislo_od = retVal.value;
                        that.wrp.empty();
                        var num = that.findFields("typ_stitku").gfield("getValue");
                        that.namyButtonSwitch(num);
                    }
                })
                .addRow("jres:25500201") //RC 25500201 : Počet opakování
                .addField("gnumberbox", "w-4", { name: "pocet_opak" })
                .addRow("jres:25500202") //RC 25500202 : Tisknout na štítek matrikářku
                .addField("gcheck", {
                    name: "matrikar", change: function (ev, retVal) {
                        if (retVal.value) {
                            that.findFields("prihlaseny_matrikar").gfield("option", { disabled: false })
                        }
                        else {
                            that.findFields("prihlaseny_matrikar").gfield("setValue", { value: false })
                            that.findFields("prihlaseny_matrikar").gfield("option", { disabled: true })
                        }
                    }
                })
                .addRow("jres:25500203") //RC 25500203 : Tisknout přihlášenou matrikářku
                .addField("gcheck", { name: "prihlaseny_matrikar", disabled: !that.model.matrikar })
                .addRow("jres:25500204") //RC 25500204 : Vytisknout hromadný štítek
                .addField("gcheck", { name: "hromadny_stitek" })
                .addSection("jres:25500214") //RC 25500214 : Výběr štítku kterým má začít tisk
                .addField("gstaticfield", { customClass: "js-div" })

            return form;
        }

        public createButtons(many: number): void {

            var that = this;
            
            for (let i = 1; i <= many; i++) {

                const act = new GAction({

                    name: `act${i}`,

                    caption: i.toString(),

                    customClass: "g-state-background", // g-state-success

                    run: function (ev) {
                        let action = parseInt(this.caption);
                        that.findFields("cislo_od").gfield("setValue", action);
                    }

                })

                // g-state-error // g-state-success
                var cel = that.model.cislo_od; // findFields("cislo_od").gfield("getValue");
                var error = "";
                var success = "";
                if (i < cel) {
                    error = "g-state-error";
                }
                if (i == cel) {
                    success = "g-state-success";
                }
                //that.wrp.find(".js-btn-1").toggleClass("hidden", true /* true - schovani, false - zobrazeni */)
                if (many === 1) {
                    that.wrp.append($(`<div style='width: 7rem;display: flex; justify-content: center; margin: 0.125rem; border-style: groove;' class='g-state-background ${success}' {js-btn-${i}}'>`) //barvicky // g-state-success // background-color: lightgrey 
                        .gbutton({ params: { action: act } }));
                }
                else {
                    that.wrp.append($(`<div style='width: 3rem;display: flex; justify-content: center; margin: 0.125rem; border-style: groove;' class='g-state-background ${error} ${success}' {js-btn-${i}}'>`) //barvicky // g-state-success // background-color: lightgrey
                        .gbutton({ params: { action: act } }));
                }
            }
            
        }

        // počet štítků
        public namyButtonSwitch(retVal: string | null): void {

            var that = this;
            switch (retVal) { //.value
                case '0':
                    that.wrp.empty()
                    that.createButtons(14);
                    break;
                case '1':
                case '7':
                    that.wrp.empty()
                    that.createButtons(12);
                    break;
                case '2':
                    that.wrp.empty()
                    that.createButtons(10);
                    break;
                case '3':
                    that.wrp.empty()
                    that.createButtons(8);
                    break;
                case '4':
                    that.wrp.empty()
                    that.createButtons(4);
                    break;
                case '5':
                case '6':
                    that.wrp.empty()
                    that.createButtons(1);
                    break;
                case '8':
                    that.wrp.empty()
                    that.createButtons(10);
                    break;
                case '9':
                    that.wrp.empty()
                    that.createButtons(12);
                    //that.findFields("pocet_opak").gfield("setValue", 2).gfield("option", { disabled: true })
                    break;
                case '10':
                    that.wrp.empty()
                    that.createButtons(10);
                    //that.findFields("pocet_opak").gfield("setValue", 2).gfield("option", { disabled: true })
                    break;
                default:
                    that.wrp.empty()
                    that.createButtons(14);
                    break;
            }
        }
    }
}
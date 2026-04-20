"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Leg;
    (function (Leg) {
        var WebClient;
        (function (WebClient) {
            7;
            var gcontent = Decorators.gcontent;
            let GDetailTiskStitku = class GDetailTiskStitku extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
                }
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    //var that = this;
                }
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    // wrp pro graficke zobrazeni počtu štítků
                    that.wrp = $("<div style='display: flex;flex-wrap: wrap;width: 6.9rem;border: groove;'>").appendTo(this.element); //6.25rem
                    // tvorba buttons
                    //that.createButtons(0);
                    that.namyButtonSwitch(that.model.typ_stitku);
                    builder.withComponent("GDetailOsobyLeg", {
                        //headerForm: that.createForm(),
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                    that.find(".js-div").replaceWith(that.wrp);
                                }
                            },
                        },
                        actions: {
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
                                run: function (ev, ctx) {
                                    let currentContent = $.content(this);
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
                getCustomDtoProTisk() {
                    var that = this;
                    // ulozeni do nastaveni
                    if (that.findForms().gform("isValid")) {
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
                        case '10':
                            that.model.stitek = "11";
                            that.model.filtrAlv = "%STI%";
                            that.model.typStitku = "11";
                            break;
                        default:
                            that.model.stitek = "";
                            that.model.filtrAlv = "";
                            that.model.typStitku = "";
                            break;
                    }
                    that.model.data = that.data;
                    return that.model;
                }
                // uložení posledních použitých parametrů do nastavení
                ulozPosledniPouzite() {
                    var that = this;
                    Gordic.Leg.Globals.PosledniPouzite.UlozPosledniProTisk(that.globalSettings, that.model);
                }
                // form
                createForm() {
                    var that = this;
                    var form = new Gordic.Forms.Form({});
                    form.addSection({ label: "jres:25500199" }) //, layoutDescriptor: "L2M2S2, S-0-2-0, M-0-2-0, L-0-2-0" //RC 25500199 : Typ štítků
                        .addField("gradio", {
                        name: "typ_stitku",
                        //initialValue: '0',
                        radios: [
                            { value: '0', label: 'jres:25500205' }, //RC 25500205 : 2 x 7 (105 x 42,4)
                            { value: '1', label: 'jres:25500206' }, //RC 25500206 : 2 x 6 (105 x 48)
                            { value: '2', label: 'jres:25500207' }, //RC 25500207 : 2 x 5 (105 x 57)
                            { value: '3', label: 'jres:25500208' }, //RC 25500208 : 2 x 4 (105 x 74)
                            { value: '4', label: 'jres:25500209' }, //RC 25500209 : 2 x 2 (105 x 148)
                            { value: '5', label: 'jres:25500210' }, //RC 25500210 : Celá stránka
                            { value: '6', label: 'jres:25500211' }, //RC 25500211 : Kotouč (80 x 50)
                            { value: '7', label: 'jres:25500212' }, //RC 25500212 : Kniha 2x6
                            { value: '8', label: 'jres:25500258' }, //RC 25500258 : Kniha 2x5
                            { value: '9', label: 'jres:25500255' }, //RC 25500255 : 2x6 Štítek + kniha
                            { value: '10', label: 'jres:25500256' }, //RC 25500256 : 2x5 Štítek + kniha
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
                                that.findFields("prihlaseny_matrikar").gfield("option", { disabled: false });
                            }
                            else {
                                that.findFields("prihlaseny_matrikar").gfield("setValue", { value: false });
                                that.findFields("prihlaseny_matrikar").gfield("option", { disabled: true });
                            }
                        }
                    })
                        .addRow("jres:25500203") //RC 25500203 : Tisknout přihlášenou matrikářku
                        .addField("gcheck", { name: "prihlaseny_matrikar", disabled: !that.model.matrikar })
                        .addRow("jres:25500204") //RC 25500204 : Vytisknout hromadný štítek
                        .addField("gcheck", { name: "hromadny_stitek" })
                        .addSection("jres:25500214") //RC 25500214 : Výběr štítku kterým má začít tisk
                        .addField("gstaticfield", { customClass: "js-div" });
                    return form;
                }
                createButtons(many) {
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
                        });
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
                namyButtonSwitch(retVal) {
                    var that = this;
                    switch (retVal) { //.value
                        case '0':
                            that.wrp.empty();
                            that.createButtons(14);
                            break;
                        case '1':
                        case '7':
                            that.wrp.empty();
                            that.createButtons(12);
                            break;
                        case '2':
                            that.wrp.empty();
                            that.createButtons(10);
                            break;
                        case '3':
                            that.wrp.empty();
                            that.createButtons(8);
                            break;
                        case '4':
                            that.wrp.empty();
                            that.createButtons(4);
                            break;
                        case '5':
                        case '6':
                            that.wrp.empty();
                            that.createButtons(1);
                            break;
                        case '8':
                            that.wrp.empty();
                            that.createButtons(10);
                            break;
                        case '9':
                            that.wrp.empty();
                            that.createButtons(12);
                            //that.findFields("pocet_opak").gfield("setValue", 2).gfield("option", { disabled: true })
                            break;
                        case '10':
                            that.wrp.empty();
                            that.createButtons(10);
                            //that.findFields("pocet_opak").gfield("setValue", 2).gfield("option", { disabled: true })
                            break;
                        default:
                            that.wrp.empty();
                            that.createButtons(14);
                            break;
                    }
                }
            };
            GDetailTiskStitku = __decorate([
                gcontent
            ], GDetailTiskStitku);
            WebClient.GDetailTiskStitku = GDetailTiskStitku;
        })(WebClient = Leg.WebClient || (Leg.WebClient = {}));
    })(Leg = Gordic.Leg || (Gordic.Leg = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFRpc2tTdGl0a3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsVGlza1N0aXRrdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBK1VmO0FBL1VELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStVbkI7SUEvVWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQStVN0I7UUEvVW9CLFdBQUEsU0FBUztZQUFFLENBQUMsQ0FBQTtZQUM3QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1lBR2xDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQWEvQyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLDJDQUEyQztnQkFDaEksQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSCxvQkFBb0IsQ0FBQyxPQUF5QztvQkFDMUQsa0JBQWtCO2dCQUN0QixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFDLE9BQXlDO29CQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLDBDQUEwQztvQkFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsMkVBQTJFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDM0gsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU3QyxPQUFPLENBQUMsYUFBYSxDQUFPLGlC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LENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs0QkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOzRCQUMzQixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs0QkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOzRCQUMzQixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs0QkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOzRCQUMzQixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs0QkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOzRCQUMzQixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7NEJBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs0QkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOzRCQUMzQixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxLQUFLLENB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clxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnRcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsVGlza1N0aXRrdSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBtb2RlbDogYW55O1xyXG5cclxuICAgICAgICBsX3NTdGl0ZWs6IHN0cmluZztcclxuICAgICAgICBsX3NGaWx0ckFsdjogc3RyaW5nO1xyXG4gICAgICAgIGxfc1R5cFN0aXRrdTogc3RyaW5nO1xyXG5cclxuICAgICAgICBkYXRhOiBhbnk7XHJcbiAgICAgICAgd3JwOiBhbnk7XHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7IC8vIHByb2pkZSB2xaFlY2huYSBwb2xlIGEgbmFwbG7DrSBqZSB6IG1vZGVsdVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkRldGFpbEJ1aWxkZXJJbml0XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyB3cnAgcHJvIGdyYWZpY2tlIHpvYnJhemVuaSBwb8SNdHUgxaF0w610a8WvXHJcbiAgICAgICAgICAgIHRoYXQud3JwID0gJChcIjxkaXYgc3R5bGU9J2Rpc3BsYXk6IGZsZXg7ZmxleC13cmFwOiB3cmFwO3dpZHRoOiA2LjlyZW07Ym9yZGVyOiBncm9vdmU7Jz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTsgLy82LjI1cmVtXHJcbiAgICAgICAgICAgIC8vIHR2b3JiYSBidXR0b25zXHJcbiAgICAgICAgICAgIC8vdGhhdC5jcmVhdGVCdXR0b25zKDApO1xyXG4gICAgICAgICAgICB0aGF0Lm5hbXlCdXR0b25Td2l0Y2godGhhdC5tb2RlbC50eXBfc3RpdGt1KTtcclxuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkdEZXRhaWxPc29ieUxlZ1wiLCB7XHJcbiAgICAgICAgICAgICAgICAvL2hlYWRlckZvcm06IHRoYXQuY3JlYXRlRm9ybSgpLFxyXG4gICAgICAgICAgICAgICAgdGFiczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0YWJaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoYXQuY3JlYXRlRm9ybSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZChcIi5qcy1kaXZcIikucmVwbGFjZVdpdGgodGhhdC53cnApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RUaXNrOiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImxlZ19wdG1fc3RpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0Q3VzdG9tRHRvUHJvVGlzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJSZXN0cmljdGlvbkFsZk1ldGhvZDogXCJHb3JkaWMuTGVnLldlYkNsaWVudC5HRGV0YWlsVGlza1N0aXRrdTpHZXRSZXN0cmljdGlvbkFsZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJSZXN0cmljdGlvbkFsdk1ldGhvZDogXCJHb3JkaWMuTGVnLldlYkNsaWVudC5HRGV0YWlsVGlza1N0aXRrdTpHZXRSZXN0cmljdGlvbkFsdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkxlZy5XZWJDbGllbnQuR0RldGFpbFRpc2tTdGl0a3U6U2VydmVyUGFyYW1ldGVyTWV0aG9kXCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTA5XCIsIC8vUkMgMjU1MDAxMDkgOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudD4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RUaXNrXCIsIGZhdm9yaXRlOiB0cnVlLCBwcmltYXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0U3Rvcm5vXCIsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0VGlza1wiLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFN0b3Jub1wiLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDdXN0b21EdG9Qcm9UaXNrKCk6IEdvcmRpYy5MZWcuV2ViQ2xpZW50LkdUaXNrU3RpdGt1RHRvIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdWxvemVuaSBkbyBuYXN0YXZlbmlcclxuICAgICAgICAgICAgaWYgKHRoYXQuZmluZEZvcm1zKCkhLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpOyAvLyBuYXBsbmVuaSBtb2RlbHVcclxuICAgICAgICAgICAgICAgIHRoaXMudWxvelBvc2xlZG5pUG91eml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy9Hb3JkaWMuTGVnLkdsb2JhbHMuUG9zbGVkbmlQb3V6aXRlLlVsb3pQb3NsZWRuaVByb1Rpc2sodGhhdC5nbG9iYWxTZXR0aW5ncywgdGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdHlwIHN0aXRrdSBcclxuICAgICAgICAgICAgc3dpdGNoICh0aGF0Lm1vZGVsLnR5cF9zdGl0a3UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuc3RpdGVrID0gXCI3XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5maWx0ckFsdiA9IFwiJVNUSSVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnR5cFN0aXRrdSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5zdGl0ZWsgPSBcIjZcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLmZpbHRyQWx2ID0gXCIlU1RJJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwudHlwU3RpdGt1ID0gXCIyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnN0aXRlayA9IFwiNVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuZmlsdHJBbHYgPSBcIiVTVEklXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC50eXBTdGl0a3UgPSBcIjNcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuc3RpdGVrID0gXCI0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5maWx0ckFsdiA9IFwiJVNUSSVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnR5cFN0aXRrdSA9IFwiNFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5zdGl0ZWsgPSBcIjJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLmZpbHRyQWx2ID0gXCIlU1RJJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwudHlwU3RpdGt1ID0gXCI1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICc1JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnN0aXRlayA9IFwiQ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuZmlsdHJBbHYgPSBcIiVDRUwlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC50eXBTdGl0a3UgPSBcIjZcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuc3RpdGVrID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLmZpbHRyQWx2ID0gXCIlS09UJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwudHlwU3RpdGt1ID0gXCI3XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICc3JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnN0aXRlayA9IFwiOFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuZmlsdHJBbHYgPSBcIiVTVEklXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC50eXBTdGl0a3UgPSBcIjhcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuc3RpdGVrID0gXCI5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5maWx0ckFsdiA9IFwiJVNUSSVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnR5cFN0aXRrdSA9IFwiOVwiOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICc5JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnN0aXRlayA9IFwiMTBcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLmZpbHRyQWx2ID0gXCIlU1RJJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwudHlwU3RpdGt1ID0gXCIxMFwiOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcxMCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuc3RpdGVrID0gXCIxMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuZmlsdHJBbHYgPSBcIiVTVEklXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC50eXBTdGl0a3UgPSBcIjExXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuc3RpdGVrID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLmZpbHRyQWx2ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLnR5cFN0aXRrdSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5tb2RlbC5kYXRhID0gdGhhdC5kYXRhO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQubW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bG/FvmVuw60gcG9zbGVkbsOtY2ggcG91xb5pdMO9Y2ggcGFyYW1ldHLFryBkbyBuYXN0YXZlbsOtXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96UG9zbGVkbmlQb3V6aXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIEdvcmRpYy5MZWcuR2xvYmFscy5Qb3NsZWRuaVBvdXppdGUuVWxvelBvc2xlZG5pUHJvVGlzayh0aGF0Lmdsb2JhbFNldHRpbmdzLCB0aGF0Lm1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZvcm1cclxuICAgICAgICBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe30pXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKHsgbGFiZWw6IFwianJlczoyNTUwMDE5OVwiIH0pIC8vLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMiwgUy0wLTItMCwgTS0wLTItMCwgTC0wLTItMFwiIC8vUkMgMjU1MDAxOTkgOiBUeXAgxaF0w610a8WvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3N0aXRrdVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogJzAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMCcsIGxhYmVsOiAnanJlczoyNTUwMDIwNScgfSwgICAvL1JDIDI1NTAwMjA1IDogMiB4IDcgKDEwNSB4IDQyLDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdqcmVzOjI1NTAwMjA2JyB9LCAgIC8vUkMgMjU1MDAyMDYgOiAyIHggNiAoMTA1IHggNDgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcyJywgbGFiZWw6ICdqcmVzOjI1NTAwMjA3JyB9LCAgIC8vUkMgMjU1MDAyMDcgOiAyIHggNSAoMTA1IHggNTcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICczJywgbGFiZWw6ICdqcmVzOjI1NTAwMjA4JyB9LCAgIC8vUkMgMjU1MDAyMDggOiAyIHggNCAoMTA1IHggNzQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICc0JywgbGFiZWw6ICdqcmVzOjI1NTAwMjA5JyB9LCAgIC8vUkMgMjU1MDAyMDkgOiAyIHggMiAoMTA1IHggMTQ4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnNScsIGxhYmVsOiAnanJlczoyNTUwMDIxMCcgfSwgICAvL1JDIDI1NTAwMjEwIDogQ2Vsw6Egc3Ryw6Fua2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzYnLCBsYWJlbDogJ2pyZXM6MjU1MDAyMTEnIH0sICAgLy9SQyAyNTUwMDIxMSA6IEtvdG91xI0gKDgwIHggNTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICc3JywgbGFiZWw6ICdqcmVzOjI1NTAwMjEyJyB9LCAgIC8vUkMgMjU1MDAyMTIgOiBLbmloYSAyeDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzgnLCBsYWJlbDogJ2pyZXM6MjU1MDAyNTgnIH0sICAgLy9SQyAyNTUwMDI1OCA6IEtuaWhhIDJ4NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnOScsIGxhYmVsOiAnanJlczoyNTUwMDI1NScgfSwgICAvL1JDIDI1NTAwMjU1IDogMng2IMWgdMOtdGVrICsga25paGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzEwJywgbGFiZWw6ICdqcmVzOjI1NTAwMjU2JyB9LCAgIC8vUkMgMjU1MDAyNTYgOiAyeDUgxaB0w610ZWsgKyBrbmloYVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcyhcInBvY2V0X29wYWtcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFteUJ1dHRvblN3aXRjaChyZXRWYWwudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDIwMFwiKSAvL1JDIDI1NTAwMjAwIDogxIzDrXNsbyDFoXTDrXRrdSwga3RlcsO9bSBzZSBtw6EgemHEjcOtdFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb19vZFwiLCBkaXNhYmxlZDogdHJ1ZSwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLmNpc2xvX29kID0gcmV0VmFsLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVtID0gdGhhdC5maW5kRmllbGRzKFwidHlwX3N0aXRrdVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYW15QnV0dG9uU3dpdGNoKG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMjAxXCIpIC8vUkMgMjU1MDAyMDEgOiBQb8SNZXQgb3Bha292w6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInBvY2V0X29wYWtcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAyMDJcIikgLy9SQyAyNTUwMDIwMiA6IFRpc2tub3V0IG5hIMWhdMOtdGVrIG1hdHJpa8OhxZlrdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1hdHJpa2FyXCIsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicHJpaGxhc2VueV9tYXRyaWthclwiKS5nZmllbGQoXCJvcHRpb25cIiwgeyBkaXNhYmxlZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInByaWhsYXNlbnlfbWF0cmlrYXJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyB2YWx1ZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInByaWhsYXNlbnlfbWF0cmlrYXJcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDIwM1wiKSAvL1JDIDI1NTAwMjAzIDogVGlza25vdXQgcMWZaWhsw6HFoWVub3UgbWF0cmlrw6HFmWt1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInByaWhsYXNlbnlfbWF0cmlrYXJcIiwgZGlzYWJsZWQ6ICF0aGF0Lm1vZGVsLm1hdHJpa2FyIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDIwNFwiKSAvL1JDIDI1NTAwMjA0IDogVnl0aXNrbm91dCBocm9tYWRuw70gxaF0w610ZWtcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiaHJvbWFkbnlfc3RpdGVrXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNTUwMDIxNFwiKSAvL1JDIDI1NTAwMjE0IDogVsO9YsSbciDFoXTDrXRrdSBrdGVyw71tIG3DoSB6YcSNw610IHRpc2tcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IGN1c3RvbUNsYXNzOiBcImpzLWRpdlwiIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVCdXR0b25zKG1hbnk6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbWFueTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0ID0gbmV3IEdBY3Rpb24oe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgYWN0JHtpfWAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGkudG9TdHJpbmcoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kXCIsIC8vIGctc3RhdGUtc3VjY2Vzc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uID0gcGFyc2VJbnQodGhpcy5jYXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2lzbG9fb2RcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnLXN0YXRlLWVycm9yIC8vIGctc3RhdGUtc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbCA9IHRoYXQubW9kZWwuY2lzbG9fb2Q7IC8vIGZpbmRGaWVsZHMoXCJjaXNsb19vZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGNlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJnLXN0YXRlLWVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBjZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vdGhhdC53cnAuZmluZChcIi5qcy1idG4tMVwiKS50b2dnbGVDbGFzcyhcImhpZGRlblwiLCB0cnVlIC8qIHRydWUgLSBzY2hvdmFuaSwgZmFsc2UgLSB6b2JyYXplbmkgKi8pXHJcbiAgICAgICAgICAgICAgICBpZiAobWFueSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQud3JwLmFwcGVuZCgkKGA8ZGl2IHN0eWxlPSd3aWR0aDogN3JlbTtkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgbWFyZ2luOiAwLjEyNXJlbTsgYm9yZGVyLXN0eWxlOiBncm9vdmU7JyBjbGFzcz0nZy1zdGF0ZS1iYWNrZ3JvdW5kICR7c3VjY2Vzc30nIHtqcy1idG4tJHtpfX0nPmApIC8vYmFydmlja3kgLy8gZy1zdGF0ZS1zdWNjZXNzIC8vIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdidXR0b24oeyBwYXJhbXM6IHsgYWN0aW9uOiBhY3QgfSB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5hcHBlbmQoJChgPGRpdiBzdHlsZT0nd2lkdGg6IDNyZW07ZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IG1hcmdpbjogMC4xMjVyZW07IGJvcmRlci1zdHlsZTogZ3Jvb3ZlOycgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCAke2Vycm9yfSAke3N1Y2Nlc3N9JyB7anMtYnRuLSR7aX19Jz5gKSAvL2JhcnZpY2t5IC8vIGctc3RhdGUtc3VjY2VzcyAvLyBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdidXR0b24oeyBwYXJhbXM6IHsgYWN0aW9uOiBhY3QgfSB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwb8SNZXQgxaF0w610a8WvXHJcbiAgICAgICAgcHVibGljIG5hbXlCdXR0b25Td2l0Y2gocmV0VmFsOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocmV0VmFsKSB7IC8vLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVCdXR0b25zKDE0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnNyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53cnAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlQnV0dG9ucygxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVCdXR0b25zKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQud3JwLmVtcHR5KClcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUJ1dHRvbnMoOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICc0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVCdXR0b25zKDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnNSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICc2JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVCdXR0b25zKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnOCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53cnAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlQnV0dG9ucygxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICc5JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVCdXR0b25zKDEyKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcyhcInBvY2V0X29wYWtcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMikuZ2ZpZWxkKFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzEwJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndycC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVCdXR0b25zKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcyhcInBvY2V0X29wYWtcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMikuZ2ZpZWxkKFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53cnAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlQnV0dG9ucygxNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
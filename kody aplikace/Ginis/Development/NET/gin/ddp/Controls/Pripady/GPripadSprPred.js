"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadSprPred.ts                      </Name>
//    <Description> Formulář předání správci                                    </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-30                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GPripadSprPred = class GPripadSprPred extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Bylo již tisknuto */
                    this.printed = false;
                }
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createForm();
                    that.actions.addRange([
                        new GAction({
                            name: "actTisk",
                            enabled: false,
                            caption: "Tisk",
                            icon: "gi-print",
                            run: () => { that.tisk(); }
                        }),
                        new GAction({
                            name: "actSave",
                            enabled: false,
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: () => { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            enabled: true,
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: () => { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actTisk", "actSave!", "actClose"]));
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                /**
                 * Metoda pro vytvoření hlavního formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "sprPredForm", layoutDescriptor: "L1M1S1" });
                    mainForm
                        .addSection()
                        .addRow("Nový správce")
                        .addField("gselectbox", Gordic.Prefabs.Select.spravce(), {
                        name: "cis_spr", // spr
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        change: () => {
                            that.printed = false;
                            that.povoleni();
                        }
                    })
                        .addRow("Převést k datu")
                        .addField("gdatebox", {
                        name: "date",
                        initialValue: new Date(),
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        change: () => {
                            that.printed = false;
                            that.povoleni();
                        }
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka",
                        change: () => {
                            that.printed = false;
                            that.povoleni();
                        }
                    });
                    that.defaultForm = $.newDiv().appendTo(that.element).gform("createFrom", mainForm);
                    return mainForm;
                }
                /** Nastaví / Zkontroluje povolení tlačítek */
                povoleni() {
                    var that = this;
                    var model = {};
                    that.findFields().gfield("model", "collect", model);
                    if (model.date != null && model.cis_spr.cis_spr != null) {
                        if (model.cis_spr.cis_spr.length > 0) {
                            if (that.printed) {
                                that.actions.getActions().find(e => e.name == "actSave")?.enabled(true);
                                that.actions.getActions().find(e => e.name == "actTisk")?.enabled(true);
                            }
                            else {
                                that.actions.getActions().find(e => e.name == "actSave")?.enabled(false);
                                that.actions.getActions().find(e => e.name == "actTisk")?.enabled(true);
                            }
                        }
                        else
                            that.printed = false;
                    }
                    else {
                        that.actions.getActions().find(e => e.name == "actSave")?.enabled(false);
                        that.actions.getActions().find(e => e.name == "actTisk")?.enabled(false);
                    }
                }
                /** Tisk */
                tisk() {
                    var that = this;
                    var model = {};
                    that.findFields().gfield("model", "collect", model);
                    var def = $.Deferred();
                    // Zjistím si saldo případu
                    that.beginOperation({ id: "saldoPripadu", text: "Načítání salda případu..." });
                    that.isl.PripadSpravce.saldoPripadu({ ixp: that.ixp, dat_do: model.date, typ_salda: 10, nap: 1 }).get()
                        .done((saldo) => {
                        def.resolve(saldo);
                    }).always(() => {
                        that.endOperation({ id: "saldoPripadu" });
                    });
                    def.done((saldo) => {
                        // Získali jsme saldo, můžeme tisknout
                        const actTiskPredaniSpravci = GAction.createPrintAction({
                            name: "actTiskPredaniSpravci",
                            tema: "ddp_ptm_predspr",
                            customDto: {
                                ixp: that.ixp,
                                castka: saldo,
                                cis_spr: model.cis_spr.cis_spr,
                                nazev: model.cis_spr.nazev,
                                datumOd: that.dat_pocatek,
                                datumDo: model.date,
                                poznamka: model.poznamka,
                                rok_den: that.RokDen,
                                ixp_den: that.IxpDen
                            },
                            // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                            serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:TiskPredaniSpravci", //zde se plní téma
                            reportFinished: function () {
                                that.printed = true;
                                that.povoleni();
                            },
                            dialogClosed: function () { }
                        });
                        actTiskPredaniSpravci.run();
                    });
                }
                /** Uložit / Provést */
                ok() {
                    var that = this;
                    if (that.findForms("sprPredForm").gform("isValid")) {
                        var model = {};
                        that.findFields().gfield("model", "collect", model);
                        that.close({ model: model });
                    }
                }
            };
            GPripadSprPred = __decorate([
                Decorators.gcontent
            ], GPripadSprPred);
            WebClient.GPripadSprPred = GPripadSprPred;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFNwclByZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJpcGFkU3ByUHJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWlMZjtBQWpMRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpTG5CO0lBakxnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpTDdCO1FBakxvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQWFJLHdCQUF3QjtvQkFDeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztnQkFnSzdCLENBQUM7Z0JBOUpHOzs7bUJBR0c7Z0JBQ0gsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxLQUFLOzRCQUNkLE9BQU8sRUFBRSxNQUFNOzRCQUNmLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDOUIsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsS0FBSzs0QkFDZCxPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFF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akQsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO3dCQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDakMsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQTlLWSxjQUFjO2dCQUQxQixVQUFVLENBQUMsUUFBUTtlQUNQLGNBQWMsQ0E4SzFCO1lBOUtZLHdCQUFjLGlCQThLMUIsQ0FBQTtRQUNMLENBQUMsRUFqTG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlMN0I7SUFBRCxDQUFDLEVBakxnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpTG5CO0FBQUQsQ0FBQyxFQWpMUyxNQUFNLEtBQU4sTUFBTSxRQWlMZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkU3ByUHJlZC50cyAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRm9ybXVsw6HFmSBwxZllZMOhbsOtIHNwcsOhdmNpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMC0zMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHsgIFxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJpcGFkU3ByUHJlZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciAqL1xyXG4gICAgICAgIGl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBEYXR1bSBwb8SNw6F0a3UgcMWZw61wYWR1ICAqL1xyXG4gICAgICAgIGRhdF9wb2NhdGVrOiBhbnk7XHJcbiAgICAgICAgLyoqIMSMw61zbG8gc3Byw6F2Y2UgLSBla29wYXJhbXMgKi9cclxuICAgICAgICBDaXNTcHI6IHN0cmluZztcclxuICAgICAgICAvKiogUm9rIC0gZWtvcGFyYW1zICovXHJcbiAgICAgICAgUm9rRGVuOiBudW1iZXJcclxuICAgICAgICAvKiogS25paGEgLSBla29wYXJhbXMgKi9cclxuICAgICAgICBJeHBEZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqIEJ5bG8gamnFviB0aXNrbnV0byAqL1xyXG4gICAgICAgIHByaW50ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIbGF2bsOtIG1ldG9kYSBwcm8gaW5pY2lhbGl6YWNpIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIG9uQ29udGVudFJlYWR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGF0LnRpc2soKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RUaXNrXCIsIFwiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5zZXREYXRlQm94U2hvcnRjdXRzKHRoYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBobGF2bsOtaG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUZvcm0oKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRm9ybXMuRm9ybX0gLSBWcmFjw60gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInNwclByZWRGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk5vdsO9IHNwcsOhdmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnNwcmF2Y2UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzX3NwclwiLCAvLyBzcHJcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaW50ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3ZvbGVuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZZXbDqXN0IGsgZGF0dVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmludGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucG92b2xlbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaW50ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3ZvbGVuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbWFpbkZvcm0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFpbkZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmFzdGF2w60gLyBaa29udHJvbHVqZSBwb3ZvbGVuw60gdGxhxI3DrXRlayAqL1xyXG4gICAgICAgIHBvdm9sZW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuZGF0ZSAhPSBudWxsICYmIG1vZGVsLmNpc19zcHIuY2lzX3NwciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuY2lzX3Nwci5jaXNfc3ByLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wcmludGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFNhdmVcIik/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFRpc2tcIik/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RTYXZlXCIpPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmdldEFjdGlvbnMoKS5maW5kKGUgPT4gZS5uYW1lID09IFwiYWN0VGlza1wiKT8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoYXQucHJpbnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmdldEFjdGlvbnMoKS5maW5kKGUgPT4gZS5uYW1lID09IFwiYWN0U2F2ZVwiKT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RUaXNrXCIpPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFRpc2sgKi9cclxuICAgICAgICB0aXNrKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtb2RlbCk7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBaamlzdMOtbSBzaSBzYWxkbyBwxZnDrXBhZHVcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInNhbGRvUHJpcGFkdVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBzYWxkYSBwxZnDrXBhZHUuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3ByYXZjZS5zYWxkb1ByaXBhZHUoeyBpeHA6IHRoYXQuaXhwLCBkYXRfZG86IG1vZGVsLmRhdGUsIHR5cF9zYWxkYTogMTAsIG5hcDogMSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHNhbGRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoc2FsZG8pO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInNhbGRvUHJpcGFkdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkZWYuZG9uZSgoc2FsZG8pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFrDrXNrYWxpIGpzbWUgc2FsZG8sIG3Fr8W+ZW1lIHRpc2tub3V0XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RUaXNrUHJlZGFuaVNwcmF2Y2kgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tQcmVkYW5pU3ByYXZjaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiZGRwX3B0bV9wcmVkc3ByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRHRvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc3RrYTogc2FsZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpc19zcHI6IG1vZGVsLmNpc19zcHIuY2lzX3NwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXY6IG1vZGVsLmNpc19zcHIubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtT2Q6IHRoYXQuZGF0X3BvY2F0ZWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtRG86IG1vZGVsLmRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvem5hbWthOiBtb2RlbC5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RlbjogdGhhdC5Sb2tEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuSXhwRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyDihpMgTWV0b2RhLCBrdGVyw6EgamUgemF2b2zDoW5hIHTEm3NuxJsgcMWZZWQgZ2VuZXJvdsOhbsOtbSBzZXN0YXZ5IGEga2RlIGx6ZSBuYSBzdHJhbsSbIHNlcnZlcnUgb3ZsaXZuaXQgcGFyYW1ldHJ5IHNlc3Rhdnkg4oaTXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOlRpc2tQcmVkYW5pU3ByYXZjaVwiLCAgLy96ZGUgc2UgcGxuw60gdMOpbWFcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaW50ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvdm9sZW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dDbG9zZWQ6IGZ1bmN0aW9uICgpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrUHJlZGFuaVNwcmF2Y2kucnVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVWxvxb5pdCAvIFByb3bDqXN0ICovXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQuZmluZEZvcm1zKFwic3ByUHJlZEZvcm1cIikuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWw6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG1vZGVsKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBtb2RlbDogbW9kZWwgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
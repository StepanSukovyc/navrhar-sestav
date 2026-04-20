"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GRedistribuce.cs                       </Name>
//    <Description> Formulář redistribuce pro detail                            </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-08-01                                                  </Created>
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
            let GRedistribuce = class GRedistribuce extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Přínzak zda proběhl tisk */
                    this.prizPrint = false;
                }
                /**
                * Hlavní metoda pro inicializaci okna
                * @method onContentReady
                */
                onContentReady() {
                    const that = this;
                    that.createActions();
                    that.createCommandBar();
                    that.createForm();
                }
                /** Definice akcí */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actTisk: {
                            name: "actTisk",
                            caption: "Tisk",
                            icon: "gi-print",
                            enabled: false, // Tlačítko bude aktivní až po vybrání zpracovatele
                            run: function () {
                                that.tiskPredani();
                            }
                        },
                        actSave: {
                            name: "actSave",
                            caption: "Předat",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok(); // Metoda pro uložení dat / validaci / předání dat a zavření okna v případě úspěchu metody.
                            }
                        },
                        actClose: {
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                that.close(); // Zavření okna
                            }
                        }
                    });
                }
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.commandBar(that.actions.createBar(["actTisk", "actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře při možnosti 1 (jedno datum)
                 * @method createMode1Form()
                 */
                createForm() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ name: "redistForm", layoutDescriptor: "L1M1S1 L-2-8-2, M-2-8-2, S-12-12-0" })
                        .addSection()
                        .addRow({ label: "Zpracovatel" })
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpGinsfun(), {
                        name: "ixs_fun",
                        model: "ixs_fun=ixs_fun",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            typ_phl: that.typPhl,
                            aktivita: 100
                        },
                        change: (ev, obj) => {
                            if (obj.value && that.prizSpr && that.prizDdp) {
                                var ixsFun = obj.value.ixs_fun;
                                // pokud je správcovský typ pohledávky,
                                // tak zjistíme zda má zpracovatel přístup ke správcům
                                // a pokud ne, tak hodíme hlášku? a pokud jich je víc,
                                // tak zaktivníme vyběr správce
                                that.beginOperation({ id: "pristupKeSpravci", text: "Probíhá kontrola přístupu ke správcům..." });
                                that.isl.Redistribuce.pristupKeSpravci({ ixsFun: obj.value.ixs_fun ?? "" })
                                    .get().done((result) => {
                                    that.endOperation({ id: "pristupKeSpravci" });
                                    if (result == 0) {
                                        // nemá žádné přístupné správce
                                        that.findForms("pripadForm").findFields("cis_spr").gfield("reset");
                                        that.findForms("pripadForm").findFields("cis_spr").gfield("disable");
                                        that.dialogs.alert("Upozornění", "Vybraná funkce nemá přístup k žádnému správci.");
                                    }
                                    else if (result > 1) {
                                        // má více přístupných správců, tak zobrazíme výběr správce
                                        var filter = {
                                            typ_phl: that.typPhl,
                                            ixs_fun: ixsFun ?? ""
                                        };
                                        var view = new Gordic.Isl.View(that.isl.Redistribuce.listSpravci(rq => {
                                            return {
                                                filters: filter
                                            };
                                        }));
                                        var grid = $('div[data-form="pripadForm"] .gform-field.ggrid');
                                        grid.ggrid("setData", view);
                                    }
                                });
                            }
                            if (that.actions.actTisk) {
                                if (obj.value)
                                    that.actions.actTisk.enabled(true);
                                else
                                    that.actions.actTisk.enabled(false);
                            }
                        }
                    });
                    // Typ pohledávky je správcovský, tak zobrazíme formulář pro správce - pouze na případech DDP
                    if (that.prizSpr == 1 && that.prizDdp) {
                        form
                            .addSection({ name: "gridSection" })
                            .addRow()
                            .addField("ggrid", {
                            data: [],
                            rowHeight: 30,
                            columns: Gordic.Ddp.WebClient.Common.GridFormats.SpravciProPredani(),
                            showTopPanel: false,
                            showBottomPanel: true
                        });
                    }
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                /** OK */
                ok() {
                    const that = this;
                    if (!that.form.gform("isValid")) {
                        return;
                    }
                    var ixsFun = that.findFields("ixs_fun").gfield("getValue").ixs_fun;
                    // Kontrola, příznaku tisku
                    if (!that.prizPrint) {
                        var confirmTitle = "Předávací protokol";
                        var confirmMessage = "Prozatím nebyl vytištěn předávací protokol. Přejete si pokračovat?";
                        that.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                            .on("close", (_ev, retVal) => {
                            if (retVal === "yes") {
                                that.close({ ixsFun });
                            }
                            else {
                                return;
                            }
                        });
                    }
                    else
                        that.close({ ixsFun });
                }
                /** Tisk předání */
                tiskPredani() {
                    const that = this;
                    var ixsFunField = that.findFields("ixs_fun").gfield("getValue");
                    var ixsFun;
                    var ixsFunNazev;
                    if (ixsFunField != null && ixsFunField != undefined) {
                        ixsFun = ixsFunField.ixs_fun;
                        ixsFunNazev = ixsFunField.nazev_rf;
                    }
                    else {
                        that.showFlash("Není možné tisknout, není vybrán zpracovatel!", "error");
                        return;
                    }
                    const actTiskPredani = GAction.createPrintAction({
                        name: "actTiskPredani",
                        tema: "wfl_ptm_hromprd",
                        customDto: {
                            ixp_den: that.ixpDen,
                            rok_den: that.rokDen,
                            ixs_fun: ixsFun,
                            nazev: ixsFunNazev
                        },
                        // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:TiskPredani", //zde se plní téma
                        reportFinished: function () {
                            that.prizPrint = true;
                        },
                        dialogClosed: function () {
                        }
                    });
                    actTiskPredani.run();
                }
            };
            GRedistribuce = __decorate([
                Decorators.gcontent
            ], GRedistribuce);
            WebClient.GRedistribuce = GRedistribuce;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JlZGlzdHJpYnVjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdSZWRpc3RyaWJ1Y2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0EwTmY7QUExTkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBME5uQjtJQTFOZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBME43QjtRQTFOb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFnQkksK0JBQStCO29CQUMvQixjQUFTLEdBQVksS0FBSyxDQUFDO2dCQXNNL0IsQ0FBQztnQkFyTUc7OztrQkFHRTtnQkFDRixjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELG9CQUFvQjtnQkFDcEIsYUFBYTtvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUNqQjt3QkFDSSxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLE1BQU07NEJBQ2YsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxLQUFLLEVBQUUsbURBQW1EOzRCQUNuRSxHQUFHLEVBQUU7Z0NBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUN2QixDQUFDO3lCQUNKO3dCQUNELE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVB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LGtCQUFrQjt3QkFDMUYsY0FBYyxFQUFFOzRCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUMxQixDQUFDO3dCQUNELFlBQVksRUFBRTt3QkFDZCxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7YUFDSixDQUFBO1lBdk5ZLGFBQWE7Z0JBRHpCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsYUFBYSxDQXVOekI7WUF2TlksdUJBQWEsZ0JBdU56QixDQUFBO1FBQ0wsQ0FBQyxFQTFOb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBME43QjtJQUFELENBQUMsRUExTmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBObkI7QUFBRCxDQUFDLEVBMU5TLE1BQU0sS0FBTixNQUFNLFFBME5mIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdSZWRpc3RyaWJ1Y2UuY3MgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBGb3JtdWzDocWZIHJlZGlzdHJpYnVjZSBwcm8gZGV0YWlsICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDgtMDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSZWRpc3RyaWJ1Y2UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKiogRm9ybXVsw6HFmSAqL1xyXG4gICAgICAgIGZvcm06IEpRdWVyeTtcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgKi9cclxuICAgICAgICBpeHA6IHN0cmluZztcclxuICAgICAgICAvKiogVHlwIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgdHlwUGhsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEtuaWhhICovXHJcbiAgICAgICAgaXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFJvayAqL1xyXG4gICAgICAgIHJva0Rlbjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgc3Byw6F2Y2UgKi9cclxuICAgICAgICBwcml6U3ByOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayB6ZGEgc2UgamVkbsOhIG8gcMWZw61wYWQgRERQICovXHJcbiAgICAgICAgcHJpekRkcDogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBQxZnDrW56YWsgemRhIHByb2LEm2hsIHRpc2sgKi9cclxuICAgICAgICBwcml6UHJpbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICogQG1ldGhvZCBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIERlZmluaWNlIGFrY8OtICovXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGlzazoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIC8vIFRsYcSNw610a28gYnVkZSBha3Rpdm7DrSBhxb4gcG8gdnlicsOhbsOtIHpwcmFjb3ZhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza1ByZWRhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZllZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKCk7IC8vIE1ldG9kYSBwcm8gdWxvxb5lbsOtIGRhdCAvIHZhbGlkYWNpIC8gcMWZZWTDoW7DrSBkYXQgYSB6YXbFmWVuw60gb2tuYSB2IHDFmcOtcGFkxJsgw7pzcMSbY2h1IG1ldG9keS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpOyAvLyBaYXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBjb21tYW5kIGJhcnUgcyB0bGHEjcOtdGt5IHBybyB1bG/FvmVuw60gYSB6YXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ29tbWFuZEJhcigpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFRpc2tcIiwgXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIHDFmWkgbW/Fvm5vc3RpIDEgKGplZG5vIGRhdHVtKVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlTW9kZTFGb3JtKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJyZWRpc3RGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMi04LTIsIE0tMi04LTIsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiWnByYWNvdmF0ZWxcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwR2luc2Z1bigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2Z1bj1peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgJiYgdGhhdC5wcml6U3ByICYmIHRoYXQucHJpekRkcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c0Z1biA9IG9iai52YWx1ZS5peHNfZnVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgc3Byw6F2Y292c2vDvSB0eXAgcG9obGVkw6F2a3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWsgemppc3TDrW1lIHpkYSBtw6EgenByYWNvdmF0ZWwgcMWZw61zdHVwIGtlIHNwcsOhdmPFr21cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgcG9rdWQgbmUsIHRhayBob2TDrW1lIGhsw6HFoWt1PyBhIHBva3VkIGppY2ggamUgdsOtYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhayB6YWt0aXZuw61tZSB2eWLEm3Igc3Byw6F2Y2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJwcmlzdHVwS2VTcHJhdmNpXCIsIHRleHQ6IFwiUHJvYsOtaMOhIGtvbnRyb2xhIHDFmcOtc3R1cHUga2Ugc3Byw6F2Y8WvbS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUmVkaXN0cmlidWNlLnByaXN0dXBLZVNwcmF2Y2koeyBpeHNGdW46IG9iai52YWx1ZS5peHNfZnVuID8/IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwcmlzdHVwS2VTcHJhdmNpXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVtw6Egxb7DoWRuw6kgcMWZw61zdHVwbsOpIHNwcsOhdmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcInByaXBhZEZvcm1cIikuZmluZEZpZWxkcyhcImNpc19zcHJcIikuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcInByaXBhZEZvcm1cIikuZmluZEZpZWxkcyhcImNpc19zcHJcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVwb3pvcm7Em27DrVwiLCBcIlZ5YnJhbsOhIGZ1bmtjZSBuZW3DoSBwxZnDrXN0dXAgayDFvsOhZG7DqW11IHNwcsOhdmNpLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbcOhIHbDrWNlIHDFmcOtc3R1cG7DvWNoIHNwcsOhdmPFrywgdGFrIHpvYnJhesOtbWUgdsO9YsSbciBzcHLDoXZjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW46IGl4c0Z1biA/PyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuUmVkaXN0cmlidWNlLmxpc3RTcHJhdmNpKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZCA9ICQoJ2RpdltkYXRhLWZvcm09XCJwcmlwYWRGb3JtXCJdIC5nZm9ybS1maWVsZC5nZ3JpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWN0aW9ucy5hY3RUaXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlKSB0aGF0LmFjdGlvbnMuYWN0VGlzay5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGF0LmFjdGlvbnMuYWN0VGlzay5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyBUeXAgcG9obGVkw6F2a3kgamUgc3Byw6F2Y292c2vDvSwgdGFrIHpvYnJhesOtbWUgZm9ybXVsw6HFmSBwcm8gc3Byw6F2Y2UgLSBwb3V6ZSBuYSBwxZnDrXBhZGVjaCBERFBcclxuICAgICAgICAgICAgaWYgKHRoYXQucHJpelNwciA9PSAxICYmIHRoYXQucHJpekRkcCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJncmlkU2VjdGlvblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlNwcmF2Y2lQcm9QcmVkYW5pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogT0sgKi9cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZm9ybS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGl4c0Z1biA9IHRoYXQuZmluZEZpZWxkcyhcIml4c19mdW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikuaXhzX2Z1bjtcclxuXHJcbiAgICAgICAgICAgIC8vIEtvbnRyb2xhLCBwxZnDrXpuYWt1IHRpc2t1XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5wcml6UHJpbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlDFmWVkw6F2YWPDrSBwcm90b2tvbFwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1NZXNzYWdlID0gXCJQcm96YXTDrW0gbmVieWwgdnl0acWhdMSbbiBwxZllZMOhdmFjw60gcHJvdG9rb2wuIFDFmWVqZXRlIHNpIHBva3JhxI1vdmF0P1wiO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oY29uZmlybVRpdGxlLCBjb25maXJtTWVzc2FnZSwgNDAwLCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBpeHNGdW4gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgdGhhdC5jbG9zZSh7IGl4c0Z1biB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaXNrIHDFmWVkw6Fuw60gKi9cclxuICAgICAgICBwcml2YXRlIHRpc2tQcmVkYW5pKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBpeHNGdW5GaWVsZCA9IHRoYXQuZmluZEZpZWxkcyhcIml4c19mdW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBpeHNGdW46IHN0cmluZztcclxuICAgICAgICAgICAgdmFyIGl4c0Z1bk5hemV2OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmIChpeHNGdW5GaWVsZCAhPSBudWxsICYmIGl4c0Z1bkZpZWxkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaXhzRnVuID0gaXhzRnVuRmllbGQuaXhzX2Z1bjtcclxuICAgICAgICAgICAgICAgIGl4c0Z1bk5hemV2ID0gaXhzRnVuRmllbGQubmF6ZXZfcmY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lbsOtIG1vxb5uw6kgdGlza25vdXQsIG5lbsOtIHZ5YnLDoW4genByYWNvdmF0ZWwhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdFRpc2tQcmVkYW5pID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tQcmVkYW5pXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcIndmbF9wdG1faHJvbXByZFwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tRHRvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5peHBEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgcm9rX2RlbjogdGhhdC5yb2tEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bjogaXhzRnVuLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hemV2OiBpeHNGdW5OYXpldlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIOKGkyBNZXRvZGEsIGt0ZXLDoSBqZSB6YXZvbMOhbmEgdMSbc27EmyBwxZllZCBnZW5lcm92w6Fuw61tIHNlc3RhdnkgYSBrZGUgbHplIG5hIHN0cmFuxJsgc2VydmVydSBvdmxpdm5pdCBwYXJhbWV0cnkgc2VzdGF2eSDihpNcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwV2ViVGlzazpUaXNrUHJlZGFuaVwiLCAgLy96ZGUgc2UgcGxuw60gdMOpbWFcclxuICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcml6UHJpbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpYWxvZ0Nsb3NlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFjdFRpc2tQcmVkYW5pLnJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
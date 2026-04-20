"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVazbaUkonceniDatum.ts                 </Name>
//    <Description> Okno pro ukončení vazby poplatníka (zadání data a částky)   </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-20                                                  </Created>
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
            /**
             * Okno pro ukončení vazby poplatníka (zadání data a částky)
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-03-20
             * @lastModified 2025-03-20
             */
            let GVazbaUkonceniDatum = class GVazbaUkonceniDatum extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createCommandBar();
                    that.createActions();
                    that.createForm();
                    // try to input value into form
                    if (that.Data) {
                        that.Datum = that.Data.DatumUkonceniVazby ?? new Date();
                        that.Castka = new Decimal(that.Data.CastkaUkonceniVazby ?? 0);
                        that.PrevestDluh = that.Data.PrevestDluh ?? true;
                    }
                    that.defaultForm.findFields("fDatum").gfield("setValue", that.Datum ?? new Date());
                    that.defaultForm.findFields("fCastka").gfield("setValue", that.Castka ?? new Decimal(0));
                    that.defaultForm.findFields("fPrevestDluh").gfield("setValue", that.PrevestDluh ?? true);
                }
                //#region S E S T A V E N Í   O K N A 
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok();
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                that.close();
                            }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GVazbaUkonceniDatumForm" });
                    //#region form
                    mainForm
                        .addSection({ name: "GVazbaUkonceniDatumSection" })
                        .addRow({ label: "K datu", required: true })
                        .addField("gdatebox", {
                        name: "fDatum",
                        defaultValue: new Date(),
                        validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) { }
                    })
                        .addRow("Částka")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "fCastka",
                        change: function (ev, input) { }
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "fPrevestDluh",
                        label: "Převést dluh",
                        change: function (ev, input) { }
                    });
                    //#endregion
                    that.defaultForm = $("<div>").appendTo(that.element).gform("createFrom", mainForm);
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                    return mainForm;
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                /**
                 * Vytvoří tlačítko nad seznamem kontrol
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavritPotomkyContentu: {
                            name: "actZavritPotomkyContentu",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                    });
                }
                ok() {
                    const that = this;
                    if (!that.defaultForm.gform("isValid"))
                        return;
                    else {
                        let data = {};
                        that.defaultForm.findFields().gfield("model", "collect", data);
                        that.close(data);
                    }
                }
            };
            GVazbaUkonceniDatum = __decorate([
                Decorators.gcontent
            ], GVazbaUkonceniDatum);
            WebClient.GVazbaUkonceniDatum = GVazbaUkonceniDatum;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ZhemJhVWtvbmNlbmlEYXR1bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWYXpiYVVrb25jZW5pRGF0dW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0F1SWY7QUF2SUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdUluQjtJQXZJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdUk3QjtRQXZJb0IsV0FBQSxTQUFTO1lBQzFCOzs7Ozs7ZUFNRztZQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQU9qRCxpQ0FBaUM7Z0JBRWpDOzs7bUJBR0c7Z0JBQ0gsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbEIsK0JBQStCO29CQUMvQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztvQkFDckQsQ0FBQztvQkFDRCxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsQ0FB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QUFOLE1BQU0sUUF1SWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ZhemJhVWtvbmNlbmlEYXR1bS50cyAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHVrb27EjWVuw60gdmF6YnkgcG9wbGF0bsOta2EgKHphZMOhbsOtIGRhdGEgYSDEjcOhc3RreSkgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAzLTIwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBPa25vIHBybyB1a29uxI1lbsOtIHZhemJ5IHBvcGxhdG7DrWthICh6YWTDoW7DrSBkYXRhIGEgxI3DoXN0a3kpICBcclxuICAgICAqIEBhdXRob3IgTWFydGluIEhhbnXFoVxyXG4gICAgICogQGNvcHlyaWdodCDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjZcclxuICAgICAqIEBjcmVhdGVkIDIwMjUtMDMtMjBcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNS0wMy0yMFxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWYXpiYVVrb25jZW5pRGF0dW0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuICAgICAgICBwcml2YXRlIERhdGE6IEludGVyZmFjZS5HRGRwUHJlaGxlZFBsYXRjdUR0byB8IG51bGw7XHJcbiAgICAgICAgcHJpdmF0ZSBEYXR1bTogRGF0ZSB8IEpzb25EYXRlO1xyXG4gICAgICAgIHByaXZhdGUgQ2FzdGthOiBEZWNpbWFsO1xyXG4gICAgICAgIHByaXZhdGUgUHJldmVzdERsdWg6IEJvb2xlYW47XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJ5IHRvIGlucHV0IHZhbHVlIGludG8gZm9ybVxyXG4gICAgICAgICAgICBpZiAodGhhdC5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LkRhdHVtID0gdGhhdC5EYXRhLkRhdHVtVWtvbmNlbmlWYXpieSA/PyBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5DYXN0a2EgPSBuZXcgRGVjaW1hbCh0aGF0LkRhdGEuQ2FzdGthVWtvbmNlbmlWYXpieSA/PyAwKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuUHJldmVzdERsdWggPSB0aGF0LkRhdGEuUHJldmVzdERsdWggPz8gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiZkRhdHVtXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuRGF0dW0gPz8gbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJmQ2FzdGthXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuQ2FzdGthID8/IG5ldyBEZWNpbWFsKDApKTtcclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcImZQcmV2ZXN0RGx1aFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LlByZXZlc3REbHVoID8/IHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEEgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBjb21tYW5kIGJhcnUgcyB0bGHEjcOtdGt5IHBybyB1bG/FvmVuw60gYSB6YXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ29tbWFuZEJhcigpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZSBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUZvcm0oKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRm9ybXMuRm9ybX0gLSBWcmFjw60gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdWYXpiYVVrb25jZW5pRGF0dW1Gb3JtXCIgfSk7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBmb3JtXHJcbiAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiR1ZhemJhVWtvbmNlbmlEYXR1bVNlY3Rpb25cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIksgZGF0dVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZkRhdHVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZkNhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZlByZXZlc3REbHVoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUMWZZXbDqXN0IGRsdWhcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbWFpbkZvcm0pO1xyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5zZXREYXRlQm94U2hvcnRjdXRzKHRoYXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFpbkZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBIEMgVCBJIE8gTiBTIC0gViBZIFQgViBPIMWYIEUgTiDDjSAgQSAgRCBFIEYgSSBOIEkgQyBFXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIHRsYcSNw610a28gbmFkIHNlem5hbWVtIGtvbnRyb2wgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdFBvdG9ta3lDb250ZW50dTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFBvdG9ta3lDb250ZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSAgICAgIFxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBBIEMgVCBJIE8gTiBTIC0gViBZIFQgViBPIMWYIEUgTiDDjSAgQSAgRCBFIEYgSSBOIEkgQyBFXHJcbiAgICB9XHJcbn0iXX0=
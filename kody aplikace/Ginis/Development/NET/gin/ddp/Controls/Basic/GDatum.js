"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDatum.ts                                      </Name>
//    <Description> Multifunkční okno pro vybrání datumu | Vybírá se podle DateBoxMode  </Description>
//    <Author>      Hanus                                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                                    </Copyright>
//    <Created>     2024-10-17                                                          </Created>
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
            let GDatum = 
            /**
             * Multifunkční okno pro vybrání datumu | Vybírá se podle DateBoxMode
             * 1 = výběr jednoho datumu,
             * 2 = výběr datumu OD - DO
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-03-20
             * @lastModified 2025-03-20
             */
            class GDatum extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.validateOtherField = true;
                }
                /**
                  * Hlavní metoda pro inicializaci okna
                  * @method onContentReady
                  */
                onContentReady() {
                    const that = this;
                    that.createTitle();
                    that.createCommandBar();
                    switch (that.DateBoxMode) {
                        case 2:
                            this.createMode2Form();
                            break;
                        case 1:
                        default:
                            this.createMode1Form();
                            break;
                    }
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                /**
                 * Metoda pro nastavení titulku okna
                 * @method createTitle()
                 */
                createTitle() {
                    const that = this;
                    if (that.title == null || that.title == undefined || that.title.length == 0) {
                        switch (that.DateBoxMode) {
                            case 2:
                                that.title = `Výběr data od do`;
                                break;
                            case 1:
                            default:
                                that.title = `Výběr datumu`;
                                break;
                        }
                    }
                }
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: that.SaveName || "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok(); // Metoda pro uložení dat / validaci / předání dat a zavření okna v případě úspěchu metody.
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                that.close(); // Zavření okna
                            }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře při možnosti 1 (jedno datum)
                 * @method createMode1Form()
                 */
                createMode1Form() {
                    const that = this;
                    that.DatumName = that.DatumName || "Datum";
                    that.form = $.newDiv().appendTo(that.element).gform("createFrom", new Gordic.Forms.Form({ name: "GDatumForm", layoutDescriptor: "L1M1S1" })
                        .addRow(that.DatumName).addField("gdatebox", {
                        name: "datum",
                        defaultValue: new Date(),
                    }));
                    that.form.findFields("datum").gfield("setValue", that.Datum ?? new Date());
                }
                /**
                 * Metoda pro vytvoření formuláře při možnosti 2 (Od-do)
                 * @method createMode2Form()
                 */
                createMode2Form() {
                    const that = this;
                    let fromGreaterThenToValidator = new Gordic.Validators.Base();
                    fromGreaterThenToValidator.getMessage = (value) => {
                        return "Datum od musí být menší než datum do";
                    };
                    fromGreaterThenToValidator.validate = (value, source) => {
                        if (!that.findFields("datum_od").gfield("hasValue") || !that.findFields("datum_do").gfield("hasValue"))
                            return true;
                        let dat_od = that.findFields("datum_od").gfield("getValue");
                        let dat_do = that.findFields("datum_do").gfield("getValue");
                        let ret = dat_od <= dat_do;
                        if (that.validateOtherField) {
                            that.validateOtherField = false;
                            that.getOtherField(source).gfield("validate");
                        }
                        that.validateOtherField = !ret;
                        return ret;
                    };
                    let validators = [new Gordic.Validators.Required()];
                    if (that.DatumMin || that.DatumMax) {
                        validators.push(new Gordic.Validators.Range({ min: that.DatumMin, max: that.DatumMax }));
                    }
                    validators.push(fromGreaterThenToValidator);
                    that.form = $.newDiv().appendTo(that.element).gform("createFrom", new Gordic.Forms.Form({ name: "GDatumForm", layoutDescriptor: "L1M1S1" })
                        .addSection("jres:33900001") //RC 33900001 : Zvolte období
                        .addRow("Od").addField("gdatebox", {
                        name: "datum_od",
                        validators: validators
                    })
                        .addRow("Do").addField("gdatebox", {
                        name: "datum_do",
                        validators: validators
                    }));
                    that.form.findFields("datum_od", "datum_do").gfield("model", "apply", { datum_od: that.DatumOd, datum_do: that.DatumDo });
                }
                getOtherField(field) {
                    const that = this;
                    let field1 = that.form.findFields("datum_od");
                    let field2 = that.form.findFields("datum_do");
                    if (field[0] === field1[0])
                        return field2;
                    else
                        return field1;
                }
                ok() {
                    const that = this;
                    switch (that.DateBoxMode) {
                        case 2:
                            if (that.form.gform("isValid")) {
                                let datum_od = new Date(that.form.findFields("datum_od").gfield("getValue"));
                                let datum_do = new Date(that.form.findFields("datum_do").gfield("getValue"));
                                that.close({ datum_od, datum_do });
                            }
                            break;
                        case 1:
                        default:
                            var datum = that.form.findFields("datum").gfield("getValue");
                            that.close({ datum: datum });
                            break;
                    }
                }
            };
            GDatum = __decorate([
                Decorators.gcontent
                /**
                 * Multifunkční okno pro vybrání datumu | Vybírá se podle DateBoxMode
                 * 1 = výběr jednoho datumu,
                 * 2 = výběr datumu OD - DO
                 * @author Martin Hanuš
                 * @copyright © GORDIC spol. s r. o. 1993-2026
                 * @created 2025-03-20
                 * @lastModified 2025-03-20
                 */
            ], GDatum);
            WebClient.GDatum = GDatum;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdHVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdHVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsK0ZBQStGO0FBQy9GLHNHQUFzRztBQUN0RyxpR0FBaUc7QUFDakcsb0dBQW9HO0FBQ3BHLGtHQUFrRztBQUNsRyxpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBdU1mO0FBdk1ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVNbkI7SUF2TWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVNN0I7UUF2TW9CLFdBQUEsU0FBUztZQVcxQixJQUFhLE1BQU07WUFUbkI7Ozs7Ozs7O2VBUUc7WUFDSCxNQUFhLE1BQU8sU0FBUSxPQUFBLFlBQVk7Z0JBQXhDOztvQkFlSSx1QkFBa0IsR0FBWSxJQUFJLENBQUM7Z0JBNEt2QyxDQUFDO2dCQTFLRzs7O29CQUdJO2dCQUNKLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDOzRCQUNGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs0QkFDdkIsTUFBTTt3QkFDVixLQUFLLENBQUMsQ0FBQzt3QkFDUDs0QkFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7NEJBQ3ZCLE1BQU07b0JBQ2QsQ0FBQztvQkFFRCxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCxXQUFXO29CQUNQLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMs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Ly8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEYXR1bS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE11bHRpZnVua8SNbsOtIG9rbm8gcHJvIHZ5YnLDoW7DrSBkYXR1bXUgfCBWeWLDrXLDoSBzZSBwb2RsZSBEYXRlQm94TW9kZSAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTAtMTcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICAvKipcclxuICAgICAqIE11bHRpZnVua8SNbsOtIG9rbm8gcHJvIHZ5YnLDoW7DrSBkYXR1bXUgfCBWeWLDrXLDoSBzZSBwb2RsZSBEYXRlQm94TW9kZSAgXHJcbiAgICAgKiAxID0gdsO9YsSbciBqZWRub2hvIGRhdHVtdSwgXHJcbiAgICAgKiAyID0gdsO9YsSbciBkYXR1bXUgT0QgLSBET1xyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNlxyXG4gICAgICogQGNyZWF0ZWQgMjAyNS0wMy0yMFxyXG4gICAgICogQGxhc3RNb2RpZmllZCAyMDI1LTAzLTIwXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHRGF0dW0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICBcclxuICAgICAgICBmb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgRGF0ZUJveE1vZGU6IG51bWJlcjsgLy8gMSA9IHbDvWLEm3IgMSBkYXRhLCAyID0gdsO9YsSbciBvZC1kb1xyXG4gICAgICAgIFNhdmVOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vIFbDvWLEm3IgamVkbm9obyBkYXRhOlxyXG4gICAgICAgIERhdHVtOiBEYXRlO1xyXG4gICAgICAgIERhdHVtTmFtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICAvLyBWw71ixJtyIE9kLWRvXHJcbiAgICAgICAgRGF0dW1PZDogRGF0ZTtcclxuICAgICAgICBEYXR1bURvOiBEYXRlO1xyXG4gICAgICAgIERhdHVtTWluOiBEYXRlIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIERhdHVtTWF4OiBEYXRlIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhbGlkYXRlT3RoZXJGaWVsZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBIbGF2bsOtIG1ldG9kYSBwcm8gaW5pY2lhbGl6YWNpIG9rbmFcclxuICAgICAgICAgICogQG1ldGhvZCBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVRpdGxlKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoYXQuRGF0ZUJveE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGUyRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGUxRm9ybSgpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbW1vbi5CYXNlLnNldERhdGVCb3hTaG9ydGN1dHModGhhdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gdGl0dWxrdSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVUaXRsZSgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlVGl0bGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC50aXRsZSA9PSBudWxsIHx8IHRoYXQudGl0bGUgPT0gdW5kZWZpbmVkIHx8IHRoYXQudGl0bGUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhhdC5EYXRlQm94TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50aXRsZSA9IGBWw71ixJtyIGRhdGEgb2QgZG9gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50aXRsZSA9IGBWw71ixJtyIGRhdHVtdWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGNvbW1hbmQgYmFydSBzIHRsYcSNw610a3kgcHJvIHVsb8W+ZW7DrSBhIHphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVDb21tYW5kQmFyKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0LlNhdmVOYW1lIHx8IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpOyAvLyBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBkYXQgLyB2YWxpZGFjaSAvIHDFmWVkw6Fuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgcMWZaSBtb8W+bm9zdGkgMSAoamVkbm8gZGF0dW0pXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVNb2RlMUZvcm0oKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZU1vZGUxRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LkRhdHVtTmFtZSA9IHRoYXQuRGF0dW1OYW1lIHx8IFwiRGF0dW1cIjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiR0RhdHVtRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh0aGF0LkRhdHVtTmFtZSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZvcm0uZmluZEZpZWxkcyhcImRhdHVtXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuRGF0dW0gPz8gbmV3IERhdGUoKSk7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgcMWZaSBtb8W+bm9zdGkgMiAoT2QtZG8pXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVNb2RlMkZvcm0oKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZU1vZGUyRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmcm9tR3JlYXRlclRoZW5Ub1ZhbGlkYXRvciA9IG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBmcm9tR3JlYXRlclRoZW5Ub1ZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJEYXR1bSBvZCBtdXPDrSBiw710IG1lbsWhw60gbmXFviBkYXR1bSBkb1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmcm9tR3JlYXRlclRoZW5Ub1ZhbGlkYXRvci52YWxpZGF0ZSA9ICh2YWx1ZSwgc291cmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGF0LmZpbmRGaWVsZHMoXCJkYXR1bV9vZFwiKS5nZmllbGQoXCJoYXNWYWx1ZVwiKSB8fCAhdGhhdC5maW5kRmllbGRzKFwiZGF0dW1fZG9cIikuZ2ZpZWxkKFwiaGFzVmFsdWVcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdF9vZDogRGF0ZSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdHVtX29kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdF9kbzogRGF0ZSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdHVtX2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXQgPSBkYXRfb2QgPD0gZGF0X2RvO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnZhbGlkYXRlT3RoZXJGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmFsaWRhdGVPdGhlckZpZWxkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRPdGhlckZpZWxkKHNvdXJjZSkuZ2ZpZWxkKFwidmFsaWRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC52YWxpZGF0ZU90aGVyRmllbGQgPSAhcmV0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2YWxpZGF0b3JzID0gW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuRGF0dW1NaW4gfHwgdGhhdC5EYXR1bU1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogdGhhdC5EYXR1bU1pbiwgbWF4OiB0aGF0LkRhdHVtTWF4IH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goZnJvbUdyZWF0ZXJUaGVuVG9WYWxpZGF0b3IpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5mb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGF0dW1Gb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM5MDAwMDFcIikgLy9SQyAzMzkwMDAwMSA6IFp2b2x0ZSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9kXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtX29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEb1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bV9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5maW5kRmllbGRzKFwiZGF0dW1fb2RcIiwgXCJkYXR1bV9kb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgZGF0dW1fb2Q6IHRoYXQuRGF0dW1PZCwgZGF0dW1fZG86IHRoYXQuRGF0dW1EbyB9KTsgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0T3RoZXJGaWVsZChmaWVsZDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGZpZWxkMSA9IHRoYXQuZm9ybS5maW5kRmllbGRzKFwiZGF0dW1fb2RcIik7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZDIgPSB0aGF0LmZvcm0uZmluZEZpZWxkcyhcImRhdHVtX2RvXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpZWxkWzBdID09PSBmaWVsZDFbMF0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQyO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoYXQuRGF0ZUJveE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5mb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0dW1fb2QgPSBuZXcgRGF0ZSh0aGF0LmZvcm0uZmluZEZpZWxkcyhcImRhdHVtX29kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdHVtX2RvID0gbmV3IERhdGUodGhhdC5mb3JtLmZpbmRGaWVsZHMoXCJkYXR1bV9kb1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBkYXR1bV9vZCwgZGF0dW1fZG8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0dW0gPSB0aGF0LmZvcm0uZmluZEZpZWxkcyhcImRhdHVtXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBkYXR1bTogZGF0dW0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
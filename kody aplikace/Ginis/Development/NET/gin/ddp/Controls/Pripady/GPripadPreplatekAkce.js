"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadPreplatekAkce.ts                </Name>
//    <Description> Okno pro výběr akce s přeplatkem případu                    </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-23                                                  </Created>
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
             * Okno pro výběr akce s přeplatkem případu (Dialog pro vyber akce pro pripad, ze pripad ma preplatek)
             * @author Hanuš Martin
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-11-23
             * @lastModified 2025-11-23
             */
            let GPripadPreplatekAkce = class GPripadPreplatekAkce extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createCommandBar();
                    that.createForm();
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
                            name: "actNext",
                            caption: "Pokračovat",
                            icon: "fa-floppy-o",
                            run: function () {
                                var retValue = that.findForms().findFields("preplacetAkce").gfield("getValue");
                                switch (retValue) {
                                    case 1: // Vytvoření vratky
                                        that.close(retValue);
                                        break;
                                    case 2: // Hrazeno předem
                                        that.dialogs.confirm("Upozornění", "Chcete opravdu vytvořit předpis s typem pohybu - Pohledávka hrazená předem?")
                                            .on("close", function (ev, result) {
                                            if (result == "yes") {
                                                that.close(retValue);
                                            }
                                            else {
                                                that.close();
                                            }
                                        });
                                        break;
                                    case 0: // Ponechat stávající stav
                                    default:
                                        that.close();
                                        break;
                                }
                                ;
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zrušit",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actNext!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GDdpPripadPreplatekAkceForm" });
                    //#region form
                    mainForm
                        .addSection({ name: "GDdpPripadPreplatekAkceSekceHlavicka" })
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        disabled: true,
                        initialValue: that.Ixp,
                        change: function (ev, input) { }
                    })
                        .addRow("Přeplatek")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "saldo",
                        disabled: true,
                        initialValue: that.Saldo,
                        change: function (ev, input) { }
                    })
                        .addSection({ name: "GDdpPripadPreplatekAkceSekceMoznosti", label: "Způsob zacházení s přeplatkem" })
                        .addRow()
                        .addField("gradio", {
                        name: "preplacetAkce",
                        initialValue: 0,
                        itemClass: "w-12",
                        radios: [
                            { value: 1, label: "Vytvoření vratky" },
                            { value: 2, label: "Hrazeno předem" },
                            { value: 0, label: "Ponechat stávající stav" }
                        ]
                    });
                    //#endregion
                    that.defaultForm = $.newDiv("GDdpPripadPreplatekAkceFormDiv").appendTo(that.element).gform("createFrom", mainForm);
                }
            };
            GPripadPreplatekAkce = __decorate([
                Decorators.gcontent
            ], GPripadPreplatekAkce);
            WebClient.GPripadPreplatekAkce = GPripadPreplatekAkce;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFByZXBsYXRla0FrY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJpcGFkUHJlcGxhdGVrQWtjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQThIZjtBQTlIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E4SG5CO0lBOUhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4SDdCO1FBOUhvQixXQUFBLFNBQVM7WUFDMUI7Ozs7OztlQU1HO1lBRUgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBWWxELGlDQUFpQztnQkFFakM7OzttQkFHRztnQkFDSCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxzQ0FBc0M7Z0JBQ3RDOzs7bUJBR0c7Z0JBQ0gsZ0JBQWdCO29CQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxZQUFZOzRCQUNyQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFO2dDQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUMvRSxRQUFRLFFBQVEsRUFBRSxDQUFDO29DQUNmLEtBQUssQ0FB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RUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFO3lCQUNqRDtxQkFDSixDQUFDLENBQ0Q7b0JBQ0wsWUFBWTtvQkFDWixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZILENBQUM7YUFNSixDQUFBO1lBcEhZLG9CQUFvQjtnQkFEaEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxvQkFBb0IsQ0FvSGhDO1lBcEhZLDhCQUFvQix1QkFvSGhDLENBQUE7UUFDTCxDQUFDLEVBOUhvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4SDdCO0lBQUQsQ0FBQyxFQTlIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOEhuQjtBQUFELENBQUMsRUE5SFMsTUFBTSxLQUFOLE1BQU0sUUE4SGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZFByZXBsYXRla0FrY2UudHMgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHbDvWLEm3IgYWtjZSBzIHDFmWVwbGF0a2VtIHDFmcOtcGFkdSAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMS0yMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogT2tubyBwcm8gdsO9YsSbciBha2NlIHMgcMWZZXBsYXRrZW0gcMWZw61wYWR1IChEaWFsb2cgcHJvIHZ5YmVyIGFrY2UgcHJvIHByaXBhZCwgemUgcHJpcGFkIG1hIHByZXBsYXRlaykgXHJcbiAgICAgKiBAYXV0aG9yIEhhbnXFoSBNYXJ0aW5cclxuICAgICAqIEBjb3B5cmlnaHQgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2XHJcbiAgICAgKiBAY3JlYXRlZCAyMDI1LTExLTIzXHJcbiAgICAgKiBAbGFzdE1vZGlmaWVkIDIwMjUtMTEtMjNcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJpcGFkUHJlcGxhdGVrQWtjZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBQaWQgUMWZw61wYWR1IEREUCAqL1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBTYWxkbyBwxZnDrXBhZHUgKi9cclxuICAgICAgICBTYWxkbzogRGVjaW1hbDtcclxuXHJcbiAgICAgICAgLyoqIFBhcmFtZXRyeSBhcGxpa2FjZSAqL1xyXG4gICAgICAgIHByaXZhdGUgUGFyYW1zOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGRwUGFyYW1ldHJ5RHRvO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGxhdm7DrSBtZXRvZGEgcHJvIGluaWNpYWxpemFjaSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gY29tbWFuZCBiYXJ1IHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbW1hbmRCYXIoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9rcmHEjW92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IHRoYXQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInByZXBsYWNldEFrY2VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gVnl0dm/FmWVuw60gdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyZXRWYWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogLy8gSHJhemVubyBwxZllZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgXCJDaGNldGUgb3ByYXZkdSB2eXR2b8WZaXQgcMWZZWRwaXMgcyB0eXBlbSBwb2h5YnUgLSBQb2hsZWTDoXZrYSBocmF6ZW7DoSBwxZllZGVtP1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyZXRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IC8vIFBvbmVjaGF0IHN0w6F2YWrDrWPDrSBzdGF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfSAvLyBaYXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0TmV4dCFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZSBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUZvcm0oKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRm9ybXMuRm9ybX0gLSBWcmFjw60gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiR0RkcFByaXBhZFByZXBsYXRla0FrY2VGb3JtXCIgfSk7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBmb3JtXHJcbiAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiR0RkcFByaXBhZFByZXBsYXRla0FrY2VTZWtjZUhsYXZpY2thXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZZXBsYXRla1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYWxkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5TYWxkbyxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJHRGRwUHJpcGFkUHJlcGxhdGVrQWtjZVNla2NlTW96bm9zdGlcIiwgbGFiZWw6IFwiWnDFr3NvYiB6YWNow6F6ZW7DrSBzIHDFmWVwbGF0a2VtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZXBsYWNldEFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctMTJcIixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwiVnl0dm/FmWVuw60gdnJhdGt5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6IFwiSHJhemVubyBwxZllZGVtXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwiUG9uZWNoYXQgc3TDoXZhasOtY8OtIHN0YXZcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkLm5ld0RpdihcIkdEZHBQcmlwYWRQcmVwbGF0ZWtBa2NlRm9ybURpdlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEFcclxuXHJcbiAgICAgICBcclxuICAgIH1cclxufSJdfQ==
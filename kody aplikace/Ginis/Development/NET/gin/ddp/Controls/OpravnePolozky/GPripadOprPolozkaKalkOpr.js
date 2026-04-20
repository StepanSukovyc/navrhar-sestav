"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadOprPolozkaKalkOpr.ts        </Name>
//    <Description> Kalk. Opr. Opravné položky případu                          </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-13                                                  </Created>
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
             * Okno pro Kalk. Opr. Opravné položky případu
             * @author Martni Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-07-13
             * @lastModified 2025-04-22
             */
            let GPripadOprPolozkaKalkOpr = class GPripadOprPolozkaKalkOpr extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S 
                onContentReady() {
                    const that = this;
                    that.createActions();
                    that.createForm();
                    that.createGrid();
                }
                //#region S E S T A V E N Í   O K N A
                /**
                 * Vytvoření jednotlivých akcí a nastavenáí command baru
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok(); // Zavolání metody ok() pro uložení dat
                                //that.ulozit().done(() => { that.close(); }) // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        },
                        {
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        },
                        {
                            name: "actZavritPotomkyContentu",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actDefaultGridAction",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                // let row = that.grid.ggrid<Ddp.Interface.GNázevDtočkaPouživanémVgridu>("activeRow")
                                // let rows = that.grid.ggrid<Ddp.Interface.GNázevDtočkaPouživanémVgridu>("getSelection")[0];
                                if (!row)
                                    return that.dialogs.warning("Není vybrán žádný řádek.");
                                // else code here what to do . . . 
                            }
                        },
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GPripadOprPolozkaKalkOprForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0," });
                    //#region form
                    mainForm
                        //.addSection({ name: "SekceFormuláře" })
                        //.addRow("Identifikátor")
                        //.addField("gstringbox", Prefabs.String.ixs(true), {
                        //    name: "ixp",
                        //    change: function (ev, input) { }
                        //})
                        ///////////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////////
                        .addSection()
                        // TODO add names
                        .addRow("Od")
                        .addField("gdatebox", "w-12", {
                        name: "",
                        initialValue: this.DatOd
                    })
                        .addRow("Do")
                        .addField("gdatebox", "w-12", {
                        name: "",
                        initialValue: this.DatDo
                    })
                        .addRow("Stavajíci výše opr. pol.")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: ""
                    })
                        .addRow("Celková výše opr. pol.")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: ""
                    })
                        .addRow("Datum výpočtu opr. pol.")
                        .addField("gdatebox", "w-12", {
                        name: ""
                    })
                        .addSection()
                        .addRow("Počátačený stav")
                        .addField("gnumberbox", "w-12", {
                        name: ""
                    })
                        .addRow()
                        .addText("Předpisy", "w-3")
                        .addText("Uhrazeno", "w-3")
                        .addText("Dluh", "w-3")
                        .addText("Přeplatek", "w-3")
                        .addRow()
                        .addField("gnumberbox", "w-3", {
                        name: ""
                    })
                        .addField("gnumberbox", "w-3", {
                        name: ""
                    })
                        .addField("gnumberbox", "w-3", {
                        name: ""
                    })
                        .addField("gnumberbox", "w-3", {
                        name: ""
                    })
                        .addRow("Celkem")
                        .addField("gnumberbox", "w-3", {
                        name: ""
                    })
                        .addField("gnumberbox", "w-6", {
                        name: ""
                    })
                        .addField("gnumberbox", "w-3", {
                        name: ""
                    })
                        .addRow()
                        .addField("gcheck", "w-12", {
                        name: "",
                        label: "Oprava předpisů minulých let.",
                    })
                        .addSection()
                        .addRow("Popis")
                        .addField("gstringbox", "w-12", {
                        name: ""
                    })
                        .addSection()
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", {
                        name: ""
                    });
                    //#endregion
                    that.defaultForm = $.newDiv("GPripadOprPolozkaKalkOprFormDiv").appendTo(that.element).gform("createFrom", mainForm);
                }
                /**
                 * Metoda pro vytvoření a definování seznamu (=gridu)
                 * @method createGrid()
                 * @returns {void} - Ukončení metody void
                 */
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv("GPripadOprPolozkaKalkOprGridDiv")
                        .appendTo(that.element)
                        .gautofit();
                    that.grid.ggrid({
                        name: "GPripadOprPolozkaKalkOprGrid",
                        defaultAction: that.actions["actDefaultGridAction"],
                        defaultProfile: {
                        //columnList: "ixp",
                        //condFormats: [
                        //    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, 100))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                        //]
                        },
                        columns: Ddp.WebClient.Common.GridFormats.KalkOprPolozek()
                    });
                }
                //#endregion S E S T A V E N Í   O K N A
                ok() {
                    const forms = this.element.findForms();
                    // TODO create DTO
                    const data = {};
                    forms.findFields().gfield("model", "collect", data);
                    console.log("form data passnuté do detail okna: ", JSON.stringify(data));
                    // this.beginOperation("Probíhá ukládaní symbolu");
                    // ISL
                }
            };
            GPripadOprPolozkaKalkOpr = __decorate([
                Decorators.gcontent
            ], GPripadOprPolozkaKalkOpr);
            WebClient.GPripadOprPolozkaKalkOpr = GPripadOprPolozkaKalkOpr;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZE9wclBvbG96a2FLYWxrT3ByLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZE9wclBvbG96a2FLYWxrT3ByLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsbUZBQW1GO0FBQ25GLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBd05mO0FBeE5ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdObkI7SUF4TmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdON0I7UUF4Tm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7O2VBTUc7WUFFSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLE9BQUEsWUFBWTtnQkFTdEQsaUNBQWlDO2dCQUVqQyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxxQ0FBcUM7Z0JBRXJDOzs7O21CQUlHO2dCQUNLLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCOzRCQUNJLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLHVDQUF1QztnQ0FDbEQscUdBQXFHOzRCQUN6RyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7eUJBQ3JEO3dCQUNEOzRCQUNJLElBQUksRUFBRSwwQkFBMEI7NEJBQ2hDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7NEJBQ25DLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHNCQUFzQjs0QkFDNUIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDdkMscUZBQXFGO2dDQUNyRiw2RkFBNkY7Z0NBQzdGLElBQUksQ0FBQyxHQUFHO29DQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQ0FDbEUsbUNBQW1DOzRCQUN2QyxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFHSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNLLFVBQVU7b0JBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQztvQkFDekksY0FBYztvQkFDZCxRQUFRO3dCQUNKLHlDQUF5Qzt3QkFDekMsMEJBQTBCO3dCQUMxQixxREFBcUQ7d0JBQ3JELGtCQUFrQjt3QkFDbEIsc0NBQXNDO3dCQUN0QyxJQUFJO3dCQUNKLDJFQUEyRTt3QkFDM0UsMkVBQTJFO3lCQUMxRSxVQUFVLEVBQUU7d0JBQ2IsaUJBQWlCO3lCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO3lCQUNaLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFO3dCQUMxQixJQUFJLEVBQUUsRUFBRTt3QkFDUixZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUs7cUJBQzNCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzt5QkFDWixRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRTt3QkFDMUIsSUFBSSxFQUFFLEVBQUU7d0JBQ1IsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLO3FCQUMzQixDQUFDO3lCQUNELE1BQU0sQ0FBQywwQkFBMEIsQ0FBQzt5QkFDbEMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUN2RCxJQUFJLEVBQUUsRUFBRTtxQkFDWCxDQUFDO3lCQUNELE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQzt5QkFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUN2RCxJQUFJLEVBQUUsRUFBRTtxQkFDWCxDQUFDO3lCQUNELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQzt5QkFDakMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUU7d0JBQzFCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBRUQsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDekIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUU7d0JBQzVCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBRUQsTUFBTSxFQUFFO3lCQUNSLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO3lCQUMxQixPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQzt5QkFDMUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7eUJBQ3RCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDO3lCQUMzQixNQUFNLEVBQUU7eUJBQ1IsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQzt5QkFDaEIsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxFQUFFO3FCQUNYLENBQUM7eUJBRUQsTUFBTSxFQUFFO3lCQUNSLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFO3dCQUN4QixJQUFJLEVBQUUsRUFBRTt3QkFDUixLQUFLLEVBQUUsK0JBQStCO3FCQUN6QyxDQUFDO3lCQUVELFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsT0FBTyxDQUFDO3lCQUNmLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFO3dCQUM1QixJQUFJLEVBQUUsRUFBRTtxQkFDWCxDQUFDO3lCQUNELFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsVUFBVSxDQUFDO3lCQUNsQixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTt3QkFDNUIsSUFBSSxFQUFFLEVBQUU7cUJBQ1gsQ0FBQyxDQUVEO29CQUNMLFlBQVk7b0JBQ1osSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4SCxDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNLLFVBQVU7b0JBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUM7eUJBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUUsQ0FBQztvQkFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ1osSUFBSSxFQUFFLDhCQUE4Qjt3QkFDcEMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7d0JBQ25ELGNBQWMsRUFBRTt3QkFDWixvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsMElBQTBJO3dCQUMxSSxHQUFHO3lCQUNOO3dCQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO3FCQUM3RCxDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFDRCx3Q0FBd0M7Z0JBRXhDLEVBQUU7b0JBQ0UsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFFdkMsa0JBQWtCO29CQUNsQixNQUFNLElBQUksR0FBUSxFQUFFLENBQUM7b0JBRXJCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBRXpFLG1EQUFtRDtvQkFFbkQsTUFBTTtnQkFDVixDQUFDO2FBQ0osQ0FBQTtZQTlNWSx3QkFBd0I7Z0JBRHBDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asd0JBQXdCLENBOE1wQztZQTlNWSxrQ0FBd0IsMkJBOE1wQyxDQUFBO1FBQ0wsQ0FBQyxFQXhOb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd043QjtJQUFELENBQUMsRUF4TmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdObkI7QUFBRCxDQUFDLEVBeE5TLE1BQU0sS0FBTixNQUFNLFFBd05mIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRPcHJQb2xvemthS2Fsa09wci50cyAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEthbGsuIE9wci4gT3ByYXZuw6kgcG9sb8W+a3kgcMWZw61wYWR1ICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTA3LTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBPa25vIHBybyBLYWxrLiBPcHIuIE9wcmF2bsOpIHBvbG/Fvmt5IHDFmcOtcGFkdSAgIFxyXG4gICAgICogQGF1dGhvciBNYXJ0bmkgSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNlxyXG4gICAgICogQGNyZWF0ZWQgMjAyNS0wNy0xM1xyXG4gICAgICogQGxhc3RNb2RpZmllZCAyMDI1LTA0LTIyXHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByaXBhZE9wclBvbG96a2FLYWxrT3ByIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcbiAgICAgICAgLyoqIEdyaWQgKHNlem5hbSkgICBcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PD59ICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIEl4cDogU3RyaW5nO1xyXG4gICAgICAgIERhdE9kOiBEYXRlO1xyXG4gICAgICAgIERhdERvOiBEYXRlO1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTIFxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEFcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gamVkbm90bGl2w71jaCBha2PDrSBhIG5hc3RhdmVuw6HDrSBjb21tYW5kIGJhcnVcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUFjdGlvbnMoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpOyAvLyBaYXZvbMOhbsOtIG1ldG9keSBvaygpIHBybyB1bG/FvmVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC51bG96aXQoKS5kb25lKCgpID0+IHsgdGhhdC5jbG9zZSgpOyB9KSAvLyBVbG/FvmVuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH0gLy8gWmF2xZllbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RaYXZyaXRQb3RvbWt5Q29udGVudHVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZWZhdWx0R3JpZEFjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcm93ID0gdGhhdC5ncmlkLmdncmlkPERkcC5JbnRlcmZhY2UuR07DoXpldkR0b8SNa2FQb3XFvml2YW7DqW1WZ3JpZHU+KFwiYWN0aXZlUm93XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCByb3dzID0gdGhhdC5ncmlkLmdncmlkPERkcC5JbnRlcmZhY2UuR07DoXpldkR0b8SNa2FQb3XFvml2YW7DqW1WZ3JpZHU+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdykgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSDFmcOhZGVrLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBjb2RlIGhlcmUgd2hhdCB0byBkbyAuIC4gLiBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlRm9ybSgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHUHJpcGFkT3ByUG9sb3prYUthbGtPcHJGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTAsXCIgfSk7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBmb3JtXHJcbiAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKHsgbmFtZTogXCJTZWtjZUZvcm11bMOhxZllXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGFkZCBuYW1lc1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLkRhdE9kXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLkRhdERvXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXZhasOtY2kgdsO9xaFlIG9wci4gcG9sLlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQ2Vsa292w6EgdsO9xaFlIG9wci4gcG9sLlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdsO9cG/EjXR1IG9wci4gcG9sLlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb8SNw6F0YcSNZW7DvSBzdGF2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUMWZZWRwaXN5XCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlVocmF6ZW5vXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRsdWhcIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUMWZZXBsYXRla1wiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJDZWxrZW1cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiT3ByYXZhIHDFmWVkcGlzxa8gbWludWzDvWNoIGxldC5cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9ICQubmV3RGl2KFwiR1ByaXBhZE9wclBvbG96a2FLYWxrT3ByRm9ybURpdlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGEgZGVmaW5vdsOhbsOtIHNlem5hbXUgKD1ncmlkdSlcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUdyaWQoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJC5uZXdEaXYoXCJHUHJpcGFkT3ByUG9sb3prYUthbGtPcHJHcmlkRGl2XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJHUHJpcGFkT3ByUG9sb3prYUthbGtPcHJHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3REZWZhdWx0R3JpZEFjdGlvblwiXSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2x1bW5MaXN0OiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogJ05PVChFUVVBTFMoQGFrdGl2aXRhLCAxMDApKScsIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5saWdodGdyYXkgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5LYWxrT3ByUG9sb3playgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtcyA9IHRoaXMuZWxlbWVudC5maW5kRm9ybXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE8gY3JlYXRlIERUT1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1zLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvcm0gZGF0YSBwYXNzbnV0w6kgZG8gZGV0YWlsIG9rbmE6IFwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHVrbMOhZGFuw60gc3ltYm9sdVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElTTFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
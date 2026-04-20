"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDdpVzor.ts                            </Name>
//    <Description> Vzor pro .ts soubory v projektu                             </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-##-##                                                  </Created>
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
             * Okno pro #######################
             * @author ### ###
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2026-##-##
             * @lastModified 2026-##-##
             */
            let GDdpVzor = class GDdpVzor extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createActions();
                    that.createForm();
                    that.createGrid();
                }
                //#region S E S T A V E N Í   O K N A 
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GDdpFormNazev" });
                    //#region form
                    mainForm
                        .addSection({ name: "SekceFormuláře" })
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        change: function (ev, input) { }
                    });
                    //#endregion
                    that.defaultForm = $.newDiv( /*ID*/).appendTo(that.element).gform("createFrom", mainForm);
                    return mainForm;
                }
                /**
                 * Metoda pro vytvoření a definování seznamu (=gridu)
                 * @method createGrid()
                 * @returns {void} - Ukončení metody void
                 */
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv( /*ID*/)
                        .appendTo(that.element)
                        .gautofit();
                    that.grid.ggrid({
                        name: "grid",
                        defaultAction: that.actions["actDefaultGridAction"],
                        defaultProfile: {
                            columnList: "ixp",
                            //condFormats: [
                            //    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, 100))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                            //]
                        },
                        columns: Ddp.WebClient.Common.GridFormats.vzor()
                    });
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region D E F I N I C E   A K C Í   A   C O M M A N D  B A R U
                /**
                 * Metoda pro definicí akci contentu a definici command baru
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    // definice jednotlivých akcí
                    that.actions.addRange([
                        {
                            name: "actZavritPotomkyContentu",
                            description: "Defaultní okno pro zavření contentu.", //! OBSOLETE
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actSave",
                            caption: "Uložit", // nebo OK
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ulozit().done(() => { that.close(); }); // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        },
                        {
                            name: "actClose",
                            caption: "Zavřít", // nebo Konec
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        },
                        {
                            name: "actDefaultGridAction",
                            run: () => {
                                const here = this;
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
                //#endregion D E F I N I C E   A K C Í   A   C O M M A N D  B A R U
                //#region M E T O D Y   C O N T E N T U
                /**
                 * Metoda pro uložení dat z obsahu
                 * @method ulozit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozit() {
                    const that = this;
                    //var def = $.Deferred<void>();                                            // Vytvoření promisu
                    //that.beginOperation({ id: "opSaveContentLoading", text: "Ukládám..." }); // Zobrazení dialogu s načítáním
                    //that.isl.NazevTridyISLu.islMetodaProUlozeni({ data: dataKuloženi })      // Zavolání ISL metody k uložení dat lhůty
                    //    .get()
                    //    .done(function (ret) {                                               // V případě úspěchu
                    //        that.endOperation({ id: "opSaveContentLoading" });               // Ukončení dialogu s načítáním
                    //        return def.resolve();                                            // Vrací promise_resolve = úspěch
                    //    })
                    //    .fail(function (jqXHR, typ, obj) {                                   // V případě chyby
                    //        that.endOperation({ id: "opSaveContentLoading" });               // Ukončení dialogu s načítáním
                    //        if (typ === "exception") {                                       // V případě výjimky
                    //            obj.handled = true;                                          // Nastavení výjimky jako ošetřené
                    //            that.dialogs.error("Chyba", obj.baseMessage)                 // Zobrazení dialogu s chybou
                    //                .on("close", (ev, retVal) => {                           // Po zavření dialogu
                    //                    return def.reject();                                 // Vrací promise_reject = chyba
                    //                });
                    //        }
                    //        else { return def.reject(); }                                    // Vrací promise_reject = chyba (i když se nejedná o ošetřenou vyjímku)
                    //    });
                    //return def.promise();                                                    // Vrací promise
                    return $.Deferred().resolve().promise(); // Jestliže není potřeba volat ISL metodu, vracím zde rovnou promise + resolve
                }
            };
            GDdpVzor = __decorate([
                Decorators.gcontent
            ], GDdpVzor);
            WebClient.GDdpVzor = GDdpVzor;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RkcFZ6b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGRwVnpvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQThKZjtBQTlKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E4Sm5CO0lBOUpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4SjdCO1FBOUpvQixXQUFBLFNBQVM7WUFDMUI7Ozs7OztlQU1HO1lBRUgsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFNdEMsaUNBQWlDO2dCQUVqQzs7O21CQUdHO2dCQUNILGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELHNDQUFzQztnQkFDdEM7Ozs7bUJBSUc7Z0JBQ0ssVUFBVTtvQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDaEUsY0FBYztvQkFDZCxRQUFRO3lCQUNILFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3lCQUN0QyxNQUFNLENBQUMsZUFBZSxDQUFDO3lCQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlDLElB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QW1FO2dCQUVuRSx1Q0FBdUM7Z0JBQ3ZDOzs7O21CQUlHO2dCQUNILE1BQU07b0JBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQiwrRkFBK0Y7b0JBQy9GLDJHQUEyRztvQkFDM0cscUhBQXFIO29CQUNySCxZQUFZO29CQUNaLCtGQUErRjtvQkFDL0YsMEdBQTBHO29CQUMxRyw0R0FBNEc7b0JBQzVHLFFBQVE7b0JBQ1IsNkZBQTZGO29CQUM3RiwwR0FBMEc7b0JBQzFHLCtGQUErRjtvQkFDL0YsNkdBQTZHO29CQUM3Ryx3R0FBd0c7b0JBQ3hHLGdHQUFnRztvQkFDaEcsMEdBQTBHO29CQUMxRyxxQkFBcUI7b0JBQ3JCLFdBQVc7b0JBQ1gsa0pBQWtKO29CQUNsSixTQUFTO29CQUNULDJGQUEyRjtvQkFDM0YsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyw4RUFBOEU7Z0JBQ2pJLENBQUM7YUFFSixDQUFBO1lBcEpZLFFBQVE7Z0JBRHBCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsUUFBUSxDQW9KcEI7WUFwSlksa0JBQVEsV0FvSnBCLENBQUE7UUFDTCxDQUFDLEVBOUpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4SjdCO0lBQUQsQ0FBQyxFQTlKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOEpuQjtBQUFELENBQUMsRUE5SlMsTUFBTSxLQUFOLE1BQU0sUUE4SmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFZ6b3IudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFZ6b3IgcHJvIC50cyBzb3Vib3J5IHYgcHJvamVrdHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjYtIyMtIyMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIE9rbm8gcHJvICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjICAgXHJcbiAgICAgKiBAYXV0aG9yICMjIyAjIyNcclxuICAgICAqIEBjb3B5cmlnaHQgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2XHJcbiAgICAgKiBAY3JlYXRlZCAyMDI2LSMjLSMjXHJcbiAgICAgKiBAbGFzdE1vZGlmaWVkIDIwMjYtIyMtIyNcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGRwVnpvciBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTIFxyXG4gICAgICAgIC8qKiBHcmlkIChzZXpuYW0pICAgXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeTw+fSAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvLyNlbmRyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGxhdm7DrSBtZXRvZGEgcHJvIGluaWNpYWxpemFjaSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkZvcm1zLkZvcm19IC0gVnJhY8OtIGZvcm11bMOhxZlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGRwRm9ybU5hemV2XCIgfSk7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBmb3JtXHJcbiAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiU2VrY2VGb3JtdWzDocWZZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkLm5ld0RpdigvKklEKi8pLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG1haW5Gb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5Gb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBhIGRlZmlub3bDoW7DrSBzZXpuYW11ICg9Z3JpZHUpXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVHcmlkKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQubmV3RGl2KC8qSUQqLylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRcIixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdERlZmF1bHRHcmlkQWN0aW9uXCJdLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogJ05PVChFUVVBTFMoQGFrdGl2aXRhLCAxMDApKScsIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5saWdodGdyYXkgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy52em9yKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEFcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEQgRSBGIEkgTiBJIEMgRSAgIEEgSyBDIMONICAgQSAgIEMgTyBNIE0gQSBOIEQgIEIgQSBSIFVcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIGRlZmluaWPDrSBha2NpIGNvbnRlbnR1IGEgZGVmaW5pY2kgY29tbWFuZCBiYXJ1XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgamVkbm90bGl2w71jaCBha2PDrVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2cml0UG90b21reUNvbnRlbnR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVmYXVsdG7DrSBva25vIHBybyB6YXbFmWVuw60gY29udGVudHUuXCIsIC8vISBPQlNPTEVURVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIiwgLy8gbmVibyBPS1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96aXQoKS5kb25lKCgpID0+IHsgdGhhdC5jbG9zZSgpOyB9KSAvLyBVbG/FvmVuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLCAvLyBuZWJvIEtvbmVjXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGVmYXVsdEdyaWRBY3Rpb25cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8RGRwLkludGVyZmFjZS5HTsOhemV2RHRvxI1rYVBvdcW+aXZhbsOpbVZncmlkdT4oXCJhY3RpdmVSb3dcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJvd3MgPSB0aGF0LmdyaWQuZ2dyaWQ8RGRwLkludGVyZmFjZS5HTsOhemV2RHRvxI1rYVBvdcW+aXZhbsOpbVZncmlkdT4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm93KSByZXR1cm4gdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGNvZGUgaGVyZSB3aGF0IHRvIGRvIC4gLiAuIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb24gRCBFIEYgSSBOIEkgQyBFICAgQSBLIEMgw40gICBBICAgQyBPIE0gTSBBIE4gRCAgQiBBIFIgVVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gTSBFIFQgTyBEIFkgICBDIE8gTiBUIEUgTiBUIFVcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBkYXQgeiBvYnNhaHUgXHJcbiAgICAgICAgICogQG1ldGhvZCB1bG96aXQoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlIDxVa29uxI1lbsOtIG1ldG9keSB2b2lkPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHVsb3ppdCgpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIHByb21pc3VcclxuICAgICAgICAgICAgLy90aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwib3BTYXZlQ29udGVudExvYWRpbmdcIiwgdGV4dDogXCJVa2zDoWTDoW0uLi5cIiB9KTsgLy8gWm9icmF6ZW7DrSBkaWFsb2d1IHMgbmHEjcOtdMOhbsOtbVxyXG4gICAgICAgICAgICAvL3RoYXQuaXNsLk5hemV2VHJpZHlJU0x1LmlzbE1ldG9kYVByb1Vsb3plbmkoeyBkYXRhOiBkYXRhS3Vsb8W+ZW5pIH0pICAgICAgLy8gWmF2b2zDoW7DrSBJU0wgbWV0b2R5IGsgdWxvxb5lbsOtIGRhdCBsaMWvdHlcclxuICAgICAgICAgICAgLy8gICAgLmdldCgpXHJcbiAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFYgcMWZw61wYWTEmyDDunNwxJtjaHVcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib3BTYXZlQ29udGVudExvYWRpbmdcIiB9KTsgICAgICAgICAgICAgICAvLyBVa29uxI1lbsOtIGRpYWxvZ3UgcyBuYcSNw610w6Fuw61tXHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWPDrSBwcm9taXNlX3Jlc29sdmUgPSDDunNwxJtjaFxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgY2h5YnlcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib3BTYXZlQ29udGVudExvYWRpbmdcIiB9KTsgICAgICAgICAgICAgICAvLyBVa29uxI1lbsOtIGRpYWxvZ3UgcyBuYcSNw610w6Fuw61tXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIHbDvWppbWt5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gdsO9amlta3kgamFrbyBvxaFldMWZZW7DqVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSkgICAgICAgICAgICAgICAgIC8vIFpvYnJhemVuw60gZGlhbG9ndSBzIGNoeWJvdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvIHphdsWZZW7DrSBkaWFsb2d1XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWPDrSBwcm9taXNlX3JlamVjdCA9IGNoeWJhXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWxzZSB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZV9yZWplY3QgPSBjaHliYSAoaSBrZHnFviBzZSBuZWplZG7DoSBvIG/FoWV0xZllbm91IHZ5asOtbWt1KVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8dm9pZD4oKS5yZXNvbHZlKCkucHJvbWlzZSgpOyAvLyBKZXN0bGnFvmUgbmVuw60gcG90xZllYmEgdm9sYXQgSVNMIG1ldG9kdSwgdnJhY8OtbSB6ZGUgcm92bm91IHByb21pc2UgKyByZXNvbHZlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBNIEUgVCBPIEQgWSAgIEMgTyBOIFQgRSBOIFQgVVxyXG4gICAgfVxyXG59Il19
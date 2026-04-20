"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadOprPolozkaRozpisVypoctu.ts    </Name>
//    <Description> Rozpis výpočtu opravné položky případu                    </Description>
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
            let GPripadOprPolozkaRozpisVypoctu = class GPripadOprPolozkaRozpisVypoctu extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.createActions();
                    that.createMenuBars();
                    that.createGrid();
                    //that.element.findForms().findFields().gfield("model", "apply", { ixp: that.Ixp });
                }
                //#region S E S T A V E N Í   O K N A
                /**
                 * Vytvoří action list a jednotlivé akce
                 * @method createActions()
                 */
                createActions() {
                    this.actions.addRange([
                        {
                            name: "actGOprPolRozpVyp",
                            run: (e) => {
                            }
                        },
                        {
                            name: "actGOprPolRozpVypObcerstvit",
                            run: (e) => {
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření menu barů (hl. menu bar nahoře a command bar s tlačítky pro uložení a zavření okna dole)
                 * @method createMenuBars()
                 */
                createMenuBars() {
                    const that = this;
                    //#region Command bar
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok();
                                //that.ulozit().done(() => { that.close(); }) // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actClose"])); // "actSave!"
                    //#endregion Command bar
                    //#region Menu bar
                    //that.menuBar([
                    //    {
                    //        favorite: true,
                    //        caption: "Občerstvit",
                    //        action: that.actions["actGOprPolRozpVypObcerstvit"]
                    //    }
                    //]);
                    //#endregion Menu bar
                }
                /**
                 * Metoda pro vytvoření a definování seznamu (=gridu)
                 * @method createGrid()
                 * @returns {void} - Ukončení metody void
                 */
                createGrid() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "formFilterRozpisOprPol", tabOptions: { title: "Filtry", opened: true }, layoutDescriptor: "L1M1S1" })
                        .addSection().addRow("Historie výpočtu opravných položek")
                        .addField("gselectbox", {
                        name: "dat_opr",
                        dropdown: true,
                        data: that.DataRozpisuOprPol,
                        initialValue: { dat_opr: null, naz_dat_opr: "Pohled přes všechny data oprav" },
                        model: "dat_opr=dat_opr", // ,naz_dat_opr=naz_dat_opr
                        itemTemplate: "{naz_dat_opr}",
                    });
                    that.filterPanel = $.newDiv("filterPanelRozpisOprPol").appendTo(that.element).
                        gfilterpanel({
                        forms: [mainForm],
                        favorites: "all",
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            obj.filter.ixp = that.Ixp;
                            that.ziskejData(obj.filter);
                        }
                    });
                    that.grid = $.newDiv("divGridRozpisOprPol")
                        .appendTo(that.element)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        name: "ggridRozpisOprPol",
                        defaultAction: that.actions["actGOprPolRozpVyp"],
                        columns: WebClient.Common.GridFormats.RozpisOprPolozek(),
                        //defaultProfile: {
                        //    columnList: "ixp",
                        //    //condFormats: [
                        //    //    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, 100))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                        //    //]
                        //},
                        //data: [] // TODO pass data from Isl.
                    });
                }
                ziskejData(filter) {
                    const that = this;
                    if (!filter)
                        filter = { ixp: that.Ixp };
                    //if (!that.viewOprPolozkaRozpVyp) {
                    that.viewOprPolozkaRozpVyp = new Gordic.Isl.View(that.isl.OpravnePolozky.listRozpisOpravnychPolozek(rq => {
                        return {
                            filters: filter
                            //{
                            //    ixpDdp: that.Ixp,
                            //}
                        };
                    }));
                    that.grid.ggrid("setData", that.viewOprPolozkaRozpVyp);
                    that.viewOprPolozkaRozpVyp.getLoadingPromise().done(function () {
                        let polozky = that.viewOprPolozkaRozpVyp.getDataRows(); //.filter(x => x.radek_uhr! < 0);
                    });
                    //} else {
                    //    that.viewOprPolozkaRozpVyp.requestData().done(function (ret) {
                    //        let polozky = that.viewOprPolozkaRozpVyp.getDataRows(); //.filter(x => x.radek_uhr! < 40);
                    //    });
                    //}
                }
                ok() {
                    const forms = this.element.findForms();
                    // TODO create DTO
                    const dto = {};
                    forms.findFields().gfield("model", "collect", dto);
                    this.beginOperation("Probíhá ukládaní...");
                    // TODO ISL saving
                    this.endOperation();
                }
            };
            GPripadOprPolozkaRozpisVypoctu = __decorate([
                Decorators.gcontent
            ], GPripadOprPolozkaRozpisVypoctu);
            WebClient.GPripadOprPolozkaRozpisVypoctu = GPripadOprPolozkaRozpisVypoctu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZE9wclBvbG96a2FSb3pwaXNWeXBvY3R1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZE9wclBvbG96a2FSb3pwaXNWeXBvY3R1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUscUZBQXFGO0FBQ3JGLDRGQUE0RjtBQUM1Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBMktmO0FBM0tELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJLbkI7SUEzS2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTJLN0I7UUEzS29CLFdBQUEsU0FBUztZQUUxQixJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUErQixTQUFRLE9BQUEsWUFBWTtnQkFRNUQsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLG9GQUFvRjtnQkFDeEYsQ0FBQztnQkFFRCxxQ0FBcUM7Z0JBRXJDOzs7bUJBR0c7Z0JBQ0ssYUFBYTtvQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCOzRCQUNJLElBQUksRUFBRSxtQkFBbUI7NEJBQ3pCLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOzRCQUVYLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLDZCQUE2Qjs0QkFDbkMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7NEJBRVgsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNLLGNBQWM7b0JBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztv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R0FBUSxFQUFFLENBQUM7b0JBRXBCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFFbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUUzQyxrQkFBa0I7b0JBRWxCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQzthQUNKLENBQUE7WUF4S1ksOEJBQThCO2dCQUQxQyxVQUFVLENBQUMsUUFBUTtlQUNQLDhCQUE4QixDQXdLMUM7WUF4S1ksd0NBQThCLGlDQXdLMUMsQ0FBQTtRQUNMLENBQUMsRUEzS29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJLN0I7SUFBRCxDQUFDLEVBM0tnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyS25CO0FBQUQsQ0FBQyxFQTNLUyxNQUFNLEtBQU4sTUFBTSxRQTJLZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkT3ByUG9sb3prYVJvenBpc1Z5cG9jdHUudHMgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFJvenBpcyB2w71wb8SNdHUgb3ByYXZuw6kgcG9sb8W+a3kgcMWZw61wYWR1ICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTA3LTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJpcGFkT3ByUG9sb3prYVJvenBpc1Z5cG9jdHUgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlclBhbmVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlld09wclBvbG96a2FSb3pwVnlwOiBJc2wuVmlldzxEZHAuSW50ZXJmYWNlLkdSb3pwaXNWeXBvY3R1T3ByYXZueWNoUG9sb3pla0R0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBEYXRhUm96cGlzdU9wclBvbDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudUJhcnMoKTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhwOiB0aGF0Lkl4cCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBhY3Rpb24gbGlzdCBhIGplZG5vdGxpdsOpIGFrY2UgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHT3ByUG9sUm96cFZ5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdPcHJQb2xSb3pwVnlwT2JjZXJzdHZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBtZW51IGJhcsWvIChobC4gbWVudSBiYXIgbmFob8WZZSBhIGNvbW1hbmQgYmFyIHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmEgZG9sZSlcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZU1lbnVCYXJzKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXJzKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8jcmVnaW9uIENvbW1hbmQgYmFyXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC51bG96aXQoKS5kb25lKCgpID0+IHsgdGhhdC5jbG9zZSgpOyB9KSAvLyBVbG/FvmVuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH0gLy8gWmF2xZllbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlXCJdKSk7IC8vIFwiYWN0U2F2ZSFcIlxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb24gQ29tbWFuZCBiYXJcclxuICAgICAgICAgICAgLy8jcmVnaW9uIE1lbnUgYmFyXHJcbiAgICAgICAgICAgIC8vdGhhdC5tZW51QmFyKFtcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIk9ixI1lcnN0dml0XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdPcHJQb2xSb3pwVnlwT2JjZXJzdHZpdFwiXVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vXSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBNZW51IGJhclxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBhIGRlZmlub3bDoW7DrSBzZXpuYW11ICg9Z3JpZHUpXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVHcmlkKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUZpbHRlclJvenBpc09wclBvbFwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcIkZpbHRyeVwiLCBvcGVuZWQ6IHRydWUgfSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJIaXN0b3JpZSB2w71wb8SNdHUgb3ByYXZuw71jaCBwb2xvxb5la1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb3ByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC5EYXRhUm96cGlzdU9wclBvbCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgZGF0X29wcjogbnVsbCwgbmF6X2RhdF9vcHI6IFwiUG9obGVkIHDFmWVzIHbFoWVjaG55IGRhdGEgb3ByYXZcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhdF9vcHI9ZGF0X29wclwiLCAvLyAsbmF6X2RhdF9vcHI9bmF6X2RhdF9vcHJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hel9kYXRfb3ByfVwiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhhdC5maWx0ZXJQYW5lbCA9ICQubmV3RGl2KFwiZmlsdGVyUGFuZWxSb3pwaXNPcHJQb2xcIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFttYWluRm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5maWx0ZXIuaXhwID0gdGhhdC5JeHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YShvYmouZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdihcImRpdkdyaWRSb3pwaXNPcHJQb2xcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdncmlkUm96cGlzT3ByUG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R09wclBvbFJvenBWeXBcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlJvenBpc09wclBvbG96ZWsoKSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29sdW1uTGlzdDogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL2NvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6ICdOT1QoRVFVQUxTKEBha3Rpdml0YSwgMTAwKSknLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcubGlnaHRncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9dXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGF0YTogW10gLy8gVE9ETyBwYXNzIGRhdGEgZnJvbSBJc2wuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmaWx0ZXIpIGZpbHRlciA9IHsgaXhwOiB0aGF0Lkl4cCB9XHJcblxyXG4gICAgICAgICAgICAvL2lmICghdGhhdC52aWV3T3ByUG9sb3prYVJvenBWeXApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld09wclBvbG96a2FSb3pwVnlwID0gbmV3IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuR1JvenBpc1Z5cG9jdHVPcHJhdm55Y2hQb2xvemVrRHRvPih0aGF0LmlzbC5PcHJhdm5lUG9sb3preS5saXN0Um96cGlzT3ByYXZueWNoUG9sb3playhycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpeHBEZHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld09wclBvbG96a2FSb3pwVnlwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdPcHJQb2xvemthUm96cFZ5cC5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2xvemt5ID0gdGhhdC52aWV3T3ByUG9sb3prYVJvenBWeXAuZ2V0RGF0YVJvd3MoKTsgLy8uZmlsdGVyKHggPT4geC5yYWRla191aHIhIDwgMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LnZpZXdPcHJQb2xvemthUm96cFZ5cC5yZXF1ZXN0RGF0YSgpLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbGV0IHBvbG96a3kgPSB0aGF0LnZpZXdPcHJQb2xvemthUm96cFZ5cC5nZXREYXRhUm93cygpOyAvLy5maWx0ZXIoeCA9PiB4LnJhZGVrX3VociEgPCA0MCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybXMgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPIGNyZWF0ZSBEVE9cclxuICAgICAgICAgICAgY29uc3QgZHRvOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1zLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgdWtsw6FkYW7DrS4uLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE8gSVNMIHNhdmluZ1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
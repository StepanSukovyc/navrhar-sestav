"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadSymboly.ts                      </Name>
//    <Description> Seznam symbolů SS/VS případu                                </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-09                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            //TODO: Přidat políčko s informací o poplatníkovi
            //!: Vyřešit načítání stavu VS v seznamu (ISL) - zatím řešeno druhým načtením - časem se k tomu třeba někdy (někdo) dostanu
            let GPripadSymboly = class GPripadSymboly extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.Symbols = []; // toto je vložené do data vlastnosti v ggrid.
                }
                onContentReady() {
                    //debugger;
                    const that = this;
                    that.prepareActions();
                    that.prepareGUI();
                    that.element.findForms().findFields().gfield("model", "apply", { ixp: that.Ixp });
                    that.isl.PripadSymboly.zjistiStavVSNaPripadu(rq => { return { data: { ixp: that.Ixp, vs: that.Vs }, fragments: ["*"] }; })
                        .get().done((ret) => {
                        that.element.findForms( /*"nameOfForm*/).findFields("stav").gfield("setValue", ret);
                    });
                    that.ziskejData(that.filterData);
                }
                prepareGUI() {
                    const that = this;
                    that.menuBar([
                        {
                            favorite: true,
                            caption: "Nový",
                            action: that.actions["actGNovySymbol"],
                        },
                        {
                            favorite: true,
                            caption: "Detail",
                            action: that.actions["actGDetailSymbol"],
                        },
                        {
                            favorite: true,
                            caption: "Zrušit",
                            action: that.actions["actGZrusitSymbol"],
                        },
                    ]);
                    let form = new Gordic.Forms.Form({ tabLabel: "" })
                        .addSection()
                        .addRow("Identifikátor")
                        .addField("gstringbox", "w-12", {
                        name: "ixp",
                        initialValue: that.Ixp,
                        disabled: true,
                    })
                        .addRow("VS na kartě")
                        .addField("gstringbox", "w-12", {
                        name: "vs",
                        initialValue: that.Vs,
                        disabled: true,
                    })
                        .addRow("Stav VS")
                        .addField("gstringbox", "w-12", {
                        name: "stav",
                        disabled: true,
                    });
                    that.filter = $.newDiv().appendTo(that.element).
                        gfilterpanel({
                        forms: [form],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            that.filterData = obj.filter;
                            that.ziskejData(obj.filter);
                        }
                    });
                    // TODO that.Selected = that.Symbols[index] kde index by mala byt line ktory sme selectnuly / oznacily.
                    that.grid = $.newDiv().appendTo(that.element).gautofit({ resizersOnTab: false }).ggrid({
                        name: "gridList",
                        columns: WebClient.Common.GridFormats.PripadSymbolyVS(),
                        defaultAction: that.actions["actGDetailSymbol"],
                        defaultProfile: {
                            columnList: "vs, ss, ixp, stav, poznamka, aktivita_txt",
                            condFormats: [
                                { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita_txt, "aktivní"))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                            ]
                        },
                    });
                }
                prepareActions() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGZavritPotomky",
                            run: that.tryCloseAllSignificants
                        },
                        {
                            name: "actGNovySymbol",
                            run: (e) => {
                                //var row = that.grid.ggrid<Gordic.Ddp.Interface.LK.Dto.GPripadSymbolyDto>("getSelection")[0];
                                //if (row == undefined) {
                                //    that.showFlash("Není vybrán žádný záznam!", "g-state-error");
                                //    return;
                                //}
                                const windowOption = {
                                    title: `Detail Symbolu`,
                                    width: 300,
                                    height: 400
                                };
                                var ParamJSON = {
                                    ID: "DDPGPripadSymbolDetail#",
                                    Ixp: that.Ixp,
                                    //Vs: row.vs,
                                    //Ss: row.ss,
                                    Edit: false,
                                };
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Pripady.GPripadSymbolDetail", ParamJSON, windowOption).on("close", (ev, retVal) => {
                                    //akce po uzavření okna, např. refresh gridu atd...
                                    that.ziskejData(that.filterData);
                                    //that.viewData.requestData(); // refreshData....
                                });
                            }
                        },
                        {
                            name: "actGDetailSymbol",
                            run: (e) => {
                                var row = that.grid.ggrid("getSelection")[0];
                                if (row == undefined) {
                                    that.showFlash("Není vybrán žádný záznam!", "error");
                                    return;
                                }
                                const windowOption = {
                                    title: `Detail Symbolu`,
                                    width: 300,
                                    height: 400
                                };
                                var ParamJSON = {
                                    ID: "DDPGPripadSymbolDetail#",
                                    Ixp: row.ixp,
                                    Vs: row.vs,
                                    Ss: row.ss,
                                    Edit: true,
                                };
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Pripady.GPripadSymbolDetail", ParamJSON, windowOption).on("close", (ev, retVal) => {
                                    //akce po uzavření okna, např. refresh gridu atd...
                                    that.ziskejData(that.filterData);
                                });
                            }
                        },
                        {
                            name: "actGZrusitSymbol",
                            run: (e) => {
                                var sel = that.grid.ggrid("getSelection")[0];
                                that.isl.PripadSymboly.odstranVSNaPripadu(sel)
                                    .get()
                                    .done(function (ret) {
                                    that.showFlash("Změny úspěšně uloženy", "success");
                                    that.ziskejData(that.filterData);
                                    //that.viewData.requestData(); // refreshData....
                                    return;
                                })
                                    .fail(function (xhr, type, vobj) {
                                    that.endOperation();
                                    if (type === "exception") {
                                        if (vobj.baseType === "Gordic.General.GArgumentException") {
                                            vobj.handled = true;
                                            that.showFlash(vobj.baseMessage, "error");
                                            //that.showFlash("Něco se nepovedlo", error");
                                        }
                                    }
                                });
                            }
                        },
                    ]);
                }
                /** fce pro získání filtrovaných dat */
                ziskejData(filter) {
                    const that = this;
                    /* if (!filter) */ filter = { ixp: that.Ixp };
                    //that.viewSymboly.requestData(); // refreshData....
                    /*that.viewData.requestData(); // refreshData....*/
                    that.beginOperation("Načítání...");
                    that.isl.PripadSymboly.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get()
                        .done(function (dto) {
                        //Načtu seznam
                        that.viewData = new Gordic.Data.View(dto.data, { key: "ixp" });
                        that.grid.ggrid("setData", that.viewData);
                        //Poté se pokusím získat stavy
                        that.isl.PripadSymboly.zjistiStavyVSNaPripadu(rq => { return { data: dto.data }; })
                            .get().done((ret) => {
                            //Načtu znovu seznam se stavy
                            that.viewData = new Gordic.Data.View(ret, { key: "ixp" });
                            that.grid.ggrid("setData", that.viewData);
                            that.endOperation();
                        })
                            .fail(function (xhr, type, vobj) {
                            that.endOperation();
                            if (type === "exception") {
                                if (vobj.baseType === "Gordic.General.GArgumentException") {
                                    vobj.handled = true;
                                    that.showFlash(vobj.baseMessage, "error");
                                    //that.showFlash("Něco se nepovedlo", error");
                                }
                            }
                        });
                    })
                        .fail(function (xhr, type, vobj) {
                        that.endOperation();
                        if (type === "exception") {
                            if (vobj.baseType === "Gordic.General.GArgumentException") {
                                vobj.handled = true;
                                that.showFlash(vobj.baseMessage, "error");
                                //that.showFlash("Něco se nepovedlo", error");
                            }
                        }
                    });
                    //that.viewSymboly = new Isl.View(that.isl.PripadSymboly.list(
                    //    rq => {
                    //        return {
                    //            filters: filter
                    //        }
                    //    }
                    //));
                    //that.viewSymboly.getLoadingPromise().done(function () {
                    //    let polozky = that.viewSymboly.getDataRows(); //.filter(x => x.radek_uhr! < 0);
                    //    that.isl.PripadSymboly.zjistiStavyVSNaPripadu(rq => { return { data: polozky } })
                    //        .get().done((ret) => {
                    //            //Načtu znovu seznam se stavy
                    //            that.viewSymboly.findByKey( key: "ixp")
                    //            view = new Gordic.Data.View(ret, { key: "ixp" });
                    //            that.grid.ggrid("setData", view);
                    //            that.endOperation();
                    //        })
                    //        .fail(function (xhr, type, vobj) {
                    //            that.endOperation();
                    //            if (type === "exception") {
                    //                if (vobj.baseType === "Gordic.General.GArgumentException") {
                    //                    vobj.handled = true;
                    //                    that.showFlash(vobj.baseMessage, "error");
                    //                    //that.showFlash("Něco se nepovedlo", error");
                    //                }
                    //            }
                    //        });        
                    //});
                }
            };
            GPripadSymboly = __decorate([
                Decorators.gcontent
            ], GPripadSymboly);
            WebClient.GPripadSymboly = GPripadSymboly;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFN5bWJvbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJpcGFkU3ltYm9seS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQXVSZjtBQXZSRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1Um5CO0lBdlJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1UjdCO1FBdlJvQixXQUFBLFNBQVM7WUFFMUIsaURBQWlEO1lBQ2pELDJIQUEySDtZQUczSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQUFoRDs7b0JBQ0ksWUFBTyxHQUFhLEVBQUUsQ0FBQyxDQUFDLDhDQUE4QztnQkErUTFFLENBQUM7Z0JBclFHLGNBQWM7b0JBQ1YsV0FBVztvQkFDWCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUVsRixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUEs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ZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLEtBQUs7Z0JBRVQsQ0FBQzthQUVKLENBQUE7WUFoUlksY0FBYztnQkFEMUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxjQUFjLENBZ1IxQjtZQWhSWSx3QkFBYyxpQkFnUjFCLENBQUE7UUFDTCxDQUFDLEVBdlJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF1UjdCO0lBQUQsQ0FBQyxFQXZSZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdVJuQjtBQUFELENBQUMsRUF2UlMsTUFBTSxLQUFOLE1BQU0sUUF1UmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZFN5bWJvbHkudHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNlem5hbSBzeW1ib2zFryBTUy9WUyBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMDYtMDkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICAvL1RPRE86IFDFmWlkYXQgcG9sw63EjWtvIHMgaW5mb3JtYWPDrSBvIHBvcGxhdG7DrWtvdmlcclxuICAgIC8vITogVnnFmWXFoWl0IG5hxI3DrXTDoW7DrSBzdGF2dSBWUyB2IHNlem5hbXUgKElTTCkgLSB6YXTDrW0gxZllxaFlbm8gZHJ1aMO9bSBuYcSNdGVuw61tIC0gxI1hc2VtIHNlIGsgdG9tdSB0xZllYmEgbsSba2R5IChuxJtrZG8pIGRvc3RhbnVcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmlwYWRTeW1ib2x5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBTeW1ib2xzOiBTeW1ib2xbXSA9IFtdOyAvLyB0b3RvIGplIHZsb8W+ZW7DqSBkbyBkYXRhIHZsYXN0bm9zdGkgdiBnZ3JpZC5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBJeHA6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIFZzOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRGF0YTogYW55O1xyXG4gICAgICAgIHByaXZhdGUgdmlld1N5bWJvbHk6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuTEsuRHRvLkdQcmlwYWRTeW1ib2x5RHRvPjtcclxuICAgICAgICBwcml2YXRlIHZpZXdEYXRhOiBEYXRhLlZpZXc8RGRwLkludGVyZmFjZS5MSy5EdG8uR1ByaXBhZFN5bWJvbHlEdG8+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQucHJlcGFyZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5wcmVwYXJlR1VJKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpeHA6IHRoYXQuSXhwIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3ltYm9seS56amlzdGlTdGF2VlNOYVByaXBhZHUocnEgPT4geyByZXR1cm4geyBkYXRhOiB7IGl4cDogdGhhdC5JeHAsIHZzOiB0aGF0LlZzIH0sIGZyYWdtZW50czogW1wiKlwiXSB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygvKlwibmFtZU9mRm9ybSovKS5maW5kRmllbGRzKFwic3RhdlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHByZXBhcmVHVUkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdOb3Z5U3ltYm9sXCJdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0RldGFpbFN5bWJvbFwiXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHWnJ1c2l0U3ltYm9sXCJdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlwiIH0pICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTIG5hIGthcnTEm1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnNcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuVnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgVlNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVyID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLlxyXG4gICAgICAgICAgICAgICAgZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW2Zvcm1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRGF0YSA9IG9iai5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YShvYmouZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPIHRoYXQuU2VsZWN0ZWQgPSB0aGF0LlN5bWJvbHNbaW5kZXhdIGtkZSBpbmRleCBieSBtYWxhIGJ5dCBsaW5lIGt0b3J5IHNtZSBzZWxlY3RudWx5IC8gb3puYWNpbHkuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZExpc3RcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5QcmlwYWRTeW1ib2x5VlMoKSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdEZXRhaWxTeW1ib2xcIl0sXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwidnMsIHNzLCBpeHAsIHN0YXYsIHBvem5hbWthLCBha3Rpdml0YV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogJ05PVChFUVVBTFMoQGFrdGl2aXRhX3R4dCwgXCJha3Rpdm7DrVwiKSknLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcubGlnaHRncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1phdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IHRoYXQudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTm92eVN5bWJvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcm93ID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5HUHJpcGFkU3ltYm9seUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIsIFwiZy1zdGF0ZS1lcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2luZG93T3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGBEZXRhaWwgU3ltYm9sdWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFBhcmFtSlNPTiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdQcmlwYWRTeW1ib2xEZXRhaWwjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Wczogcm93LnZzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Tczogcm93LnNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRpdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmlwYWR5LkdQcmlwYWRTeW1ib2xEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcmFtSlNPTiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FrY2UgcG8gdXphdsWZZW7DrSBva25hLCBuYXDFmS4gcmVmcmVzaCBncmlkdSBhdGQuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdEYXRhLnJlcXVlc3REYXRhKCk7IC8vIHJlZnJlc2hEYXRhLi4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0RldGFpbFN5bWJvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uR1ByaXBhZFN5bWJvbHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2luZG93T3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGBEZXRhaWwgU3ltYm9sdWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFBhcmFtSlNPTiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdQcmlwYWRTeW1ib2xEZXRhaWwjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWczogcm93LnZzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3M6IHJvdy5zcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkaXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmlwYWR5LkdQcmlwYWRTeW1ib2xEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcmFtSlNPTiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FrY2UgcG8gdXphdsWZZW7DrSBva25hLCBuYXDFmS4gcmVmcmVzaCBncmlkdSBhdGQuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdacnVzaXRTeW1ib2xcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkdQcmlwYWRTeW1ib2x5RHRvPihcImdldFNlbGVjdGlvblwiKVswXTsgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3ltYm9seS5vZHN0cmFuVlNOYVByaXBhZHUoc2VsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJabcSbbnkgw7pzcMSbxaFuxJsgdWxvxb5lbnlcIiwgXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC52aWV3RGF0YS5yZXF1ZXN0RGF0YSgpOyAvLyByZWZyZXNoRGF0YS4uLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvYmouYmFzZVR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0FyZ3VtZW50RXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh2b2JqLmJhc2VNZXNzYWdlLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcIk7Em2NvIHNlIG5lcG92ZWRsb1wiLCBlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIGZjZSBwcm8gesOtc2vDoW7DrSBmaWx0cm92YW7DvWNoIGRhdCAqL1xyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YShmaWx0ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLyogaWYgKCFmaWx0ZXIpICovIGZpbHRlciA9IHsgaXhwOiB0aGF0Lkl4cCB9O1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LnZpZXdTeW1ib2x5LnJlcXVlc3REYXRhKCk7IC8vIHJlZnJlc2hEYXRhLi4uLlxyXG4gICAgICAgICAgICAvKnRoYXQudmlld0RhdGEucmVxdWVzdERhdGEoKTsgLy8gcmVmcmVzaERhdGEuLi4uKi9cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6Fuw60uLi5cIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRTeW1ib2x5Lmxpc3QoXHJcbiAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OYcSNdHUgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3RGF0YSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUG90w6kgc2UgcG9rdXPDrW0gesOtc2thdCBzdGF2eVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFN5bWJvbHkuemppc3RpU3RhdnlWU05hUHJpcGFkdShycSA9PiB7IHJldHVybiB7IGRhdGE6IGR0by5kYXRhIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9OYcSNdHUgem5vdnUgc2V6bmFtIHNlIHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdEYXRhID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmV0LCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdBcmd1bWVudEV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHZvYmouYmFzZU1lc3NhZ2UsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJOxJtjbyBzZSBuZXBvdmVkbG9cIiwgZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdBcmd1bWVudEV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2godm9iai5iYXNlTWVzc2FnZSwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJOxJtjbyBzZSBuZXBvdmVkbG9cIiwgZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTsgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC52aWV3U3ltYm9seSA9IG5ldyBJc2wuVmlldyh0aGF0LmlzbC5QcmlwYWRTeW1ib2x5Lmxpc3QoXHJcbiAgICAgICAgICAgIC8vICAgIHJxID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC52aWV3U3ltYm9seS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICBsZXQgcG9sb3preSA9IHRoYXQudmlld1N5bWJvbHkuZ2V0RGF0YVJvd3MoKTsgLy8uZmlsdGVyKHggPT4geC5yYWRla191aHIhIDwgMCk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuaXNsLlByaXBhZFN5bWJvbHkuemppc3RpU3RhdnlWU05hUHJpcGFkdShycSA9PiB7IHJldHVybiB7IGRhdGE6IHBvbG96a3kgfSB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmdldCgpLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vTmHEjXR1IHpub3Z1IHNlem5hbSBzZSBzdGF2eVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQudmlld1N5bWJvbHkuZmluZEJ5S2V5KCBrZXk6IFwiaXhwXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldCwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdBcmd1bWVudEV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2godm9iai5iYXNlTWVzc2FnZSwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJOxJtjbyBzZSBuZXBvdmVkbG9cIiwgZXJyb3JcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il19
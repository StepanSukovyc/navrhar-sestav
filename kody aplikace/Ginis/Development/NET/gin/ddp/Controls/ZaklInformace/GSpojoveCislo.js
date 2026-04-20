"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSpojoveCislo.ts                       </Name>
//    <Description> Okno spojového čísla                                        </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-01-22                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GSpojoveCislo = class GSpojoveCislo extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter = {};
                }
                onContentReady() {
                    var that = this;
                    this.beginOperation({ id: "inicializace" });
                    //menubar, commandbar akce
                    this.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        }),
                        new GAction({
                            name: "actNew",
                            caption: "Nové",
                            icon: "gi-plus_bold",
                            run: function () {
                                var windowOption = { title: "Detail spojového čísla", width: 350, height: 350 };
                                var ParamsJSON = { ID: "DDPGSpojoveCisloDetail#", Ixp: that.Ixp, Poradi: 0 };
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSpojoveCisloDetail", ParamsJSON, windowOption)
                                    .on("close", function (ev) {
                                    that.loadData();
                                });
                            }
                        }),
                        new GAction({
                            name: "actEdit",
                            caption: "Upravit",
                            icon: "gi-pencil",
                            run: function () {
                                var selection = that.grid.ggrid("getSelection");
                                var windowOption = { title: "Detail spojového čísla", width: 350, height: 350 };
                                var ParamsJSON = { ID: "DDPGSpojoveCisloDetail#", Ixp: selection[0].ixp, Poradi: selection[0].poradi };
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSpojoveCisloDetail", ParamsJSON, windowOption)
                                    .on("close", function (ev) {
                                    that.loadData();
                                });
                            }
                        }),
                        new GAction({
                            name: "actDelete",
                            caption: "Smazat",
                            icon: "gi-minus_bold",
                            run: function () {
                                var selection = that.grid.ggrid("getSelection");
                                var l_ixp;
                                var l_poradi;
                                if (selection[0] != undefined) {
                                    let def = $.Deferred();
                                    l_ixp = selection[0].ixp?.toString();
                                    l_poradi = selection[0].poradi;
                                    var promise = that.isl.SpojoveCislo.zmenAktivitu({
                                        ixp: l_ixp, poradi: l_poradi, aktivita: 900
                                    }).get();
                                    promise.done(() => { def.resolve(); that.loadData(); })
                                        .fail(() => { def.reject(); });
                                }
                            }
                        })
                    ]);
                    //plocha pro tlačítka dole
                    this.commandBar(this.actions.createBar(["actSave!", "actClose"]));
                    //plocha pro tlačítka nahoře
                    this.menuBar([
                        { action: this.actions.actNew, favorite: true },
                        { action: this.actions.actEdit, favorite: true },
                        { action: this.actions.actDelete, favorite: true }
                    ]);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                                  
                        columns: WebClient.Common.GridFormats.SpojoveCisla(),
                        profiles: [{
                                name: "radek", _locked: true, _default: true, rowNumbers: true,
                                columnList: "spoj_cislo, dat_od, dat_do, poznamka",
                                condFormats: [
                                    { description: "Aktivní", formula: "@aktivita != 100", text: Gordic.Components.Grid.CondFormats.CondFormatText.gray, italic: true },
                                ]
                            }]
                    });
                    this.filter.ixp = this.Ixp;
                    this.endOperation({ id: "inicializace" });
                    this.loadData();
                }
                loadData() {
                    var that = this;
                    that.beginOperation({ id: "ziskaniDat" });
                    that.isl.SpojoveCislo.list(rq => {
                        return {
                            filters: this.filter
                        };
                    }).get().done(function (dto) {
                        //vložení do gridu
                        that.view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", that.view);
                        //ukončení operace 
                        that.endOperation({ id: "ziskaniDat" });
                    });
                }
                ok() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection");
                    if (selection[0].dat_do != null) {
                        this.dialogs.confirm("Použít", "Vybranému spojovému číslu (" + selection[0].spoj_cislo + ") byla ukončena platnost! Opravdu jej chcete použít?")
                            .on("close", (ev, retVal) => {
                            if (retVal === "yes") {
                                that.close(selection[0]);
                            }
                            else
                                that.close();
                        });
                    }
                    else
                        that.close(selection[0]);
                }
            };
            GSpojoveCislo = __decorate([
                Decorators.gcontent
            ], GSpojoveCislo);
            WebClient.GSpojoveCislo = GSpojoveCislo;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nwb2pvdmVDaXNsby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTcG9qb3ZlQ2lzbG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0FrSmY7QUFsSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa0puQjtJQWxKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa0o3QjtRQWxKb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFNWSxXQUFNLEdBQVEsRUFBRSxDQUFDO2dCQXdJN0IsQ0FBQztnQkF0SUcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDNUMsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxhQUFhOzRCQUNuQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUEsQ0FBQyxDQUFDO3lCQUNqQyxDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDcEMsQ0FBQzt3QkFDRixJQUFJLE9BQU8s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QUNYLENBQUM7Z0JBRUQsRUFBRTtvQkFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUF3QyxjQUFjLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsNkJBQTZCLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxzREFBc0QsQ0FBQzs2QkFDM0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7Z0NBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzdCLENBQUM7O2dDQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQzs7d0JBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsQ0FBQzthQUNKLENBQUE7WUE5SVksYUFBYTtnQkFEekIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxhQUFhLENBOEl6QjtZQTlJWSx1QkFBYSxnQkE4SXpCLENBQUE7UUFDTCxDQUFDLEVBbEpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFrSjdCO0lBQUQsQ0FBQyxFQWxKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa0puQjtBQUFELENBQUMsRUFsSlMsTUFBTSxLQUFOLE1BQU0sUUFrSmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Nwb2pvdmVDaXNsby50cyAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gc3Bvam92w6lobyDEjcOtc2xhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDEtMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTcG9qb3ZlQ2lzbG8gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwdWJsaWMgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgdmlldztcclxuXHJcbiAgICAgICAgSXhwOiBTdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxpemFjZVwiIH0pO1xyXG4gICAgICAgICAgICAvL21lbnViYXIsIGNvbW1hbmRiYXIgYWtjZVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDqVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c19ib2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIkRldGFpbCBzcG9qb3bDqWhvIMSNw61zbGFcIiwgd2lkdGg6IDM1MCwgaGVpZ2h0OiAzNTAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFBhcmFtc0pTT04gPSB7IElEOiBcIkREUEdTcG9qb3ZlQ2lzbG9EZXRhaWwjXCIsIEl4cDogdGhhdC5JeHAsIFBvcmFkaTogMCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1Nwb2pvdmVDaXNsb0RldGFpbFwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYpIHsgLy8gcG90w6kgY28gc2Ugb2tubyB6YXbFmWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEVkaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdTcG9qb3ZlQ2lzbG9EdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IFwiRGV0YWlsIHNwb2pvdsOpaG8gxI3DrXNsYVwiLCB3aWR0aDogMzUwLCBoZWlnaHQ6IDM1MCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUGFyYW1zSlNPTiA9IHsgSUQ6IFwiRERQR1Nwb2pvdmVDaXNsb0RldGFpbCNcIiwgSXhwOiBzZWxlY3Rpb25bMF0uaXhwLCBQb3JhZGk6IHNlbGVjdGlvblswXS5wb3JhZGkgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTcG9qb3ZlQ2lzbG9EZXRhaWxcIiwgUGFyYW1zSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2KSB7IC8vIHBvdMOpIGNvIHNlIG9rbm8gemF2xZllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZWxldGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNtYXphdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbWludXNfYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdTcG9qb3ZlQ2lzbG9EdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3BvcmFkaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblswXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX2l4cCA9IHNlbGVjdGlvblswXS5peHA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3BvcmFkaSA9IHNlbGVjdGlvblswXS5wb3JhZGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGF0LmlzbC5TcG9qb3ZlQ2lzbG8uem1lbkFrdGl2aXR1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IGxfaXhwLCBwb3JhZGk6IGxfcG9yYWRpLCBha3Rpdml0YTogOTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLmRvbmUoKCkgPT4geyBkZWYucmVzb2x2ZSgpOyB0aGF0LmxvYWREYXRhKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IGRlZi5yZWplY3QoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAvL3Bsb2NoYSBwcm8gdGxhxI3DrXRrYSBkb2xlXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vcGxvY2hhIHBybyB0bGHEjcOtdGthIG5haG/FmWVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0TmV3LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RFZGl0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZWxldGUsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlNwb2pvdmVDaXNsYSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLCByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInNwb2pfY2lzbG8sIGRhdF9vZCwgZGF0X2RvLCBwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJBa3Rpdm7DrVwiLCBmb3JtdWxhOiBcIkBha3Rpdml0YSAhPSAxMDBcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5LCBpdGFsaWM6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLml4cCA9IHRoaXMuSXhwO1xyXG4gICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxpemFjZVwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ6aXNrYW5pRGF0XCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlNwb2pvdmVDaXNsby5saXN0XHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhpcy5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92bG/FvmVuw60gZG8gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdWtvbsSNZW7DrSBvcGVyYWNlIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiemlza2FuaURhdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdTcG9qb3ZlQ2lzbG9EdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uWzBdLmRhdF9kbyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIlBvdcW+w610XCIsIFwiVnlicmFuw6ltdSBzcG9qb3bDqW11IMSNw61zbHUgKFwiICsgc2VsZWN0aW9uWzBdLnNwb2pfY2lzbG8gKyBcIikgYnlsYSB1a29uxI1lbmEgcGxhdG5vc3QhIE9wcmF2ZHUgamVqIGNoY2V0ZSBwb3XFvsOtdD9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHNlbGVjdGlvblswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB0aGF0LmNsb3NlKHNlbGVjdGlvblswXSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
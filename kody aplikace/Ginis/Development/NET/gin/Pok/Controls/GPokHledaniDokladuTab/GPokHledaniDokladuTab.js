"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokHledaniDokladuTab = class GPokHledaniDokladuTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.title = "Hledání dokladu";
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "pokHledaniDokladuForm" })
                        .addSection("jres:31302240") //RC 31302240 : Výběrové podmínky
                        .addRow("jres:31302226") //RC 31302226 : Identifikátor
                        .addField("gstringbox", {
                        name: "ixp"
                    })
                        .addRow("jres:31302241") //RC 31302241 : Evidenční číslo
                        .addField("gstringbox", {
                        name: "ac"
                    })
                        .addRow("jres:31302012") //RC 31302012 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac_ag"
                    })
                        .addRow("jres:31302242") //RC 31302242 : Variabilní symbol
                        .addField("gstringbox", {
                        name: "vs"
                    })
                        .addRow("jres:31302012") //RC 31302239 : Ext. identifikátor
                        .addField("gstringbox", {
                        name: "ext_id"
                    })
                        .addSection("jres:31302243"); //RC 31302243 : Výsledky vyhledávání      
                    var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                    that.actions.addRange({
                        actVyhledat: {
                            caption: "jres:31302232", //RC 31302232 : Vyhledat
                            icon: "gi-magglass",
                            run: function (ev, ctx) {
                                that.vyhledat();
                            }
                        },
                        actVycistit: {
                            caption: "jres:31302233", //RC 31302233 : Vyčistit
                            icon: "gi-window-close",
                            run: function (ev, ctx) {
                                that.vycistit();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actVyhledat, favorite: true },
                        { action: this.actions.actVycistit, favorite: true }
                    ]);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp", caption: "jres:31302226" }); //RC 31302226 : Identifikátor
                    gridFormat.addTextColumn({ name: "zkr_ag", caption: "jres:31302234" }); //RC 31302234 : Agenda    
                    gridFormat.addTextColumn({ name: "kniha", caption: "jres:31302235" }); //RC 31302235 : Kniha      
                    gridFormat.addNumberColumn({ name: "rok", caption: "jres:31302236" }); //RC 31302236 : Rok
                    gridFormat.addTextColumn({ name: "ac", caption: "jres:31302237" }); //RC 31302237 : Značka          
                    gridFormat.addTextColumn({ name: "ixs_typ_txt", caption: "jres:31302006" }); //RC 31302006 : Typ dokladu
                    gridFormat.addTextColumn({ name: "nazev", caption: "jres:31302013" }); //RC 31302013 : Popis
                    gridFormat.addTextColumn({ name: "ixs_fun_akt_txt", caption: "jres:31302238" }); //RC 31302238 : Vlastník
                    gridFormat.addTextColumn({ name: "mena_zkr", caption: "jres:31302124" }); //RC 31302124 : Měna
                    gridFormat.addTextColumn({ name: "id_ext", caption: "jres:31302239" }); //RC 31302239 : Ext. identifikátor 
                    return gridFormat;
                }
                vyhledat() {
                    var ixp = this.element.findForms("pokHledaniDokladuForm").findFields("ixp").gfield("getValue");
                    var ac = this.element.findForms("pokHledaniDokladuForm").findFields("ac").gfield("getValue");
                    var ac_ag = this.element.findForms("pokHledaniDokladuForm").findFields("ac_ag").gfield("getValue");
                    var vs = this.element.findForms("pokHledaniDokladuForm").findFields("vs").gfield("getValue");
                    var ext_id = this.element.findForms("pokHledaniDokladuForm").findFields("ext_id").gfield("getValue");
                    var that = this;
                    this.call("HledaniDokladu", { ixp: ixp, ac: ac, ac_ag: ac_ag, vs: vs, ext_id: ext_id })
                        .done(function (r) {
                        var view = new Gordic.Data.View(r.table);
                        that.grid.ggrid("setData", view);
                    })
                        .fail(function (xhr, type, vobj) {
                    });
                }
                vycistit() {
                    this.element.findForms("pokHledaniDokladuForm").findFields("ixp").gfield("clear");
                    this.element.findForms("pokHledaniDokladuForm").findFields("ac").gfield("clear");
                    this.element.findForms("pokHledaniDokladuForm").findFields("ac_ag").gfield("clear");
                    this.element.findForms("pokHledaniDokladuForm").findFields("vs").gfield("clear");
                    this.element.findForms("pokHledaniDokladuForm").findFields("ext_id").gfield("clear");
                }
            };
            GPokHledaniDokladuTab = __decorate([
                Decorators.gcontent
            ], GPokHledaniDokladuTab);
            WebClient.GPokHledaniDokladuTab = GPokHledaniDokladuTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hsZWRhbmlEb2tsYWR1VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0hsZWRhbmlEb2tsYWR1VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E4SWY7QUE5SUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEluQjtJQTlJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOEk3QjtRQTlJb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsT0FBQSxZQUFZO2dCQUtuRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztvQkFFL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxDQUFDO3lCQUNwRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsaUNBQWlDO3lCQUM3RCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsNkJBQTZCO3lCQUNyRCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsS0FBSztxQkFDZCxDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywrQkFBK0I7eUJBQ3ZELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxJQUFJO3FCQUNiLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDhCQUE4Qjt5QkFDdEQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLE9BQU87cUJBQ2hC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TUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3BGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUd6RixDQUFDO2FBRUEsQ0FBQTtZQXpJWSxxQkFBcUI7Z0JBRGpDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AscUJBQXFCLENBeUlqQztZQXpJWSwrQkFBcUIsd0JBeUlqQyxDQUFBO1FBRUwsQ0FBQyxFQTlJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOEk3QjtJQUFELENBQUMsRUE5SWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThJbkI7QUFBRCxDQUFDLEVBOUlTLE1BQU0sS0FBTixNQUFNLFFBOElmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tIbGVkYW5pRG9rbGFkdVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIkhsZWTDoW7DrSBkb2tsYWR1XCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInBva0hsZWRhbmlEb2tsYWR1Rm9ybVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDIyNDBcIikgLy9SQyAzMTMwMjI0MCA6IFbDvWLEm3JvdsOpIHBvZG3DrW5reVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIyMjZcIikgLy9SQyAzMTMwMjIyNiA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIyNDFcIikgLy9SQyAzMTMwMjI0MSA6IEV2aWRlbsSNbsOtIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMDEyXCIpIC8vUkMgMzEzMDIwMTIgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIyNDJcIikgLy9SQyAzMTMwMjI0MiA6IFZhcmlhYmlsbsOtIHN5bWJvbFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIwMTJcIikgLy9SQyAzMTMwMjIzOSA6IEV4dC4gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXh0X2lkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDIyNDNcIik7Ly9SQyAzMTMwMjI0MyA6IFbDvXNsZWRreSB2eWhsZWTDoXbDoW7DrSAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHRhYiA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBoZWFkZXJGb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSAsICAvLyB0aGlzLm1vZGVsUG9sb3preVswXSAgIC8vemF0aW0gbmVtYW0gemFkbmEgZGF0YSwgbmFzdGF2aW0gcHJhemRuZSBwb2xlLiBWIG1vbWVudGUgbmFjdGVuaSBqZSBuYXN0YXZpbSBwcmVzIG9wdGlvbnMgKG1ldG9kYSBsb2FkSnNHcmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie2FjfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICBzZWFyY2hDb2x1bW5zOiBbXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VnlobGVkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMzJcIiwgLy9SQyAzMTMwMjIzMiA6IFZ5aGxlZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1tYWdnbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eWhsZWRhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeWNpc3RpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjIzM1wiLCAvL1JDIDMxMzAyMjMzIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnljaXN0aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VnlobGVkYXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5Y2lzdGl0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjI2XCIgfSk7IC8vUkMgMzEzMDIyMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInprcl9hZ1wiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMzRcIiB9KTsgLy9SQyAzMTMwMjIzNCA6IEFnZW5kYSAgICBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJrbmloYVwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMzVcIiB9KTsgLy9SQyAzMTMwMjIzNSA6IEtuaWhhICAgICAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjM2XCIgfSk7Ly9SQyAzMTMwMjIzNiA6IFJva1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFjXCIsIGNhcHRpb246IFwianJlczozMTMwMjIzN1wiIH0pOyAgLy9SQyAzMTMwMjIzNyA6IFpuYcSNa2EgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX3R5cF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDA2XCIgfSk7ICAgLy9SQyAzMTMwMjAwNiA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDEzXCIgfSk7IC8vUkMgMzEzMDIwMTMgOiBQb3Bpc1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19mdW5fYWt0X3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMzhcIiB9KTsgLy9SQyAzMTMwMjIzOCA6IFZsYXN0bsOta1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm1lbmFfemtyXCIsIGNhcHRpb246IFwianJlczozMTMwMjEyNFwiIH0pOyAvL1JDIDMxMzAyMTI0IDogTcSbbmFcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpZF9leHRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjM5XCIgfSk7IC8vUkMgMzEzMDIyMzkgOiBFeHQuIGlkZW50aWZpa8OhdG9yIFxyXG4gICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiBcclxuXHJcbiAgICAgICAgIFxyXG4gICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdnlobGVkYXQoKSA6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIGl4cCA9IHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tIbGVkYW5pRG9rbGFkdUZvcm1cIikuZmluZEZpZWxkcyhcIml4cFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGFjID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBva0hsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwiYWNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBhY19hZyA9IHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tIbGVkYW5pRG9rbGFkdUZvcm1cIikuZmluZEZpZWxkcyhcImFjX2FnXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgdnMgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwicG9rSGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJ2c1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGV4dF9pZCA9IHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tIbGVkYW5pRG9rbGFkdUZvcm1cIikuZmluZEZpZWxkcyhcImV4dF9pZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGwoXCJIbGVkYW5pRG9rbGFkdVwiLCB7IGl4cDogaXhwLCBhYzogYWMsIGFjX2FnOiBhY19hZywgdnM6IHZzLCBleHRfaWQ6IGV4dF9pZCB9KVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyLnRhYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdnljaXN0aXQoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwicG9rSGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBva0hsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwiYWNcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBva0hsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwiYWNfYWdcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBva0hsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwidnNcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBva0hsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwiZXh0X2lkXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GNezauctovanechDoklady = class GNezauctovanechDoklady extends Gordic.GContentBase {
                /**
                 * Seznam nezauctovanych dokladu
                 * */
                //public data: Gordic.Inu.Interface.GNeprouctovaneDokladuDto[];
                prepareContent(vstup) {
                    var that = this;
                    // definicie gridu
                    var grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "full",
                        name: "SeznamNeprouctovanychDokladu",
                        data: vstup.data, //[{ agenda: "UCT", doklad: "dsd" }],
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                //that.ZobrazDetail(ctx.cellInfo.data as any);
                                /*
                                var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                GDlg.showWindow("Gordic.Uct.WebClient.GUctDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                                */
                            }
                        }),
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "por_cislo",
                            caption: "jres:30250056", //RC 30250056 : Pořadí
                            width: 70
                        })
                            .addTextColumn({
                            name: "agenda",
                            caption: "jres:30250089", //RC 30250089 : Agenda
                            width: 70
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "jres:30250091", //RC 30250091 : Typ dokladu
                            width: 200
                        })
                            .addTextColumn({
                            name: "doklad",
                            caption: "jres:30250092", //RC 30250092 : Doklad
                            width: 110,
                            //align: "right"
                        })
                            .addTextColumn({
                            name: "pid",
                            caption: "jres:30250090", //RC 30250090 : Identifikátor
                            width: 133,
                            //align:"right"
                        })
                            .addTextColumn({
                            name: "uus",
                            caption: "jres:30250093", //RC 30250093 : Účtárna
                            width: 70
                        })
                    });
                    that.commandBar([
                        {
                            id: "idclosedokladyneprouct",
                            customClass: "g-button--primary",
                            action: new GAction({ name: "actClose", caption: "jres:30250026", run: function () { that.tryClose(); } }) //RC 30250026 : Zavřít
                        },
                    ]);
                }
            };
            GNezauctovanechDoklady = __decorate([
                gcontent
            ], GNezauctovanechDoklady);
            WebClient.GNezauctovanechDoklady = GNezauctovanechDoklady;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05lemF1Y3RvdmFuZURva2xhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTmV6YXVjdG92YW5lRG9rbGFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNkVmO0FBN0VELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZFbkI7SUE3RWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZFN0I7UUE3RW9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQUNwRDs7cUJBRUs7Z0JBQ0wsK0RBQStEO2dCQUMvRCxjQUFjLENBQUMsS0FBZ0U7b0JBQzNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsa0JBQWtCO29CQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUNoQixHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzt5QkFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt3QkFDWCxTQUFTO3dCQUNULCtDQUErQzt3QkFDL0MsSUFBSTt5QkFDSCxLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLElBQUksRUFBRSw4QkFBOEI7d0JBQ3BDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLHFDQUFxQzt3QkFDdEQsc0JBQXNCO3dCQUN0QixhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQiw4Q0FBOEM7Z0NBQzlDOzs7a0NBR0U7NEJBQ04sQ0FBQzt5QkFDSixDQUFDO3dCQUNGLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFpRDs2QkFDL0UsZUFBZSxDQUFDOzRCQUNiLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsS0FBSyxFQUFFLEVBQUU7eUJBQ1osQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCOzRCQUNyRCxLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsUUFBUTs0QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsZ0JBQWdCO3lCQUNuQixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsS0FBSzs0QkFDWCxPQUFPLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjs0QkFDdkQsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsZUFBZTt5QkFDbEIsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7NEJBQ2pELEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7cUJBQ1QsQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQ1o7NEJBQ0ksRUFBRSxFQUFFLHdCQUF3Qjs0QkFDNUIsV0FBVyxFQUFFLG1CQUFtQjs0QkFDaEMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsc0JBQXNCO3lCQUNwSTtxQkFFSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUE7WUF6RVksc0JBQXNCO2dCQURsQyxRQUFRO2VBQ0ksc0JBQXNCLENBeUVsQztZQXpFWSxnQ0FBc0IseUJBeUVsQyxDQUFBO1FBQ0wsQ0FBQyxFQTdFb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNkU3QjtJQUFELENBQUMsRUE3RWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZFbkI7QUFBRCxDQUFDLEVBN0VTLE1BQU0sS0FBTixNQUFNLFFBNkVmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTmV6YXVjdG92YW5lY2hEb2tsYWR5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gbmV6YXVjdG92YW55Y2ggZG9rbGFkdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgLy9wdWJsaWMgZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR05lcHJvdWN0b3ZhbmVEb2tsYWR1RHRvW107XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQodnN0dXA6IHsgZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR05lcHJvdWN0b3ZhbmVEb2tsYWR1RHRvW10gfSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLy8uZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aXRsZTogXCJST1pcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU2V6bmFtTmVwcm91Y3RvdmFueWNoRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZzdHVwLmRhdGEsLy9beyBhZ2VuZGE6IFwiVUNUXCIsIGRva2xhZDogXCJkc2RcIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3dIZWFkZXJSb3c6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuWm9icmF6RGV0YWlsKGN0eC5jZWxsSW5mby5kYXRhIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRGxnLnNob3dXaW5kb3coXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsXCIsIHsgSXhwOiByb3cuaXhwIH0sIFwiXCIsIDgwMCwgNjAwLCB0cnVlKTsgLy96b2JyYXplbmkgZGFsc2lobyBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkludS5JbnRlcmZhY2UuR05lcHJvdWN0b3ZhbmVEb2tsYWR1RHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3JfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1NlwiLCAvL1JDIDMwMjUwMDU2IDogUG/FmWFkw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFnZW5kYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDg5XCIsIC8vUkMgMzAyNTAwODkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTFcIiwgLy9SQyAzMDI1MDA5MSA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTJcIiwgLy9SQyAzMDI1MDA5MiA6IERva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxpZ246IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkwXCIsIC8vUkMgMzAyNTAwOTAgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxpZ246XCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTNcIiwgLy9SQyAzMDI1MDA5MyA6IMOaxI10w6FybmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImlkY2xvc2Vkb2tsYWR5bmVwcm91Y3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImFjdENsb3NlXCIsIGNhcHRpb246IFwianJlczozMDI1MDAyNlwiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pIC8vUkMgMzAyNTAwMjYgOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
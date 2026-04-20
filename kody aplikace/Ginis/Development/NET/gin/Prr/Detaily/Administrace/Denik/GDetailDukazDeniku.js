"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Prr;
    (function (Prr) {
        var UIWebClient;
        (function (UIWebClient) {
            var gcontent = Decorators.gcontent;
            let GDetailDukazDeniku = class GDetailDukazDeniku extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = { ixs_rad: this.IxsRad, por_cislo: this.PorCislo };
                    else
                        this.model = { ixs_rad: this.IxsRad };
                    this.loadData(this).done(function () {
                        that.setRezim(that.Rezim, that);
                    });
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("DetailDukazDeniku", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            }
                        },
                        actions: {},
                        menuBar: [
                            {
                                id: "xx", caption: "XXXX", type: "static"
                            }
                        ],
                    }, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    var that = this;
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25800021"; //RC 25800021 : Následující záznam<br>Název: {nazev}
                    this.detailMoveComponentPrevTemplate = "jres:25800022"; //RC 25800022 : Předchozí záznam<br>Název: {nazev}
                    this.enableFields = function (enable) {
                        this.findFields(".enabled").gfield("option", "disabled", !enable);
                    };
                    this.enableActions = function (enable) {
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M1S1, L-2-10-0, M-2-10-0, S-12-12-0", opened: true })
                        .addSection()
                        .addRow("jres:25800004", true) //RC 25800004 : Název
                        .addField("gstringbox", { name: "nazev", customClass: "enabled", disabled: this.readOnly, })
                        .addRow("jres:25800063") //RC 25800063 : Poznámka
                        .addField("gstringbox", { name: "poznamka", customClass: "enabled", disabled: this.readOnly, })
                        .addRow("jres:25800060") //RC 25800060 : Pořadí
                        .addField("gnumberbox", { name: "poradi", customClass: "enabled", disabled: this.readOnly, emptyValue: null })
                        .addRow("jres:25800025") //RC 25800025 : Aktivita
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly });
                    return form;
                }
            };
            GDetailDukazDeniku = __decorate([
                gcontent
            ], GDetailDukazDeniku);
            UIWebClient.GDetailDukazDeniku = GDetailDukazDeniku;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbER1a2F6RGVuaWt1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbER1a2F6RGVuaWt1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FvR2Y7QUFwR0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0duQjtJQXBHZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBb0cvQjtRQXBHb0IsV0FBQSxXQUFXO1lBQzVCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLHFCQU9uQztnQkFRRCxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0JBQ3RJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUUzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxtQkFBbUIsRUFBRTt3QkFFN0MsSUFBSSxFQUNKOzRCQUNJLFdBQVcsRUFDWDtnQ0FDSSxJQUFJLEVBQUUsVUFBVSxHQUFHO29DQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0NBQ2xFLENBQUM7NkJBQ0o7eUJBQ0o7d0JBQ0QsT0FBTyxFQUNQLEVBQ0M7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMO2dDQUNJLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUTs2QkFDNUM7eUJBQ0o7cUJBQ0osRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDYixDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsb0JBQW9CLENBQUMsT0FBZ0Q7b0JBQ2pFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxNQUFPLENBQUM7b0JBQzlDLElBQUksQ0FBQywrQkFBK0IsR0FBRyxlQUFlLENBQUMsQ0FBQyxvREFBb0Q7b0JBQzVHLElBQUksQ0FBQywrQkFBK0IsR0FBRyxlQUFlLENBQUMsQ0FBQyxrREFBa0Q7b0JBRzFHLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxNQUFlO3dCQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3JFLENBQUMsQ0FBQztvQkFFRixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsTUFBZTt3QkFDMUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLENBQUMsZ0NBQWdDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xELENBQUMsQ0FBQztnQkFDTixDQUFDO2dCQUFBLENBQUM7Z0JBRUYsVUFBVTtvQkFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHVDQUF1QyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDeEcsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMscUJBQXFCO3lCQUNuRCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUM7eUJBQzNGLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyx3QkFBd0I7eUJBQ2hELFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQzt5QkFDOUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHNCQUFzQjt5QkFDOUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBQzdHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyx3QkFBd0I7eUJBQ2hELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFFNUssT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSixDQUFBO1lBL0ZZLGtCQUFrQjtnQkFEOUIsUUFBUTtlQUNJLGtCQUFrQixDQStGOUI7WUEvRlksOEJBQWtCLHFCQStGOUIsQ0FBQTtRQUNMLENBQUMsRUFwR29CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQW9HL0I7SUFBRCxDQUFDLEVBcEdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFvR25CO0FBQUQsQ0FBQyxFQXBHUyxNQUFNLEtBQU4sTUFBTSxRQW9HZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUHJyLlVJV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbER1a2F6RGVuaWt1IGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50PFxyXG4gICAgICAgICAgICBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zICZcclxuICAgICAgICAgICAgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucz4+ICZcclxuICAgICAgICAgICAgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEV4dGVuc2lvbnMgJlxyXG4gICAgICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0NoYW5nZUFrdGl2aXRhQ29tcG9uZW50RXh0ZW5zaW9ucz4+ICZcclxuICAgICAgICAgICAgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdEZXRhaWxNb3ZlQ29tcG9uZW50RXh0ZW5zaW9ucyAmXHJcbiAgICAgICAgICAgIFRoaXNUeXBlPEdDb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HRGV0YWlsTW92ZUNvbXBvbmVudEV4dGVuc2lvbnM+PlxyXG4gICAgICAgID4gaW1wbGVtZW50cyBJR0NvbnRlbnQgeyAgICAgICAgXHJcbiAgICAgICAgSXhzUmFkPzogc3RyaW5nO1xyXG4gICAgICAgIFBvckNpc2xvPzogbnVtYmVyO1xyXG4gICAgICAgIEdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgTXA6IGJvb2xlYW47XHJcbiAgICAgICAgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlJlemltID0gdGhpcy5SZXppbURldGFpbHU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3KSB0aGlzLm9yaWdpbmFsTW9kZWwgPSB7IGl4c19yYWQ6IHRoaXMuSXhzUmFkLCBwb3JfY2lzbG86IHRoaXMuUG9yQ2lzbG8gfTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLm1vZGVsID0geyBpeHNfcmFkOiB0aGlzLkl4c1JhZCB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0UmV6aW0odGhhdC5SZXppbSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiRGV0YWlsRHVrYXpEZW5pa3VcIiwge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRhYnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWmFrbGFkbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoYXQuY3JlYXRlRm9ybSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInh4XCIsIGNhcHRpb246IFwiWFhYWFwiLCB0eXBlOiBcInN0YXRpY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnRHcmlkUmMgPSB0aGlzLkdyaWRSYyE7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudE5leHRUZW1wbGF0ZSA9IFwianJlczoyNTgwMDAyMVwiOyAvL1JDIDI1ODAwMDIxIDogTsOhc2xlZHVqw61jw60gesOhem5hbTxicj5Ow6F6ZXY6IHtuYXpldn1cclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50UHJldlRlbXBsYXRlID0gXCJqcmVzOjI1ODAwMDIyXCI7IC8vUkMgMjU4MDAwMjIgOiBQxZllZGNob3rDrSB6w6F6bmFtPGJyPk7DoXpldjoge25hemV2fVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlRmllbGRzID0gZnVuY3Rpb24gKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiLmVuYWJsZWRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlQWt0aXZpdGFDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldGFpbE1vdmVDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0xUzEsIEwtMi0xMC0wLCBNLTItMTAtMCwgUy0xMi0xMi0wXCIsIG9wZW5lZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTgwMDAwNFwiLCB0cnVlKSAvL1JDIDI1ODAwMDA0IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJuYXpldlwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwNjNcIikgLy9SQyAyNTgwMDA2MyA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogdGhpcy5yZWFkT25seSwgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1ODAwMDYwXCIpIC8vUkMgMjU4MDAwNjAgOiBQb8WZYWTDrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwicG9yYWRpXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksIGVtcHR5VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1ODAwMDI1XCIpIC8vUkMgMjU4MDAwMjUgOiBBa3Rpdml0YVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLCB7IG5hbWU6IFwiYWt0aXZpdGFcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YT12YWx1ZS5ha3Rpdml0YVwiLCBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
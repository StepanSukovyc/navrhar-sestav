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
            let GDetailFormularDeniku = class GDetailFormularDeniku extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = { ixs_rad: this.IxsRad };
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
                    builder.withComponent("DetailFormularDeniku", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            }
                        },
                        actions: {},
                        menuBar: []
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
                    this.onlyNew = true;
                    this.enableFields = function (enable) {
                        this.findFields(".enabled").gfield("option", "disabled", !enable);
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0", opened: true })
                        .addSection()
                        .addRow("jres:25800051", true) //RC 25800051 : Formulář
                        .addField("gselectbox", Gordic.Prefabs.Select.prrsfrm(), {
                        dropdown: false,
                        name: "sablona",
                        customClass: "enabled",
                        model: "model.sablona=value.sablona",
                        disabled: this.readOnly,
                        serverFilters: {
                            s_mp: that.Mp ? 1 : 0,
                            ixs_rad: that.IxsRad,
                            aktivita: 100
                        }
                    });
                    return form;
                }
            };
            GDetailFormularDeniku = __decorate([
                gcontent
            ], GDetailFormularDeniku);
            UIWebClient.GDetailFormularDeniku = GDetailFormularDeniku;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbEZvcm11bGFyRGVuaWt1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbEZvcm11bGFyRGVuaWt1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EwRmY7QUExRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMEZuQjtJQTFGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBMEYvQjtRQTFGb0IsV0FBQSxXQUFXO1lBQzVCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLHFCQUd0QztnQkFNRCxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7d0JBQzVHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUUzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxzQkFBc0IsRUFBRTt3QkFFaEQsSUFBSSxFQUNKOzRCQUNJLFdBQVcsRUFDWDtnQ0FDSSxJQUFJLEVBQUUsVUFBVSxHQUFHO29DQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0NBQ2xFLENBQUM7NkJBQ0o7eUJBQ0o7d0JBQ0QsT0FBTyxFQUNQLEVBQ0M7d0JBQ0QsT0FBTyxFQUFFLEVBRVI7cUJBQ0osRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDYixDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsb0JBQW9CLENBQUMsT0FBZ0Q7b0JBQ2pFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxNQUFlO3dCQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3JFLENBQUMsQ0FBQztnQkFDTixDQUFDO2dCQUFBLENBQUM7Z0JBRUYsVUFBVTtvQkFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDdkcsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsd0JBQXdCO3lCQUN0RCxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUNuRDt3QkFDSSxRQUFRLEVBQUUsS0FBSzt3QkFDZixJQUFJLEVBQUUsU0FBUzt3QkFDZixXQUFXLEVBQUUsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLDZCQUE2Qjt3QkFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUN2QixhQUFhLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNwQixRQUFRLEVBQUUsR0FBRzt5QkFDaEI7cUJBQ0osQ0FDSixDQUFDO29CQUNOLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0osQ0FBQTtZQXJGWSxxQkFBcUI7Z0JBRGpDLFFBQVE7ZUFDSSxxQkFBcUIsQ0FxRmpDO1lBckZZLGlDQUFxQix3QkFxRmpDLENBQUE7UUFDTCxDQUFDLEVBMUZvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUEwRi9CO0lBQUQsQ0FBQyxFQTFGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMEZuQjtBQUFELENBQUMsRUExRlMsTUFBTSxLQUFOLE1BQU0sUUEwRmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlByci5VSVdlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxGb3JtdWxhckRlbmlrdSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxcclxuICAgICAgICAgICAgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucyAmXHJcbiAgICAgICAgICAgIFRoaXNUeXBlPEdDb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnM+PlxyXG4gICAgICAgID4gaW1wbGVtZW50cyBJR0NvbnRlbnQgeyAgICAgICAgXHJcbiAgICAgICAgSXhzUmFkPzogc3RyaW5nO1xyXG4gICAgICAgIEdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgTXA6IGJvb2xlYW47XHJcbiAgICAgICAgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuUmV6aW0gPSB0aGlzLlJlemltRGV0YWlsdTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHRoaXMub3JpZ2luYWxNb2RlbCA9IHsgaXhzX3JhZDogdGhpcy5JeHNSYWQgfTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLm1vZGVsID0geyBpeHNfcmFkOiB0aGlzLkl4c1JhZCB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0UmV6aW0odGhhdC5SZXppbSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiRGV0YWlsRm9ybXVsYXJEZW5pa3VcIiwge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRhYnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWmFrbGFkbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoYXQuY3JlYXRlRm9ybSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9ubHlOZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIsIG9wZW5lZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwNTFcIiwgdHJ1ZSkgLy9SQyAyNTgwMDA1MSA6IEZvcm11bMOhxZlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnBycnNmcm0oKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYWJsb25hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc2FibG9uYT12YWx1ZS5zYWJsb25hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc19tcDogdGhhdC5NcCA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3JhZDogdGhhdC5JeHNSYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
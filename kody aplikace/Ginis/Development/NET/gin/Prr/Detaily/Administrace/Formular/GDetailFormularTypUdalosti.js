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
            let GDetailFormularTypUdalosti = class GDetailFormularTypUdalosti extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = { sablona: this.Sablona };
                    else
                        this.model = { sablona: this.Sablona };
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
                    builder.withComponent("DetailFormularTypUdalosti", {
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
                    var typUda = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 310, 320, 330, 340, 345, 350, 370, 380, 390, 400, 410];
                    var typUdaTxt = "jres:25800064"; //RC 25800064 : Typ události
                    if (that.Mp) {
                        typUda = [0, 50, 110, 120, 130, 140, 150, 160, 210, 240, 250, 260, 270, 340, 345, 350, 360];
                        typUdaTxt = "jres:25800095"; //RC 25800095 : Typ řešení
                    }
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0", opened: true })
                        .addSection()
                        .addRow("jres:25800064", true) //RC 25800064 : Typ události
                        .addField("gselectbox", Gordic.Prefabs.Select.prrcuda(), {
                        dropdown: true,
                        name: "typ_uda",
                        customClass: "enabled",
                        model: "model.typ_uda=value.typ_uda",
                        disabled: this.readOnly,
                        serverFilters: { typ_uda: typUda },
                        validators: [new Gordic.Validators.Base({ validate: function (val, source) { return val.typ_uda != 0; }, message: "jres:25800097" })] //RC 25800097 : Hondota nesmí být neurčeno
                    });
                    return form;
                }
            };
            GDetailFormularTypUdalosti = __decorate([
                gcontent
            ], GDetailFormularTypUdalosti);
            UIWebClient.GDetailFormularTypUdalosti = GDetailFormularTypUdalosti;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbEZvcm11bGFyVHlwVWRhbG9zdGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsRm9ybXVsYXJUeXBVZGFsb3N0aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBZ0dmO0FBaEdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdHbkI7SUFoR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWdHL0I7UUFoR29CLFdBQUEsV0FBVztZQUM1QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEsT0FBQSxxQkFHM0M7Z0JBTUQsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSywyREFBbUQ7d0JBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O3dCQUM3RyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFBQSxDQUFDO2dCQUVGOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxhQUFhLENBQU8sMkJBQTJCLEVBQUU7d0JBRXJELElBQUksRUFDSjs0QkFDSSxX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QVUsR0FBRyxFQUFFLE1BQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsMENBQTBDO3FCQUNuTCxDQUNKLENBQUM7b0JBQ04sT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSixDQUFBO1lBM0ZZLDBCQUEwQjtnQkFEdEMsUUFBUTtlQUNJLDBCQUEwQixDQTJGdEM7WUEzRlksc0NBQTBCLDZCQTJGdEMsQ0FBQTtRQUNMLENBQUMsRUFoR29CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQWdHL0I7SUFBRCxDQUFDLEVBaEdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnR25CO0FBQUQsQ0FBQyxFQWhHUyxNQUFNLEtBQU4sTUFBTSxRQWdHZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUHJyLlVJV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbEZvcm11bGFyVHlwVWRhbG9zdGkgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8XHJcbiAgICAgICAgICAgIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnMgJlxyXG4gICAgICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zPj5cclxuICAgICAgICA+IGltcGxlbWVudHMgSUdDb250ZW50IHsgICAgICAgIFxyXG4gICAgICAgIFNhYmxvbmE/OiBzdHJpbmc7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBNcDogYm9vbGVhbjtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5SZXppbSA9IHRoaXMuUmV6aW1EZXRhaWx1O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldykgdGhpcy5vcmlnaW5hbE1vZGVsID0geyBzYWJsb25hOiB0aGlzLlNhYmxvbmEgfTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLm1vZGVsID0geyBzYWJsb25hOiB0aGlzLlNhYmxvbmEgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcykuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFJlemltKHRoYXQuUmV6aW0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkRldGFpbEJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkRldGFpbEZvcm11bGFyVHlwVWRhbG9zdGlcIiwge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRhYnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWmFrbGFkbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoYXQuY3JlYXRlRm9ybSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9ubHlOZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwVWRhID0gWzAsIDEwLCAyMCwgMzAsIDQwLCA1MCwgNjAsIDcwLCA4MCwgMTAwLCAxMTAsIDEyMCwgMTMwLCAxNzAsIDE4MCwgMTkwLCAyMDAsIDIxMCwgMjIwLCAyMzAsIDI0MCwgMjUwLCAyNjAsIDI3MCwgMjgwLCAzMTAsIDMyMCwgMzMwLCAzNDAsIDM0NSwgMzUwLCAzNzAsIDM4MCwgMzkwLCA0MDAsIDQxMF07XHJcbiAgICAgICAgICAgIHZhciB0eXBVZGFUeHQgPSBcImpyZXM6MjU4MDAwNjRcIjsgLy9SQyAyNTgwMDA2NCA6IFR5cCB1ZMOhbG9zdGlcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lk1wKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBVZGEgPSBbMCwgNTAsIDExMCwgMTIwLCAxMzAsIDE0MCwgMTUwLCAxNjAsIDIxMCwgMjQwLCAyNTAsIDI2MCwgMjcwLCAzNDAsIDM0NSwgMzUwLCAzNjBdO1xyXG4gICAgICAgICAgICAgICAgdHlwVWRhVHh0ID0gXCJqcmVzOjI1ODAwMDk1XCI7IC8vUkMgMjU4MDAwOTUgOiBUeXAgxZllxaFlbsOtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIsIG9wZW5lZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwNjRcIiwgdHJ1ZSkgLy9SQyAyNTgwMDA2NCA6IFR5cCB1ZMOhbG9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnBycmN1ZGEoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF91ZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfdWRhPXZhbHVlLnR5cF91ZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX3VkYTogdHlwVWRhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7IHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsLCBzb3VyY2UpIHsgcmV0dXJuIHZhbC50eXBfdWRhICE9IDA7IH0sIG1lc3NhZ2U6IFwianJlczoyNTgwMDA5N1wiIH0pXSAvL1JDIDI1ODAwMDk3IDogSG9uZG90YSBuZXNtw60gYsO9dCBuZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
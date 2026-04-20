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
            let GPokVyberKnihyPrevodTab = class GPokVyberKnihyPrevodTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.puvodniKniha = {};
                    Gordic.Isl.PokKniha.read({ ixp_den: this.ixpDen })
                        .get()
                        .done(function (data) {
                        that.puvodniKniha = data.data;
                        that.grid = $("<div>").appendTo(that.element)
                            .css("height", "100%")
                            .ggrid({
                            data: that.NactiData(), // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                            columnMode: "fit", // fit, full
                            navigationMode: "row", // row, cell
                            //scrollHelperTemplate: "{ac}",
                            //  searchColumns: ["ac"],
                            rowNumbers: false,
                            columns: that.createGridFormat(),
                            defaultAction: new GAction({
                                name: "actClose", run: function (ev, ctx) {
                                    var radek = ctx.cellInfo.data;
                                    if (radek != null)
                                        that.close(radek.ixp_den);
                                    that.close();
                                }
                            })
                        });
                    });
                    this.commandBar([
                        {
                            customClass: "g-button--primary",
                            action: new GAction({
                                name: "actOk", caption: GDlg.mbbOk.text, icon: "gi-tick", run: function (ev) {
                                    if (that.findForms().gform("isValid", true)) {
                                        var radek = that.grid.ggrid("getSelection")[0];
                                        if (radek != null)
                                            that.close(radek.ixp_den);
                                        that.close();
                                    }
                                }
                            })
                        },
                        {
                            action: new GAction({
                                name: "actZrusit", caption: GDlg.mbbCancel.text, icon: "gi-window-close", run: function (ev) {
                                    that.close();
                                }
                            })
                        }
                    ]);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp_den", caption: "jres:31302226" }); //RC 31302226 : Identifikátor
                    gridFormat.addTextColumn({ name: "nazev", caption: "Název knihy" });
                    gridFormat.addNumberColumn({ name: "rok", caption: "Rok" });
                    ;
                    return gridFormat;
                }
                NactiData() {
                    var that = this;
                    return new Gordic.Isl.View(Gordic.Isl.PokKniha.list(rq => {
                        return {
                            filters: {
                                pokvrfu_ixs_fun: that.ixsFun,
                                aktivita: [100, 300, 400, 500],
                                ico: this.gpc.ico,
                                ucs: this.gpc.ucs,
                                rok: this.gpc.rok,
                                ixs_vpk: that.puvodniKniha.ixs_vpk,
                                ixp_den: { v: that.puvodniKniha.ixp_den, o: "!=" } // pořešit že se nerovná, jak udělat?
                            }
                        };
                    }));
                }
            };
            GPokVyberKnihyPrevodTab = __decorate([
                Decorators.gcontent
            ], GPokVyberKnihyPrevodTab);
            WebClient.GPokVyberKnihyPrevodTab = GPokVyberKnihyPrevodTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Z5YmVyS25paHlQcmV2b2RUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rVnliZXJLbmloeVByZXZvZFRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBdUhmO0FBdkhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVIbkI7SUF2SGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVIN0I7UUF2SG9CLFdBQUEsU0FBUztZQUcxQixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLE9BQUEsWUFBWTtnQkFRckQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3lCQUM3QyxHQUFHLEVBQUU7eUJBQ0wsSUFBSSxDQUFDLFVBQVUsSUFBSTt3QkFFaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUU5QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs2QkFDeEMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7NkJBQ3JCLEtBQUssQ0FBQzs0QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFJLHlJQUF5STs0QkFDbkssVUFBVSxFQUFFLE1BQU0sRUFBTSw2Q0FBNkM7NEJBQ3JFLFVBQVUsRUFBRSxLQUFLLEVBQU8sWUFBWTs0QkFDcEMsY0FBYyxFQUFFLEtBQUssRUFBRyxZQUFZOzRCQUNwQywrQkFBK0I7NEJBQy9CLDBCQUEwQjs0QkFDMUIsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLE9B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QUMsR0FBRztnQ0FDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztnQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTztnQ0FDbEMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQSxxQ0FBcUM7NkJBQzNGO3lCQUNKLENBQUE7b0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUixDQUFDO2FBZ0JKLENBQUE7WUFsSFksdUJBQXVCO2dCQURuQyxVQUFVLENBQUMsUUFBUTtlQUNQLHVCQUF1QixDQWtIbkM7WUFsSFksaUNBQXVCLDBCQWtIbkMsQ0FBQTtRQUVMLENBQUMsRUF2SG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVIN0I7SUFBRCxDQUFDLEVBdkhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1SG5CO0FBQUQsQ0FBQyxFQXZIUyxNQUFNLEtBQU4sTUFBTSxRQXVIZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rVnliZXJLbmloeVByZXZvZFRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIGl4c0Z1bjogc3RyaW5nO1xyXG4gICAgICAgIGl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgcHV2b2RuaUtuaWhhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5wdXZvZG5pS25paGEgPSB7fTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5Qb2tLbmloYS5yZWFkKHsgaXhwX2RlbjogdGhpcy5peHBEZW4gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wdXZvZG5pS25paGEgPSBkYXRhLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0Lk5hY3RpRGF0YSgpLCAgIC8vIHRoaXMubW9kZWxQb2xvemt5WzBdICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbEhlbHBlclRlbXBsYXRlOiBcInthY31cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBzZWFyY2hDb2x1bW5zOiBbXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLCBydW46IGZ1bmN0aW9uIChldjogSlF1ZXJ5RXZlbnRPYmplY3QsIGN0eDogYW55KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UocmFkZWsuaXhwX2Rlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2tcIiwgY2FwdGlvbjogR0RsZy5tYmJPay50ZXh0LCBpY29uOiBcImdpLXRpY2tcIiwgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyYWRlay5peHBfZGVuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsIGNhcHRpb246IEdEbGcubWJiQ2FuY2VsLnRleHQsIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cF9kZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjI2XCIgfSk7IC8vUkMgMzEzMDIyMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwiTsOhemV2IGtuaWh5XCIgfSk7ICBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJva1wiLCBjYXB0aW9uOiBcIlJva1wiIH0pOyAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBOYWN0aURhdGEoKTogR29yZGljLklzbC5WaWV3IHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5Qb2tLbmloYS5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2t2cmZ1X2l4c19mdW46IHRoYXQuaXhzRnVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMCwzMDAsNDAwLDUwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5ncGMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoaXMuZ3BjLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGlzLmdwYy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c192cGs6IHRoYXQucHV2b2RuaUtuaWhhLml4c192cGssICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB7IHY6IHRoYXQucHV2b2RuaUtuaWhhLml4cF9kZW4gLCBvOiBcIiE9XCIgfS8vIHBvxZllxaFpdCDFvmUgc2UgbmVyb3Zuw6EsIGphayB1ZMSbbGF0P1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2xvc2luZygpIHsgXHJcblxyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIHJhZGVrID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tLbmloYUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcblxyXG4gICAgICAgIC8vICAgIGlmKHJhZGVrIT0gbnVsbClcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJhZGVrLml4cF9kZW47XHJcblxyXG4gICAgICAgIC8vICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAvL31cclxuXHJcbiAgICB9XHJcblxyXG59Il19
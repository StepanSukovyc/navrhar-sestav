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
            let GPokVyberKnihyUzaverkaTab = class GPokVyberKnihyUzaverkaTab extends Gordic.GContentBase {
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
                    gridFormat.addDateColumn({ name: "dat_uz_hl", caption: "Hlavní uzávěrka" });
                    gridFormat.addDateTimeColumn({ name: "dat_uz_den", caption: "Dílčí uzávěrka" });
                    return gridFormat;
                }
                NactiData() {
                    var that = this;
                    return new Gordic.Isl.View(Gordic.Isl.PokKniha.list(rq => {
                        return {
                            filters: {
                                aktivita: 100,
                                ico: this.gpc.ico,
                                ucs: this.gpc.ucs,
                                rok: this.gpc.rok,
                                mena: that.puvodniKniha.mena,
                                uus: that.puvodniKniha.uus,
                                ixp_den: { v: that.puvodniKniha.ixp_den, o: "!=" }
                            }
                        };
                    }));
                    //new GFilter<FilterPoksden>(FilterPoksden.rok, OperatorEnum.GreaterOrEqual, UserProcess.EkoParams.Rok),
                    //        new GFilter<FilterPoksden>(FilterPoksden.aktivita, OperatorEnum.Equal, new GInt16(100)),
                    //        new GFilter<FilterPoksden>(FilterPoksden.ico, OperatorEnum.Equal, UserProcess.EkoParams.Ico),
                    //        new GFilter<FilterPoksden>(FilterPoksden.ucs, OperatorEnum.Equal, UserProcess.EkoParams.Ucs),
                    //        //zobrazit pro převod zůstatku ve stejné měně
                    //        new GFilter<FilterPoksden>(FilterPoksden.mena, OperatorEnum.Equal, GPokWebCommon.PokKniha.VybranaKniha.mena),
                    //        //zobrazit knihy kromě uzavírané
                    //        new GFilter<FilterPoksden>(FilterPoksden.ixp_den, OperatorEnum.NotEqual, GPokWebCommon.PokKniha.VybranaKniha.ixp_den),
                    //        //stejná účtárna
                    //        new GFilter<FilterPoksden>(FilterPoksden.uus, OperatorEnum.Equal, GPokWebCommon.PokKniha.VybranaKniha.uus)
                }
            };
            GPokVyberKnihyUzaverkaTab = __decorate([
                Decorators.gcontent
            ], GPokVyberKnihyUzaverkaTab);
            WebClient.GPokVyberKnihyUzaverkaTab = GPokVyberKnihyUzaverkaTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Z5YmVyS25paHlVemF2ZXJrYVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tWeWJlcktuaWh5VXphdmVya2FUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWlJZjtBQWpJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpSW5CO0lBaklnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpSTdCO1FBaklvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxPQUFBLFlBQVk7Z0JBT3ZELGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFDN0MsR0FBRyxFQUFFO3lCQUNMLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBRWhCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFFOUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7NkJBQ3hDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOzZCQUNyQixLQUFLLENBQUM7NEJBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBSSx5SUFBeUk7NEJBQ25LLFVBQVUsRUFBRSxNQUFNLEVBQU0sNkNBQTZDOzRCQUNyRSxVQUFVLEVBQUUsS0FBSyxFQUFPLFlBQVk7NEJBQ3BDLGNBQWMsRUFBRSxLQUFLLEVBQUcscUNBQXFDOzRCQUM3RCxVQUFVLEVBQUUsS0FBSzs0QkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFB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RUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0NBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0NBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0NBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUk7Z0NBQzVCLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUc7Z0NBQzFCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRyxDQUFDLEVBQUUsSUFBSSxFQUFFOzZCQUN0RDt5QkFDSixDQUFBO29CQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBR0wsd0dBQXdHO29CQUN2RyxrR0FBa0c7b0JBQ2xHLHVHQUF1RztvQkFDdkcsdUdBQXVHO29CQUN2Ryx1REFBdUQ7b0JBQ3ZELHVIQUF1SDtvQkFDdkgsMENBQTBDO29CQUMxQyxnSUFBZ0k7b0JBQ2hJLDBCQUEwQjtvQkFDMUIsb0hBQW9IO2dCQUl4SCxDQUFDO2FBYUosQ0FBQTtZQTVIWSx5QkFBeUI7Z0JBRHJDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AseUJBQXlCLENBNEhyQztZQTVIWSxtQ0FBeUIsNEJBNEhyQyxDQUFBO1FBRUwsQ0FBQyxFQWpJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBaUk3QjtJQUFELENBQUMsRUFqSWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlJbkI7QUFBRCxDQUFDLEVBaklTLE1BQU0sS0FBTixNQUFNLFFBaUlmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tWeWJlcktuaWh5VXphdmVya2FUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBpeHBEZW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHB1dm9kbmlLbmloYTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0tuaWhhRHRvO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQucHV2b2RuaUtuaWhhID0ge307XHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rS25paGEucmVhZCh7IGl4cF9kZW46IHRoaXMuaXhwRGVuIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHV2b2RuaUtuaWhhID0gZGF0YS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC5OYWN0aURhdGEoKSwgICAvLyB0aGlzLm1vZGVsUG9sb3preVswXSAgIC8vemF0aW0gbmVtYW0gemFkbmEgZGF0YSwgbmFzdGF2aW0gcHJhemRuZSBwb2xlLiBWIG1vbWVudGUgbmFjdGVuaSBqZSBuYXN0YXZpbSBwcmVzIG9wdGlvbnMgKG1ldG9kYSBsb2FkSnNHcmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbCAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLCBydW46IGZ1bmN0aW9uIChldjogSlF1ZXJ5RXZlbnRPYmplY3QsIGN0eDogYW55KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHJhZGVrLml4cF9kZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2tcIiwgY2FwdGlvbjogR0RsZy5tYmJPay50ZXh0LCBpY29uOiBcImdpLXRpY2tcIiwgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyYWRlay5peHBfZGVuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsIGNhcHRpb246IEdEbGcubWJiQ2FuY2VsLnRleHQsIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cF9kZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjI2XCIgfSk7IC8vUkMgMzEzMDIyMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwiTsOhemV2IGtuaWh5XCIgfSk7ICBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJva1wiLCBjYXB0aW9uOiBcIlJva1wiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcImRhdF91el9obFwiLCBjYXB0aW9uOiBcIkhsYXZuw60gdXrDoXbEm3JrYVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZERhdGVUaW1lQ29sdW1uKHtuYW1lOiBcImRhdF91el9kZW5cIiwgY2FwdGlvbjogXCJEw61sxI3DrSB1esOhdsSbcmthXCJ9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBOYWN0aURhdGEoKTogR29yZGljLklzbC5WaWV3IHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5Qb2tLbmloYS5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmdwYy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhpcy5ncGMudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoaXMuZ3BjLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVuYTogdGhhdC5wdXZvZG5pS25paGEubWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXVzOiB0aGF0LnB1dm9kbmlLbmloYS51dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHsgdjogdGhhdC5wdXZvZG5pS25paGEuaXhwX2RlbiAsIG86IFwiIT1cIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgIC8vbmV3IEdGaWx0ZXI8RmlsdGVyUG9rc2Rlbj4oRmlsdGVyUG9rc2Rlbi5yb2ssIE9wZXJhdG9yRW51bS5HcmVhdGVyT3JFcXVhbCwgVXNlclByb2Nlc3MuRWtvUGFyYW1zLlJvayksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBuZXcgR0ZpbHRlcjxGaWx0ZXJQb2tzZGVuPihGaWx0ZXJQb2tzZGVuLmFrdGl2aXRhLCBPcGVyYXRvckVudW0uRXF1YWwsIG5ldyBHSW50MTYoMTAwKSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBuZXcgR0ZpbHRlcjxGaWx0ZXJQb2tzZGVuPihGaWx0ZXJQb2tzZGVuLmljbywgT3BlcmF0b3JFbnVtLkVxdWFsLCBVc2VyUHJvY2Vzcy5Fa29QYXJhbXMuSWNvKSxcclxuICAgICAgICAgICAgLy8gICAgICAgIG5ldyBHRmlsdGVyPEZpbHRlclBva3NkZW4+KEZpbHRlclBva3NkZW4udWNzLCBPcGVyYXRvckVudW0uRXF1YWwsIFVzZXJQcm9jZXNzLkVrb1BhcmFtcy5VY3MpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy96b2JyYXppdCBwcm8gcMWZZXZvZCB6xa9zdGF0a3UgdmUgc3Rlam7DqSBtxJtuxJtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5ldyBHRmlsdGVyPEZpbHRlclBva3NkZW4+KEZpbHRlclBva3NkZW4ubWVuYSwgT3BlcmF0b3JFbnVtLkVxdWFsLCBHUG9rV2ViQ29tbW9uLlBva0tuaWhhLlZ5YnJhbmFLbmloYS5tZW5hKSxcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vem9icmF6aXQga25paHkga3JvbcSbIHV6YXbDrXJhbsOpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBuZXcgR0ZpbHRlcjxGaWx0ZXJQb2tzZGVuPihGaWx0ZXJQb2tzZGVuLml4cF9kZW4sIE9wZXJhdG9yRW51bS5Ob3RFcXVhbCwgR1Bva1dlYkNvbW1vbi5Qb2tLbmloYS5WeWJyYW5hS25paGEuaXhwX2RlbiksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL3N0ZWpuw6Egw7rEjXTDoXJuYVxyXG4gICAgICAgICAgICAvLyAgICAgICAgbmV3IEdGaWx0ZXI8RmlsdGVyUG9rc2Rlbj4oRmlsdGVyUG9rc2Rlbi51dXMsIE9wZXJhdG9yRW51bS5FcXVhbCwgR1Bva1dlYkNvbW1vbi5Qb2tLbmloYS5WeWJyYW5hS25paGEudXVzKVxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jbG9zaW5nKCkgeyBcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICB2YXIgcmFkZWsgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0tuaWhhRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHJhZGVrLml4cF9kZW47XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=
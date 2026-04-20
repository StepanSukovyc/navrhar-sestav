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
            let GPokStavKnihTab = class GPokStavKnihTab extends Gordic.GContentBase {
                onContentReady() {
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "pokStavyKnihForm" })
                        .addSection("")
                        .addRow("jres:31302476") //RC 31302476 : Stav k datu
                        .addField("gdatebox", {
                        name: "k_datu",
                        change: function (ev, changeObj) {
                            that.dopocitejKDatu(changeObj.value);
                        }
                    })
                        .addSection("jres:31302475"); //RC 31302475 : Přehled zůstatků knih  
                    var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: this.ziskejData(), // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                }
                ziskejData() {
                    var islView = new Gordic.Isl.View(Gordic.Isl.PokKniha.list(rq => {
                        return {
                            filters: {
                                aktivita: [100, 300]
                            }
                        };
                    }), { key: "ixp_den" });
                    islView.process(new Gordic.Data.ComputedFieldsProcessor(function (rows) {
                        rows.forEach(function (row) {
                            if (row.data.mena == 0) {
                                row.c_zustatek = row.c_zustatek_m;
                                row.c_zustatek_k_datu = row.c_zustatek_m_k_datu;
                                // row.data.dat_uz_hl = Gordic.Templates.Formatters.date(row.data.dat_uz_hl!);
                            }
                        });
                    }));
                    return islView;
                }
                dopocitejKDatu(datum) {
                    var that = this;
                    var knihy = this.grid.ggrid("getView");
                    knihy.getDataRows().forEach(function (row) {
                        Gordic.Isl.PokKniha.pohybZaObdobi({ ixpDen: row.ixp_den, datum: { end: datum, start: undefined } })
                            .get()
                            .done(function (data) {
                            row.c_zustatek_k_datu = parseDecimal(row.c_pocatek).add(data.data.zustatek_h);
                            row.c_zustatek_m_k_datu = parseDecimal(row.c_pocatek_m).add(data.data.zustatek_h_m);
                            if (row.mena == 0) {
                                row.c_zustatek = row.c_zustatek_m;
                                row.c_zustatek_k_datu = row.c_zustatek_m_k_datu;
                            }
                            knihy.updateData(row, "update");
                            //that.grid.ggrid("refreshRows");
                        });
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp_den", caption: "jres:31302226" }); //RC 31302226 : Identifikátor
                    gridFormat.addTextColumn({ name: "nazev", caption: "jres:31302124" }); //RC 31302136 : Název
                    gridFormat.addTextColumn({ name: "mena_zkr", caption: "jres:31302124" }); //RC 31302124 : Měna           
                    gridFormat.addCurrencyColumn({ name: "c_zustatek_m", caption: "jres:31302469" }); //RC 31302469 : Zůstatek
                    gridFormat.addCurrencyColumn({ name: "c_zustatek_m_k_datu", caption: "jres:31302470" }); //RC 31302470 : Zůstatek k datu
                    gridFormat.addCurrencyColumn({ name: "c_zustatek", caption: "jres:31302471" }); //RC 31302471 :  "Zůstatek CZK
                    gridFormat.addCurrencyColumn({ name: "c_zustatek_k_datu", caption: "jres:31302472" }); //RC 31302472 : Zůstatek CZK k datu
                    gridFormat.addDateTimeColumn({ name: "dat_uz_hl", caption: "jres:31302473" }); //RC 31302473 : Hlavní uz.
                    gridFormat.addDateTimeColumn({ name: "dat_uz_den", caption: "jres:31302474" }); //RC 31302474 : Dílčí uz.
                    return gridFormat;
                }
            };
            GPokStavKnihTab = __decorate([
                Decorators.gcontent
            ], GPokStavKnihTab);
            WebClient.GPokStavKnihTab = GPokStavKnihTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1N0YXZLbmloVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1N0YXZLbmloVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FrSWY7QUFsSUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa0luQjtJQWxJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa0k3QjtRQWxJb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQU03QyxjQUFjO29CQUVWLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFHLGFBQWEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRXRFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO3lCQUMvRCxVQUFVLENBQUMsRUFBRSxDQUFDO3lCQUNkLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywyQkFBMkI7eUJBQ25ELFFBQVEsQ0FBQyxVQUFVLEVBQ3BCO3dCQUNJLElBQUksRUFBRSxRQUFRO3dCQUNkLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTOzRCQUUzQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFNLENBQUMsQ0FBQzt3QkFFMUMsQ0FBQztxQkFDSixDQUFDO3lCQUNELFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBLHVDQUF1QztvQkFFeEUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FB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QUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFBLDBCQUEwQjtvQkFDeEcsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFBLHlCQUF5QjtvQkFHeEcsT0FBTyxVQUFVLENBQUM7Z0JBRXRCLENBQUM7YUFDSixDQUFBO1lBOUhZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQThIM0I7WUE5SFkseUJBQWUsa0JBOEgzQixDQUFBO1FBQ0wsQ0FBQyxFQWxJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa0k3QjtJQUFELENBQUMsRUFsSWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtJbkI7QUFBRCxDQUFDLEVBbElTLE1BQU0sS0FBTixNQUFNLFFBa0lmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tTdGF2S25paFRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgIFxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgIGRlZmF1bHRBY3Rpb24gOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJwb2tTdGF2eUtuaWhGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDI0NzZcIikgLy9SQyAzMTMwMjQ3NiA6IFN0YXYgayBkYXR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia19kYXR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kb3BvY2l0ZWpLRGF0dShjaGFuZ2VPYmoudmFsdWUhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMTMwMjQ3NVwiKTsvL1JDIDMxMzAyNDc1IDogUMWZZWhsZWQgesWvc3RhdGvFryBrbmloICBcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnppc2tlakRhdGEoKSwgICAvLyB0aGlzLm1vZGVsUG9sb3preVswXSAgIC8vemF0aW0gbmVtYW0gemFkbmEgZGF0YSwgbmFzdGF2aW0gcHJhemRuZSBwb2xlLiBWIG1vbWVudGUgbmFjdGVuaSBqZSBuYXN0YXZpbSBwcmVzIG9wdGlvbnMgKG1ldG9kYSBsb2FkSnNHcmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie2FjfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICBzZWFyY2hDb2x1bW5zOiBbXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoKTogR29yZGljLklzbC5WaWV3IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc2xWaWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rS25paGEubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGEgOiBbMTAwLDMwMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSksIHtrZXk6IFwiaXhwX2RlblwifVxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICBpc2xWaWV3LnByb2Nlc3NcclxuICAgICAgICAgICAgICAgIChuZXcgR29yZGljLkRhdGEuQ29tcHV0ZWRGaWVsZHNQcm9jZXNzb3I8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0tuaWhhRHRvPihmdW5jdGlvbiAocm93cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7ICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdGEubWVuYSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuY196dXN0YXRlayA9IHJvdy5jX3p1c3RhdGVrX207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuY196dXN0YXRla19rX2RhdHUgPSByb3cuY196dXN0YXRla19tX2tfZGF0dTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcm93LmRhdGEuZGF0X3V6X2hsID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocm93LmRhdGEuZGF0X3V6X2hsISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpc2xWaWV3O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG9wb2NpdGVqS0RhdHUoZGF0dW06IERhdGUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBrbmloeSA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KFwiZ2V0Vmlld1wiKVxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBrbmloeS5nZXREYXRhUm93cygpLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLklzbC5Qb2tLbmloYS5wb2h5YlphT2Jkb2JpKHsgaXhwRGVuOiByb3cuaXhwX2RlbiEsIGRhdHVtOiB7IGVuZDogZGF0dW0sIHN0YXJ0OiB1bmRlZmluZWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuY196dXN0YXRla19rX2RhdHUgPSBwYXJzZURlY2ltYWwocm93LmNfcG9jYXRlayEpLmFkZChkYXRhLmRhdGEuenVzdGF0ZWtfaCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuY196dXN0YXRla19tX2tfZGF0dSA9IHBhcnNlRGVjaW1hbChyb3cuY19wb2NhdGVrX20hKS5hZGQoZGF0YS5kYXRhLnp1c3RhdGVrX2hfbSEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5tZW5hID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jX3p1c3RhdGVrID0gcm93LmNfenVzdGF0ZWtfbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jX3p1c3RhdGVrX2tfZGF0dSA9IHJvdy5jX3p1c3RhdGVrX21fa19kYXR1O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmloeS51cGRhdGVEYXRhKHJvdywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cF9kZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjI2XCIgfSk7IC8vUkMgMzEzMDIyMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwianJlczozMTMwMjEyNFwiIH0pOyAgLy9SQyAzMTMwMjEzNiA6IE7DoXpldlxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm1lbmFfemtyXCIsIGNhcHRpb246IFwianJlczozMTMwMjEyNFwiIH0pOyAvL1JDIDMxMzAyMTI0IDogTcSbbmEgICAgICAgICAgIFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3p1c3RhdGVrX21cIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDY5XCIgfSk7ICAvL1JDIDMxMzAyNDY5IDogWsWvc3RhdGVrXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfenVzdGF0ZWtfbV9rX2RhdHVcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDcwXCIgfSk7IC8vUkMgMzEzMDI0NzAgOiBaxa9zdGF0ZWsgayBkYXR1XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfenVzdGF0ZWtcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDcxXCIgfSk7ICAvL1JDIDMxMzAyNDcxIDogIFwiWsWvc3RhdGVrIENaS1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3p1c3RhdGVrX2tfZGF0dVwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDI0NzJcIiB9KTsgLy9SQyAzMTMwMjQ3MiA6IFrFr3N0YXRlayBDWksgayBkYXR1XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF91el9obFwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDI0NzNcIiB9KTsvL1JDIDMxMzAyNDczIDogSGxhdm7DrSB1ei5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X3V6X2RlblwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDI0NzRcIiB9KTsvL1JDIDMxMzAyNDc0IDogRMOtbMSNw60gdXouXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
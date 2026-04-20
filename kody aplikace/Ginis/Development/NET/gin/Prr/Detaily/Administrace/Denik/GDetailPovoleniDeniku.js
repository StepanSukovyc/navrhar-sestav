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
            let GDetailPovoleniDeniku = class GDetailPovoleniDeniku extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = { ixs_rad: this.IxsRad, ixs_fun: this.IxsFun };
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
                    builder.withComponent("DetailPovoleniDeniku", {
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
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25800047"; //RC 25800047 : Následující záznam<br>Název: {nazev} - {ginsfun_nazev}
                    this.detailMoveComponentPrevTemplate = "jres:25800048"; //RC 25800048 : Předchozí záznam<br>Název: {nazev} - {ginsfun_nazev}
                    this.enableFields = function (enable) {
                        this.findFields(".enabled").gfield("option", "disabled", !enable);
                        this.findFields("ixs_rad").gfield("option", "disabled", !enable || that.ProDenik || that.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */);
                        this.findFields("ixs_fun").gfield("option", "disabled", !enable || that.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */);
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
                    var typDen = 10;
                    if (that.Mp)
                        typDen = 20;
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M1S1, L-4-8-0, M-4-8-0, S-12-12-0", opened: true })
                        .addSection()
                        .addRow("jres:25800020", true) //RC 25800020 : Deník
                        .addField("gselectbox", Gordic.Prefabs.Select.prrsrad(), { dropdown: false, name: "ixs_rad", model: "model.ixs_rad=value.ixs_rad", disabled: this.readOnly, serverFilters: { typ_den: typDen, aktivita: 100 } })
                        .addRow("jres:25800028", true) //RC 25800028 : Funkce
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), { dropdown: false, name: "ixs_fun", model: "model.ixs_fun=value.ixs_fun", disabled: this.readOnly })
                        .addRow()
                        .addField("gcheck", { label: "jres:25800046", name: "pouze_prohlizet", customClass: "enabled", disabled: this.readOnly }) //RC 25800046 : Pouze prohlížet
                        .addRow("jres:25800025") //RC 25800025 : Aktivita
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly });
                    return form;
                }
            };
            GDetailPovoleniDeniku = __decorate([
                gcontent
            ], GDetailPovoleniDeniku);
            UIWebClient.GDetailPovoleniDeniku = GDetailPovoleniDeniku;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFBvdm9sZW5pRGVuaWt1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFBvdm9sZW5pRGVuaWt1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FzR2Y7QUF0R0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0duQjtJQXRHZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBc0cvQjtRQXRHb0IsV0FBQSxXQUFXO1lBQzVCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLHFCQU90QztnQkFTRCxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7d0JBQ2xJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUUzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxzQkFBc0IsRUFBRTt3QkFF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LDZCQUE2QixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQzVKLE1BQU0sRUFBRTt5QkFDUixRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUEsK0JBQStCO3lCQUN2SixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsd0JBQXdCO3lCQUNoRCxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzVLLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0osQ0FBQTtZQWpHWSxxQkFBcUI7Z0JBRGpDLFFBQVE7ZUFDSSxxQkFBcUIsQ0FpR2pDO1lBakdZLGlDQUFxQix3QkFpR2pDLENBQUE7UUFDTCxDQUFDLEVBdEdvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFzRy9CO0lBQUQsQ0FBQyxFQXRHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc0duQjtBQUFELENBQUMsRUF0R1MsTUFBTSxLQUFOLE1BQU0sUUFzR2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlByci5VSVdlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxQb3ZvbGVuaURlbmlrdSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxcclxuICAgICAgICAgICAgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucyAmXHJcbiAgICAgICAgICAgIFRoaXNUeXBlPEdDb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnM+PiAmXHJcbiAgICAgICAgICAgIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFDb21wb25lbnRFeHRlbnNpb25zICZcclxuICAgICAgICAgICAgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEV4dGVuc2lvbnM+PiAmXHJcbiAgICAgICAgICAgIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HRGV0YWlsTW92ZUNvbXBvbmVudEV4dGVuc2lvbnMgJlxyXG4gICAgICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0RldGFpbE1vdmVDb21wb25lbnRFeHRlbnNpb25zPj5cclxuICAgICAgICA+IGltcGxlbWVudHMgSUdDb250ZW50IHsgICAgICAgIFxyXG4gICAgICAgIEl4c1JhZD86IHN0cmluZztcclxuICAgICAgICBJeHNGdW4/OiBzdHJpbmc7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBNcDogYm9vbGVhbjtcclxuICAgICAgICBQcm9EZW5pazogYm9vbGVhbjtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuUmV6aW0gPSB0aGlzLlJlemltRGV0YWlsdTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHRoaXMub3JpZ2luYWxNb2RlbCA9IHsgaXhzX3JhZDogdGhpcy5JeHNSYWQsIGl4c19mdW46IHRoaXMuSXhzRnVuIH07XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5tb2RlbCA9IHsgaXhzX3JhZDogdGhpcy5JeHNSYWQgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcykuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFJlemltKHRoYXQuUmV6aW0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkRldGFpbEJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkRldGFpbFBvdm9sZW5pRGVuaWt1XCIsIHtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50R3JpZFJjID0gdGhpcy5HcmlkUmMhO1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnROZXh0VGVtcGxhdGUgPSBcImpyZXM6MjU4MDAwNDdcIjsgLy9SQyAyNTgwMDA0NyA6IE7DoXNsZWR1asOtY8OtIHrDoXpuYW08YnI+TsOhemV2OiB7bmF6ZXZ9IC0ge2dpbnNmdW5fbmF6ZXZ9XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudFByZXZUZW1wbGF0ZSA9IFwianJlczoyNTgwMDA0OFwiOyAvL1JDIDI1ODAwMDQ4IDogUMWZZWRjaG96w60gesOhem5hbTxicj5Ow6F6ZXY6IHtuYXpldn0gLSB7Z2luc2Z1bl9uYXpldn1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcIi5lbmFibGVkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJpeHNfcmFkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGUgfHwgdGhhdC5Qcm9EZW5payB8fCB0aGF0LlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5FZGl0YWNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiaXhzX2Z1blwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlIHx8IHRoYXQuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LkVkaXRhY2UpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNoYW5nZUFrdGl2aXRhQ29tcG9uZW50RW5hYmxlQWN0aW9ucyhlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZXRhaWxNb3ZlQ29tcG9uZW50RW5hYmxlQWN0aW9ucyhlbmFibGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcbiAgICAgICAgICAgIHZhciB0eXBEZW4gPSAxMDtcclxuICAgICAgICAgICAgaWYgKHRoYXQuTXApIHR5cERlbiA9IDIwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTFTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIsIG9wZW5lZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTgwMDAyMFwiLCB0cnVlKSAvL1JDIDI1ODAwMDIwIDogRGVuw61rXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5wcnJzcmFkKCksIHsgZHJvcGRvd246IGZhbHNlLCBuYW1lOiBcIml4c19yYWRcIiwgbW9kZWw6IFwibW9kZWwuaXhzX3JhZD12YWx1ZS5peHNfcmFkXCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LCBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF9kZW46IHR5cERlbiwgYWt0aXZpdGE6IDEwMCB9IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTgwMDAyOFwiLCB0cnVlKSAvL1JDIDI1ODAwMDI4IDogRnVua2NlXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksIHsgZHJvcGRvd246IGZhbHNlLCBuYW1lOiBcIml4c19mdW5cIiwgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bj12YWx1ZS5peHNfZnVuXCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IGxhYmVsOiBcImpyZXM6MjU4MDAwNDZcIiwgbmFtZTogXCJwb3V6ZV9wcm9obGl6ZXRcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB9KS8vUkMgMjU4MDAwNDYgOiBQb3V6ZSBwcm9obMOtxb5ldFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwMjVcIikgLy9SQyAyNTgwMDAyNSA6IEFrdGl2aXRhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jYWt0KCksIHsgbmFtZTogXCJha3Rpdml0YVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIG1vZGVsOiBcIm1vZGVsLmFrdGl2aXRhPXZhbHVlLmFrdGl2aXRhXCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
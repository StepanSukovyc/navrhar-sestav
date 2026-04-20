"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            let GDetailLhuty = class GDetailLhuty extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            ixp_spis: this.IxpSpis, por_cislo: this.PorCislo
                        };
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
                    builder.withComponent("lhutaDetail", {
                        //headerForm: this.createForm(),
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
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
                    var _afterDelete = function (content) {
                        content.tryClose();
                    };
                    var that = this;
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
                    this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam
                    this.afterDelete = _afterDelete;
                    this.enableFields = function (enable) {
                        that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                        that.findFields("stav").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */)); //vypnuti moznosti editace
                        that.findFields("zp_roz").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */)); //vypnuti moznosti editace
                    };
                    this.enableActions = function (enable) {
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                        that.actions.actNew?.visible(false); //zruseni zobrazeni policek horniho menu
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25500008", opened: true }) //RC 25500008 : Detail lhůty (termínu)
                        .addSection()
                        .addRow("jres:25200202") //RC 25200202 : Stav řízení
                        .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprcstaDto(), {
                        name: "stav", model: "model.stav=value.stav", dropdown: true,
                        serverFilters: { stav: "> 0" }
                    })
                        .addRow("jres:25200203") //RC 25200203 : Způsob rozhodnutí
                        .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprczprDto(), {
                        name: "zp_roz", model: "model.zp_roz=value.zp_roz", dropdown: true,
                    })
                        .addRow("jres:25500009") //RC 25500009 : Lhůta, termín
                        .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprctrmDto(), {
                        name: "typ_term", model: "model.typ_term=value.typ_term", customClass: "enabled", dropdown: true
                    })
                        .addRow("jres:25500010") //RC 25500010 : Datum od
                        .addField("gdatebox", "w-11", { name: "dat_od", customClass: "enabled" })
                        .addRow("jres:25500011") //RC 25500011 : Datum do
                        .addField("gdatebox", "w-11", { name: "dat_do", customClass: "enabled" })
                        .addSection()
                        .addRow("jres:25200070") //RC 25200070 : Stav lhůty
                        .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sprcslhDto(), {
                        name: "stav_lh", model: "model.stav_lh=value.stav_lh", customClass: "enabled", dropdown: true
                    })
                        .addRow("jres:25500012") //RC 25500012 : Datum ukončení
                        .addField("gdatebox", "w-11", { name: "dat_konlh", customClass: "enabled" })
                        .addSection()
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", "w-11", { name: "poznamka", customClass: "enabled", autoSize: false, allowResize: true, rows: 5 });
                    return form;
                }
            };
            GDetailLhuty = __decorate([
                gcontent
            ], GDetailLhuty);
            WebApp.GDetailLhuty = GDetailLhuty;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbExodXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbExodXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E0SGY7QUE1SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNEhuQjtJQTVIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBNEgxQjtRQTVIb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLE9BQUEscUJBQXdDO2dCQVd0RSxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRzs0QkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO3lCQUNuRCxDQUFDO29CQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUEsQ0FBQztnQkFFRjs7OzttQkFJRztnQkFDSCxtQkFBbUIsQ0FBQyxPQUFnRDtvQkFDaEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLENBQUMsYUFBYSxDQUFPLGFBQWEsRUFBRTt3QkFDdkMsZ0NBQWdDO3dCQUNoQyxJQUFJLEVBQ0o7NEJBQ0ksV0FBVyxFQUNYO2dDQUNJLElBQUksRUFBRSxVQUFVLEdBQUc7b0NBQ2YsSUFBSSxDQUFDLFdB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Q1osTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHdCQUF3Qjt5QkFDaEQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUU5SCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKLENBQUE7WUF2SFksWUFBWTtnQkFEeEIsUUFBUTtlQUNJLFlBQVksQ0F1SHhCO1lBdkhZLG1CQUFZLGVBdUh4QixDQUFBO1FBQ0wsQ0FBQyxFQTVIb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBNEgxQjtJQUFELENBQUMsRUE1SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRIbkI7QUFBRCxDQUFDLEVBNUhTLE1BQU0sS0FBTixNQUFNLFFBNEhmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbExodXR5IGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50PFVzZWRDb21wb25lbnRzTmV3PiBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIFBvckNpc2xvOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXY6IG51bWJlcjtcclxuICAgICAgICB6cF9yb3o6IG51bWJlcjtcclxuXHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5SZXppbSA9IHRoaXMuUmV6aW1EZXRhaWx1O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldylcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxNb2RlbCA9IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX3NwaXM6IHRoaXMuSXhwU3BpcywgcG9yX2Npc2xvOiB0aGlzLlBvckNpc2xvXHJcbiAgICAgICAgICAgICAgICB9OyBcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0UmV6aW0odGhhdC5SZXppbSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwibGh1dGFEZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgLy9oZWFkZXJGb3JtOiB0aGlzLmNyZWF0ZUZvcm0oKSxcclxuICAgICAgICAgICAgICAgIHRhYnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWmFrbGFkbmk6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5rY2UgZGV0YWlsYnVpbGRlcnUsIHNwdcWhdMSbbsOhIHBvIG1lcmdlIGtvbXBvbmVudFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfYWZ0ZXJEZWxldGUgPSBmdW5jdGlvbiAoY29udGVudDogR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudEdyaWRSYyA9IHRoaXMuR3JpZFJjITtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50TmV4dFRlbXBsYXRlID0gXCJqcmVzOjI1MjAwMzk2XCI7IC8vUkMgMjUyMDAzOTYgOiBOw6FzbGVkdWrDrWPDrSB6w6F6bmFtXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudFByZXZUZW1wbGF0ZSA9IFwianJlczoyNTIwMDM5N1wiOyAvL1JDIDI1MjAwMzk3IDogUMWZZWRjaG96w60gesOhem5hbVxyXG4gICAgICAgICAgICB0aGlzLmFmdGVyRGVsZXRlID0gX2FmdGVyRGVsZXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgLy8gc25pemkgcG9jZXQgdm9sYW5pIGZpbmRGaWVsZHMsIG5hc3RhdmkgY2Vsb3UgY3VzdG9tQ2xhc3MgXCJlbmFibGVkXCIgbmFqZWRub3VcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInN0YXZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuRWRpdGFjZSkpOyAvL3Z5cG51dGkgbW96bm9zdGkgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwienBfcm96XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGUgfHwgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LkVkaXRhY2UpKTsgLy92eXBudXRpIG1vem5vc3RpIGVkaXRhY2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlQWt0aXZpdGFDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldGFpbE1vdmVDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0TmV3Py52aXNpYmxlKGZhbHNlKTsgLy96cnVzZW5pIHpvYnJhemVuaSBwb2xpY2VrIGhvcm5paG8gbWVudVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczoyNTUwMDAwOFwiLCBvcGVuZWQ6IHRydWUgfSkgIC8vUkMgMjU1MDAwMDggOiBEZXRhaWwgbGjFr3R5ICh0ZXJtw61udSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMjAyXCIpLy9SQyAyNTIwMDIwMiA6IFN0YXYgxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMVwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3ByY3N0YUR0bygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2XCIsIG1vZGVsOiBcIm1vZGVsLnN0YXY9dmFsdWUuc3RhdlwiLCBkcm9wZG93bjogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBzdGF2OiBcIj4gMFwiIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAyMDNcIikgLy9SQyAyNTIwMDIwMyA6IFpwxa9zb2Igcm96aG9kbnV0w61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTExXCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjenByRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwX3JvelwiLCBtb2RlbDogXCJtb2RlbC56cF9yb3o9dmFsdWUuenBfcm96XCIsIGRyb3Bkb3duOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMDlcIikgLy9SQyAyNTUwMDAwOSA6IExoxa90YSwgdGVybcOtblxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTFcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNwcmN0cm1EdG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3Rlcm1cIiwgbW9kZWw6IFwibW9kZWwudHlwX3Rlcm09dmFsdWUudHlwX3Rlcm1cIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAxMFwiKSAvL1JDIDI1NTAwMDEwIDogRGF0dW0gb2RcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMVwiLCB7IG5hbWU6IFwiZGF0X29kXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIn0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAxMVwiKSAvL1JDIDI1NTAwMDExIDogRGF0dW0gZG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMVwiLCB7IG5hbWU6IFwiZGF0X2RvXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMDcwXCIpIC8vUkMgMjUyMDAwNzAgOiBTdGF2IGxoxa90eVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTFcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNwcmNzbGhEdG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9saFwiLCBtb2RlbDogXCJtb2RlbC5zdGF2X2xoPXZhbHVlLnN0YXZfbGhcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDEyXCIpIC8vUkMgMjU1MDAwMTIgOiBEYXR1bSB1a29uxI1lbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTFcIiwgeyBuYW1lOiBcImRhdF9rb25saFwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCJ9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMDU4XCIpIC8vUkMgMjUyMDAwNTggOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTExXCIsIHsgbmFtZTogXCJwb3puYW1rYVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIGF1dG9TaXplOiBmYWxzZSwgYWxsb3dSZXNpemU6IHRydWUsIHJvd3M6IDUgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
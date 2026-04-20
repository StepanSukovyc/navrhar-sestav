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
            /**
             * GDetail
             *
             * @author Petr Dytrich
             */
            let GDetailOstatnihoSubjektu = class GDetailOstatnihoSubjektu extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: this.TypVazby, lic_zast: this.LicZast, por_zast: this.PorZast
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
                    builder.withComponent("ostatniSubjektDetail", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        //actions:
                        //{
                        //},
                        //menuBar: [
                        //]
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
                    var _afterDelete = function (content) {
                        content.tryClose();
                    };
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
                    this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam
                    this.afterDelete = _afterDelete;
                    this.enableFields = function (enable) {
                        that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                        that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */));
                    };
                    this.enableActions = function (enable) {
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                    };
                    //this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions): JQueryPromise<any> {
                    //    var prom = $.Deferred();
                    //    return prom;
                    //}
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200183", opened: true }) //RC 25200183 : Detail ostatního subjektu
                        .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0" })
                        .addRow("jres:25200137", true) //RC 25200137 : Subjekt
                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        Logovani: {
                            // zadání logovacích údaju je nutnost hlavně IXP
                            Ixp: that.IxpSpis,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                            AktZnacka: that.SSLCjSpis,
                            DuvodHledaniTxt: WebApp.VyberEsu_DuvodHledaniTxt
                        }
                    }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25300003", true) //RC 25300003 : Druh subjektu
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                        name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { typ_vazby: [60 /* Gordic.Spr.Interface.TypSubjektuEnum.Ostatni */] }
                    })
                        .addRow()
                        .addField("gcheck", "w-5 w-L-4", {
                        label: "jres:25300039", name: "s_odes", customClass: "enabled", //RC 25300039 : Doručovat
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 });
                    return form;
                }
            };
            GDetailOstatnihoSubjektu = __decorate([
                gcontent
            ], GDetailOstatnihoSubjektu);
            WebApp.GDetailOstatnihoSubjektu = GDetailOstatnihoSubjektu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE9zdGF0bmlob1N1Ympla3R1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbE9zdGF0bmlob1N1Ympla3R1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2SGY7QUE3SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNkhuQjtJQTdIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBNkgxQjtRQTdIb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7ZUFJRztZQUVILElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEsT0FBQSxxQkFBd0M7Z0JBVWxGLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssMkRBQW1EO3dCQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHOzRCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87eUJBQ3pILENBQUM7b0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFBQSxDQUFDO2dCQUVGOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENB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WUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUM3RTtvQkFDTCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKLENBQUE7WUFuSFksd0JBQXdCO2dCQURwQyxRQUFRO2VBQ0ksd0JBQXdCLENBbUhwQztZQW5IWSwrQkFBd0IsMkJBbUhwQyxDQUFBO1FBQ0wsQ0FBQyxFQTdIb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBNkgxQjtJQUFELENBQUMsRUE3SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZIbkI7QUFBRCxDQUFDLEVBN0hTLE1BQU0sS0FBTixNQUFNLFFBNkhmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHRGV0YWlsXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgUGV0ciBEeXRyaWNoXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxPc3RhdG5paG9TdWJqZWt0dSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxVc2VkQ29tcG9uZW50c05ldz4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIEl4cFNwaXM6IHN0cmluZztcclxuICAgICAgICBJeHNFc3U6IHN0cmluZztcclxuICAgICAgICBUeXBWYXpieTogbnVtYmVyO1xyXG4gICAgICAgIExpY1phc3Q6IHN0cmluZztcclxuICAgICAgICBQb3JaYXN0OiBudW1iZXI7XHJcbiAgICAgICAgU1NMQ2pTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUmV6aW0gPSB0aGlzLlJlemltRGV0YWlsdTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsTW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX3NwaXM6IHRoaXMuSXhwU3BpcywgaXhzX2VzdTogdGhpcy5JeHNFc3UsIHR5cF92YXpieTogdGhpcy5UeXBWYXpieSwgbGljX3phc3Q6IHRoaXMuTGljWmFzdCwgcG9yX3phc3Q6IHRoaXMuUG9yWmFzdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0UmV6aW0odGhhdC5SZXppbSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIm9zdGF0bmlTdWJqZWt0RGV0YWlsXCIsIHtcclxuICAgICAgICAgICAgICAgIHRhYnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWmFrbGFkbmk6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9tZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfYWZ0ZXJEZWxldGUgPSBmdW5jdGlvbiAoY29udGVudDogR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudEdyaWRSYyA9IHRoaXMuR3JpZFJjITtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50TmV4dFRlbXBsYXRlID0gXCJqcmVzOjI1MjAwMzk2XCI7IC8vUkMgMjUyMDAzOTYgOiBOw6FzbGVkdWrDrWPDrSB6w6F6bmFtXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudFByZXZUZW1wbGF0ZSA9IFwianJlczoyNTIwMDM5N1wiOyAvL1JDIDI1MjAwMzk3IDogUMWZZWRjaG96w60gesOhem5hbVxyXG4gICAgICAgICAgICB0aGlzLmFmdGVyRGVsZXRlID0gX2FmdGVyRGVsZXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgLy8gc25pemkgcG9jZXQgdm9sYW5pIGZpbmRGaWVsZHMsIG5hc3RhdmkgY2Vsb3UgY3VzdG9tQ2xhc3MgXCJlbmFibGVkXCIgbmFqZWRub3VcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuRWRpdGFjZSkpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsTW92ZUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy90aGlzLmFmdGVyTG9hZERhdGEgPSBmdW5jdGlvbiAoY29udGVudDogR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgLy8gICAgdmFyIHByb20gPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUZvcm0oKTogXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjI1MjAwMTgzXCIsIG9wZW5lZDogdHJ1ZSB9KSAvL1JDIDI1MjAwMTgzIDogRGV0YWlsIG9zdGF0bsOtaG8gc3ViamVrdHVcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0xMlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMi0xMC0wLCBNLTMtOS0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAxMzdcIiwgdHJ1ZSkgLy9SQyAyNTIwMDEzNyA6IFN1Ympla3RcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lkl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlEb3RjZW5laG9TdWJqZWt0dSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiB0aGF0LlNTTENqU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBWeWJlckVzdV9EdXZvZEhsZWRhbmlUeHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSwgeyBuYW1lOiBcIml4c19lc3VcIiwgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUzMDAwMDNcIiwgdHJ1ZSkgLy9SQyAyNTMwMDAwMyA6IERydWggc3ViamVrdHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbHNkdmFTcHJEdG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YVwiLCBtb2RlbDogXCJtb2RlbC5peHNfZHZhPXZhbHVlLml4c19kdmFcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX3ZhemJ5OiBbR29yZGljLlNwci5JbnRlcmZhY2UuVHlwU3ViamVrdHVFbnVtLk9zdGF0bmldIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNSB3LUwtNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNTMwMDAzOVwiLCBuYW1lOiBcInNfb2Rlc1wiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIC8vUkMgMjUzMDAwMzkgOiBEb3J1xI1vdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwNThcIikgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCByb3dzOiA0IH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
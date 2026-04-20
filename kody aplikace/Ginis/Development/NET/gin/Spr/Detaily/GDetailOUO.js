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
            let GDetailOUO = class GDetailOUO extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            ixp_spis: this.IxpSpis, ixs_ouo: this.IxsOuo
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
                    builder.withComponent("ouoDetail", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        }
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
                        that.findFields("ixs_ouo").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */));
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
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200196", opened: true }) //RC 25200196 : Detail oprávněné úřední osoby
                        .addSection({ customClass: "w-12", layoutDescriptor: "L-3-9-0, M-4-8-0, S-12-12-0" })
                        .addRow("jres:25200197") //RC 25200197 : Oprávněná úř. osoba
                        .addField("gselectbox", Gordic.Prefabs.Select.sprsouoDto(), {
                        name: "ixs_ouo", model: "model.ixs_ouo=value.ixs_ouo", dropdown: false,
                        serverFilters: { ixs_dsr: [that.IxsDsr] },
                        validators: [new Gordic.Validators.Required()],
                        flag: "required"
                    })
                        .addRow("jres:25200205") //RC 25200205 : Účinnost
                        .addField("gselectbox", Gordic.Prefabs.Select.sprcuciDto(), {
                        name: "ucinnost", model: "model.ucinnost=value.ucinnost", customClass: "enabled",
                        serverFilters: { ucinnost: "> 0" },
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    })
                        .addRow("jres:25200206") //RC 25200206 : Důvod určení
                        .addField("gselectbox", Gordic.Prefabs.Select.sprcdurDto(), {
                        name: "duv_urc", model: "model.duv_urc=value.duv_urc", customClass: "enabled",
                        serverFilters: { duv_urc: "> 0" },
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    })
                        .addRow("jres:25200207") //RC 25200207 : Datum pověření, ID
                        .addField("gdatebox", "w-6", { name: "dat_roz_pov", model: "model.dat_roz_pov=value", valueType: "date", customClass: "enabled" })
                        .addField("gstringbox", "w-6", Gordic.Gin.Prefabs.Field.Identifikator({
                        fieldOpt: { name: "ixp_pov", customClass: "enabled", validators: [new Gordic.Validators.Ixs()] },
                        isPid: true
                    }, true))
                        .addRow("jres:25200208") //RC 25200208 : Datum odvolání, ID
                        .addField("gdatebox", "w-6", { name: "dat_roz_odv", model: "model.dat_roz_odv=value", valueType: "date", customClass: "enabled" })
                        .addField("gstringbox", "w-6", Gordic.Gin.Prefabs.Field.Identifikator({
                        fieldOpt: { name: "ixp_odv", customClass: "enabled", validators: [new Gordic.Validators.Ixs()] },
                        isPid: true
                    }, true))
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 });
                    return form;
                }
            };
            GDetailOUO = __decorate([
                gcontent
            ], GDetailOUO);
            WebApp.GDetailOUO = GDetailOUO;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE9VTy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxPVU8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXVIZjtBQXZIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1SG5CO0lBdkhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0F1SDFCO1FBdkhvQixXQUFBLE1BQU07WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7OztlQUlHO1lBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLE9BQUEscUJBQXdDO2dCQU9wRSxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFBRSxJQUFJLENBQUMsYUFBYSxHQUFHOzRCQUNwRixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07eUJBQy9DLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFBQSxDQUFDO2dCQUVGOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLE9BQU8sQ0FBQyxhQUFhLENBQU8sV0FBVyxFQUFFO3dCQUNyQyxJQUFJLEVBQ0o7NEJBQ0ksV0FBVyxFQUNYO2dDQUNJLElBQUksRUFBRSxVQUFVLEdBQUc7b0NBQ2YsSUFBSSxDQUFDLFdBQVcsR0FB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QUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLENBQUM7eUJBQ2pJLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7d0JBQ2xFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTt3QkFDaEcsS0FBSyxFQUFFLElBQUk7cUJBQ2QsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDUixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsd0JBQXdCO3lCQUNoRCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUM3RTtvQkFDTCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKLENBQUE7WUE3R1ksVUFBVTtnQkFEdEIsUUFBUTtlQUNJLFVBQVUsQ0E2R3RCO1lBN0dZLGlCQUFVLGFBNkd0QixDQUFBO1FBQ0wsQ0FBQyxFQXZIb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBdUgxQjtJQUFELENBQUMsRUF2SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXVIbkI7QUFBRCxDQUFDLEVBdkhTLE1BQU0sS0FBTixNQUFNLFFBdUhmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHRGV0YWlsXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgUGV0ciBEeXRyaWNoXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxPVU8gZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNOZXc+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICBJeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgSXhzT3VvOiBzdHJpbmc7XHJcbiAgICAgICAgSXhzRHNyOiBzdHJpbmc7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUmV6aW0gPSB0aGlzLlJlemltRGV0YWlsdTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHRoaXMub3JpZ2luYWxNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgIGl4cF9zcGlzOiB0aGlzLkl4cFNwaXMsIGl4c19vdW86IHRoaXMuSXhzT3VvXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcykuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFJlemltKHRoYXQuUmV6aW0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkRldGFpbEJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJvdW9EZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgdGFiczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoYXQuY3JlYXRlRm9ybSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2FmdGVyRGVsZXRlID0gZnVuY3Rpb24gKGNvbnRlbnQ6IEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucyAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFDb21wb25lbnRFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnRHcmlkUmMgPSB0aGlzLkdyaWRSYyE7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudE5leHRUZW1wbGF0ZSA9IFwianJlczoyNTIwMDM5NlwiOyAvL1JDIDI1MjAwMzk2IDogTsOhc2xlZHVqw61jw60gesOhem5hbVxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnRQcmV2VGVtcGxhdGUgPSBcImpyZXM6MjUyMDAzOTdcIjsgLy9SQyAyNTIwMDM5NyA6IFDFmWVkY2hvesOtIHrDoXpuYW1cclxuICAgICAgICAgICAgdGhpcy5hZnRlckRlbGV0ZSA9IF9hZnRlckRlbGV0ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlRmllbGRzID0gZnVuY3Rpb24gKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiLmVuYWJsZWRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSk7IC8vIHNuaXppIHBvY2V0IHZvbGFuaSBmaW5kRmllbGRzLCBuYXN0YXZpIGNlbG91IGN1c3RvbUNsYXNzIFwiZW5hYmxlZFwiIG5hamVkbm91XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfb3VvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGUgfHwgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LkVkaXRhY2UpKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zID0gZnVuY3Rpb24gKGVuYWJsZTogYm9vbGVhbikgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlQWt0aXZpdGFDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldGFpbE1vdmVDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjI1MjAwMTk2XCIsIG9wZW5lZDogdHJ1ZSB9KSAvL1JDIDI1MjAwMTk2IDogRGV0YWlsIG9wcsOhdm7Em27DqSDDusWZZWRuw60gb3NvYnlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0xMlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMy05LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDE5N1wiKSAvL1JDIDI1MjAwMTk3IDogT3Byw6F2bsSbbsOhIMO6xZkuIG9zb2JhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJzb3VvRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19vdW9cIiwgbW9kZWw6IFwibW9kZWwuaXhzX291bz12YWx1ZS5peHNfb3VvXCIsIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGl4c19kc3I6IFt0aGF0Lkl4c0Rzcl0gfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMjA1XCIpIC8vUkMgMjUyMDAyMDUgOiDDmsSNaW5ub3N0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjdWNpRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjaW5ub3N0XCIsIG1vZGVsOiBcIm1vZGVsLnVjaW5ub3N0PXZhbHVlLnVjaW5ub3N0XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHVjaW5ub3N0OiBcIj4gMFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAyMDZcIikgLy9SQyAyNTIwMDIwNiA6IETFr3ZvZCB1csSNZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3ByY2R1ckR0bygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkdXZfdXJjXCIsIG1vZGVsOiBcIm1vZGVsLmR1dl91cmM9dmFsdWUuZHV2X3VyY1wiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBkdXZfdXJjOiBcIj4gMFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAyMDdcIikgLy9SQyAyNTIwMDIwNyA6IERhdHVtIHBvdsSbxZllbsOtLCBJRFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBuYW1lOiBcImRhdF9yb3pfcG92XCIsIG1vZGVsOiBcIm1vZGVsLmRhdF9yb3pfcG92PXZhbHVlXCIsIHZhbHVlVHlwZTogXCJkYXRlXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCBHb3JkaWMuR2luLlByZWZhYnMuRmllbGQuSWRlbnRpZmlrYXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRPcHQ6IHsgbmFtZTogXCJpeHBfcG92XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5JeHMoKV0gfSxcclxuICAgICAgICAgICAgICAgICAgICBpc1BpZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDIwOFwiKSAvL1JDIDI1MjAwMjA4IDogRGF0dW0gb2R2b2zDoW7DrSwgSURcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJkYXRfcm96X29kdlwiLCBtb2RlbDogXCJtb2RlbC5kYXRfcm96X29kdj12YWx1ZVwiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLkdpbi5QcmVmYWJzLkZpZWxkLklkZW50aWZpa2F0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkT3B0OiB7IG5hbWU6IFwiaXhwX29kdlwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuSXhzKCldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNQaWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sIHRydWUpKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwNThcIikgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCByb3dzOiA0IH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
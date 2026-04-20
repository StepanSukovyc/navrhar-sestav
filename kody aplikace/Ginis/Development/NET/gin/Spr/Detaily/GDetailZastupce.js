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
            let GDetailZastupce = class GDetailZastupce extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: 50 /* Gordic.Spr.Interface.TypSubjektuEnum.Zastupce */, lic_zast: this.LicZast, por_zast: this.PorZast
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
                    builder.withComponent("zastupceDetail", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        actions: {
                            actZastupovani: {
                                caption: "jres:25200168", //RC 25200168 : Zastupování
                                run: function (ev, obj) {
                                    that.navigate(["Gordic.Spr.WebApp.GSeznamVazebSubjektu", {}], {
                                        IxpSpis: that.IxpSpis,
                                        TypVzVazby: 1 /* Gordic.Spr.Interface.TypVzVazbyEnum.Zastupovani */,
                                        IxsEsu: that.IxsEsu,
                                        TypVazby: 50 /* Gordic.Spr.Interface.TypSubjektuEnum.Zastupce */,
                                        LicZast: that.LicZast,
                                        PorZast: that.PorZast
                                    });
                                }
                            }
                        },
                        menuBar: [
                            {
                                id: "menuZastupce", caption: "jres:25200402", type: "static", after: "akce", children: [
                                    { id: "menuZastupovani", action: "actZastupovani", favorite: true }
                                ]
                            }
                        ]
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
                        that.actions["actZastupovani"].enabled(!enable);
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200164", opened: true }) //RC 25200164 : Zástupce ve správním řízení
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
                        .addRow("jres:25300004", true) //RC 25300004 : Druh zástupce
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                        name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { typ_vazby: [50 /* Gordic.Spr.Interface.TypSubjektuEnum.Zastupce */] }
                    })
                        .addRow("Číslo zástupce")
                        .addField("gstringbox", { name: "cislo_cak", customClass: "enabled" })
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
            GDetailZastupce = __decorate([
                gcontent
            ], GDetailZastupce);
            WebApp.GDetailZastupce = GDetailZastupce;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFphc3R1cGNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFphc3R1cGNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E4SWY7QUE5SUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEluQjtJQTlJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBOEkxQjtRQTlJb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7ZUFJRztZQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxxQkFBd0M7Z0JBU3pFLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssMkRBQW1EO3dCQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHOzRCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLHdEQUErQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDekosQ0FBQztvQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxnQkFB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QUcsUUE4SW5CO0FBQUQsQ0FBQyxFQTlJUyxNQUFNLEtBQU4sTUFBTSxRQThJZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR0RldGFpbFxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIFBldHIgRHl0cmljaFxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsWmFzdHVwY2UgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNOZXc+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICBJeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgSXhzRXN1OiBzdHJpbmc7XHJcbiAgICAgICAgTGljWmFzdDogc3RyaW5nO1xyXG4gICAgICAgIFBvclphc3Q6IG51bWJlcjtcclxuICAgICAgICBTU0xDalNwaXM6IHN0cmluZztcclxuICAgICAgICBHcmlkUmM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5SZXppbSA9IHRoaXMuUmV6aW1EZXRhaWx1O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldylcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfc3BpczogdGhpcy5JeHBTcGlzLCBpeHNfZXN1OiB0aGlzLkl4c0VzdSwgdHlwX3ZhemJ5OiBHb3JkaWMuU3ByLkludGVyZmFjZS5UeXBTdWJqZWt0dUVudW0uWmFzdHVwY2UsIGxpY196YXN0OiB0aGlzLkxpY1phc3QsIHBvcl96YXN0OiB0aGlzLlBvclphc3RcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcykuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFJlemltKHRoYXQuUmV6aW0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkRldGFpbEJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJ6YXN0dXBjZURldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFphc3R1cG92YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDE2OFwiLCAvL1JDIDI1MjAwMTY4IDogWmFzdHVwb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5TcHIuV2ViQXBwLkdTZXpuYW1WYXplYlN1Ympla3R1XCIsIHt9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwVnpWYXpieTogR29yZGljLlNwci5JbnRlcmZhY2UuVHlwVnpWYXpieUVudW0uWmFzdHVwb3ZhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4c0VzdTogdGhhdC5JeHNFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cFZhemJ5OiBHb3JkaWMuU3ByLkludGVyZmFjZS5UeXBTdWJqZWt0dUVudW0uWmFzdHVwY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExpY1phc3Q6IHRoYXQuTGljWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9yWmFzdDogdGhhdC5Qb3JaYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZW51WmFzdHVwY2VcIiwgY2FwdGlvbjogXCJqcmVzOjI1MjAwNDAyXCIsIHR5cGU6IFwic3RhdGljXCIsIGFmdGVyOiBcImFrY2VcIiwgY2hpbGRyZW46IFsgLy9SQyAyNTIwMDQwMiA6IFrDoXN0dXBjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJtZW51WmFzdHVwb3ZhbmlcIiwgYWN0aW9uOiBcImFjdFphc3R1cG92YW5pXCIsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfYWZ0ZXJEZWxldGUgPSBmdW5jdGlvbiAoY29udGVudDogR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudEdyaWRSYyA9IHRoaXMuR3JpZFJjITtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50TmV4dFRlbXBsYXRlID0gXCJqcmVzOjI1MjAwMzk2XCI7IC8vUkMgMjUyMDAzOTYgOiBOw6FzbGVkdWrDrWPDrSB6w6F6bmFtXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudFByZXZUZW1wbGF0ZSA9IFwianJlczoyNTIwMDM5N1wiOyAvL1JDIDI1MjAwMzk3IDogUMWZZWRjaG96w60gesOhem5hbVxyXG4gICAgICAgICAgICB0aGlzLmFmdGVyRGVsZXRlID0gX2FmdGVyRGVsZXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgLy8gc25pemkgcG9jZXQgdm9sYW5pIGZpbmRGaWVsZHMsIG5hc3RhdmkgY2Vsb3UgY3VzdG9tQ2xhc3MgXCJlbmFibGVkXCIgbmFqZWRub3VcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuRWRpdGFjZSkpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsTW92ZUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9uc1tcImFjdFphc3R1cG92YW5pXCJdIS5lbmFibGVkKCFlbmFibGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MjUyMDAxNjRcIiwgb3BlbmVkOiB0cnVlIH0pIC8vUkMgMjUyMDAxNjQgOiBaw6FzdHVwY2UgdmUgc3Byw6F2bsOtbSDFmcOtemVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0xMlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMi0xMC0wLCBNLTMtOS0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAxMzdcIiwgdHJ1ZSkgLy9SQyAyNTIwMDEzNyA6IFN1Ympla3RcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lkl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlEb3RjZW5laG9TdWJqZWt0dSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiB0aGF0LlNTTENqU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBWeWJlckVzdV9EdXZvZEhsZWRhbmlUeHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSwgeyBuYW1lOiBcIml4c19lc3VcIiwgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUzMDAwMDRcIiwgdHJ1ZSkgLy9SQyAyNTMwMDAwNCA6IERydWggesOhc3R1cGNlXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzZHZhU3ByRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFcIiwgbW9kZWw6IFwibW9kZWwuaXhzX2R2YT12YWx1ZS5peHNfZHZhXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF92YXpieTogW0dvcmRpYy5TcHIuSW50ZXJmYWNlLlR5cFN1Ympla3R1RW51bS5aYXN0dXBjZV0gfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOtc2xvIHrDoXN0dXBjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiY2lzbG9fY2FrXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTUgdy1MLTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjUzMDAwMzlcIiwgbmFtZTogXCJzX29kZXNcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCAvL1JDIDI1MzAwMDM5IDogRG9ydcSNb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMDU4XCIpIC8vUkMgMjUyMDAwNTggOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvem5hbWthXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgcm93czogNCB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
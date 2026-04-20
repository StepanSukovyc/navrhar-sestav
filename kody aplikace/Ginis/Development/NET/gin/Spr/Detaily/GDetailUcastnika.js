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
            let GDetailUcastnika = class GDetailUcastnika extends Gordic.GDetailBuilderContent {
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
                    builder.withComponent("ucastnikDetail", {
                        //headerForm: this.createForm(),
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        actions: {
                            actZastupci: {
                                caption: "jres:25200316", //RC 25200316 : Zástupci
                                run: function (ev, obj) {
                                    that.navigate(["Gordic.Spr.WebApp.GSeznamVazebSubjektu", {}], {
                                        IxpSpis: that.IxpSpis,
                                        TypVzVazby: 0 /* Gordic.Spr.Interface.TypVzVazbyEnum.Zastupci */,
                                        IxsEsu: that.IxsEsu,
                                        TypVazby: that.TypVazby,
                                        LicZast: that.LicZast,
                                        PorZast: that.PorZast
                                    });
                                }
                            }
                        },
                        menuBar: [
                            {
                                id: "menuUcastnik", caption: "jres:25200403", type: "static", after: "akce", children: [
                                    { id: "menuZastupci", action: "actZastupci", favorite: true }
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
                    var _afterDelete = function (content) {
                        content.tryClose();
                    };
                    var that = this;
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25200392"; //RC 25200392 : Následující záznam<br>ID: {ixs_esu}
                    this.detailMoveComponentPrevTemplate = "jres:25200391"; //RC 25200391 : Předchozí záznam<br>ID: {ixs_esu}
                    this.afterDelete = _afterDelete;
                    this.enableFields = function (enable) {
                        that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                        that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */)); //vypnuti moznosti editace
                    };
                    this.enableActions = function (enable) {
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                        that.actions["actZastupci"].enabled(!enable);
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200059", opened: true }) //RC 25200059 : Účastník správního řízení
                        .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0" })
                        .addRow("jres:25200137", true) //RC 25200137 : Subjekt
                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        Logovani: {
                            // zadání logovacích údaju je nutnost hlavně IXP
                            Ixp: that.IxpSpis,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                            AktZnacka: "",
                            DuvodHledaniTxt: WebApp.VyberEsu_DuvodHledaniTxt
                        }
                    }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "disabled", validators: [new Gordic.Validators.Required()] })
                        .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0" })
                        .addRow("jres:25500001", true) //RC 25500001 : Druh subjektu
                        .addField("gselectbox", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                        name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { typ_vazby: this.TypVazby }
                    })
                        .addRow()
                        .addField("gcheck", "w-5 w-L-4", {
                        label: "jres:25300039", name: "s_odes", customClass: "enabled", //RC 25300039 : Doručovat
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addSection({ customClass: "w-L-6 w-M-6", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addRow("jres:25500002", true) //RC 25500002 : Jazyková práva
                        .addField("gselectbox", Gordic.Prefabs.Select.sprcucjDto(), {
                        name: "typ_ucj", model: "model.typ_ucj=value.typ_ucj", customClass: "enabled", dropdown: true,
                        serverFilters: { typ_ucj: [10, 20, 30] }, validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:25500003", true) //RC 25500003 : Procesní způsobilost
                        .addField("gselectbox", Gordic.Prefabs.Select.sprctpzDto(), {
                        name: "typ_pz", model: "model.typ_pz=value.typ_pz", customClass: "enabled", dropdown: true,
                        serverFilters: { typ_pz: [10, 20, 30, 40] }, validators: [new Gordic.Validators.Required()]
                    })
                        .addSection({ customClass: "w-L-6 w-M-6", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addRow("jres:25500004", true) //RC 25500004 : Znalost českého jazyka
                        .addField("gselectbox", Gordic.Prefabs.Select.sprcscjDto(), {
                        name: "s_cj_jazyk", model: "model.s_cj_jazyk=value.s_cj_jazyk", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:25500005", true) //RC 25500005 : Důvod dotč.proc.zp.
                        .addField("gselectbox", Gordic.Prefabs.Select.sprcdpzDto(), {
                        name: "duv_dotc", model: "model.duv_dotc=value.duv_dotc", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0" })
                        .addRow("jres:25500006") //RC 25500006 : Místo pobytu
                        .addField("gstringbox", { name: "misto_pob", customClass: "enabled" })
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", { name: "poznamka", customClass: "enabled", autoSize: false, allowResize: true, rows: 5 });
                    return form;
                }
            };
            GDetailUcastnika = __decorate([
                gcontent
            ], GDetailUcastnika);
            WebApp.GDetailUcastnika = GDetailUcastnika;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFVjYXN0bmlrYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxVY2FzdG5pa2EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTBLZjtBQTFLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwS25CO0lBMUtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0EwSzFCO1FBMUtvQixXQUFBLE1BQU07WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEscUJBQXdDO2dCQVUxRSxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLDJEQUFtRDt3QkFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRzs0QkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO3lCQUN6SCxDQUFDO29CQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUEsQ0FBQztnQkFFRjs7OzttQkFJRztnQkFDSCxtQkFBbUIsQ0FBQyxPQUFnRDtvQkFDaEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLENBQUMsYUFBYSxDQUFP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K0IsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJO3dCQUNoRyxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ2pELENBQUM7eUJBRUQsVUFBVSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsK0JBQStCLEVBQUUsQ0FBQzt5QkFDakUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDRCQUE0Qjt5QkFDcEQsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDO3lCQUNyRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsd0JBQXdCO3lCQUNoRCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFFdEgsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSixDQUFBO1lBcktZLGdCQUFnQjtnQkFENUIsUUFBUTtlQUNJLGdCQUFnQixDQXFLNUI7WUFyS1ksdUJBQWdCLG1CQXFLNUIsQ0FBQTtRQUNMLENBQUMsRUExS29CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQTBLMUI7SUFBRCxDQUFDLEVBMUtnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwS25CO0FBQUQsQ0FBQyxFQTFLUyxNQUFNLEtBQU4sTUFBTSxRQTBLZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxVY2FzdG5pa2EgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNOZXc+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICBJeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgSXhzRXN1OiBzdHJpbmc7XHJcbiAgICAgICAgVHlwVmF6Ynk6IG51bWJlcjtcclxuICAgICAgICBMaWNaYXN0OiBzdHJpbmc7XHJcbiAgICAgICAgUG9yWmFzdDogbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJlemltID0gdGhpcy5SZXppbURldGFpbHU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbE1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9zcGlzOiB0aGlzLkl4cFNwaXMsIGl4c19lc3U6IHRoaXMuSXhzRXN1LCB0eXBfdmF6Ynk6IHRoaXMuVHlwVmF6YnksIGxpY196YXN0OiB0aGlzLkxpY1phc3QsIHBvcl96YXN0OiB0aGlzLlBvclphc3RcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcykuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFJlemltKHRoYXQuUmV6aW0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkRldGFpbEJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcInVjYXN0bmlrRGV0YWlsXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vaGVhZGVyRm9ybTogdGhpcy5jcmVhdGVGb3JtKCksXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RaYXN0dXBjaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAzMTZcIiwgLy9SQyAyNTIwMDMxNiA6IFrDoXN0dXBjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5TcHIuV2ViQXBwLkdTZXpuYW1WYXplYlN1Ympla3R1XCIsIHt9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwVnpWYXpieTogR29yZGljLlNwci5JbnRlcmZhY2UuVHlwVnpWYXpieUVudW0uWmFzdHVwY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4c0VzdTogdGhhdC5JeHNFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cFZhemJ5OiB0aGF0LlR5cFZhemJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMaWNaYXN0OiB0aGF0LkxpY1phc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvclphc3Q6IHRoYXQuUG9yWmFzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVudVVjYXN0bmlrXCIsIGNhcHRpb246IFwianJlczoyNTIwMDQwM1wiLCB0eXBlOiBcInN0YXRpY1wiLCBhZnRlcjogXCJha2NlXCIsIGNoaWxkcmVuOiBbIC8vUkMgMjUyMDA0MDMgOiDDmsSNYXN0bsOta1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJtZW51WmFzdHVwY2lcIiwgYWN0aW9uOiBcImFjdFphc3R1cGNpXCIsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgX2FmdGVyRGVsZXRlID0gZnVuY3Rpb24gKGNvbnRlbnQ6IEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucyAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFDb21wb25lbnRFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnRHcmlkUmMgPSB0aGlzLkdyaWRSYyE7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudE5leHRUZW1wbGF0ZSA9IFwianJlczoyNTIwMDM5MlwiOyAvL1JDIDI1MjAwMzkyIDogTsOhc2xlZHVqw61jw60gesOhem5hbTxicj5JRDoge2l4c19lc3V9XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudFByZXZUZW1wbGF0ZSA9IFwianJlczoyNTIwMDM5MVwiOyAvL1JDIDI1MjAwMzkxIDogUMWZZWRjaG96w60gesOhem5hbTxicj5JRDoge2l4c19lc3V9XHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJEZWxldGUgPSBfYWZ0ZXJEZWxldGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgLy8gc25pemkgcG9jZXQgdm9sYW5pIGZpbmRGaWVsZHMsIG5hc3RhdmkgY2Vsb3UgY3VzdG9tQ2xhc3MgXCJlbmFibGVkXCIgbmFqZWRub3VcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCAodGhpcy5SZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuRWRpdGFjZSkpOyAvL3Z5cG51dGkgbW96bm9zdGkgZWRpdGFjZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zID0gZnVuY3Rpb24gKGVuYWJsZTogYm9vbGVhbikgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlQWt0aXZpdGFDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldGFpbE1vdmVDb21wb25lbnRFbmFibGVBY3Rpb25zKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnNbXCJhY3RaYXN0dXBjaVwiXSEuZW5hYmxlZCghZW5hYmxlKTtcclxuICAgICAgICAgICAgfTsgICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUZvcm0oKTogXCIpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MjUyMDAwNTlcIiwgb3BlbmVkOiB0cnVlIH0pICAvL1JDIDI1MjAwMDU5IDogw5rEjWFzdG7DrWsgc3Byw6F2bsOtaG8gxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTC0yLTEwLTAsIE0tMi0xMC0wLCBTLTEyLTEyLTBcIiB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMTM3XCIsIHRydWUpIC8vUkMgMjUyMDAxMzcgOiBTdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwOiBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pS2Fyb3Rla2EuU2VsZWN0RXN1LFxyXG4gICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5JeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRG90Y2VuZWhvU3ViamVrdHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBWeWJlckVzdV9EdXZvZEhsZWRhbmlUeHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSwgeyBuYW1lOiBcIml4c19lc3VcIiwgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1XCIsIGN1c3RvbUNsYXNzOiBcImRpc2FibGVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMi0xMC0wLCBNLTItMTAtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDAxXCIsIHRydWUpIC8vUkMgMjU1MDAwMDEgOiBEcnVoIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzZHZhU3ByRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFcIiwgbW9kZWw6IFwibW9kZWwuaXhzX2R2YT12YWx1ZS5peHNfZHZhXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF92YXpieTogdGhpcy5UeXBWYXpieSB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy01IHctTC00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI1MzAwMDM5XCIsIG5hbWU6IFwic19vZGVzXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgLy9SQyAyNTMwMDAzOSA6IERvcnXEjW92YXRcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gMTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWUgPT09IHRydWUgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LUwtNiB3LU0tNlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtNC04LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMDJcIiwgdHJ1ZSkgLy9SQyAyNTUwMDAwMiA6IEphenlrb3bDoSBwcsOhdmFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNwcmN1Y2pEdG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3VjalwiLCBtb2RlbDogXCJtb2RlbC50eXBfdWNqPXZhbHVlLnR5cF91Y2pcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF91Y2o6IFsxMCwgMjAsIDMwXSB9LCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDAzXCIsIHRydWUpIC8vUkMgMjU1MDAwMDMgOiBQcm9jZXNuw60genDFr3NvYmlsb3N0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjdHB6RHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9welwiLCBtb2RlbDogXCJtb2RlbC50eXBfcHo9dmFsdWUudHlwX3B6XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyB0eXBfcHo6IFsxMCwgMjAsIDMwLCA0MF0gfSwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcInctTC02IHctTS02XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAwNFwiLCB0cnVlKSAvL1JDIDI1NTAwMDA0IDogWm5hbG9zdCDEjWVza8OpaG8gamF6eWthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjc2NqRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfY2pfamF6eWtcIiwgbW9kZWw6IFwibW9kZWwuc19jal9qYXp5az12YWx1ZS5zX2NqX2phenlrXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAwNVwiLCB0cnVlKSAvL1JDIDI1NTAwMDA1IDogRMWvdm9kIGRvdMSNLnByb2MuenAuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjZHB6RHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImR1dl9kb3RjXCIsIG1vZGVsOiBcIm1vZGVsLmR1dl9kb3RjPXZhbHVlLmR1dl9kb3RjXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMi0xMC0wLCBNLTItMTAtMCwgUy0xMi0xMi0wXCIgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAwNlwiKSAvL1JDIDI1NTAwMDA2IDogTcOtc3RvIHBvYnl0dVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwibWlzdG9fcG9iXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwNThcIikgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBhdXRvU2l6ZTogZmFsc2UsIGFsbG93UmVzaXplOiB0cnVlLCByb3dzOiA1IH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
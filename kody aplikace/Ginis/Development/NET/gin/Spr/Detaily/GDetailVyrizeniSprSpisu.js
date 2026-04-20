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
            let GDetailVyrizeniSprSpisu = class GDetailVyrizeniSprSpisu extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true });
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("GDetailVyrizeniSprSpisu", {
                        //headerForm: this.createForm(),
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        actions: {
                            actSave: {
                                caption: "jres:25500205", //RC 25500205 : Vyřídit
                                icon: "gi-save",
                                run: function (ev, ctx) {
                                    let currentContent = $.content(this);
                                    that.save().done(function (zmena) {
                                        currentContent.tryClose({ Zmena: zmena });
                                    });
                                }
                            },
                            actStorno: {
                                caption: "jres:25500220", //RC 25500220 : Zrušit
                                icon: "gi-doruc",
                                run: function (ev, ctx) {
                                    let currentContent = $.content(this);
                                    currentContent.tryClose();
                                }
                            }
                        },
                        menuBar: [],
                        commandBar: [
                            { action: "actSave", favorite: true, primary: true },
                            { action: "actStorno", favorite: true }
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
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var layout;
                    if (that.model.datumVyrizeniPoznamka === "Datum vyřízení")
                        layout = "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0";
                    else // Datum vypravení vyřizujícího dokumentu
                        layout = "L1M1S1, L-4-8-0, M-6-6-0, S-12-12-0";
                    var form = new Gordic.Forms.Form({ opened: true })
                        .addSection({ layoutDescriptor: layout })
                        .addRow(that.model.datumVyrizeniPoznamka, true)
                        .addField("gdatebox", "w-11", { name: "datumVyrizeni", disabled: this.model.vyrizeno, validators: [new Gordic.Validators.Required()] })
                        .addSection({ layoutDescriptor: layout })
                        .addRow("jres:25500211", true) //RC 25500211 : Způsob vyřízení
                        .addField("gselectbox", "w-11", Gordic.Prefabs.Select.sslszvs(), {
                        dropdown: true,
                        model: "model.zpusobVyrizeni = value.zp_vyriz", // that.model.zpusobVyrizeni
                        name: "zpusobVyrizeni",
                        disabled: this.model.vyrizeno,
                        serverFilters: {
                            aktivita: [100]
                        },
                        validators: [new Gordic.Validators.Required()],
                        flag: "required"
                    }) // gsslszvs - ciselnik
                        .addRow("jres:25500209", true) //RC 25500209 : Zpracovatel
                        .addField("gselectbox", "w-11", Gordic.Gin.Fields.ginsfunSSU({
                        validators: [new Gordic.Validators.Required()],
                        disabled: this.model.vyrizeno,
                        name: "ixsFunResitel", // ixsFunResitel
                        model: "model.ixsFunResitel=value.ixs_fun", //ixsFunResitel
                        itemTemplate: function (output) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100]
                        },
                        flag: "required"
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                        .addRow("jres:25500215", true) //RC 25500215 : Schvalovatel
                        .addField("gselectbox", "w-11", Gordic.Gin.Fields.ginsfunSSU({
                        validators: [new Gordic.Validators.Required()],
                        disabled: this.model.vyrizeno,
                        name: "ixsFunSchval", //ixsFunSchval
                        model: "model.ixsFunSchval = value.ixs_fun", //ixsFunSchval
                        itemTemplate: function (output) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100]
                        },
                        flag: "required"
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", "w-11", { name: "poznamka", disabled: this.model.vyrizeno, autoSize: false, allowResize: true, rows: 10, customClass: "enabled" });
                    return form;
                }
                // ulozeni 
                save() {
                    var that = this;
                    var prom = $.Deferred();
                    that.findForms().gform("waitForValues")
                        .then((o) => {
                        if (that.findForms().gform("isValid")) { //Toto provede validaci
                            that.findFields().gfield("model", "collect", that.model);
                            that.call("SaveData", {
                                ixpSpis: this.IxpSpis,
                                datZmena: that.model.datZmena,
                                zpusobVyrizeni: that.model.zpusobVyrizeni,
                                datumVyrizeni: that.model.datumVyrizeni,
                                poznamkaVyrizeni: that.model.poznamka,
                                ixsFunSchval: that.model.ixsFunSchval,
                                ixsFunResitel: that.model.ixsFunResitel,
                                vyrizeno: that.model.vyrizeno
                            })
                                .done(function (zmena) {
                                prom.resolve(zmena);
                            })
                                .fail(function (xhr, type, obj) {
                                if (type === "validation") {
                                    obj.handled = true;
                                    that.findForms().findFields().gfield("model", "validations", obj);
                                }
                                prom.reject();
                            });
                        }
                        ;
                    });
                    return prom.promise();
                }
            };
            GDetailVyrizeniSprSpisu = __decorate([
                gcontent
            ], GDetailVyrizeniSprSpisu);
            WebApp.GDetailVyrizeniSprSpisu = GDetailVyrizeniSprSpisu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFZ5cml6ZW5pU3ByU3Bpc3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsVnlyaXplbmlTcHJTcGlzdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBbUxmO0FBbkxELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1MbkI7SUFuTGdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQW1MMUI7UUFuTG9CLFdBQUEsTUFBTTtZQUN2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsT0FBQSxxQkFBcUI7Z0JBSTlELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUNuRixDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyx5QkFBeUIsRUFBRTt3QkFDbkQsZ0NBQWdDO3dCQUNoQyxJQUFJLEVBQ0o7NEJBQ0ksV0FBVyxFQUNYO2dDQUNJLElBQUksRUFBRSxVQUFVLEdBQUc7b0NBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQ0FDbEUsQ0FBQzs2QkFDSjt5QkFFSjt3QkFDRCxPQUFPLEVBQ1A7NEJBQ0ksT0FBTyxFQUNQO2dDQUNJLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCO2dDQUNqRCxJQUFJLEVB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UUFtTDFCO0lBQUQsQ0FBQyxFQW5MZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbUxuQjtBQUFELENBQUMsRUFuTFMsTUFBTSxLQUFOLE1BQU0sUUFtTGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsVnlyaXplbmlTcHJTcGlzdSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIG1vZGVsOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJHRGV0YWlsVnlyaXplbmlTcHJTcGlzdVwiLCB7XHJcbiAgICAgICAgICAgICAgICAvL2hlYWRlckZvcm06IHRoaXMuY3JlYXRlRm9ybSgpLFxyXG4gICAgICAgICAgICAgICAgdGFiczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoYXQuY3JlYXRlRm9ybSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U2F2ZTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDIwNVwiLCAvL1JDIDI1NTAwMjA1IDogVnnFmcOtZGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQ+KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYXZlKCkuZG9uZShmdW5jdGlvbiAoem1lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC50cnlDbG9zZSh7IFptZW5hOiB6bWVuYSB9KTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjIwXCIsICAvL1JDIDI1NTAwMjIwIDogWnJ1xaFpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRvcnVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudD4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0U2F2ZVwiLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFN0b3Jub1wiLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBsYXlvdXQ7IFxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5kYXR1bVZ5cml6ZW5pUG96bmFta2EgPT09IFwiRGF0dW0gdnnFmcOtemVuw61cIilcclxuICAgICAgICAgICAgICAgIGxheW91dCA9IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0zLTktMCwgUy0xMi0xMi0wXCI7XHJcbiAgICAgICAgICAgIGVsc2UgLy8gRGF0dW0gdnlwcmF2ZW7DrSB2ecWZaXp1asOtY8OtaG8gZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBcIkwxTTFTMSwgTC00LTgtMCwgTS02LTYtMCwgUy0xMi0xMi0wXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG9wZW5lZDogdHJ1ZSB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGF5b3V0RGVzY3JpcHRvcjogbGF5b3V0IH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh0aGF0Lm1vZGVsLmRhdHVtVnlyaXplbmlQb3puYW1rYSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMVwiLCB7IG5hbWU6IFwiZGF0dW1WeXJpemVuaVwiLCBkaXNhYmxlZDogdGhpcy5tb2RlbC52eXJpemVubywgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KSBcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IGxheW91dCB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMjExXCIsIHRydWUpIC8vUkMgMjU1MDAyMTEgOiBacMWvc29iIHZ5xZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMVwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3p2cygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuenB1c29iVnlyaXplbmkgPSB2YWx1ZS56cF92eXJpelwiLCAvLyB0aGF0Lm1vZGVsLnpwdXNvYlZ5cml6ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cHVzb2JWeXJpemVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLm1vZGVsLnZ5cml6ZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IFsxMDBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIlxyXG4gICAgICAgICAgICAgICAgfSkgLy8gZ3NzbHN6dnMgLSBjaXNlbG5pa1xyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMjA5XCIsIHRydWUpIC8vUkMgMjU1MDAyMDkgOiBacHJhY292YXRlbFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTFcIiwgR29yZGljLkdpbi5GaWVsZHMuZ2luc2Z1blNTVShcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLm1vZGVsLnZ5cml6ZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c0Z1blJlc2l0ZWxcIiwgLy8gaXhzRnVuUmVzaXRlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNGdW5SZXNpdGVsPXZhbHVlLml4c19mdW5cIiwgLy9peHNGdW5SZXNpdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKG91dHB1dDogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxkaXYgY2xhc3M9J2dpIGdpLXVzZXIgbWljcm9mb3RvJz48L2Rpdj48Yj5cIiArIG91dHB1dC5uYXpldl9yZiArIFwiPC9iPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IFsxMDBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5DaG92YW5pU3RyZWRpc2thRGxlVWNlbHUuTkVVUkNFTk8pKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMjE1XCIsIHRydWUpICAvL1JDIDI1NTAwMjE1IDogU2NodmFsb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMVwiLCBHb3JkaWMuR2luLkZpZWxkcy5naW5zZnVuU1NVKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubW9kZWwudnlyaXplbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzRnVuU2NodmFsXCIsIC8vaXhzRnVuU2NodmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c0Z1blNjaHZhbCA9IHZhbHVlLml4c19mdW5cIiwgLy9peHNGdW5TY2h2YWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBmdW5jdGlvbiAob3V0cHV0OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFwiPGRpdiBjbGFzcz0nZ2kgZ2ktdXNlciBtaWNyb2ZvdG8nPjwvZGl2PjxiPlwiICsgb3V0cHV0Lm5hemV2X3JmICsgXCI8L2I+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkNob3ZhbmlTdHJlZGlza2FEbGVVY2VsdS5ORVVSQ0VOTykpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwNThcIikgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTFcIiwgeyBuYW1lOiBcInBvem5hbWthXCIsIGRpc2FibGVkOiB0aGlzLm1vZGVsLnZ5cml6ZW5vLCBhdXRvU2l6ZTogZmFsc2UsIGFsbG93UmVzaXplOiB0cnVlLCByb3dzOiAxMCwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bG96ZW5pIFxyXG4gICAgICAgIHNhdmUoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHByb20gPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpIS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZmluZEZvcm1zKCkhLmdmb3JtKFwiaXNWYWxpZFwiKSkgeyAvL1RvdG8gcHJvdmVkZSB2YWxpZGFjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhhdC5tb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJTYXZlRGF0YVwiLCB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwU3BpczogdGhpcy5JeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0Wm1lbmE6IHRoYXQubW9kZWwuZGF0Wm1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6cHVzb2JWeXJpemVuaTogdGhhdC5tb2RlbC56cHVzb2JWeXJpemVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtVnlyaXplbmk6IHRoYXQubW9kZWwuZGF0dW1WeXJpemVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvem5hbWthVnlyaXplbmk6IHRoYXQubW9kZWwucG96bmFta2EsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5TY2h2YWw6IHRoYXQubW9kZWwuaXhzRnVuU2NodmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzRnVuUmVzaXRlbDogdGhhdC5tb2RlbC5peHNGdW5SZXNpdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnlyaXplbm86IHRoYXQubW9kZWwudnlyaXplbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICh6bWVuYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb20ucmVzb2x2ZSh6bWVuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidmFsaWRhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9tLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
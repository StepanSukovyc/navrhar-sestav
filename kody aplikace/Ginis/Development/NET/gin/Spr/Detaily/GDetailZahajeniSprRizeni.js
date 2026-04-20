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
            let GDetailZahajeniSprRizeni = class GDetailZahajeniSprRizeni extends Gordic.GDetailBuilderContent {
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
                    builder.withComponent("GDetailZahajeniSprRizeni", {
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
                                caption: "jres:25300052", //RC 25300052 : Zahájit
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
                    var form = new Gordic.Forms.Form({ opened: true })
                        .addSection({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addRow("jres:25300053", true) //RC 25300053 : Datum zahájení
                        .addField("gdatebox", "w-11", { name: "datumZahajeni", disabled: false, validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25300054", true) //RC 25300054 : Lhůta pro rozhodnutí
                        .addField("gdatebox", "w-11", { name: "datumLhuta", disabled: false, validators: [new Gordic.Validators.Required()] })
                        .addSection(" ")
                        .addText(that.model.poznamkaDoruceni);
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
                                datumZahajeni: that.model.datumZahajeni,
                                datumLhuta: that.model.datumLhuta,
                                ixpUkonZahajeni: that.model.ixpUkonZahajeni
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
            GDetailZahajeniSprRizeni = __decorate([
                gcontent
            ], GDetailZahajeniSprRizeni);
            WebApp.GDetailZahajeniSprRizeni = GDetailZahajeniSprRizeni;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFphaGFqZW5pU3ByUml6ZW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFphaGFqZW5pU3ByUml6ZW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E0SGY7QUE1SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNEhuQjtJQTVIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBNEgxQjtRQTVIb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxPQUFBLHFCQUFxQjtnQkFJL0QsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBQ25GLENBQUM7Z0JBQUEsQ0FBQztnQkFFRjs7OzttQkFJRztnQkFDSCxtQkFBbUIsQ0FBQyxPQUFnRDtvQkFDaEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLENBQUMsYUFBYSxDQUFPLDBCQUEwQixFQUFFO3dCQUNwRCxnQ0FBZ0M7d0JBQ2hDLElBQUksRUFDSjs0QkFDSSxXQUFXLEVBQ1g7Z0NBQ0ksSUFBSSxFQUFFLFVBQVUsR0FBRztvQ0FDZixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dDQUNsRSxDQUFDOzZCQUNKO3lCQUVKO3dCQUNELE9BQU8sRUFDUDs0QkFDSSxPQUFPLEVBQ1A7Z0NBQ0ksT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7Z0NBQ2pELElBQUks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QUFOLE1BQU0sUUE0SGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsWmFoYWplbmlTcHJSaXplbmkgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIEl4cFNwaXM6IHN0cmluZztcclxuICAgICAgICBtb2RlbDogYW55O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiR0RldGFpbFphaGFqZW5pU3ByUml6ZW5pXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vaGVhZGVyRm9ybTogdGhpcy5jcmVhdGVGb3JtKCksXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RTYXZlOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDUyXCIsIC8vUkMgMjUzMDAwNTIgOiBaYWjDoWppdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRDb250ZW50ID0gJC5jb250ZW50PEdDb250ZW50Pih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2F2ZSgpLmRvbmUoZnVuY3Rpb24gKHptZW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnQudHJ5Q2xvc2UoeyBabWVuYTogem1lbmEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjIwXCIsICAvL1JDIDI1NTAwMjIwIDogWnJ1xaFpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRvcnVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudD4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0U2F2ZVwiLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFN0b3Jub1wiLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MzAwMDUzXCIsIHRydWUpIC8vUkMgMjUzMDAwNTMgOiBEYXR1bSB6YWjDoWplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTFcIiwgeyBuYW1lOiBcImRhdHVtWmFoYWplbmlcIiwgZGlzYWJsZWQ6IGZhbHNlLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTMwMDA1NFwiLCB0cnVlKSAvL1JDIDI1MzAwMDU0IDogTGjFr3RhIHBybyByb3pob2RudXTDrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTExXCIsIHsgbmFtZTogXCJkYXR1bUxodXRhXCIsIGRpc2FibGVkOiBmYWxzZSwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCLCoFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQodGhhdC5tb2RlbC5wb3puYW1rYURvcnVjZW5pKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdWxvemVuaSBcclxuICAgICAgICBzYXZlKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKSEuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmZpbmRGb3JtcygpIS5nZm9ybShcImlzVmFsaWRcIikpIHsgLy9Ub3RvIHByb3ZlZGUgdmFsaWRhY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiU2F2ZURhdGFcIiwge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cFNwaXM6IHRoaXMuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtWmFoYWplbmk6IHRoYXQubW9kZWwuZGF0dW1aYWhhamVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtTGh1dGE6IHRoYXQubW9kZWwuZGF0dW1MaHV0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cFVrb25aYWhhamVuaTogdGhhdC5tb2RlbC5peHBVa29uWmFoYWplbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICh6bWVuYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb20ucmVzb2x2ZSh6bWVuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidmFsaWRhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9tLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
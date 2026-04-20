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
            let GDetailRozhodnutiSprSpisu = class GDetailRozhodnutiSprSpisu extends Gordic.GDetailBuilderContent {
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
                    builder.withComponent("GDetailRozhodnutiSprSpisu", {
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
                                caption: "jres:25300027", //RC 25300027 : Rozhodnout
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
                    if (that.model.datumRozhodnutiPoznamka === "Datum rozhodnutí")
                        layout = "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0";
                    else // Datum vypravení vyřizujícího dokumentu
                        layout = "L1M1S1, L-4-8-0, M-6-6-0, S-12-12-0";
                    var form = new Gordic.Forms.Form({ opened: true })
                        .addSection({ layoutDescriptor: layout })
                        .addRow(that.model.datumRozhodnutiPoznamka, true)
                        .addField("gdatebox", "w-11", { name: "datumRozhodnuti", disabled: this.model.vyrizeno, validators: [new Gordic.Validators.Required()] });
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
                                datumRozhodnuti: that.model.datumRozhodnuti,
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
            GDetailRozhodnutiSprSpisu = __decorate([
                gcontent
            ], GDetailRozhodnutiSprSpisu);
            WebApp.GDetailRozhodnutiSprSpisu = GDetailRozhodnutiSprSpisu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFJvemhvZG51dGlTcHJTcGlzdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxSb3pob2RudXRpU3ByU3Bpc3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQThIZjtBQTlIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E4SG5CO0lBOUhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0E4SDFCO1FBOUhvQixXQUFBLE1BQU07WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLE9BQUEscUJBQXFCO2dCQUloRSxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDbkYsQ0FBQztnQkFBQSxDQUFDO2dCQUVGOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxhQUFhLENBQU8sMkJBQTJCLEVBQUU7d0JBQ3JELGdDQUFnQzt3QkFDaEMsSUFBSSxFQUNKOzRCQUNJLFdBQVcsRUFDWDtnQ0FDSSxJQUFJLEVBQUUsVUFBVSxHQUFHO29DQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0NBQ2xFLENBQUM7NkJBQ0o7eUJBRUo7d0JBQ0QsT0FBTyxFQUNQOzRCQUNJLE9BQU8sRUFDUDtnQ0FDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjtnQ0FDcEQsSUFB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QUFJLENBQUMsT0FBTztnQ0FDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtnQ0FDN0IsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZTtnQ0FDM0MsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTs2QkFDaEMsQ0FBQztpQ0FDRyxJQUFJLENBQUMsVUFBVSxLQUFLO2dDQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUN4QixDQUFDLENBQUM7aUNBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHO2dDQUMxQixJQUFJLElBQUksS0FBSyxZQUFZLEVBQUUsQ0FBQztvQ0FDeEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0NBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDdEUsQ0FBQztnQ0FDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7NEJBQ2xCLENBQUMsQ0FBQyxDQUFDO3dCQUNYLENBQUM7d0JBQUEsQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQztvQkFHUCxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQzthQUNKLENBQUE7WUF6SFkseUJBQXlCO2dCQURyQyxRQUFRO2VBQ0kseUJBQXlCLENBeUhyQztZQXpIWSxnQ0FBeUIsNEJBeUhyQyxDQUFBO1FBQ0wsQ0FBQyxFQTlIb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBOEgxQjtJQUFELENBQUMsRUE5SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThIbkI7QUFBRCxDQUFDLEVBOUhTLE1BQU0sS0FBTixNQUFNLFFBOEhmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbFJvemhvZG51dGlTcHJTcGlzdSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIG1vZGVsOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJHRGV0YWlsUm96aG9kbnV0aVNwclNwaXN1XCIsIHtcclxuICAgICAgICAgICAgICAgIC8vaGVhZGVyRm9ybTogdGhpcy5jcmVhdGVGb3JtKCksXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RTYXZlOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDI3XCIsIC8vUkMgMjUzMDAwMjcgOiBSb3pob2Rub3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQ+KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYXZlKCkuZG9uZShmdW5jdGlvbiAoem1lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC50cnlDbG9zZSh7IFptZW5hOiB6bWVuYSB9KTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjIwXCIsICAvL1JDIDI1NTAwMjIwIDogWnJ1xaFpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRvcnVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudD4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0U2F2ZVwiLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFN0b3Jub1wiLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBsYXlvdXQ7IFxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5kYXR1bVJvemhvZG51dGlQb3puYW1rYSA9PT0gXCJEYXR1bSByb3pob2RudXTDrVwiKVxyXG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gXCJMMU0xUzEsIEwtMi0xMC0wLCBNLTMtOS0wLCBTLTEyLTEyLTBcIjtcclxuICAgICAgICAgICAgZWxzZSAvLyBEYXR1bSB2eXByYXZlbsOtIHZ5xZlpenVqw61jw61obyBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgIGxheW91dCA9IFwiTDFNMVMxLCBMLTQtOC0wLCBNLTYtNi0wLCBTLTEyLTEyLTBcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBsYXlvdXQgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQubW9kZWwuZGF0dW1Sb3pob2RudXRpUG96bmFta2EsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTFcIiwgeyBuYW1lOiBcImRhdHVtUm96aG9kbnV0aVwiLCBkaXNhYmxlZDogdGhpcy5tb2RlbC52eXJpemVubywgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KSBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVsb3plbmkgXHJcbiAgICAgICAgc2F2ZSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcHJvbSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKCkhLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5maW5kRm9ybXMoKSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7IC8vVG90byBwcm92ZWRlIHZhbGlkYWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGF0Lm1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIlNhdmVEYXRhXCIsIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBTcGlzOiB0aGlzLkl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRabWVuYTogdGhhdC5tb2RlbC5kYXRabWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtUm96aG9kbnV0aTogdGhhdC5tb2RlbC5kYXR1bVJvemhvZG51dGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXJpemVubzogdGhhdC5tb2RlbC52eXJpemVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHptZW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbS5yZXNvbHZlKHptZW5hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ2YWxpZGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRpb25zXCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb20ucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHByb20ucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
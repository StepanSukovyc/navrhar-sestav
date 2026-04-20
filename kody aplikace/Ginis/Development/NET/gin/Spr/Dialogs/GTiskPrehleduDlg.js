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
            const { gcontent } = Decorators;
            let ActionNames;
            (function (ActionNames) {
                ActionNames["Tisk"] = "actTisk";
            })(ActionNames || (ActionNames = {}));
            const FormName = "TiskPrehleduForm";
            let GTiskPrehleduDlg = class GTiskPrehleduDlg extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.$Form = $("<div>");
                }
                onContentReady() {
                    this.CreateMenu();
                    this.$Form = this.CreateForm(this.element, this.userSettings);
                    const $fields = this.$Form.findFields();
                    $fields.gfield("model", "apply", this.model);
                }
                CreateMenu() {
                    const that = this;
                    const commandBarPole = [];
                    commandBarPole.push({
                        action: that.actions.add(GAction.createPrintAction({
                            name: ActionNames.Tisk,
                            caption: "jres:25200427", //RC 25200427 : Tisk
                            tooltip: "jres:25200427", //RC 25200427 : Tisk
                            tema: "spr_ptm_pre",
                            serverParameterMethod: "Gordic.Spr.WebApp.GTiskPrehleduDlg:ServerParameterMethod",
                            dialogOpening: function () {
                                return that.mohuOtevritTisk();
                            },
                            reportStarting: function (rep) {
                                rep.customDto = that.model;
                            },
                        })),
                        favorite: true,
                        customClass: "g-button--primary"
                    });
                    commandBarPole.push({
                        action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    that.commandBar(that.actions.createBar(commandBarPole));
                }
                CreateForm(appendTo, userSettings) {
                    var that = this;
                    var l_sGinspodName = "Ginspod";
                    // Formulář
                    const formBuilder = new Gordic.Forms.Form({
                        name: FormName,
                        layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0"
                    })
                        .addSection("")
                        .addRow("jres:25200428") //RC 25200428 : Období od, do
                        .addField("gdatebox", "w-6", { model: "model.datum_od=value" })
                        .addField("gdatebox", "w-6", { model: "model.datum_do=value" })
                        .addRow("jres:25200429") //RC 25200429 : Počet dní
                        .addField("gnumberbox", "w-2 w-S-6", {
                        name: "pocet_dni",
                        minValue: 0,
                        maxValue: 99999,
                    })
                        .addRow("jres:25200430") //RC 25200430 : Typ lhůty
                        .addField("gselectbox", Gordic.Prefabs.Select.sprctrmDto(), {
                        name: "typ_term", model: "model.typ_term=value.typ_term", dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    })
                        .addRow("jres:25200431") //RC 25200431 : Vlastník
                        .addField("gselectbox", Gordic.Gin.Fields.ginspodSSU({
                        name: l_sGinspodName,
                        model: "model.ixs_su=value.ixs_su",
                        serverFilters: {
                            aktivita: [100]
                        },
                        validators: that.model.su_required ? [new Gordic.Validators.Required()] : [],
                        flag: that.model.su_required ? "required" : "",
                        disabled: that.model.su_disabled
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                        .addField("gselectbox", Gordic.Gin.Fields.ginsfunSSU({
                        name: "ixsFunVlastnik",
                        model: "model.ixs_fun=value.ixs_fun",
                        itemTemplate: function (output) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100],
                            ixs_su: new Gordic.Forms.Dependency(l_sGinspodName, "ixs_su")
                        },
                        validators: that.model.fun_required ? [new Gordic.Validators.Required()] : [],
                        flag: that.model.fun_required ? "required" : "",
                        disabled: that.model.fun_disabled
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, l_sGinspodName));
                    // Přidání formuláře do DOMu.
                    return $("<div>")
                        .appendTo(appendTo)
                        .gform("createFrom", formBuilder);
                }
                mohuOtevritTisk() {
                    var ret = false;
                    var form = this.findForms();
                    var fields = form.findFields();
                    if (form.gform("isValid")) {
                        fields.gfield("model", "collect", this.model);
                        ret = true;
                    }
                    return ret;
                }
            };
            GTiskPrehleduDlg = __decorate([
                gcontent
            ], GTiskPrehleduDlg);
            WebApp.GTiskPrehleduDlg = GTiskPrehleduDlg;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Rpc2tQcmVobGVkdURsZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdUaXNrUHJlaGxlZHVEbGcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtJZjtBQWxJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrSW5CO0lBbElnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0FrSTFCO1FBbElvQixXQUFBLE1BQU07WUFDdkIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQTtZQVEvQixJQUFLLFdBRUo7WUFGRCxXQUFLLFdBQVc7Z0JBQ1osK0JBQWdCLENBQUE7WUFDcEIsQ0FBQyxFQUZJLFdBQVcsS0FBWCxXQUFXLFFBRWY7WUFFRCxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQTtZQUduQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFBbEQ7O29CQUVZLFVBQUssR0FBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQStHcEQsQ0FBQztnQkE1R1UsY0FBYztvQkFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBYSxDQUFDLENBQUM7b0JBRS9ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBRU8sVUFBVTtvQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLE1BQU0sY0FBYyxHQUFpQixFQUFFLENBQUM7b0JBQ3hDLGNBQWMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLE1BQU0s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d0JBQXdCLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQ2xGO29CQUVMLDZCQUE2QjtvQkFDN0IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUM7eUJBQ2xCLEtBQUssQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRU0sZUFBZTtvQkFDbEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzlDLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBQ2YsQ0FBQztvQkFDRCxPQUFPLEdBQUcsQ0FBQztnQkFDZixDQUFDO2FBQ0osQ0FBQTtZQWpIWSxnQkFBZ0I7Z0JBRDVCLFFBQVE7ZUFDSSxnQkFBZ0IsQ0FpSDVCO1lBakhZLHVCQUFnQixtQkFpSDVCLENBQUE7UUFDTCxDQUFDLEVBbElvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUFrSTFCO0lBQUQsQ0FBQyxFQWxJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa0luQjtBQUFELENBQUMsRUFsSVMsTUFBTSxLQUFOLE1BQU0sUUFrSWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9yc1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Rpc2tQcmVobGVkdURsZ0lucHV0UGFyYW1zIHtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdUaXNrUHJlaGxlZHVEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBBY3Rpb25OYW1lcyB7XHJcbiAgICAgICAgVGlzayA9IFwiYWN0VGlza1wiXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgRm9ybU5hbWUgPSBcIlRpc2tQcmVobGVkdUZvcm1cIlxyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdUaXNrUHJlaGxlZHVEbGcgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgJEZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKFwiPGRpdj5cIik7XHJcbiAgICAgICAgbW9kZWw6IGFueTtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy4kRm9ybSA9IHRoaXMuQ3JlYXRlRm9ybSh0aGlzLmVsZW1lbnQsIHRoaXMudXNlclNldHRpbmdzISk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkZmllbGRzID0gdGhpcy4kRm9ybS5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgICRmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEFjdGlvbk5hbWVzLlRpc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwNDI3XCIsIC8vUkMgMjUyMDA0MjcgOiBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1MjAwNDI3XCIsIC8vUkMgMjUyMDA0MjcgOiBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJzcHJfcHRtX3ByZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuU3ByLldlYkFwcC5HVGlza1ByZWhsZWR1RGxnOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wZW5pbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubW9odU90ZXZyaXRUaXNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0gdGhhdC5tb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oR29yZGljLlByZWZhYnMuQWN0aW9ucy5aYXZyaXRDb250ZW50KCkpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoY29tbWFuZEJhclBvbGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlRm9ybShcclxuICAgICAgICAgICAgYXBwZW5kVG86IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nczogRGF0YS5JR1N0b3JhZ2VcclxuICAgICAgICApOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbF9zR2luc3BvZE5hbWUgPSBcIkdpbnNwb2RcIjtcclxuICAgICAgICAgICAgLy8gRm9ybXVsw6HFmVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtQnVpbGRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBGb3JtTmFtZSxcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0zLTktMCwgUy0xMi0xMi0wXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDQyOFwiKSAvL1JDIDI1MjAwNDI4IDogT2Jkb2LDrSBvZCwgZG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHsgbW9kZWw6IFwibW9kZWwuZGF0dW1fb2Q9dmFsdWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBtb2RlbDogXCJtb2RlbC5kYXR1bV9kbz12YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDQyOVwiKSAvL1JDIDI1MjAwNDI5IDogUG/EjWV0IGRuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTIgdy1TLTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jZXRfZG5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IDk5OTk5LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDMwXCIpIC8vUkMgMjUyMDA0MzAgOiBUeXAgbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjdHJtRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF90ZXJtXCIsIG1vZGVsOiBcIm1vZGVsLnR5cF90ZXJtPXZhbHVlLnR5cF90ZXJtXCIsIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDMxXCIpIC8vUkMgMjUyMDA0MzEgOiBWbGFzdG7DrWtcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkdpbi5GaWVsZHMuZ2luc3BvZFNTVShcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGxfc0dpbnNwb2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfc3U9dmFsdWUuaXhzX3N1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBbMTAwXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB0aGF0Lm1vZGVsLnN1X3JlcXVpcmVkID8gW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSA6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiB0aGF0Lm1vZGVsLnN1X3JlcXVpcmVkID8gXCJyZXF1aXJlZFwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQubW9kZWwuc3VfZGlzYWJsZWQgXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkNob3ZhbmlTdHJlZGlza2FEbGVVY2VsdS5ORVVSQ0VOTykpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5HaW4uRmllbGRzLmdpbnNmdW5TU1UoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c0Z1blZsYXN0bmlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW49dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGZ1bmN0aW9uIChvdXRwdXQ6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8ZGl2IGNsYXNzPSdnaSBnaS11c2VyIG1pY3JvZm90byc+PC9kaXY+PGI+XCIgKyBvdXRwdXQubmF6ZXZfcmYgKyBcIjwvYj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBbMTAwXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zdTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KGxfc0dpbnNwb2ROYW1lLCBcIml4c19zdVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB0aGF0Lm1vZGVsLmZ1bl9yZXF1aXJlZCA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogdGhhdC5tb2RlbC5mdW5fcmVxdWlyZWQgPyBcInJlcXVpcmVkXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5tb2RlbC5mdW5fZGlzYWJsZWQgXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkNob3ZhbmlTdHJlZGlza2FEbGVVY2VsdS5ORVVSQ0VOTywgbF9zR2luc3BvZE5hbWUpKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgLy8gUMWZaWTDoW7DrSBmb3JtdWzDocWZZSBkbyBET011LlxyXG4gICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oYXBwZW5kVG8pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBtb2h1T3RldnJpdFRpc2soKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcygpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gZm9ybS5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgIGlmIChmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRzLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
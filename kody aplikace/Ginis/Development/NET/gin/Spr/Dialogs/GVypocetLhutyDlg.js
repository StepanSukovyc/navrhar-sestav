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
            var GVypocetLhutyDlg_1;
            const { gcontent } = Decorators;
            let ActionNames;
            (function (ActionNames) {
                ActionNames["Ok"] = "actOk";
            })(ActionNames || (ActionNames = {}));
            const FormName = "VypocetLhutyForm";
            let GVypocetLhutyDlg = GVypocetLhutyDlg_1 = class GVypocetLhutyDlg extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.dto = {};
                    this.$Form = $("<div>");
                }
                onContentReady() {
                    this.CreateMenu();
                    this.$Form = GVypocetLhutyDlg_1.CreateForm(this.element, this.userSettings);
                    //this.EnableFieldsAndActions(this.dto && this.dto.edit_mode ? this.dto.edit_mode : false);
                    const $fields = this.$Form.findFields();
                    $fields.gfield("model", "apply", this.dto);
                    //if (this.DatovaZprava.Validators) {
                    //    $fields.gfield("model", "validators", this.DatovaZprava.Validators);
                    //    Gordic.Utils.Form.markRequired(this.$Form);
                    //}
                }
                CreateMenu() {
                    const content = this;
                    const commandBarPole = [];
                    if (this.dto.show_ok_button)
                        commandBarPole.push({
                            action: content.actions.add(new GAction({
                                name: ActionNames.Ok,
                                caption: "jres:25200121", //RC 25200121 : OK
                                tooltip: "jres:25200122", //RC 25200122 : OK
                                run: function () {
                                    content.okClick();
                                }
                            })),
                            favorite: true,
                            customClass: "g-button--primary"
                        });
                    commandBarPole.push({
                        action: content.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    content.commandBar(content.actions.createBar(commandBarPole));
                }
                static CreateForm(appendTo, userSettings) {
                    var srv = new GContent({ className: "Gordic.Spr.WebApp.GSprUtils", params: {} });
                    // Formulář
                    const formBuilder = new Gordic.Forms.Form({
                        name: FormName,
                        layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, S-12-12-0"
                    })
                        .addSection("")
                        .addRow("jres:25200117") //RC 25200117 : Počáteční datum
                        .addField("gdatebox", "w-4 w-S-12", {
                        name: "dat_zahajeni", model: "dat_zahajeni",
                        change: function (ev, changeObj) {
                            const form = $(this).closest('.gform');
                            srv.call("DenText", { datum: changeObj.value })
                                .done(function (ret) {
                                form.findFields("dat_zahajeni_den").gstringbox("setValue", ret);
                                srv.call("DatumLhuty", { datum: changeObj.value, lhuta: form.findFields("pocet_dnu").gfield("getValue") })
                                    .done(function (ret) {
                                    form.findFields("dat_lhuta").gdatebox("setValue", ret);
                                });
                            });
                        }
                    })
                        .addField("gstringbox", "w-8 w-S-12", { name: "dat_zahajeni_den", disabled: true })
                        .addRow("jres:25200118") //RC 25200118 : Počet dní lhůty
                        .addField("gnumberbox", "w-2 w-S-6", {
                        name: "pocet_dnu",
                        change: function (ev, changeObj) {
                            const form = $(this).closest('.gform');
                            srv.call("DatumLhuty", { datum: form.findFields("dat_zahajeni").gfield("getValue"), lhuta: changeObj.value })
                                .done(function (ret) {
                                form.findFields("dat_lhuta").gdatebox("setValue", ret);
                            });
                        }
                    })
                        .addRow("jres:25200119") //RC 25200119 : Poslední den lhůty
                        .addField("gdatebox", "w-4 w-S-12", {
                        name: "dat_lhuta", model: "dat_lhuta",
                        change: function (ev, changeObj) {
                            const form = $(this).closest('.gform');
                            srv.call("DenText", { datum: changeObj.value })
                                .done(function (ret) {
                                form.findFields("dat_lhuta_den").gstringbox("setValue", ret);
                                if (changeObj.value != null) {
                                    var d = new Date(changeObj.value.toDateString());
                                    d.setDate(d.getDate() + 1);
                                    form.findFields("dat_pr_moc_ssl").gdatebox("setValue", d);
                                }
                            });
                        }
                    })
                        .addField("gstringbox", "w-8 w-S-12", { name: "dat_lhuta_den", disabled: true })
                        .addRow("jres:25200120") //RC 25200120 : Právní moc
                        .addField("gdatebox", "w-4 w-S-12", {
                        name: "dat_pr_moc_ssl", model: "dat_pr_moc_ssl",
                        change: function (ev, changeObj) {
                            const form = $(this).closest('.gform');
                            srv.call("DenText", { datum: changeObj.value })
                                .done(function (ret) {
                                form.findFields("dat_pr_moc_ssl_den").gstringbox("setValue", ret);
                            });
                        }
                    })
                        .addField("gstringbox", "w-8 w-S-12", { name: "dat_pr_moc_ssl_den", disabled: true });
                    // Přidání formuláře do DOMu.
                    return $("<div>")
                        .appendTo(appendTo)
                        .gform("createFrom", formBuilder);
                }
                closing(result) {
                    return $.Deferred().resolve(result).promise();
                }
                okClick() {
                    if (!this.$Form.gform("isValid")) {
                        return;
                    }
                    this.$Form.findFields().gfield("model", "collect", this.dto);
                    this.tryClose({ VypocetLhuty: this.dto });
                }
            };
            GVypocetLhutyDlg = GVypocetLhutyDlg_1 = __decorate([
                gcontent
            ], GVypocetLhutyDlg);
            WebApp.GVypocetLhutyDlg = GVypocetLhutyDlg;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5cG9jZXRMaHV0eURsZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWeXBvY2V0TGh1dHlEbGcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXlKZjtBQXpKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5Sm5CO0lBekpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0F5SjFCO1FBekpvQixXQUFBLE1BQU07O1lBQ3ZCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUE7WUFlL0IsSUFBSyxXQUVKO1lBRkQsV0FBSyxXQUFXO2dCQUNaLDJCQUFZLENBQUE7WUFDaEIsQ0FBQyxFQUZJLFdBQVcsS0FBWCxXQUFXLFFBRWY7WUFFRCxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQTtZQUduQyxJQUFhLGdCQUFnQix3QkFBN0IsTUFBYSxnQkFBaUIsU0FBUSxPQUFBLFlBQVk7Z0JBQWxEOztvQkFFWSxRQUFHLEdBQStCLEVBQUUsQ0FBQztvQkFDckMsVUFBSyxHQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBOEhwRCxDQUFDO2dCQTVIVSxjQUFjO29CQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQWEsQ0FBQyxDQUFDO29CQUMzRSwyRkFBMkY7b0JBRTNGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRTNDLHFDQUFxQztvQkFDckMsMEVBQTBFO29CQUMxRSxpREFBaUQ7b0JBQ2pELEdBQUc7Z0JBQ1AsQ0FBQztnQkFFTyxVQUFVO29CQUNk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LEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQ3BGO29CQUVMLDZCQUE2QjtvQkFDN0IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUM7eUJBQ2xCLEtBQUssQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRU8sT0FBTyxDQUFDLE1BQU07b0JBQ2xCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEQsQ0FBQztnQkFFTyxPQUFPO29CQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUMvQixPQUFPO29CQUNYLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLENBQUM7YUFDSixDQUFBO1lBaklZLGdCQUFnQjtnQkFENUIsUUFBUTtlQUNJLGdCQUFnQixDQWlJNUI7WUFqSVksdUJBQWdCLG1CQWlJNUIsQ0FBQTtRQUNMLENBQUMsRUF6Sm9CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQXlKMUI7SUFBRCxDQUFDLEVBekpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5Sm5CO0FBQUQsQ0FBQyxFQXpKUyxNQUFNLEtBQU4sTUFBTSxRQXlKZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzXHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHVnlwb2NldExodXR5RGxnSW5wdXRQYXJhbXMge1xyXG4gICAgICAgIERhdHVtWmFoYWplbmk/OiBEYXRlLFxyXG4gICAgICAgIFBvY2V0RG51PzogRGVjaW1hbCxcclxuICAgICAgICAvL0RhdHVtTGh1dGE/OiBEYXRlLFxyXG4gICAgICAgIC8vRGF0dW1Qck1vY1NzbD86IERhdGUsXHJcbiAgICAgICAgU2hvd09rQnV0dG9uPzogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Z5cG9jZXRMaHV0eURsZ1JldHVyblZhbHVlIHtcclxuICAgICAgICAvL0lzU2F2ZWQ/OiBib29sZWFuLFxyXG4gICAgICAgIFZ5cG9jZXRMaHV0eTogSW50ZXJmYWNlLkdWeXBvY2V0TGh1dHlEdG87XHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBBY3Rpb25OYW1lcyB7XHJcbiAgICAgICAgT2sgPSBcImFjdE9rXCJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBGb3JtTmFtZSA9IFwiVnlwb2NldExodXR5Rm9ybVwiXHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5cG9jZXRMaHV0eURsZyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBkdG86IEludGVyZmFjZS5HVnlwb2NldExodXR5RHRvID0ge307XHJcbiAgICAgICAgcHJpdmF0ZSAkRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PiA9ICQoXCI8ZGl2PlwiKTtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy4kRm9ybSA9IEdWeXBvY2V0TGh1dHlEbGcuQ3JlYXRlRm9ybSh0aGlzLmVsZW1lbnQsIHRoaXMudXNlclNldHRpbmdzISk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5FbmFibGVGaWVsZHNBbmRBY3Rpb25zKHRoaXMuZHRvICYmIHRoaXMuZHRvLmVkaXRfbW9kZSA/IHRoaXMuZHRvLmVkaXRfbW9kZSA6IGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZHMgPSB0aGlzLiRGb3JtLmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgJGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuZHRvKTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuRGF0b3ZhWnByYXZhLlZhbGlkYXRvcnMpIHtcclxuICAgICAgICAgICAgLy8gICAgJGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy5EYXRvdmFacHJhdmEuVmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgIC8vICAgIEdvcmRpYy5VdGlscy5Gb3JtLm1hcmtSZXF1aXJlZCh0aGlzLiRGb3JtKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIENyZWF0ZU1lbnUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZEJhclBvbGU6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kdG8uc2hvd19va19idXR0b24pXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGNvbnRlbnQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBBY3Rpb25OYW1lcy5PaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEyMVwiLCAvL1JDIDI1MjAwMTIxIDogT0tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1MjAwMTIyXCIsIC8vUkMgMjUyMDAxMjIgOiBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQub2tDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogY29udGVudC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbihHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb250ZW50LmNvbW1hbmRCYXIoY29udGVudC5hY3Rpb25zLmNyZWF0ZUJhcihjb21tYW5kQmFyUG9sZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQ3JlYXRlRm9ybShcclxuICAgICAgICAgICAgYXBwZW5kVG86IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nczogRGF0YS5JR1N0b3JhZ2VcclxuICAgICAgICApOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzcnYgPSBuZXcgR0NvbnRlbnQoeyBjbGFzc05hbWU6IFwiR29yZGljLlNwci5XZWJBcHAuR1NwclV0aWxzXCIsIHBhcmFtczoge30gfSk7XHJcbiAgICAgICAgICAgIC8vIEZvcm11bMOhxZlcclxuICAgICAgICAgICAgY29uc3QgZm9ybUJ1aWxkZXIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRm9ybU5hbWUsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDExN1wiKSAvL1JDIDI1MjAwMTE3IDogUG/EjcOhdGXEjW7DrSBkYXR1bVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTQgdy1TLTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96YWhhamVuaVwiLCBtb2RlbDogXCJkYXRfemFoYWplbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5nZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcnYuY2FsbChcIkRlblRleHRcIiwgeyBkYXR1bTogY2hhbmdlT2JqLnZhbHVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X3phaGFqZW5pX2RlblwiKS5nc3RyaW5nYm94KFwic2V0VmFsdWVcIiwgcmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcnYuY2FsbChcIkRhdHVtTGh1dHlcIiwgeyBkYXR1bTogY2hhbmdlT2JqLnZhbHVlLCBsaHV0YTogZm9ybS5maW5kRmllbGRzKFwicG9jZXRfZG51XCIpLmdmaWVsZChcImdldFZhbHVlXCIpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhdF9saHV0YVwiKS5nZGF0ZWJveChcInNldFZhbHVlXCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTggdy1TLTEyXCIsIHsgbmFtZTogXCJkYXRfemFoYWplbmlfZGVuXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDExOFwiKSAvL1JDIDI1MjAwMTE4IDogUG/EjWV0IGRuw60gbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yIHctUy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2V0X2RudVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9ICQodGhpcykuY2xvc2VzdCgnLmdmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNydi5jYWxsKFwiRGF0dW1MaHV0eVwiLCB7IGRhdHVtOiBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfemFoYWplbmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksIGxodXRhOiBjaGFuZ2VPYmoudmFsdWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfbGh1dGFcIikuZ2RhdGVib3goXCJzZXRWYWx1ZVwiLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMTE5XCIpIC8vUkMgMjUyMDAxMTkgOiBQb3NsZWRuw60gZGVuIGxoxa90eVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTQgdy1TLTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9saHV0YVwiLCBtb2RlbDogXCJkYXRfbGh1dGFcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5nZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcnYuY2FsbChcIkRlblRleHRcIiwgeyBkYXR1bTogY2hhbmdlT2JqLnZhbHVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X2xodXRhX2RlblwiKS5nc3RyaW5nYm94KFwic2V0VmFsdWVcIiwgcmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShjaGFuZ2VPYmoudmFsdWUudG9EYXRlU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X3ByX21vY19zc2xcIikuZ2RhdGVib3goXCJzZXRWYWx1ZVwiLCBkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOCB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF9saHV0YV9kZW5cIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMTIwXCIpIC8vUkMgMjUyMDAxMjAgOiBQcsOhdm7DrSBtb2NcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy00IHctUy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcHJfbW9jX3NzbFwiLCBtb2RlbDogXCJkYXRfcHJfbW9jX3NzbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9ICQodGhpcykuY2xvc2VzdCgnLmdmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNydi5jYWxsKFwiRGVuVGV4dFwiLCB7IGRhdHVtOiBjaGFuZ2VPYmoudmFsdWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfcHJfbW9jX3NzbF9kZW5cIikuZ3N0cmluZ2JveChcInNldFZhbHVlXCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOCB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF9wcl9tb2Nfc3NsX2RlblwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgLy8gUMWZaWTDoW7DrSBmb3JtdWzDocWZZSBkbyBET011LlxyXG4gICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oYXBwZW5kVG8pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvc2luZyhyZXN1bHQpOiBKUXVlcnkuUHJvbWlzZTxHVnlwb2NldExodXR5RGxnUmV0dXJuVmFsdWU+IHtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJlc3VsdCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBva0NsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJEZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kRm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMuZHRvKTtcclxuICAgICAgICAgICAgdGhpcy50cnlDbG9zZSh7IFZ5cG9jZXRMaHV0eTogdGhpcy5kdG8gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
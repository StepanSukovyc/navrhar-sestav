"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GManualniParovaniCiziMena.ts           </Name>
//    <Description> Content pro formulář pro zadání částky v měně předpisu      </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-30                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro formulář pro zadání částky v měně předpisu */
            let GManualniParovaniCiziMena = class GManualniParovaniCiziMena extends Gordic.GContentBase {
                prepareContent() {
                    this.title = "jres:33600549"; //RC 33600549 : Doplnění částky platby v měně předpisu
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.$form.findFields().gfield("model", "apply", { c_mena: this.formCMena, mena_txt: this.mena_txt });
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: function (ev, ctx) {
                                if (!that.$form.gform("isValid")) {
                                    this.setPending(-1);
                                    return;
                                }
                                let formData = {};
                                that.$form.findFields().gfield("model", "collect", formData);
                                let c_mena = parseDecimal(formData.c_mena);
                                if (!c_mena.equals(0) && that.mena_txt == "CZK" && !parseDecimal(that.c_pol).equals(c_mena)) {
                                    this.setPending(that.dialogs.confirm("jres:33600548".format(c_mena.toFixed(2))).createDialogPromise().then((res) => {
                                        if (res === GDlg.mbbYes.id) {
                                            that.tryClose({ c_mena: c_mena.abs() });
                                        }
                                        else {
                                            return $.Deferred().reject().promise();
                                        }
                                    }));
                                }
                                else {
                                    that.tryClose({ c_mena: c_mena.abs() });
                                    this.setPending(100);
                                }
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /** Vytvoření formuláře */
                createForm() {
                    let form = new Gordic.Forms.Form("L1M1S1")
                        .addText(this.infoTxt)
                        .addText("jres:33600550") //RC 33600550 : Zkontrolujte prosím, případně zadejte odpovídající částku v měně předpisu
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_mena",
                        validators: [new Gordic.Validators.Base({
                                message: "jres:33600551", //RC 33600551 : Nelze párovat nulovou částku
                                validate: (value, src) => {
                                    return !parseDecimal(value ?? 0).equals(0);
                                }
                            })],
                    })
                        .addField("gstringbox", {
                        name: "mena_txt",
                        disabled: true
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
            };
            GManualniParovaniCiziMena = __decorate([
                Decorators.gcontent
            ], GManualniParovaniCiziMena);
            WebClient.GManualniParovaniCiziMena = GManualniParovaniCiziMena;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01hbnVhbG5pUGFyb3ZhbmlDaXppTWVuYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdNYW51YWxuaVBhcm92YW5pQ2l6aU1lbmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0ErRmY7QUEvRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK0ZuQjtJQS9GZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK0Y3QjtRQS9Gb0IsV0FBQSxTQUFTO1lBYzFCLDZEQUE2RDtZQUU3RCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLE9BQUEsWUFBWTtnQkFRdkQsY0FBYztvQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHNEQUFzRDtvQkFDcEYsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRyxDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDOUIsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29DQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FBQyxPQUFPO2dDQUFDLENBQUM7Z0NBQ2xFLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQTtnQ0FDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQ0FDN0QsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29DQUMxRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3Q0FDL0csSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0Q0FDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dDQUM1QyxDQUFDOzZDQUFNLENBQUM7NENBQ0osT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7d0NBQzNDLENBQUM7b0NBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDUixDQUFDO3FDQUFNLENBQUM7b0NBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29DQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUN6QixDQUFDOzRCQUNMLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs0QkFDM0IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBRUQsMEJBQTBCO2dCQUNsQixVQUFVO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO3lCQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDckIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLHlGQUF5Rjt5QkFDbEgsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDdEQsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQ0FDcEMsT0FBTyxFQUFFLGVBQWUsRUFBRSw0Q0FBNEM7Z0NBQ3RFLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtvQ0FDckIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMvQyxDQUFDOzZCQUNKLENBQUMsQ0FBQztxQkFDTixDQUFDO3lCQUNELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxVQUFVO3dCQUNoQixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0UsQ0FBQzthQUNKLENBQUE7WUE5RVkseUJBQXlCO2dCQURyQyxVQUFVLENBQUMsUUFBUTtlQUNQLHlCQUF5QixDQThFckM7WUE5RVksbUNBQXlCLDRCQThFckMsQ0FBQTtRQUNMLENBQUMsRUEvRm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQStGN0I7SUFBRCxDQUFDLEVBL0ZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErRm5CO0FBQUQsQ0FBQyxFQS9GUyxNQUFNLEtBQU4sTUFBTSxRQStGZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HTWFudWFsbmlQYXJvdmFuaUNpemlNZW5hLnRzICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gZm9ybXVsw6HFmSBwcm8gemFkw6Fuw60gxI3DoXN0a3kgdiBtxJtuxJsgcMWZZWRwaXN1ICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMC0zMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgemFkw6Fuw60gxI3DoXN0a3kgdiBtxJtuxJsgcMWZZWRwaXN1Ki9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR01hbnVhbG5pUGFyb3ZhbmlDaXppTWVuYURsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICBpbmZvVHh0OiBzdHJpbmcsXHJcbiAgICAgICAgZm9ybUNNZW5hOiBEZWNpbWFsIHwgSnNvbkRlY2ltYWwsXHJcbiAgICAgICAgbWVuYV90eHQ6IHN0cmluZyxcclxuICAgICAgICBjX3BvbDogRGVjaW1hbCB8IEpzb25EZWNpbWFsLFxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWw71zdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1IHphZMOhbsOtIMSNw6FzdGt5IHYgbcSbbsSbIHDFmWVkcGlzdSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdNYW51YWxuaVBhcm92YW5pQ2l6aU1lbmFEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgY19tZW5hOiBEZWNpbWFsIHwgSnNvbkRlY2ltYWxcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udGVudCBwcm8gZm9ybXVsw6HFmSBwcm8gemFkw6Fuw60gxI3DoXN0a3kgdiBtxJtuxJsgcMWZZWRwaXN1ICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdNYW51YWxuaVBhcm92YW5pQ2l6aU1lbmEgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyAvKklHQ2xpZW50Q29udGVudCwqLyBHTWFudWFsbmlQYXJvdmFuaUNpemlNZW5hRGxnSW5wdXRQYXJhbXMge1xyXG4gICAgICAgIHB1YmxpYyBpbmZvVHh0OiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGZvcm1DTWVuYTogRGVjaW1hbCB8IEpzb25EZWNpbWFsO1xyXG4gICAgICAgIHB1YmxpYyBtZW5hX3R4dDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBjX3BvbDogRGVjaW1hbCB8IEpzb25EZWNpbWFsO1xyXG5cclxuICAgICAgICBwcml2YXRlICRmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudCgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMzYwMDU0OVwiOyAvL1JDIDMzNjAwNTQ5IDogRG9wbG7Em27DrSDEjcOhc3RreSBwbGF0YnkgdiBtxJtuxJsgcMWZZWRwaXN1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgY19tZW5hOiB0aGlzLmZvcm1DTWVuYSwgbWVuYV90eHQ6IHRoaXMubWVuYV90eHQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9rOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Payh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC4kZm9ybS5nZm9ybShcImlzVmFsaWRcIikpIHsgdGhpcy5zZXRQZW5kaW5nKC0xKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YTogYW55ID0ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNfbWVuYSA9IHBhcnNlRGVjaW1hbChmb3JtRGF0YS5jX21lbmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNfbWVuYS5lcXVhbHMoMCkgJiYgdGhhdC5tZW5hX3R4dCA9PSBcIkNaS1wiICYmICFwYXJzZURlY2ltYWwodGhhdC5jX3BvbCkuZXF1YWxzKGNfbWVuYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzM2MDA1NDhcIi5mb3JtYXQoY19tZW5hLnRvRml4ZWQoMikpKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigocmVzKSA9PiB7ICAvL1JDIDMzNjAwNTQ4IDogUE9aT1IhIFphZGFuw6EgxI3DoXN0a2EgbmVvZHBvdsOtZMOhIMSNw6FzdGNlIHBvbG/Fvmt5IHbDvXBpc3UgdiBDWksuIFZ6bmlrbmUgZG9wb8SNZXQgdiByb3pwaXN1IHBvbG/Fvmt5LCBrdGVyw70gc2UgbXVzw60gbGlrdmlkb3ZhdCBkbyBVQ1QgKEZVQykgamFrbyBrdXJ6b3bDvSByb3pkw61sLiBQxZllc3RvIGNoY2V0ZSBwb2tyYcSNb3ZhdCBhIHBvbG/Fvmt1IHYgxI3DoXN0Y2UgezB9IHNww6Fyb3ZhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09PSBHRGxnLm1iYlllcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHsgY19tZW5hOiBjX21lbmEuYWJzKCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSh7IGNfbWVuYTogY19tZW5hLmFicygpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPayFcIiwgXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KHRoaXMuaW5mb1R4dClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwianJlczozMzYwMDU1MFwiKSAvL1JDIDMzNjAwNTUwIDogWmtvbnRyb2x1anRlIHByb3PDrW0sIHDFmcOtcGFkbsSbIHphZGVqdGUgb2Rwb3bDrWRhasOtY8OtIMSNw6FzdGt1IHYgbcSbbsSbIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19tZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwNTUxXCIsIC8vUkMgMzM2MDA1NTEgOiBOZWx6ZSBww6Fyb3ZhdCBudWxvdm91IMSNw6FzdGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFwYXJzZURlY2ltYWwodmFsdWUgPz8gMCkuZXF1YWxzKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVuYV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
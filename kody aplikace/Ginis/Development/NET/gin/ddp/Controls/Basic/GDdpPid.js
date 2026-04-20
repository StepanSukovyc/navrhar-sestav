"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDdpPid.cs                             </Name>
//    <Description> Okno pro zadání identifikátoru případu                      </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-02-11                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GDdpPid = class GDdpPid extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.createMainButtons();
                    that.createForm();
                    that.element.gform("waitForValues").done(() => {
                        if (that.userSettings != null) {
                            let savedFilter = that.userSettings.get("GDdpPidDlg");
                            if (savedFilter != null) {
                                that.defaultForm
                                    .findFields()
                                    .gfield("model", "apply", savedFilter);
                            }
                        }
                    });
                }
                createForm() {
                    const that = this;
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formx", layoutDescriptor: "L1M1S1" })
                        .addSection()
                        .addRow("PID")
                        .addField("gstringbox", "w-8", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                    })
                        .addField("gcheck", "w-4", {
                        name: "zpOtevreni",
                        label: "Bez kontroly",
                        tooltip: "Zda se má vynechat klasická kontrola při otevríání detailu",
                        initialValue: false,
                    }));
                }
                //* Metoda vytvářející tlačítka okna */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Otavřít",
                            icon: "gi-detail g-state-text g-state-info",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                //** Metoda sloužící pro potvrzení operace */
                ok() {
                    const that = this;
                    //let pid = that.form.findFields("ixp").gfield("getValue");
                    let formData = {};
                    that.form.findFields("ixp", "zpOtevreni").gfield("model", "collect", formData);
                    that.userSettings.set("GDdpPidDlg", formData);
                    if (!formData.zpOtevreni)
                        WebClient.Common.Pripady.openPripadDetail(this, formData.ixp);
                    else
                        that.navigate(["Gordic.Ddp.WebClient.GPripadDetail"], { ID: "DDPGPripadDetail#", Ixp: formData.ixp });
                    that.close({ ixp: formData.ixp });
                }
            };
            GDdpPid = __decorate([
                Decorators.gcontent
            ], GDdpPid);
            WebClient.GDdpPid = GDdpPid;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RkcFBpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZHBQaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0ErRWY7QUEvRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK0VuQjtJQS9FZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK0U3QjtRQS9Fb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQVEsU0FBUSxPQUFBLFlBQVk7Z0JBSXJDLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUMxQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUN0RCxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDdEIsSUFBSSxDQUFDLFdBQVk7cUNBQ1osVUFBVSxFQUFFO3FDQUNaLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzRCQUMvQyxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFFRCxVQUFVO29CQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDZCxJQUFJLENBQUMsSUFBSSxHQUFH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QUMsRUEvRVMsTUFBTSxLQUFOLE1BQU0sUUErRWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFBpZC5jcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHphZMOhbsOtIGlkZW50aWZpa8OhdG9ydSBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjYgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNi0wMi0xMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RkcFBpZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIEZvcm11bMOhxZkgKi9cclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNYWluQnV0dG9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIikuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC51c2VyU2V0dGluZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzYXZlZEZpbHRlciA9IHRoYXQudXNlclNldHRpbmdzLmdldChcIkdEZHBQaWREbGdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhdmVkRmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHNhdmVkRmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm14XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUElEXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LThcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwT3RldnJlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkJleiBrb250cm9seVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJaZGEgc2UgbcOhIHZ5bmVjaGF0IGtsYXNpY2vDoSBrb250cm9sYSBwxZlpIG90ZXZyw63DoW7DrSBkZXRhaWx1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vKiBNZXRvZGEgdnl0dsOhxZllasOtY8OtIHRsYcSNw610a2Egb2tuYSAqL1xyXG4gICAgICAgIGNyZWF0ZU1haW5CdXR0b25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk90YXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vKiogTWV0b2RhIHNsb3XFvsOtY8OtIHBybyBwb3R2cnplbsOtIG9wZXJhY2UgKi9cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vbGV0IHBpZCA9IHRoYXQuZm9ybS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZm9ybURhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICB0aGF0LmZvcm0uZmluZEZpZWxkcyhcIml4cFwiLCBcInpwT3RldnJlbmlcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1EYXRhKTtcclxuICAgICAgICAgICAgdGhhdC51c2VyU2V0dGluZ3MhLnNldChcIkdEZHBQaWREbGdcIiwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmb3JtRGF0YS56cE90ZXZyZW5pKVxyXG4gICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkub3BlblByaXBhZERldGFpbCh0aGlzLCBmb3JtRGF0YS5peHApO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWREZXRhaWxcIl0sIHsgSUQ6IFwiRERQR1ByaXBhZERldGFpbCNcIiwgSXhwOiBmb3JtRGF0YS5peHAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNsb3NlKHsgaXhwOiBmb3JtRGF0YS5peHAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadZmenaBuVl.ts                    </Name>
//    <Description> Okénko Změny vlastního bankovního účtu případu              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-07                                                  </Created>
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
            let GPripadZmenaBuVl = 
            /// <summary> Okénko Změny vlastního bankovního účtu případu </summary
            class GPripadZmenaBuVl extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    //that.title = `Zadání důvodu`;
                    that.actions.addRange([
                        new GAction({
                            name: "actOK",
                            caption: "OK",
                            //icon: "",
                            run: function () {
                                that.ok().done(function (data) { that.close(data); });
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actOK!", "actClose"]));
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formDuvod", layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addRow("Bankovní účet vlastní - PŮVODNÍ")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "bu_vl_old",
                        itemTemplate: "{bu_vl_old:trim:encode} / {sk_vl_old:trim:encode}",
                        model: "sk_vl_old=sk_vl; bu_vl_old=bu_vl; rok=rok; ucs=ucs",
                        disabled: true,
                    })
                        .addRow("Bankovní účet vlastní - NOVÝ")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "bu_vl",
                        flag: "required",
                        strict: false,
                        validators: [new Gordic.Validators.Required()],
                        itemTemplate: "{bu_vl:trim:encode} / {sk_vl:trim:encode}",
                        model: "sk_vl=sk_vl; bu_vl=bu_vl; rok=rok; ucs=ucs",
                        serverFilters: { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0, rok: that.Rok },
                        change: function (ev, input) {
                        }
                    }));
                    //that.findFields("bu_vl_old").gfield("model", "apply", { bu_vl_old: that.bu_vl_old, sk_vl_old: that.sk_vl_old });
                    that.findFields("bu_vl_old").gfield("setValue", { bu_vl_old: that.bu_vl_old, sk_vl_old: that.sk_vl_old });
                }
                ok() {
                    const that = this;
                    const def = $.Deferred();
                    if (!that.findForms().gform("isValid")) {
                        return def.reject().promise();
                    }
                    var buVLField = that.findFields("bu_vl").gfield("getValue");
                    return def.resolve({ bu_vl: buVLField.bu_vl, sk_vl: buVLField.sk_vl }).promise();
                }
            };
            GPripadZmenaBuVl = __decorate([
                Decorators.gcontent
                /// <summary> Okénko Změny vlastního bankovního účtu případu </summary
            ], GPripadZmenaBuVl);
            WebClient.GPripadZmenaBuVl = GPripadZmenaBuVl;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFptZW5hQnVWbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmlwYWRabWVuYUJ1VmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0E4RWY7QUE5RUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEVuQjtJQTlFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOEU3QjtRQTlFb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsZ0JBQWdCO1lBRDdCLHNFQUFzRTtZQUN0RSxNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFZOUMsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLCtCQUErQjtvQkFFL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUVSLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxJQUFJOzRCQUNiLFdBQVc7NEJBQ1gsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxDQUFDO3lCQUNKLENBQUM7d0JBQ0YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMs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OEVmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRabWVuYUJ1VmwudHMgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa8OpbmtvIFptxJtueSB2bGFzdG7DrWhvIGJhbmtvdm7DrWhvIMO6xI10dSBwxZnDrXBhZHUgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTEtMDcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIC8vLyA8c3VtbWFyeT4gT2vDqW5rbyBabcSbbnkgdmxhc3Ruw61obyBiYW5rb3Zuw61obyDDusSNdHUgcMWZw61wYWR1IDwvc3VtbWFyeVxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmlwYWRabWVuYUJ1VmwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTtcclxuXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgVHlwUGhsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIFJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICBidV92bF9vbGQ6IHN0cmluZztcclxuICAgICAgICBza192bF9vbGQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3RoYXQudGl0bGUgPSBgWmFkw6Fuw60gZMWvdm9kdWA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHsgdGhhdC5jbG9zZShkYXRhKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9LIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsXHJcbiAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EdXZvZFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0xMi0xMi0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJhbmtvdm7DrSDDusSNZXQgdmxhc3Ruw60gLSBQxa5WT0ROw41cIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3V2bCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfdmxfb2xkXCIsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7YnVfdmxfb2xkOnRyaW06ZW5jb2RlfSAvIHtza192bF9vbGQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNrX3ZsX29sZD1za192bDsgYnVfdmxfb2xkPWJ1X3ZsOyByb2s9cm9rOyB1Y3M9dWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJhbmtvdm7DrSDDusSNZXQgdmxhc3Ruw60gLSBOT1bDnVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXZsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7YnVfdmw6dHJpbTplbmNvZGV9IC8ge3NrX3ZsOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJza192bD1za192bDsgYnVfdmw9YnVfdmw7IHJvaz1yb2s7IHVjcz11Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBwcmlzdHVwS0JVOiAxLCB1cm92ZW5QcmlzdHVwdUtCVTogMSwgcmV6aW1WeWJlcnVEbGVLbmloeTogMCwgcm9rOiB0aGF0LlJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcyhcImJ1X3ZsX29sZFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgYnVfdmxfb2xkOiB0aGF0LmJ1X3ZsX29sZCwgc2tfdmxfb2xkOiB0aGF0LnNrX3ZsX29sZCB9KTtcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYnVfdmxfb2xkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYnVfdmxfb2xkOiB0aGF0LmJ1X3ZsX29sZCwgc2tfdmxfb2xkOiB0aGF0LnNrX3ZsX29sZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBidVZMRmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJidV92bFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHsgYnVfdmw6IGJ1VkxGaWVsZC5idV92bCwgc2tfdmw6IGJ1VkxGaWVsZC5za192bCB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
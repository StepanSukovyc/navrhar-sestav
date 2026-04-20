"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberKnihy.ts                         </Name>
//    <Description> Okno pro Výběr knihy (je-li ixp_den v ekoparams NULL)       </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-04-05                                                  </Created>
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
            let GVyberKnihy = class GVyberKnihy extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.validateOtherField = true;
                }
                onContentReady() {
                    const that = this;
                    that.title = `Výběr knihy`;
                    that.createMainButtons();
                    that.createForm();
                }
                createForm() {
                    const that = this;
                    if (!that.VyberTypuPhl) {
                        that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formx", layoutDescriptor: "L1M1S1" })
                            .addSection("Kniha")
                            .addRow()
                            .addField("gselectbox", Gordic.Prefabs.Select.kniha(), {
                            name: "ixp_den",
                            model: "model.ixp_den=value.ixp_den",
                        }));
                    }
                    else {
                        var formDefine = new Gordic.Forms.Form({ name: "formx", layoutDescriptor: "L1M1S1" })
                            .addSection("Kniha")
                            .addRow()
                            .addField("gselectbox", Gordic.Prefabs.Select.kniha(), {
                            name: "ixp_den",
                            model: "model.ixp_den=value.ixp_den",
                            change: (ev, ctx) => {
                                if (ctx && ctx.value && ctx.value.ixp_den) {
                                    that.findFields("typ_phl").gfield("option", "disabled", false);
                                    var filter = {
                                        phl_pro_roky: true,
                                        povolene_pro_knihu: ctx.value?.ixp_den,
                                        test_kniha_funkce: false,
                                    };
                                    that.findFields("typ_phl").gfield("option", "serverFilters", filter);
                                }
                                else {
                                    that.findFields("typ_phl").gfield("option", "disabled", true);
                                }
                            },
                        })
                            .addRow("Typ pohledávky")
                            .addField("gselectbox", "w-12", Gordic.Prefabs.Select.typPohledavky(), {
                            name: "typ_phl",
                            dropdown: false,
                            model: "model.typ_phl=value.typ_phl",
                            disabled: true,
                            change: (ev, ctx) => { },
                            validators: [new Gordic.Validators.Required()],
                        });
                        that.form = $.newDiv().appendTo(this.element).gform("createFrom", formDefine);
                        var content = $.content("main");
                        content.isl.DdpUserSettings.getEkoParams()
                            .get().done((result) => {
                            that.findForms().findFields("ixp_den").gfield("model", "apply", { ixp_den: result.ixp_den, nazev: result.nazev });
                            that.findForms().findFields("typ_phl").gfield("model", "apply", { typ_phl: result.typ_phl, nazev: result.nazev_typ_phl });
                        });
                    }
                }
                //** Metoda sloužící pro potvrzení operace */
                ok() {
                    const that = this;
                    if (that.form.gform("isValid")) {
                        let _ixpDen = that.form.findFields("ixp_den").gfield("getValue");
                        if (!that.VyberTypuPhl) {
                            that.close({ _ixpDen });
                        }
                        else {
                            let _typPhl = that.form.findFields("typ_phl").gfield("getValue");
                            that.close({ _ixpDen, _typPhl });
                        }
                    }
                }
                //* Metoda vytvářející tlačítka okna */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Vybrat knihu",
                            icon: "fa-floppy-o", //TODO: ?
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
            };
            GVyberKnihy = __decorate([
                Decorators.gcontent
            ], GVyberKnihy);
            WebClient.GVyberKnihy = GVyberKnihy;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyS25paHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJLbmloeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWdIZjtBQWhIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnSG5CO0lBaEhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnSDdCO1FBaEhvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFBN0M7O29CQUVZLHVCQUFrQixHQUFZLElBQUksQ0FBQztnQkEyRy9DLENBQUM7Z0JBdEdHLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxVQUFVO29CQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM1RCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQzs2QkFDL0QsVUFBVSxDQUFDLE9BQU8sQ0FBQzs2QkFDbkIsTUFBTSxFQUFFOzZCQUNS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LENBQUMsQ0FBQzt5QkFDbEMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2FBRUosQ0FBQTtZQTdHWSxXQUFXO2dCQUR2QixVQUFVLENBQUMsUUFBUTtlQUNQLFdBQVcsQ0E2R3ZCO1lBN0dZLHFCQUFXLGNBNkd2QixDQUFBO1FBQ0wsQ0FBQyxFQWhIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ0g3QjtJQUFELENBQUMsRUFoSGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdIbkI7QUFBRCxDQUFDLEVBaEhTLE1BQU0sS0FBTixNQUFNLFFBZ0hmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdWeWJlcktuaWh5LnRzICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyBWw71ixJtyIGtuaWh5IChqZS1saSBpeHBfZGVuIHYgZWtvcGFyYW1zIE5VTEwpICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDQtMDUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWeWJlcktuaWh5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0ZU90aGVyRmllbGQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIFZ5YmVyVHlwdVBobDogYm9vbGVhbjtcclxuICAgICAgICBfaXhwRGVuOiBTdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgVsO9YsSbciBrbmloeWA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1haW5CdXR0b25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5WeWJlclR5cHVQaGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm14XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJLbmloYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5rbmloYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtRGVmaW5lID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JteFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJLbmloYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qua25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggJiYgY3R4LnZhbHVlICYmIGN0eC52YWx1ZS5peHBfZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3ZvbGVuZV9wcm9fa25paHU6IGN0eC52YWx1ZT8uaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdF9rbmloYV9mdW5rY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC50eXBQb2hsZWRhdmt5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybURlZmluZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuaXNsLkRkcFVzZXJTZXR0aW5ncy5nZXRFa29QYXJhbXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpeHBfZGVuOiByZXN1bHQuaXhwX2RlbiwgbmF6ZXY6IHJlc3VsdC5uYXpldiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgdHlwX3BobDogcmVzdWx0LnR5cF9waGwsIG5hemV2OiByZXN1bHQubmF6ZXZfdHlwX3BobCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vKiogTWV0b2RhIHNsb3XFvsOtY8OtIHBybyBwb3R2cnplbsOtIG9wZXJhY2UgKi9cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX2l4cERlbiA9IHRoYXQuZm9ybS5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhhdC5WeWJlclR5cHVQaGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHsgX2l4cERlbiB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IF90eXBQaGwgPSB0aGF0LmZvcm0uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh7IF9peHBEZW4sIF90eXBQaGwgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vKiBNZXRvZGEgdnl0dsOhxZllasOtY8OtIHRsYcSNw610a2Egb2tuYSAqL1xyXG4gICAgICAgIGNyZWF0ZU1haW5CdXR0b25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWJyYXQga25paHVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsIC8vVE9ETzogP1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDetailSpravce.ts                      </Name>
//    <Description> Detail správce                                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-09                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var TypyPohledavek;
                (function (TypyPohledavek) {
                    let GDetailSpravce = class GDetailSpravce extends Gordic.GContentBase {
                        onContentReady() {
                            var that = this;
                            that.title = `Detail správce ${that.cis_spr}`;
                            that.createActions();
                            that.setBreadcrumbs([{
                                    caption: that.title,
                                    action: that.actions["actTypyPohledavekGDetailSpravceZavritPotomky"]
                                }]);
                            that.defaultForm = that.createForm();
                            that.isl.NastaveniSpravcu.detailSpravce({
                                dto: {
                                    ico: that.ico,
                                    cis_spr: that.cis_spr,
                                    typ_phl: that.typ_phl,
                                    rok: that.rok
                                }
                            })
                                .get()
                                .done((resp) => {
                                that.defaultForm.findFields().gfield("model", "apply", resp);
                            });
                        }
                        createActions() {
                            var that = this;
                            that.actions.addRange([{
                                    name: "actTypyPohledavekGDetailSpravceZavritPotomky",
                                    run: () => {
                                        that.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        createForm() {
                            var that = this;
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0" })
                                .addRow({ label: "Číslo správce", customClass: "w-4 ddp-float-left" })
                                .addField("gstringbox", { name: "cis_spr", disabled: true })
                                .addRow({ label: "Název", customClass: "w-8 ddp-float-left ddp-clear-right" })
                                .addField("gstringbox", { name: "nazev", disabled: true })
                                .addRow("Účetní středisko")
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), { name: "BankovniUcet.ucs", disabled: true, model: "model.ico=value.ico;model.BankovniUcet.ucs=value.ucs" })
                                .addRow({ label: "Bankovní účet", customClass: "w-6 ddp-float-left" })
                                .addField("gstringbox", { name: "BankovniUcet.bu_vl", disabled: true })
                                .addRow({ label: "S.K.", customClass: "w-3 ddp-float-left" })
                                .addField("gstringbox", { name: "BankovniUcet.sk_vl", disabled: true })
                                .addRow({ label: "Datum uzávěrky", customClass: "w-3 ddp-float-left ddp-clear-right" })
                                .addField("gdatebox", { name: "BankovniUcet.dat_uzav", disabled: true })
                                .addRow("Poznámka")
                                .addField("gstringbox", { name: "BankovniUcet.poznamka", disabled: true })
                                .addRow("Účtující funkce")
                                .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), { name: "BankovniUcet.ixs_fun_fuc", disabled: true, model: "model.BankovniUcet.ixs_fun_fuc=value.ixs_fun" });
                            return $("<div>")
                                .appendTo(that.element)
                                .gform("createFrom", form);
                        }
                    };
                    GDetailSpravce = __decorate([
                        Decorators.gcontent
                    ], GDetailSpravce);
                    TypyPohledavek.GDetailSpravce = GDetailSpravce;
                })(TypyPohledavek = Controls.TypyPohledavek || (Controls.TypyPohledavek = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFNwcmF2Y2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsU3ByYXZjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTRFZjtBQTVFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0RW5CO0lBNUVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0RTdCO1FBNUVvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0E0RXRDO1lBNUU4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxjQUFjLENBNEVyRDtnQkE1RXVDLFdBQUEsY0FBYztvQkFFbEQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTt3QkFPNUMsY0FBYzs0QkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDOUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUVyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsOENBQThDLENBQUM7aUNBQ3ZFLENBQUMsQ0FBQyxDQUFDOzRCQUdKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUVyQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztnQ0FDcEMsR0FBRyxFQUFFO29DQUNELEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztvQ0FDYixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87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Q0FBQyxDQUFDLE9BQU8sQ0FBQztpQ0FDWixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQ0FDdEIsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbkMsQ0FBQztxQkFDSixDQUFBO29CQXpFWSxjQUFjO3dCQUQxQixVQUFVLENBQUMsUUFBUTt1QkFDUCxjQUFjLENBeUUxQjtvQkF6RVksNkJBQWMsaUJBeUUxQixDQUFBO2dCQUNMLENBQUMsRUE1RXVDLGNBQWMsR0FBZCx1QkFBYyxLQUFkLHVCQUFjLFFBNEVyRDtZQUFELENBQUMsRUE1RThCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBNEV0QztRQUFELENBQUMsRUE1RW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTRFN0I7SUFBRCxDQUFDLEVBNUVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0RW5CO0FBQUQsQ0FBQyxFQTVFUyxNQUFNLEtBQU4sTUFBTSxRQTRFZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsU3ByYXZjZS50cyAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRGV0YWlsIHNwcsOhdmNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDEtMDkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbFNwcmF2Y2UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBpY286IHN0cmluZztcclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgY2lzX3Nwcjogc3RyaW5nO1xyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYERldGFpbCBzcHLDoXZjZSAke3RoYXQuY2lzX3Nwcn1gO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFR5cHlQb2hsZWRhdmVrR0RldGFpbFNwcmF2Y2VaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGhhdC5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5OYXN0YXZlbmlTcHJhdmN1LmRldGFpbFNwcmF2Y2Uoe1xyXG4gICAgICAgICAgICAgICAgZHRvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmljbyxcclxuICAgICAgICAgICAgICAgICAgICBjaXNfc3ByOiB0aGF0LmNpc19zcHIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5yb2tcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCByZXNwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFR5cHlQb2hsZWRhdmVrR0RldGFpbFNwcmF2Y2VaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTEyLTEyLTAsIE0tMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwixIzDrXNsbyBzcHLDoXZjZVwiLCBjdXN0b21DbGFzczogXCJ3LTQgZGRwLWZsb2F0LWxlZnRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiY2lzX3NwclwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIk7DoXpldlwiLCBjdXN0b21DbGFzczogXCJ3LTggZGRwLWZsb2F0LWxlZnQgZGRwLWNsZWFyLXJpZ2h0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsOaxI1ldG7DrSBzdMWZZWRpc2tvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmVrb3N1Y3MoKSwgeyBuYW1lOiBcIkJhbmtvdm5pVWNldC51Y3NcIiwgZGlzYWJsZWQ6IHRydWUsIG1vZGVsOiBcIm1vZGVsLmljbz12YWx1ZS5pY287bW9kZWwuQmFua292bmlVY2V0LnVjcz12YWx1ZS51Y3NcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJCYW5rb3Zuw60gw7rEjWV0XCIsIGN1c3RvbUNsYXNzOiBcInctNiBkZHAtZmxvYXQtbGVmdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJCYW5rb3ZuaVVjZXQuYnVfdmxcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJTLksuXCIsIGN1c3RvbUNsYXNzOiBcInctMyBkZHAtZmxvYXQtbGVmdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJCYW5rb3ZuaVVjZXQuc2tfdmxcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSB1esOhdsSbcmt5XCIsIGN1c3RvbUNsYXNzOiBcInctMyBkZHAtZmxvYXQtbGVmdCBkZHAtY2xlYXItcmlnaHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcIkJhbmtvdm5pVWNldC5kYXRfdXphdlwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIkJhbmtvdm5pVWNldC5wb3puYW1rYVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLDmsSNdHVqw61jw60gZnVua2NlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwgeyBuYW1lOiBcIkJhbmtvdm5pVWNldC5peHNfZnVuX2Z1Y1wiLCBkaXNhYmxlZDogdHJ1ZSwgbW9kZWw6IFwibW9kZWwuQmFua292bmlVY2V0Lml4c19mdW5fZnVjPXZhbHVlLml4c19mdW5cIiB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
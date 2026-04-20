"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSIPODetail.ts                         </Name>
//    <Description> Okno detailu tisku SIPO                                     </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-02-23                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GSIPODetail = class GSIPODetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter = {};
                }
                onContentReady() {
                    const that = this;
                    this.filter.tema = this.tema;
                    this.actions.addRange([
                        new GAction({
                            name: "actOk",
                            caption: "Ok",
                            //icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    this.commandBar(this.actions.createBar(["actOk!", "actClose"]));
                    this.createForm();
                }
                createForm() {
                    var that = this;
                    const currentDate = new Date();
                    var dateForm = new Gordic.Forms.Form({ name: "dateForm", layoutDescriptor: "L2M2S2, L-3-9-0, M-3-9-0, S-3-9-0" })
                        .addRow({ label: "Rok", required: true })
                        .addField("gnumberbox", {
                        name: "rok",
                        initialValue: currentDate.getFullYear(),
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Měsíc", required: true })
                        .addField("gnumberbox", {
                        name: "mesic",
                        initialValue: currentDate.getMonth() + 2,
                        validators: [new Gordic.Validators.Required()]
                    });
                    var selectForm = new Gordic.Forms.Form({ name: "selectForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-12-0-0, S-0-12-0" })
                        .addSection("Výběr záznamů pro tisk")
                        .addRow({ required: true })
                        .addField("gselectbox", {
                        name: "select",
                        dropdown: true,
                        itemTemplate: "{popis}",
                        model: "model.id=value.select",
                        initialValue: { id: 1, popis: "Pouze vybrané" },
                        data: [{ id: 1, popis: "Pouze vybrané", }, { id: 2, popis: "Všechny v seznamu (vybrané maskou)", }]
                    })
                        .addField("gcheck", {
                        name: "napojene",
                        initialValue: false,
                        label: "Zobrazit napojené"
                    });
                    $.newDiv().appendTo(this.element).gform("createFrom", dateForm);
                    $.newDiv().appendTo(this.element).gform("createFrom", selectForm);
                }
                ok() {
                    debugger;
                    var that = this;
                    var dateForm = this.findForms("dateForm");
                    var selectForm = this.findForms("selectForm");
                    $().gform("isValid");
                    var rok = dateForm.findFields("rok").gfield("getValue");
                    var mesic = dateForm.findFields("mesic").gfield("getValue");
                    var select = selectForm.findFields("select").gfield("getValue");
                    var napojene = selectForm.findFields("napojene").gfield("getValue");
                    if (napojene == true)
                        napojene = 0;
                    else
                        napojene = 100;
                    if (select == null || rok == null || rok == 0 || mesic == null || mesic == 0) {
                        if (rok == null || mesic == null)
                            this.showFlash("Není vyplněno některé datum.", "error");
                        else
                            this.showFlash("Není vyplněn výběr záznamů pro tisk.", "error");
                    }
                    else
                        that.close({ rok, mesic, select, napojene });
                }
            };
            GSIPODetail = __decorate([
                Decorators.gcontent
            ], GSIPODetail);
            WebClient.GSIPODetail = GSIPODetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NJUE9EZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU0lQT0RldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTBGZjtBQTFGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwRm5CO0lBMUZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwRjdCO1FBMUZvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFBN0M7O29CQUdZLFdBQU0sR0FBUSxFQUFFLENBQUM7Z0JBbUY3QixDQUFDO2dCQWpGRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFFN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxJQUFJOzRCQUNiLHNCQUFzQjs0QkFDdEIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDakMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLENBQUM7eUJBQ3BDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxD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LFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBGN0I7SUFBRCxDQUFDLEVBMUZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwRm5CO0FBQUQsQ0FBQyxFQTFGUyxNQUFNLEtBQU4sTUFBTSxRQTBGZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HU0lQT0RldGFpbC50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBkZXRhaWx1IHRpc2t1IFNJUE8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNC0wMi0yMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NJUE9EZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0ZW1hOiBTdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLnRlbWEgPSB0aGlzLnRlbWE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKSB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKSB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGVGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkYXRlRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMiwgTC0zLTktMCwgTS0zLTktMCwgUy0zLTktMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUm9rXCIscmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiTcSbc8OtY1wiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJzZWxlY3RGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0xMi0wLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVsO9YsSbciB6w6F6bmFtxa8gcHJvIHRpc2tcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmlkPXZhbHVlLnNlbGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMSwgcG9waXM6IFwiUG91emUgdnlicmFuw6lcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFt7IGlkOiAxLCBwb3BpczogXCJQb3V6ZSB2eWJyYW7DqVwiLCB9LCB7IGlkOiAyLCBwb3BpczogXCJWxaFlY2hueSB2IHNlem5hbXUgKHZ5YnJhbsOpIG1hc2tvdSlcIiwgfV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFwb2plbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlpvYnJheml0IG5hcG9qZW7DqVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBkYXRlRm9ybSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgc2VsZWN0Rm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRhdGVGb3JtID0gdGhpcy5maW5kRm9ybXMoXCJkYXRlRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdEZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInNlbGVjdEZvcm1cIik7XHJcbiAgICAgICAgICAgICQoKS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgIHZhciByb2sgPSBkYXRlRm9ybS5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgbWVzaWMgPSBkYXRlRm9ybS5maW5kRmllbGRzKFwibWVzaWNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3QgPSBzZWxlY3RGb3JtLmZpbmRGaWVsZHMoXCJzZWxlY3RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBuYXBvamVuZSA9IHNlbGVjdEZvcm0uZmluZEZpZWxkcyhcIm5hcG9qZW5lXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5hcG9qZW5lID09IHRydWUpIG5hcG9qZW5lID0gMDtcclxuICAgICAgICAgICAgZWxzZSBuYXBvamVuZSA9IDEwMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3QgPT0gbnVsbCB8fCByb2sgPT0gbnVsbCB8fCByb2sgPT0gMCB8fCBtZXNpYyA9PSBudWxsIHx8IG1lc2ljID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb2sgPT0gbnVsbCB8fCBtZXNpYyA9PSBudWxsKSB0aGlzLnNob3dGbGFzaChcIk5lbsOtIHZ5cGxuxJtubyBuxJtrdGVyw6kgZGF0dW0uXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2hvd0ZsYXNoKFwiTmVuw60gdnlwbG7Em24gdsO9YsSbciB6w6F6bmFtxa8gcHJvIHRpc2suXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB0aGF0LmNsb3NlKHsgcm9rLCBtZXNpYywgc2VsZWN0LCBuYXBvamVuZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
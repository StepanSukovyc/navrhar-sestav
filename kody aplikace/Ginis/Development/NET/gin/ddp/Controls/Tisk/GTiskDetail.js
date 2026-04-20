"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GTiskDetail.ts                         </Name>
//    <Description> Okno detailu tisku                                          </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-02-15                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GTiskDetail = class GTiskDetail extends Gordic.GContentBase {
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
                    this.loadData();
                }
                createForm() {
                    var that = this;
                    var textForm = new Gordic.Forms.Form({ name: "textForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addSection("Tiskové téma")
                        .addField("gstringbox", {
                        name: "nazev",
                        disabled: true
                    })
                        .addSection("Popis tématu")
                        .addField("gstringbox", {
                        name: "popis",
                        rows: 14,
                        disabled: true
                    });
                    var dateForm = new Gordic.Forms.Form({ name: "dateForm", layoutDescriptor: "L2M2S2, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addRow({ required: true })
                        .addText("Datum od", "w-2")
                        .addField("gdatebox", "w-4", {
                        name: "dat_od",
                        initialValue: new Date(2000, 0, 1),
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addText("Datum do", "w-2")
                        .addField("gdatebox", "w-4", {
                        name: "dat_do",
                        initialValue: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
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
                    $.newDiv().appendTo(this.element).gform("createFrom", textForm);
                    $.newDiv().appendTo(this.element).gform("createFrom", dateForm);
                    $.newDiv().appendTo(this.element).gform("createFrom", selectForm);
                }
                loadData() {
                    var that = this;
                    that.beginOperation({ id: "loadData" });
                    that.isl.TiskDetail.list(rq => {
                        return {
                            filters: that.filter
                        };
                    }).get().done(function (dto) {
                        if (dto != null) {
                            dto.data[0].por_cislo; //seems useless
                            var textForm = that.findForms("textForm");
                            textForm.findFields("nazev").gfield("setValue", dto.data[0].nazev);
                            textForm.findFields("popis").gfield("setValue", dto.data[0].popis);
                            textForm.findFields("nazev").trigger("blur");
                            //téma, které používají select a napojené
                            const visibleThemes = ["ddp_ptm_vymah", "ddp_ptm_vyrspl", "ddp_ptm_vyruct",
                                "ddp_ptm_vyrvym", "ddp_ptm_vymfak", "ddp_ptm_vympou", "eko_ptm_pou", "ddp_ptm_sipo",
                                "ddp_ptm_pen", "ddp_ptm_uro", "ddp_ptm_oprpop"];
                            that.isVisibleTema = visibleThemes.includes(that.tema.toString());
                            if (!that.isVisibleTema) {
                                //schování selectForm
                                that.findForms("selectForm").findFields("select").gfield("setValue", null);
                                that.findForms("selectForm").hide();
                            }
                            else
                                that.findFormRows("selectFrom").findFields("select").gfield("option");
                        }
                        that.endOperation({ id: "loadData" });
                    }).fail(function (dto) {
                        that.endOperation({ id: "loadData" });
                    });
                }
                ok() {
                    var that = this;
                    var dateForm = this.findForms("dateForm");
                    var selectForm = this.findForms("selectForm");
                    $().gform("isValid");
                    var dat_od = dateForm.findFields("dat_od").gfield("getValue");
                    var dat_do = dateForm.findFields("dat_do").gfield("getValue");
                    var select;
                    var napojene;
                    ;
                    if (that.isVisibleTema) {
                        select = selectForm.findFields("select").gfield("getValue");
                        napojene = selectForm.findFields("napojene").gfield("getValue");
                    }
                    else {
                        select = null;
                        napojene = null;
                    }
                    if (napojene == true)
                        napojene = 0;
                    else
                        napojene = 100;
                    if ((select == null && that.isVisibleTema) || dat_od == null || dat_do == null) {
                        if (dat_od == null || dat_do == null)
                            this.showFlash("Není vyplněno některé datum.", "error");
                        else
                            this.showFlash("Není vyplněn výběr záznamů pro tisk.", "error");
                    }
                    else
                        that.close({ dat_od, dat_do, select, napojene });
                }
            };
            GTiskDetail = __decorate([
                Decorators.gcontent
            ], GTiskDetail);
            WebClient.GTiskDetail = GTiskDetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Rpc2tEZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVGlza0RldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQXFKZjtBQXJKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxSm5CO0lBckpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxSjdCO1FBckpvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFBN0M7O29CQUdZLFdBQU0sR0FBUSxFQUFFLENBQUM7Z0JBOEk3QixDQUFDO2dCQTNJRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxJQUFJOzRCQUNiLHNCQUFzQjs0QkFDdEIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDakMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLENBQUM7eUJBQ3BDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxD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QUFhLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDN0UsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJOzRCQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUsT0FBTyxDQUFDLENBQUM7OzRCQUN6RixJQUFJLENBQUMsU0FBUyxDQUFDLHNDQUFzQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN6RSxDQUFDOzt3QkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFNUQsQ0FBQzthQUNKLENBQUE7WUFqSlksV0FBVztnQkFEdkIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxXQUFXLENBaUp2QjtZQWpKWSxxQkFBVyxjQWlKdkIsQ0FBQTtRQUNMLENBQUMsRUFySm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXFKN0I7SUFBRCxDQUFDLEVBckpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxSm5CO0FBQUQsQ0FBQyxFQXJKUyxNQUFNLEtBQU4sTUFBTSxRQXFKZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HVGlza0RldGFpbC50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBkZXRhaWx1IHRpc2t1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNC0wMi0xNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Rpc2tEZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2UgeyAgICAgXHJcblxyXG4gICAgICAgIHRlbWE6IFN0cmluZztcclxuICAgICAgICBwcml2YXRlIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgcHJpdmF0ZSBpc1Zpc2libGVUZW1hOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIudGVtYSA9IHRoaXMudGVtYTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCkgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCkgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9rIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0Rm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidGV4dEZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJUaXNrb3bDqSB0w6ltYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQb3BpcyB0w6ltYXR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogMTQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRhdGVGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMyLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYXR1bSBvZFwiLCBcInctMlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTRcIix7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKDIwMDAsIDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhdHVtIGRvXCIsIFwidy0yXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNFwiLHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdmFyIHNlbGVjdEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInNlbGVjdEZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTEyLTAtMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJWw71ixJtyIHrDoXpuYW3FryBwcm8gdGlza1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWQ9dmFsdWUuc2VsZWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOiAxLCBwb3BpczogXCJQb3V6ZSB2eWJyYW7DqVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW3sgaWQ6IDEsIHBvcGlzOiBcIlBvdXplIHZ5YnJhbsOpXCIsIH0sIHsgaWQ6IDIsIHBvcGlzOiBcIlbFoWVjaG55IHYgc2V6bmFtdSAodnlicmFuw6kgbWFza291KVwiLCB9XVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXBvamVuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWm9icmF6aXQgbmFwb2plbsOpXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRleHRGb3JtKTtcclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBkYXRlRm9ybSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgc2VsZWN0Rm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuVGlza0RldGFpbC5saXN0KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHRoYXQuZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGR0byAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHRvLmRhdGFbMF0ucG9yX2Npc2xvOyAvL3NlZW1zIHVzZWxlc3NcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dEZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcInRleHRGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRGb3JtLmZpbmRGaWVsZHMoXCJuYXpldlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkdG8uZGF0YVswXS5uYXpldik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZvcm0uZmluZEZpZWxkcyhcInBvcGlzXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGR0by5kYXRhWzBdLnBvcGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZvcm0uZmluZEZpZWxkcyhcIm5hemV2XCIpLnRyaWdnZXIoXCJibHVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3TDqW1hLCBrdGVyw6kgcG91xb7DrXZhasOtIHNlbGVjdCBhIG5hcG9qZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2libGVUaGVtZXMgPSBbXCJkZHBfcHRtX3Z5bWFoXCIsIFwiZGRwX3B0bV92eXJzcGxcIiwgXCJkZHBfcHRtX3Z5cnVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRkcF9wdG1fdnlydnltXCIsXCJkZHBfcHRtX3Z5bWZha1wiLCBcImRkcF9wdG1fdnltcG91XCIsIFwiZWtvX3B0bV9wb3VcIiwgXCJkZHBfcHRtX3NpcG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZHBfcHRtX3BlblwiLCBcImRkcF9wdG1fdXJvXCIsIFwiZGRwX3B0bV9vcHJwb3BcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNWaXNpYmxlVGVtYSA9IHZpc2libGVUaGVtZXMuaW5jbHVkZXModGhhdC50ZW1hLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmlzVmlzaWJsZVRlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zY2hvdsOhbsOtIHNlbGVjdEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJzZWxlY3RGb3JtXCIpLmZpbmRGaWVsZHMoXCJzZWxlY3RcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwic2VsZWN0Rm9ybVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB0aGF0LmZpbmRGb3JtUm93cyhcInNlbGVjdEZyb21cIikuZmluZEZpZWxkcyhcInNlbGVjdFwiKS5nZmllbGQoXCJvcHRpb25cIiwgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pO1xyXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZERhdGFcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGRhdGVGb3JtID0gdGhpcy5maW5kRm9ybXMoXCJkYXRlRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdEZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInNlbGVjdEZvcm1cIik7XHJcbiAgICAgICAgICAgICQoKS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRfb2QgPSBkYXRlRm9ybS5maW5kRmllbGRzKFwiZGF0X29kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZGF0X2RvID0gZGF0ZUZvcm0uZmluZEZpZWxkcyhcImRhdF9kb1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdDogYW55O1xyXG4gICAgICAgICAgICB2YXIgbmFwb2plbmU6IGFueTs7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmlzVmlzaWJsZVRlbWEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdCA9IHNlbGVjdEZvcm0uZmluZEZpZWxkcyhcInNlbGVjdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIG5hcG9qZW5lID0gc2VsZWN0Rm9ybS5maW5kRmllbGRzKFwibmFwb2plbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbmFwb2plbmUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAobmFwb2plbmUgPT0gdHJ1ZSkgbmFwb2plbmUgPSAwO1xyXG4gICAgICAgICAgICBlbHNlIG5hcG9qZW5lID0gMTAwO1xyXG4gICAgICAgICAgICBpZiAoKHNlbGVjdCA9PSBudWxsICYmIHRoYXQuaXNWaXNpYmxlVGVtYSkgfHwgZGF0X29kID09IG51bGwgfHwgZGF0X2RvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRfb2QgPT0gbnVsbCB8fCBkYXRfZG8gPT0gbnVsbCkgdGhpcy5zaG93Rmxhc2goXCJOZW7DrSB2eXBsbsSbbm8gbsSba3RlcsOpIGRhdHVtLlwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNob3dGbGFzaChcIk5lbsOtIHZ5cGxuxJtuIHbDvWLEm3IgesOhem5hbcWvIHBybyB0aXNrLlwiLCBcImVycm9yXCIpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHRoYXQuY2xvc2UoeyBkYXRfb2QsIGRhdF9kbywgc2VsZWN0LCBuYXBvamVuZSB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
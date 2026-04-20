"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadRozhodnuti.ts                   </Name>
//    <Description> Rozhodnutí případu                                          </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-11-15                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GPripadRozhodnuti = class GPripadRozhodnuti extends Gordic.GContentBase {
                onContentReady() {
                    this.title = `Rozhodnutí`;
                    this.createActions();
                    this.setBreadcrumbs([{
                            caption: this.title,
                            action: this.actions["actGPripadRozhodnutiZavritPotomky"]
                        }]);
                    let req = this.Ixp == null || this.Rozhodnuti == null ? null : Gordic.Isl.PripadRozhodnuti.read(rq => {
                        return {
                            data: {
                                ixp: this.Ixp,
                                rozhodnuti: this.Rozhodnuti
                            }
                        };
                    }).get();
                    this.createForm();
                    this.data = { ixp: this.Ixp };
                    if (req != null) {
                        req.done((data) => {
                            this.data = data.data;
                            this.defaultForm.findFields().gfield("model", "apply", data.data, { initialValues: true });
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        });
                    }
                    else {
                        this.defaultForm.findFields().gfield("model", "validators", this.validators);
                    }
                }
                createForm() {
                    let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                        .addRow({ label: "Identifikátor" })
                        .addField("gstringbox", { name: "ixp", disabled: true, initialValue: this.Ixp });
                    if (this.Rozhodnuti != null && this.Rozhodnuti > 0)
                        form.addRow({ label: "Rozhodnutí" })
                            .addField("gnumberbox", { name: "rozhodnuti", disabled: true });
                    form.addRow({ label: "Dodat do" })
                        .addField("gdatebox", { name: "dat_dodat" })
                        .addRow({ label: "Datum dodání" })
                        .addField("gdatebox", { name: "dat_dodani" })
                        .addRow({ label: "Dokument" })
                        .addField("gstringbox", { name: "ixp_dok" })
                        .addRow({ label: "Popis", required: true })
                        .addField("gstringbox", { name: "popis" })
                        .addRow({ label: "Poznamka" })
                        .addField("gstringbox", { name: "poznamka" })
                        .addRow({ label: "Datum od" })
                        .addField("gdatebox", { name: "dat_od" })
                        .addRow({ label: "Datum do" })
                        .addField("gdatebox", { name: "dat_do" })
                        .addRow("Stav rozhodnuti")
                        .addField("gradio", {
                        itemClass: "w-4",
                        initialValue: 2,
                        radios: [
                            {
                                value: 0,
                                label: "Neplatné"
                            },
                            {
                                value: 1,
                                label: "Platné"
                            },
                            {
                                value: 2,
                                label: "Nerozhodnuto"
                            }
                        ],
                        name: "platnost"
                    });
                    this.defaultForm = $("<div>")
                        .appendTo(this.element)
                        .gform("createFrom", form);
                }
                createActions() {
                    this.actions.addRange([{
                            name: "actGPripadRozhodnutiZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        }]);
                }
                ok() {
                    if (!this.defaultForm.gform("isValid"))
                        return;
                    else {
                        let dto = this.data;
                        this.defaultForm.findFields().gfield("model", "collect", dto);
                        let req = rq => {
                            return {
                                rq: { Data: dto }
                            };
                        };
                        let task = this.editMode ? Gordic.Isl.PripadRozhodnuti.update(req) : Gordic.Isl.PripadRozhodnuti.create(req);
                        WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                    }
                }
            };
            GPripadRozhodnuti = __decorate([
                Decorators.gcontent
            ], GPripadRozhodnuti);
            WebClient.GPripadRozhodnuti = GPripadRozhodnuti;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFJvemhvZG51dGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJpcGFkUm96aG9kbnV0aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQWlJZjtBQWpJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpSW5CO0lBaklnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpSTdCO1FBaklvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBUy9DLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7b0JBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDO3lCQUM1RCxDQUFDLENBQUMsQ0FBQztvQkFFSixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQzFGLE9BQU87NEJBQ0gsSUFBSSxFQUFFO2dDQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQ0FDYixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7NkJBQzlCO3lCQUNKLENBQUM7b0JBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENB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O3dCQUUvRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRTs0QkFDWCxPQUFPO2dDQUNILEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7NkJBQ3BCLENBQUM7d0JBQ04sQ0FBQyxDQUFDO3dCQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMvRixVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3hELENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUE3SFksaUJBQWlCO2dCQUQ3QixVQUFVLENBQUMsUUFBUTtlQUNQLGlCQUFpQixDQTZIN0I7WUE3SFksMkJBQWlCLG9CQTZIN0IsQ0FBQTtRQUNMLENBQUMsRUFqSW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlJN0I7SUFBRCxDQUFDLEVBaklnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpSW5CO0FBQUQsQ0FBQyxFQWpJUyxNQUFNLEtBQU4sTUFBTSxRQWlJZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkUm96aG9kbnV0aS50cyAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUm96aG9kbnV0w60gcMWZw61wYWR1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxOS0xMS0xNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByaXBhZFJvemhvZG51dGkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBSb3pob2RudXRpOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBkYXRhOiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUm96aG9kbnV0aUR0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgUm96aG9kbnV0w61gO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1ByaXBhZFJvemhvZG51dGlaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGlzLkl4cCA9PSBudWxsIHx8IHRoaXMuUm96aG9kbnV0aSA9PSBudWxsID8gbnVsbCA6IElzbC5QcmlwYWRSb3pob2RudXRpLnJlYWQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvemhvZG51dGk6IHRoaXMuUm96aG9kbnV0aVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHsgaXhwOiB0aGlzLkl4cCB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXEuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJJZGVudGlmaWvDoXRvclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJpeHBcIiwgZGlzYWJsZWQ6IHRydWUsIGluaXRpYWxWYWx1ZTogdGhpcy5JeHAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5Sb3pob2RudXRpICE9IG51bGwgJiYgdGhpcy5Sb3pob2RudXRpID4gMClcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KHsgbGFiZWw6IFwiUm96aG9kbnV0w61cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInJvemhvZG51dGlcIiwgZGlzYWJsZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyh7IGxhYmVsOiBcIkRvZGF0IGRvXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfZG9kYXRcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBkb2TDoW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X2RvZGFuaVwiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRva3VtZW50XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIml4cF9kb2tcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQb3Bpc1wiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUG96bmFta2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBvZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X29kXCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gZG9cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9kb1wiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcm96aG9kbnV0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5lcGxhdG7DqVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGxhdG7DqVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmVyb3pob2RudXRvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGF0bm9zdFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRSb3pob2RudXRpWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUm96aG9kbnV0aUR0byA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyBJc2wuUHJpcGFkUm96aG9kbnV0aS51cGRhdGUocmVxKSA6IElzbC5QcmlwYWRSb3pob2RudXRpLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadSymbolDetail.ts                 </Name>
//    <Description> Okno detailu symbolů VS/SS případu                          </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-09                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Pripady;
                (function (Pripady) {
                    let GPripadSymbolDetail = class GPripadSymbolDetail extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            var form = new Gordic.Forms.Form({ tabLabel: "" });
                            form.addSection()
                                .addRow()
                                .addText("Identifikátor").addField("gstringbox", { name: "ixp", disabled: true, defaultValue: this.Ixp })
                                .addRow()
                                .addText("VS", "w-6").addText("SS", "w-6")
                                .addRow()
                                .addField("gstringbox", "w-6", { name: "vs", disabled: this.Edit, defaultValue: this.Vs })
                                .addField("gstringbox", "w-6", { name: "ss", disabled: this.Edit, defaultValue: this.Ss })
                                .addRow()
                                .addText("Poznámka").addField("gstringbox", { name: "poznamka", defaultValue: this.Popis })
                                .addRow()
                                .addText("Stav").addField("gstringbox", { name: "stav", disabled: true, });
                            $("<div>").appendTo(this.element).gform("createFrom", form);
                            if (!this.Edit) {
                                this.element.findForms().findFields("ixp").gfield("setValue", this.Ixp);
                            }
                            else {
                                that.isl.PripadSymboly.read(rq => { return { data: { ixp: this.Ixp, vs: this.Vs, ss: this.Ss }, fragments: ["*"] }; })
                                    .get().done((data) => {
                                    this.data = data.data;
                                    this.element.findForms( /*"nameOfForm*/).findFields().gfield("model", "apply", this.data);
                                });
                                //that.isl.PripadSymboly.read(rq => { return { data: { ixp: this.Ixp, vs: this.Vs, ss: this.Ss }, fragments: ["*"] } })
                                that.isl.PripadSymboly.zjistiStavVSNaPripadu(rq => { return { data: { ixp: this.Ixp, vs: this.Vs }, fragments: ["*"] }; })
                                    .get().done((ret) => {
                                    this.element.findForms( /*"nameOfForm*/).findFields("stav").gfield("setValue", ret);
                                });
                                //.always(() => {
                                //    this.endOperation();
                                //});
                            }
                        }
                        ok() {
                            var that = this;
                            var dto = {};
                            //const forms = this.element.findForms();
                            //const fields = ["ixp", "vs", "ss", "poznamka"];
                            //const data = {};
                            that.element.findForms().findFields().gfield("model", "collect", dto);
                            //fields.forEach((field) => {
                            //    data[field] = forms.findFields(field)
                            //        .gfield("getValue")[field];
                            //})
                            //var zmena = that.element.findForms().gform("hasChanged");
                            //if (zmena) { // něco se změnilo nebo je záznam zrušen, tím ho zase zaaktivním         
                            that.uloz(dto);
                            //}
                            //else {
                            //    that.showFlash("Žádné údaje se nezměnily, není nutné nic ukládat!", "g-state-warning");
                            //}
                            /*
                            //this.beginOperation();
                            
                             * TODO ako uložit data?
                            Common.Base.ProcessResponse(
                                Isl.Pripad.save(_rq => ({
                                    rq: { Data: data }
                                })).get(),
                            this)
                            */
                        }
                        uloz(params) {
                            const that = this;
                            that.beginOperation("Probíha ukládaní symbolu");
                            if (!this.Edit) {
                                that.isl.PripadSymboly.vlozVSDoPripadu(rq => { return { data: params }; })
                                    .get()
                                    .done(function (ret) {
                                    that.endOperation();
                                    //that.showFlash("Změny úspěšně uloženy", "g-state-success");
                                    that.dialogs.messageBox("Uloženo", "Kontrola byla úspěšně uložena", [GDlg.mbbOk], "g-state-success", 280, 150); //TODO možná ještě upravit hlášku o úspěšném uložení? Nebo ji odebrat?
                                    that.close();
                                })
                                    .fail(function (jqXHR, typ, obj) {
                                    if (typ === "exception") {
                                        obj.handled = true;
                                        that.endOperation();
                                        return that.dialogs.error("Chyba", obj.baseMessage);
                                    }
                                });
                            }
                            else {
                                that.isl.PripadSymboly.upravVSVPripadu(rq => { return { data: params }; })
                                    .get()
                                    .done(function (ret) {
                                    that.endOperation();
                                    //that.showFlash("Změny úspěšně uloženy", "g-state-success");
                                    that.dialogs.messageBox("Uloženo", "Kontrola byla úspěšně uložena", [GDlg.mbbOk], "g-state-success", 280, 150); //TODO možná ještě upravit hlášku o úspěšném uložení? Nebo ji odebrat?
                                    that.close();
                                })
                                    .fail(function (jqXHR, typ, obj) {
                                    if (typ === "exception") {
                                        obj.handled = true;
                                        that.endOperation();
                                        return that.dialogs.error("Chyba", obj.baseMessage);
                                    }
                                });
                            }
                        }
                    };
                    GPripadSymbolDetail = __decorate([
                        Decorators.gcontent
                    ], GPripadSymbolDetail);
                    Pripady.GPripadSymbolDetail = GPripadSymbolDetail;
                })(Pripady = Controls.Pripady || (Controls.Pripady = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFN5bWJvbERldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmlwYWRTeW1ib2xEZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0FxSWY7QUFySUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUluQjtJQXJJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcUk3QjtRQXJJb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBcUl0QztZQXJJOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsT0FBTyxDQXFJOUM7Z0JBckl1QyxXQUFBLE9BQU87b0JBRTNDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO3dCQVlqRCxjQUFjOzRCQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQzs0QkFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNuRCxJQUFJLENBQUMsVUFBVSxFQUFFO2lDQUNaLE1BQU0sRUFBRTtpQ0FDUixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lDQUN4RyxNQUFNLEVBQUU7aUNBQ1IsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztpQ0FDekMsTUFBTSxFQUFFO2lDQUNSLFFBQVEsQ0FBQyxZQUFZ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QkFDWCxDQUFDO3dCQUtMLENBQUM7cUJBRUosQ0FBQTtvQkFsSVksbUJBQW1CO3dCQUQvQixVQUFVLENBQUMsUUFBUTt1QkFDUCxtQkFBbUIsQ0FrSS9CO29CQWxJWSwyQkFBbUIsc0JBa0kvQixDQUFBO2dCQUNMLENBQUMsRUFySXVDLE9BQU8sR0FBUCxnQkFBTyxLQUFQLGdCQUFPLFFBcUk5QztZQUFELENBQUMsRUFySThCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBcUl0QztRQUFELENBQUMsRUFySW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXFJN0I7SUFBRCxDQUFDLEVBcklnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxSW5CO0FBQUQsQ0FBQyxFQXJJUyxNQUFNLEtBQU4sTUFBTSxRQXFJZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkU3ltYm9sRGV0YWlsLnRzICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBkZXRhaWx1IHN5bWJvbMWvIFZTL1NTIHDFmcOtcGFkdSAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0wNi0wOSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuUHJpcGFkeSB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmlwYWRTeW1ib2xEZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIFNzOiBzdHJpbmc7XHJcbiAgICAgICAgVnM6IHN0cmluZztcclxuICAgICAgICBQb3Bpczogc3RyaW5nO1xyXG4gICAgICAgIEVkaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGF0YTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkdQcmlwYWRTeW1ib2x5RHRvO1xyXG5cclxuICAgICAgICAvLyBUT0RPIGRhdG92w70gdHlwIG1vZGVsdVxyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJcIiB9KTtcclxuICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJJZGVudGlmaWvDoXRvclwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIml4cFwiLCBkaXNhYmxlZDogdHJ1ZSwgZGVmYXVsdFZhbHVlOiB0aGlzLkl4cCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlZTXCIsIFwidy02XCIpLmFkZFRleHQoXCJTU1wiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJ2c1wiLCBkaXNhYmxlZDogdGhpcy5FZGl0LCBkZWZhdWx0VmFsdWU6IHRoaXMuVnMgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgeyBuYW1lOiBcInNzXCIsIGRpc2FibGVkOiB0aGlzLkVkaXQsIGRlZmF1bHRWYWx1ZTogdGhpcy5TcyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlBvem7DoW1rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvem5hbWthXCIsIGRlZmF1bHRWYWx1ZTogdGhpcy5Qb3BpcyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlN0YXZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzdGF2XCIsIGRpc2FibGVkOiB0cnVlLH0pXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5JeHApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3ltYm9seS5yZWFkKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogeyBpeHA6IHRoaXMuSXhwLCB2czogdGhpcy5Wcywgc3M6IHRoaXMuU3MgfSwgZnJhZ21lbnRzOiBbXCIqXCJdIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRm9ybXMoLypcIm5hbWVPZkZvcm0qLykuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5pc2wuUHJpcGFkU3ltYm9seS5yZWFkKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogeyBpeHA6IHRoaXMuSXhwLCB2czogdGhpcy5Wcywgc3M6IHRoaXMuU3MgfSwgZnJhZ21lbnRzOiBbXCIqXCJdIH0gfSlcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFN5bWJvbHkuemppc3RpU3RhdlZTTmFQcmlwYWR1KHJxID0+IHsgcmV0dXJuIHsgZGF0YTogeyBpeHA6IHRoaXMuSXhwLCB2czogdGhpcy5WcyB9LCBmcmFnbWVudHM6IFtcIipcIl0gfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcygvKlwibmFtZU9mRm9ybSovKS5maW5kRmllbGRzKFwic3RhdlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkdQcmlwYWRTeW1ib2x5RHRvID0ge307XHJcbiAgICAgICAgICAgIC8vY29uc3QgZm9ybXMgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKCk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgZmllbGRzID0gW1wiaXhwXCIsIFwidnNcIiwgXCJzc1wiLCBcInBvem5hbWthXCJdO1xyXG4gICAgICAgICAgICAvL2NvbnN0IGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgLy9maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgZGF0YVtmaWVsZF0gPSBmb3Jtcy5maW5kRmllbGRzKGZpZWxkKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmdmaWVsZChcImdldFZhbHVlXCIpW2ZpZWxkXTtcclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAvL3ZhciB6bWVuYSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIC8vaWYgKHptZW5hKSB7IC8vIG7Em2NvIHNlIHptxJtuaWxvIG5lYm8gamUgesOhem5hbSB6cnXFoWVuLCB0w61tIGhvIHphc2UgemFha3Rpdm7DrW0gICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoYXQudWxveihkdG8pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5zaG93Rmxhc2goXCLFvcOhZG7DqSDDumRhamUgc2UgbmV6bcSbbmlseSwgbmVuw60gbnV0bsOpIG5pYyB1a2zDoWRhdCFcIiwgXCJnLXN0YXRlLXdhcm5pbmdcIik7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgLy90aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgKiBUT0RPIGFrbyB1bG/Fvml0IGRhdGE/XHJcbiAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShcclxuICAgICAgICAgICAgICAgIElzbC5QcmlwYWQuc2F2ZShfcnEgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICBycTogeyBEYXRhOiBkYXRhIH1cclxuICAgICAgICAgICAgICAgIH0pKS5nZXQoKSxcclxuICAgICAgICAgICAgdGhpcylcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdWxveihwYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5HUHJpcGFkU3ltYm9seUR0bykge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWhhIHVrbMOhZGFuw60gc3ltYm9sdVwiKVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLkVkaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFN5bWJvbHkudmxvelZTRG9QcmlwYWR1KHJxID0+IHsgcmV0dXJuIHsgZGF0YTogcGFyYW1zIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJabcSbbnkgw7pzcMSbxaFuxJsgdWxvxb5lbnlcIiwgXCJnLXN0YXRlLXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiVWxvxb5lbm9cIiwgXCJLb250cm9sYSBieWxhIMO6c3DEm8WhbsSbIHVsb8W+ZW5hXCIsIFtHRGxnLm1iYk9rXSwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgMjgwLCAxNTApOyAvL1RPRE8gbW/Fvm7DoSBqZcWhdMSbIHVwcmF2aXQgaGzDocWha3UgbyDDunNwxJvFoW7DqW0gdWxvxb5lbsOtPyBOZWJvIGppIG9kZWJyYXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3ltYm9seS51cHJhdlZTVlByaXBhZHUocnEgPT4geyByZXR1cm4geyBkYXRhOiBwYXJhbXMgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcIlptxJtueSDDunNwxJvFoW7EmyB1bG/FvmVueVwiLCBcImctc3RhdGUtc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJVbG/FvmVub1wiLCBcIktvbnRyb2xhIGJ5bGEgw7pzcMSbxaFuxJsgdWxvxb5lbmFcIiwgW0dEbGcubWJiT2tdLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAyODAsIDE1MCk7IC8vVE9ETyBtb8W+bsOhIGplxaF0xJsgdXByYXZpdCBobMOhxaFrdSBvIMO6c3DEm8WhbsOpbSB1bG/FvmVuw60/IE5lYm8gamkgb2RlYnJhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==
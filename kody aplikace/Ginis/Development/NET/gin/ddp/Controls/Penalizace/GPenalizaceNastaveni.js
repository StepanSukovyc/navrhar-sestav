"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPenalizaceNastaveni.ts                </Name>
//    <Description> Nastavení penalizace                                        </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-09-11                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Penalizace;
                (function (Penalizace) {
                    let GPenalizaceNastaveni = class GPenalizaceNastaveni extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Parametry penalizace ${this.Ixp}`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPenalizaceNastaveniZavritPotomky"]
                                }]);
                            if (this.Poradi != null && this.Poradi > 0) {
                                this.beginOperation();
                                Gordic.Isl.PripadPenalizaceNastaveni.read(rq => { return { data: { ixp: this.Ixp, poradi: this.Poradi }, fragments: ["*"] }; })
                                    .get().done((data) => {
                                    this.data = data.data;
                                    this.defaultForm.findFields().gfield("model", "apply", this.data);
                                })
                                    .always(() => {
                                    this.endOperation();
                                });
                            }
                            else {
                                this.data = {
                                    ixp: this.Ixp
                                };
                            }
                            this.createForm();
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Datum od" }).addField("gdatebox", { name: "dat_od" })
                                .addRow({ label: "Datum do" }).addField("gdatebox", { name: "dat_do" })
                                .addRow({ label: "Mimořádné ukončení" }).addField("gdatebox", { name: "dat_ukonc" })
                                .addRow({ label: "Typ penalizace" }).addField("gselectbox", Gordic.Prefabs.Select.ddpctpe(), { name: "typ_pen", model: "model.typ_pen=value.typ_pen" })
                                .addRow({ label: "Příkaz" }).addField("gstringbox", { name: "prikaz" })
                                .addRow({ label: "Roční sazba [%]" }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "proc_sazba_pen", emptyValue: null })
                                .addRow({ label: "Denní sazba [‰]" }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "proc_sazba_den", emptyValue: null })
                                .addRow({ label: "Sazba" }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "c_sazba_pen", emptyValue: null })
                                .addRow({ label: "Minimální penále" }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "c_pen_min", emptyValue: null })
                                .addRow({ label: "Pen. částka" }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "c_pen", emptyValue: null })
                                .addRow({ label: "Poznámka" }).addField("gstringbox", { name: "poznamka" });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPenalizaceNastaveniZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ulozit() {
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
                                let task = this.editMode ? Gordic.Isl.PripadPenalizaceNastaveni.update(req) : Gordic.Isl.PripadPenalizaceNastaveni.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GPenalizaceNastaveni = __decorate([
                        Decorators.gcontent
                    ], GPenalizaceNastaveni);
                    Penalizace.GPenalizaceNastaveni = GPenalizaceNastaveni;
                })(Penalizace = Controls.Penalizace || (Controls.Penalizace = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BlbmFsaXphY2VOYXN0YXZlbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUGVuYWxpemFjZU5hc3RhdmVuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQXVGZjtBQXZGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1Rm5CO0lBdkZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1RjdCO1FBdkZvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0F1RnRDO1lBdkY4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxVQUFVLENBdUZqRDtnQkF2RnVDLFdBQUEsVUFBVTtvQkFFOUMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7d0JBUWxELGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUNoRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO29DQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQztpQ0FDL0QsQ0FBQyxDQUFDLENBQUM7NEJBRUosSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dDQUN6QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0NBRXRCLE9BQUEsR0FBRyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFB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QUFDO2dDQUMvRSxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUUvRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRTtvQ0FDWCxPQUFPO3dDQUNILEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7cUNBQ3BCLENBQUM7Z0NBQ04sQ0FBQyxDQUFDO2dDQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNqSCxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQ3hELENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFBO29CQXBGWSxvQkFBb0I7d0JBRGhDLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLG9CQUFvQixDQW9GaEM7b0JBcEZZLCtCQUFvQix1QkFvRmhDLENBQUE7Z0JBQ0wsQ0FBQyxFQXZGdUMsVUFBVSxHQUFWLG1CQUFVLEtBQVYsbUJBQVUsUUF1RmpEO1lBQUQsQ0FBQyxFQXZGOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUF1RnRDO1FBQUQsQ0FBQyxFQXZGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdUY3QjtJQUFELENBQUMsRUF2RmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXVGbkI7QUFBRCxDQUFDLEVBdkZTLE1BQU0sS0FBTixNQUFNLFFBdUZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQZW5hbGl6YWNlTmFzdGF2ZW5pLnRzICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBOYXN0YXZlbsOtIHBlbmFsaXphY2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDktMTEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlBlbmFsaXphY2Uge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGVuYWxpemFjZU5hc3RhdmVuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgUG9yYWRpOiBudW1iZXI7XHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGF0YTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlTmFzdGF2ZW5pRHRvO1xyXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYFBhcmFtZXRyeSBwZW5hbGl6YWNlICR7dGhpcy5JeHB9YDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlTmFzdGF2ZW5pWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5Qb3JhZGkgIT0gbnVsbCAmJiB0aGlzLlBvcmFkaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBJc2wuUHJpcGFkUGVuYWxpemFjZU5hc3RhdmVuaS5yZWFkKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogeyBpeHA6IHRoaXMuSXhwLCBwb3JhZGk6IHRoaXMuUG9yYWRpIH0sIGZyYWdtZW50czogW1wiKlwiXSB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLkl4cFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBvZFwiIH0pLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9vZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gZG9cIiB9KS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfZG9cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIk1pbW/FmcOhZG7DqSB1a29uxI1lbsOtXCIgfSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3Vrb25jXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJUeXAgcGVuYWxpemFjZVwiIH0pLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBjdHBlKCksIHsgbmFtZTogXCJ0eXBfcGVuXCIsIG1vZGVsOiBcIm1vZGVsLnR5cF9wZW49dmFsdWUudHlwX3BlblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUMWZw61rYXpcIiB9KS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInByaWthelwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUm/EjW7DrSBzYXpiYSBbJV1cIiB9KS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcInByb2Nfc2F6YmFfcGVuXCIsIGVtcHR5VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEZW5uw60gc2F6YmEgW+KAsF1cIiB9KS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcInByb2Nfc2F6YmFfZGVuXCIsIGVtcHR5VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJTYXpiYVwiIH0pLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiY19zYXpiYV9wZW5cIiwgZW1wdHlWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIk1pbmltw6FsbsOtIHBlbsOhbGVcIiB9KS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImNfcGVuX21pblwiLCBlbXB0eVZhbHVlOiBudWxsIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUGVuLiDEjcOhc3RrYVwiIH0pLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiY19wZW5cIiwgZW1wdHlWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlBvem7DoW1rYVwiIH0pLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdWxveml0KCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFBlbmFsaXphY2VOYXN0YXZlbmlEdG8gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBycTogeyBEYXRhOiBkdG8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2sgPSB0aGlzLmVkaXRNb2RlID8gSXNsLlByaXBhZFBlbmFsaXphY2VOYXN0YXZlbmkudXBkYXRlKHJlcSkgOiBJc2wuUHJpcGFkUGVuYWxpemFjZU5hc3RhdmVuaS5jcmVhdGUocmVxKTtcclxuICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZSh0YXNrLmdldCgpLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
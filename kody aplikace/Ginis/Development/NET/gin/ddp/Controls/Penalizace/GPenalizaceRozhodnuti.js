"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPenalizaceRozhodnuti.ts               </Name>
//    <Description> Rozhodnutí penalizace                                       </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-12-19                                                  </Created>
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
            var Controls;
            (function (Controls) {
                var Penalizace;
                (function (Penalizace) {
                    let GPenalizaceRozhodnuti = class GPenalizaceRozhodnuti extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Rozhodnutí #${this.Poradi} o penalizaci případu ${this.Ixp}`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPenalizaceRozhodnutiZavritPotomky"]
                                }]);
                            if (this.Poradi != null && this.Poradi > 0) {
                                this.beginOperation();
                                Gordic.Isl.PripadPenalizaceRozhodnuti.read(rq => { return { data: { ixp: this.Ixp, por_rozhod: this.Poradi }, fragments: ["*"] }; })
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
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" });
                            if (this.editMode) {
                                form.addRow("Pořadí").addField("gnumberbox", { name: "por_rozhod", disabled: true });
                            }
                            form.addRow({ label: "Číslo jednací" }).addField("gstringbox", { name: "cj" })
                                .addRow({ label: "Datum nabytí právní moci" }).addField("gdatebox", { name: "dat_nab_pm" })
                                .addRow({ label: "Datum doručení" }).addField("gdatebox", { name: "dat_doruc" })
                                .addRow({ label: "Datum vykonatelnosti" }).addField("gdatebox", { name: "dat_vykon" })
                                .addRow({ label: "Datum rozhodnutí" }).addField("gdatebox", { name: "dat_rozhod" })
                                .addRow({ label: "Datum počátku penalizace" }).addField("gdatebox", { name: "dat_zac_pen" })
                                .addRow({ label: "Datum konce penalizace" }).addField("gdatebox", { name: "dat_kon_pen" })
                                .addRow({ label: "Poznámka" }).addField("gstringbox", { name: "poznamka" });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPenalizaceRozhodnutiZavritPotomky",
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
                                let task = this.editMode ? Gordic.Isl.PripadPenalizaceRozhodnuti.update(req) : Gordic.Isl.PripadPenalizaceRozhodnuti.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GPenalizaceRozhodnuti = __decorate([
                        Decorators.gcontent
                    ], GPenalizaceRozhodnuti);
                    Penalizace.GPenalizaceRozhodnuti = GPenalizaceRozhodnuti;
                })(Penalizace = Controls.Penalizace || (Controls.Penalizace = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BlbmFsaXphY2VSb3pob2RudXRpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BlbmFsaXphY2VSb3pob2RudXRpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBd0ZmO0FBeEZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdGbkI7SUF4RmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdGN0I7UUF4Rm9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQXdGdEM7WUF4RjhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLFVBQVUsQ0F3RmpEO2dCQXhGdUMsV0FBQSxVQUFVO29CQUU5QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLE9BQUEsWUFBWTt3QkFRbkQsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsSUFBSSxDQUFDLE1BQU0seUJBQXlCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDM0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUNBQXVDLENBQUM7aUNBQ2hFLENBQUMsQ0FBQyxDQUFDOzRCQUVKLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQ0FDekMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dDQUV0QixPQUFBLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxP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Q3hELENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFBO29CQXJGWSxxQkFBcUI7d0JBRGpDLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLHFCQUFxQixDQXFGakM7b0JBckZZLGdDQUFxQix3QkFxRmpDLENBQUE7Z0JBQ0wsQ0FBQyxFQXhGdUMsVUFBVSxHQUFWLG1CQUFVLEtBQVYsbUJBQVUsUUF3RmpEO1lBQUQsQ0FBQyxFQXhGOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUF3RnRDO1FBQUQsQ0FBQyxFQXhGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd0Y3QjtJQUFELENBQUMsRUF4RmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdGbkI7QUFBRCxDQUFDLEVBeEZTLE1BQU0sS0FBTixNQUFNLFFBd0ZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQZW5hbGl6YWNlUm96aG9kbnV0aS50cyAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBSb3pob2RudXTDrSBwZW5hbGl6YWNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMTItMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QZW5hbGl6YWNlIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BlbmFsaXphY2VSb3pob2RudXRpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBQb3JhZGk6IG51bWJlcjtcclxuICAgICAgICBlZGl0TW9kZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFBlbmFsaXphY2VSb3pob2RudXRpRHRvO1xyXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYFJvemhvZG51dMOtICMke3RoaXMuUG9yYWRpfSBvIHBlbmFsaXphY2kgcMWZw61wYWR1ICR7dGhpcy5JeHB9YDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlUm96aG9kbnV0aVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuUG9yYWRpICE9IG51bGwgJiYgdGhpcy5Qb3JhZGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgSXNsLlByaXBhZFBlbmFsaXphY2VSb3pob2RudXRpLnJlYWQocnEgPT4geyByZXR1cm4geyBkYXRhOiB7IGl4cDogdGhpcy5JeHAsIHBvcl9yb3pob2Q6IHRoaXMuUG9yYWRpIH0sIGZyYWdtZW50czogW1wiKlwiXSB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLkl4cFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcIlBvxZlhZMOtXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwicG9yX3JvemhvZFwiLCBkaXNhYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coeyBsYWJlbDogXCLEjMOtc2xvIGplZG5hY8OtXCIgfSkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJjalwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gbmFieXTDrSBwcsOhdm7DrSBtb2NpXCIgfSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X25hYl9wbVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gZG9ydcSNZW7DrVwiIH0pLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9kb3J1Y1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gdnlrb25hdGVsbm9zdGlcIiB9KS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfdnlrb25cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIHJvemhvZG51dMOtXCIgfSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3JvemhvZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gcG/EjcOhdGt1IHBlbmFsaXphY2VcIiB9KS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfemFjX3BlblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0ga29uY2UgcGVuYWxpemFjZVwiIH0pLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9rb25fcGVuXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQb3puw6Fta2FcIiB9KS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvem5hbWthXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BlbmFsaXphY2VSb3pob2RudXRpWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1bG96aXQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUGVuYWxpemFjZVJvemhvZG51dGlEdG8gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcSA9IHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBycTogeyBEYXRhOiBkdG8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2sgPSB0aGlzLmVkaXRNb2RlID8gSXNsLlByaXBhZFBlbmFsaXphY2VSb3pob2RudXRpLnVwZGF0ZShyZXEpIDogSXNsLlByaXBhZFBlbmFsaXphY2VSb3pob2RudXRpLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
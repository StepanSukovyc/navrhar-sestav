"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadKontrola.ts                     </Name>
//    <Description> Detail kontroly případu                                     </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-11-15                                                  </Created>
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
                var Pripady;
                (function (Pripady) {
                    let GPripadKontrola = class GPripadKontrola extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Kontrola`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPripadKontrolaZavritPotomky"]
                                }]);
                            let req = this.Ixp == null || this.DatKontr == null ? null : Gordic.Isl.PripadKontrola.read(rq => {
                                return {
                                    data: {
                                        ixp: this.Ixp,
                                        dat_kontr: this.DatKontr
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
                                .addRow({ label: "Datum kontroly", required: true })
                                .addField("gdatebox", { name: "dat_kontr" })
                                .addRow({ label: "Typ kontroly", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typKontroly(), { name: "typ_kont", model: "model.typ_kont=value.typ_kont", initialValue: { typ_kont: 70, typ_kont_txt: "Vlastní" } })
                                .addRow({ label: "Poznamka" })
                                .addField("gstringbox", { name: "poznamka" })
                                .addRow()
                                .addField("gcheck", { name: "provedeno", label: "Provedeno", initialValue: 0, emptyValue: null });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPripadKontrolaZavritPotomky",
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
                                let task = this.editMode ? Gordic.Isl.PripadKontrola.update(req) : Gordic.Isl.PripadKontrola.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GPripadKontrola = __decorate([
                        Decorators.gcontent
                    ], GPripadKontrola);
                    Pripady.GPripadKontrola = GPripadKontrola;
                })(Pripady = Controls.Pripady || (Controls.Pripady = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZEtvbnRyb2xhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZEtvbnRyb2xhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBd0ZmO0FBeEZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdGbkI7SUF4RmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdGN0I7UUF4Rm9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQXdGdEM7WUF4RjhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLE9BQU8sQ0F3RjlDO2dCQXhGdUMsV0FBQSxPQUFPO29CQUczQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTt3QkFTN0MsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUM7aUNBQzFELENBQUMsQ0FBQyxDQUFDOzRCQUVKLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0NBQ3RGLE9BQU87b0NBQ0gsSUFBSSxFQUFFO3dDQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzt3Q0FDYixTQUFT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cz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkS29udHJvbGEudHMgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRGV0YWlsIGtvbnRyb2x5IHDFmcOtcGFkdSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTExLTE1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuUHJpcGFkeSB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJpcGFkS29udHJvbGEgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBEYXRLb250cjogRGF0ZTtcclxuXHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgICAgICAgdmFsaWRhdG9yczogYW55O1xyXG4gICAgICAgIGRhdGE6IERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRLb250cm9sYUR0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgS29udHJvbGFgO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1ByaXBhZEtvbnRyb2xhWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxID0gdGhpcy5JeHAgPT0gbnVsbCB8fCB0aGlzLkRhdEtvbnRyID09IG51bGwgPyBudWxsIDogSXNsLlByaXBhZEtvbnRyb2xhLnJlYWQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9rb250cjogdGhpcy5EYXRLb250clxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHsgaXhwOiB0aGlzLkl4cCB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXEuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBrb250cm9seVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9rb250clwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIGtvbnRyb2x5XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cEtvbnRyb2x5KCksIHsgbmFtZTpcInR5cF9rb250XCIsIG1vZGVsOiBcIm1vZGVsLnR5cF9rb250PXZhbHVlLnR5cF9rb250XCIsIGluaXRpYWxWYWx1ZTogeyB0eXBfa29udDogNzAsIHR5cF9rb250X3R4dDogXCJWbGFzdG7DrVwiIH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQb3puYW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3puYW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwicHJvdmVkZW5vXCIsIGxhYmVsOiBcIlByb3ZlZGVub1wiLCBpbml0aWFsVmFsdWU6IDAsIGVtcHR5VmFsdWU6IG51bGwgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkS29udHJvbGFaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRLb250cm9sYUR0byA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyBJc2wuUHJpcGFkS29udHJvbGEudXBkYXRlKHJlcSkgOiBJc2wuUHJpcGFkS29udHJvbGEuY3JlYXRlKHJlcSk7XHJcbiAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGFzay5nZXQoKSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPolozkySML.ts                         </Name>
//    <Description> Položky SML (smlouvy)                                       </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-02-04                                                  </Created>
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
                var Ciselniky;
                (function (Ciselniky) {
                    let GPolozkySML = class GPolozkySML extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Položky SML`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPolozkySMLZavritPotomky"]
                                }]);
                            this.createForm();
                            WebClient.Common.Base.nastaveniPoleKtgUpo(this, this.IxpDen, this.data.typ_phl ?? "");
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Typ pohledávky", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPhlSimple(), {
                                name: "typ_phl",
                                model: "model.typ_phl=value.typ_phl",
                                disabled: this.editMode,
                                serverFilters: {
                                    aktivita: 100
                                },
                                change: (ev, obj) => {
                                    WebClient.Common.Base.aktualizovatPoleKtgUpo(this, this.IxpDen, obj.value?.typ_phl ?? "");
                                }
                            })
                                .addRow({ label: "Kategorie pohybu", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                serverFilters: {
                                    ktg_upo: "< 200",
                                    ktg_upo_txt: "!= Neurčeno"
                                },
                                name: "ktg_upo",
                                model: "model.ktg_upo=value.ktg_upo",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Způsob vazby", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ddpcvsm(), {
                                name: "typ_vsm",
                                model: "model.typ_vsm=value.typ_vsm",
                                dropdown: true
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "apply", this.data);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPolozkySMLZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ok() {
                            const that = this;
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
                                let task = this.editMode ? that.isl.PolozkySML.update(req) : that.isl.PolozkySML.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GPolozkySML = __decorate([
                        Decorators.gcontent
                    ], GPolozkySML);
                    Ciselniky.GPolozkySML = GPolozkySML;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvbG96a3lTTUwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9sb3preVNNTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQTJGZjtBQTNGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyRm5CO0lBM0ZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EyRjdCO1FBM0ZvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0EyRnRDO1lBM0Y4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxTQUFTLENBMkZoRDtnQkEzRnVDLFdBQUEsU0FBUztvQkFHN0MsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTt3QkFPekMsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQzs0QkFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7aUNBQ3RELENBQUMsQ0FBQyxDQUFDOzRCQUVKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDbEIsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNoRixDQUFDO3dCQUVPLFVBQVU7NEJBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFn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Q1gsT0FBTzt3Q0FDSCxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO3FDQUNwQixDQUFDO2dDQUNOLENBQUMsQ0FBQztnQ0FDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDN0YsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUN4RCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQTtvQkF2RlksV0FBVzt3QkFEdkIsVUFBVSxDQUFDLFFBQVE7dUJBQ1AsV0FBVyxDQXVGdkI7b0JBdkZZLHFCQUFXLGNBdUZ2QixDQUFBO2dCQUNMLENBQUMsRUEzRnVDLFNBQVMsR0FBVCxrQkFBUyxLQUFULGtCQUFTLFFBMkZoRDtZQUFELENBQUMsRUEzRjhCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBMkZ0QztRQUFELENBQUMsRUEzRm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJGN0I7SUFBRCxDQUFDLEVBM0ZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyRm5CO0FBQUQsQ0FBQyxFQTNGUyxNQUFNLEtBQU4sTUFBTSxRQTJGZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUG9sb3preVNNTC50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUG9sb8W+a3kgU01MIChzbWxvdXZ5KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAyLTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2xvemt5U01MIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgZGF0YTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQb2xvemt5U01MRHRvO1xyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBJeHBEZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgUG9sb8W+a3kgU01MYDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQb2xvemt5U01MWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UubmFzdGF2ZW5pUG9sZUt0Z1Vwbyh0aGlzLCB0aGlzLkl4cERlbiwgdGhpcy5kYXRhLnR5cF9waGwgPz8gXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCBwb2hsZWTDoXZreVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQaGxTaW1wbGUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5ha3R1YWxpem92YXRQb2xlS3RnVXBvKHRoaXMsIHRoaXMuSXhwRGVuLCBvYmoudmFsdWU/LnR5cF9waGwgPz8gXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJLYXRlZ29yaWUgcG9oeWJ1XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogXCI8IDIwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX3R4dDogXCIhPSBOZXVyxI1lbm9cIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlpwxa9zb2IgdmF6YnlcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwY3ZzbSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfdnNtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3ZzbT12YWx1ZS50eXBfdnNtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BvbG96a3lTTUxaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUG9sb3preVNNTER0byA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyB0aGF0LmlzbC5Qb2xvemt5U01MLnVwZGF0ZShyZXEpIDogdGhhdC5pc2wuUG9sb3preVNNTC5jcmVhdGUocmVxKTtcclxuICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZSh0YXNrLmdldCgpLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
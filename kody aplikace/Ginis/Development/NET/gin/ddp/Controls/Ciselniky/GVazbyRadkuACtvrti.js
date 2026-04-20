"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVazbyRadkuACtvrti.ts                  </Name>
//    <Description> Vazby řádků a čtvrtí                                        </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-01-28                                                  </Created>
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
                    let GVazbyRadkuACtvrti = class GVazbyRadkuACtvrti extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Vazby řádků a čtvrtí`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGVazbyRadkuACtvrtiZavritPotomky"]
                                }]);
                            this.createForm();
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Kniha", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.kniha(), {
                                name: "ixp_den",
                                model: "model.ixp_den=value.ixp_den",
                                disabled: this.editMode
                            })
                                .addRow({ label: "Pohledávka", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                                name: "typ_phl",
                                model: "model.typ_phl=value.typ_phl",
                                serverFilters: {
                                    ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true, false, this.element),
                                    phl_pro_roky: true,
                                    aktivita: 100
                                },
                                disabled: this.editMode
                            })
                                .addRow({ label: "Řádek", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ciselnikRadku(), {
                                disabled: this.editMode,
                                model: "model.ixp_den=>value.ixp_den,model.typ_phl=>value.typ_phl,model.ddp_radek=value.ddp_radek",
                                serverFilters: {
                                    typ_phl: new Gordic.Forms.Dependency("typ_phl", "typ_phl", true, false, this.element),
                                    ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true, false, this.element)
                                }
                            })
                                .addRow({ label: "Čtvrť", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ciselnikCtvrti(), {
                                disabled: this.editMode,
                                model: "model.ixp_den=>value.ixp_den,model.typ_phl=>value.typ_phl,model.ddp_ctvrt=value.ddp_ctvrt",
                                serverFilters: {
                                    typ_phl: new Gordic.Forms.Dependency("typ_phl", "typ_phl", true, false, this.element),
                                    ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true, false, this.element)
                                }
                            })
                                .addRow("Poznámka")
                                .addField("gstringbox", { name: "poznamka" });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                            this.defaultForm.gform("waitForValues")
                                .always(() => {
                                this.defaultForm.findFields().gfield("model", "apply", this.data);
                                this.defaultForm.findFields().gfield("model", "validators", this.validators);
                            });
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGVazbyRadkuACtvrtiZavritPotomky",
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
                                let task = this.editMode ? that.isl.VazbyRadkuACtvrti.update(req) : that.isl.VazbyRadkuACtvrti.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GVazbyRadkuACtvrti = __decorate([
                        Decorators.gcontent
                    ], GVazbyRadkuACtvrti);
                    Ciselniky.GVazbyRadkuACtvrti = GVazbyRadkuACtvrti;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ZhemJ5UmFka3VBQ3R2cnRpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ZhemJ5UmFka3VBQ3R2cnRpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBa0dmO0FBbEdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtHbkI7SUFsR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtHN0I7UUFsR29CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQWtHdEM7WUFsRzhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLFNBQVMsQ0FrR2hEO2dCQWxHdUMsV0FBQSxTQUFTO29CQUc3QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLE9BQUEsWUFBWTt3QkFLaEQsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDOzRCQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO29DQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztpQ0FDN0QsQ0FBQyxDQUFDLENBQUM7NEJBRUosSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixDQUFDO3dCQUVPLFVBQVU7NEJBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO2lDQUMzRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDMUMsUUFB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QUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzNHLFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDeEQsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUE7b0JBOUZZLGtCQUFrQjt3QkFEOUIsVUFBVSxDQUFDLFFBQVE7dUJBQ1Asa0JBQWtCLENBOEY5QjtvQkE5RlksNEJBQWtCLHFCQThGOUIsQ0FBQTtnQkFDTCxDQUFDLEVBbEd1QyxTQUFTLEdBQVQsa0JBQVMsS0FBVCxrQkFBUyxRQWtHaEQ7WUFBRCxDQUFDLEVBbEc4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQWtHdEM7UUFBRCxDQUFDLEVBbEdvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFrRzdCO0lBQUQsQ0FBQyxFQWxHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa0duQjtBQUFELENBQUMsRUFsR1MsTUFBTSxLQUFOLE1BQU0sUUFrR2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ZhemJ5UmFka3VBQ3R2cnRpLnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFZhemJ5IMWZw6Fka8WvIGEgxI10dnJ0w60gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDEtMjggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ZhemJ5UmFka3VBQ3R2cnRpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ZhemJ5UmFka3VBQ3R2cnRpRHRvO1xyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgVmF6YnkgxZnDoWRrxa8gYSDEjXR2cnTDrWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHVmF6YnlSYWRrdUFDdHZydGlaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJLbmloYVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5rbmloYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUG9obGVkw6F2a2FcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QudHlwUG9obGVkYXZreSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHBfZGVuXCIsIFwiaXhwX2RlblwiLCB0cnVlLCBmYWxzZSwgdGhpcy5lbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCLFmMOhZGVrXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmNpc2VsbmlrUmFka3UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49PnZhbHVlLml4cF9kZW4sbW9kZWwudHlwX3BobD0+dmFsdWUudHlwX3BobCxtb2RlbC5kZHBfcmFkZWs9dmFsdWUuZGRwX3JhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ0eXBfcGhsXCIsIFwidHlwX3BobFwiLCB0cnVlLCBmYWxzZSwgdGhpcy5lbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCBcIml4cF9kZW5cIiwgdHJ1ZSwgZmFsc2UsIHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIsSMdHZyxaVcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuY2lzZWxuaWtDdHZydGkoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49PnZhbHVlLml4cF9kZW4sbW9kZWwudHlwX3BobD0+dmFsdWUudHlwX3BobCxtb2RlbC5kZHBfY3R2cnQ9dmFsdWUuZGRwX2N0dnJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ0eXBfcGhsXCIsIFwidHlwX3BobFwiLCB0cnVlLCBmYWxzZSwgdGhpcy5lbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCBcIml4cF9kZW5cIiwgdHJ1ZSwgZmFsc2UsIHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHVmF6YnlSYWRrdUFDdHZydGlaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWYXpieVJhZGt1QUN0dnJ0aUR0byA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyB0aGF0LmlzbC5WYXpieVJhZGt1QUN0dnJ0aS51cGRhdGUocmVxKSA6IHRoYXQuaXNsLlZhemJ5UmFka3VBQ3R2cnRpLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
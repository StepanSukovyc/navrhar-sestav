"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GCiselnikRadku.ts                      </Name>
//    <Description> Číselník řádků                                              </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-13                                                  </Created>
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
            let GCiselnikRadku = class GCiselnikRadku extends Gordic.GContentBase {
                onContentReady() {
                    this.title = `Číselník řádků`;
                    this.createActions();
                    //this.setBreadcrumbs([{
                    //    caption: this.title,
                    //    action: this.actions["actGCiselnikRadkuZavritPotomky"]
                    //}]);
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
                        .addField("gnumberbox", { name: "ddp_radek", emptyValue: null, disabled: this.editMode })
                        .addRow({ label: "Název", required: true })
                        .addField("gstringbox", { name: "nazev" })
                        .addRow("Poznámka")
                        .addField("gstringbox", { name: "poznamka" });
                    this.defaultForm = $.newDiv()
                        .appendTo(this.element)
                        .gform("createFrom", form);
                    this.defaultForm.findFields().gfield("model", "apply", this.data);
                    this.defaultForm.findFields().gfield("model", "validators", this.validators);
                }
                createActions() {
                    this.actions.addRange([{
                            name: "actGCiselnikRadkuZavritPotomky",
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
                        let task = this.editMode ? that.isl.CiselnikRadku.update(req) : that.isl.CiselnikRadku.create(req);
                        WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                    }
                }
            };
            GCiselnikRadku = __decorate([
                Decorators.gcontent
            ], GCiselnikRadku);
            WebClient.GCiselnikRadku = GCiselnikRadku;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Npc2VsbmlrUmFka3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQ2lzZWxuaWtSYWRrdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWlGZjtBQWpGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpRm5CO0lBakZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpRjdCO1FBakZvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFLNUMsY0FBYztvQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO29CQUM5QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUMxQiw0REFBNEQ7b0JBQzVELE1BQU07b0JBRU4sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lCQUMzRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDMUMsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzVDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSw2QkFBNkI7d0JBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtxQkFDMUIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVB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Q0FBQyxDQUFDO3dCQUNuRyxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3hELENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUE3RVksY0FBYztnQkFEMUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxjQUFjLENBNkUxQjtZQTdFWSx3QkFBYyxpQkE2RTFCLENBQUE7UUFDTCxDQUFDLEVBakZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpRjdCO0lBQUQsQ0FBQyxFQWpGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaUZuQjtBQUFELENBQUMsRUFqRlMsTUFBTSxLQUFOLE1BQU0sUUFpRmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0Npc2VsbmlrUmFka3UudHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IMSMw61zZWxuw61rIMWZw6Fka8WvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTExLTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Npc2VsbmlrUmFka3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HQ2lzZWxuaWtSYWRrdUR0bztcclxuICAgICAgICBlZGl0TW9kZTogYm9vbGVhbjtcclxuICAgICAgICB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYMSMw61zZWxuw61rIMWZw6Fka8WvYDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa1JhZGt1WmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICAvL31dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJLbmloYVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5rbmloYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUG9obGVkw6F2a2FcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QudHlwUG9obGVkYXZreSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHBfZGVuXCIsIFwiaXhwX2RlblwiLCB0cnVlLCBmYWxzZSwgdGhpcy5lbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwixZjDoWRla1wiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwiZGRwX3JhZGVrXCIsIGVtcHR5VmFsdWU6IG51bGwsIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiTsOhemV2XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJuYXpldlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3puYW1rYVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlrUmFka3VaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HQ2lzZWxuaWtSYWRrdUR0byA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyB0aGF0LmlzbC5DaXNlbG5pa1JhZGt1LnVwZGF0ZShyZXEpIDogdGhhdC5pc2wuQ2lzZWxuaWtSYWRrdS5jcmVhdGUocmVxKTtcclxuICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZSh0YXNrLmdldCgpLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
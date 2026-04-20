"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GGenerovaniUPO.ts                      </Name>
//    <Description> Generování UPO                                              </Description>
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
                    let GGenerovaniUPO = class GGenerovaniUPO extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Generování UPO`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGGenerovaniUPOZavritPotomky"]
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
                                .addRow({ label: "Rok", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.rok(), {
                                model: "model.rok=value.rok",
                                disabled: this.editMode
                            })
                                .addRow({ label: "IČ Organizace", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosico(), {
                                name: "ico",
                                model: "model.ico=value.ico",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Účetní středisko", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), {
                                name: "ucs",
                                model: "model.ucs=value.ucs;model.ico=value.ico",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Kategorie pohybu", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                name: "ktg_upo",
                                model: "model.ktg_upo=value.ktg_upo",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow()
                                .addField("gcheck", {
                                name: "priz_gen_upo",
                                label: "Generovat účetní pohyby",
                                emptyValue: null,
                                modelValueTransform: {
                                    apply: function (modelValue) { return modelValue === 1; },
                                    collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "apply", this.data);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGGenerovaniUPOZavritPotomky",
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
                                let task = this.editMode ? that.isl.GenerovaniUPO.update(req) : that.isl.GenerovaniUPO.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GGenerovaniUPO = __decorate([
                        Decorators.gcontent
                    ], GGenerovaniUPO);
                    Ciselniky.GGenerovaniUPO = GGenerovaniUPO;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0dlbmVyb3ZhbmlVUE8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHR2VuZXJvdmFuaVVQTy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQTRHZjtBQTVHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0R25CO0lBNUdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0RzdCO1FBNUdvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0E0R3RDO1lBNUc4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxTQUFTLENBNEdoRDtnQkE1R3VDLFdBQUEsU0FBUztvQkFFN0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTt3QkFPNUMsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDOzRCQUM5QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO29DQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQztpQ0FDekQsQ0FBQyxDQUFDLENBQUM7NEJBRUosSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUNsQixVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ2hGLENBQUM7d0JBRU8sVUFBVTs0QkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7aUNBQzNELE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7aUNBQ25ELFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFO2dDQUNuRCxJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUsNkJBQTZCO2dDQUNwQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0NBQ3ZCLGFBQWEsRUFBRTtvQ0FDWCxRQUFRLEVBQUUsR0FBRztpQ0FDaEI7Z0NBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNoQixVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7Z0NBQ3BGLENBQUM7NkJBQ0osQ0FBQztpQ0FDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDeEMsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0NBQzFDLEtBQUssRUFBRSxxQkFBcUI7Z0NBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTs2QkFDMUIsQ0FBQztpQ0FDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDbEQsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0NBQzlDLElBQUksRUFBRSxLQUFLO2dDQUNYLEtBQUssRUFBRSxxQkFBcUI7Z0NBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQ0FDdkIsUUFBUSxFQUFFLElBQUk7NkJBQ2pCLENBQUM7aUNBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDckQsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0NBQzlDLElBQUksRUFBRSxLQUFLO2dDQUNYLEtBQUssRUFBRSx5Q0FBeUM7Z0NBQ2hELFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQ0FDdkIsUUFBUSxFQUFFLElBQUk7NkJBQ2pCLENBQUM7aUNBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDckQsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0NBQzlDLElBQUksRUFBRSxTQUFTO2dDQUNmLEtBQUssRUFBRSw2QkFBNkI7Z0NBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQ0FDdkIsUUFBUSxFQUFFLElBQUk7NkJBQ2pCLENBQUM7aUNBQ0QsTUFBTSxFQUFFO2lDQUNSLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2hCLElBQUksRUFBRSxjQUFjO2dDQUNwQixLQUFLLEVBQUUseUJBQXlCO2dDQUNoQyxVQUFVLEVBQUUsSUFBSTtnQ0FDaEIsbUJBQW1CLEVBQUU7b0NBQ2pCLEtBQUssRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN6RCxPQUFPLEVBQUUsVUFBVSxVQUFVLElBQUksT0FBTyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBQ3pFOzZCQUNKLENBQUMsQ0FBQzs0QkFFUCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7aUNBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lDQUN0QixLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUUvQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ2pGLENBQUM7d0JBRU8sYUFBYTs0QkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDbkIsSUFBSSxFQUFFLGdDQUFnQztvQ0FDdEMsR0FBRyxFQUFFLEdBQUcsRUFBRTt3Q0FDTixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQ0FDbkMsQ0FBQztpQ0FDSixDQUFDLENBQUMsQ0FBQzt3QkFDUixDQUFDO3dCQUVELEVBQUU7NEJBQ0UsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2dDQUNuQyxPQUFPO2lDQUNOLENBQUM7Z0NBRUYsSUFBSSxHQUFHLEdBQWtELElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ25FLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBRS9ELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFO29DQUNYLE9BQU87d0NBQ0gsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtxQ0FDcEIsQ0FBQztnQ0FDTixDQUFDLENBQUM7Z0NBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ25HLFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDeEQsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUE7b0JBekdZLGNBQWM7d0JBRDFCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLGNBQWMsQ0F5RzFCO29CQXpHWSx3QkFBYyxpQkF5RzFCLENBQUE7Z0JBQ0wsQ0FBQyxFQTVHdUMsU0FBUyxHQUFULGtCQUFTLEtBQVQsa0JBQVMsUUE0R2hEO1lBQUQsQ0FBQyxFQTVHOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUE0R3RDO1FBQUQsQ0FBQyxFQTVHb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNEc3QjtJQUFELENBQUMsRUE1R2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRHbkI7QUFBRCxDQUFDLEVBNUdTLE1BQU0sS0FBTixNQUFNLFFBNEdmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdHZW5lcm92YW5pVVBPLnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHZW5lcm92w6Fuw60gVVBPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAyLTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0dlbmVyb3ZhbmlVUE8gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlVUE9EdG87XHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgICAgICAgdmFsaWRhdG9yczogYW55O1xyXG4gICAgICAgIEl4cERlbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBHZW5lcm92w6Fuw60gVVBPYDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdHZW5lcm92YW5pVVBPWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UubmFzdGF2ZW5pUG9sZUt0Z1Vwbyh0aGlzLCB0aGlzLkl4cERlbiwgdGhpcy5kYXRhLnR5cF9waGwgPz8gXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCBwb2hsZWTDoXZreVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQaGxTaW1wbGUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5ha3R1YWxpem92YXRQb2xlS3RnVXBvKHRoaXMsIHRoaXMuSXhwRGVuLCBvYmoudmFsdWU/LnR5cF9waGwgPz8gXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJSb2tcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qucm9rKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5yb2s9dmFsdWUucm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiScSMIE9yZ2FuaXphY2VcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc2ljbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIsOaxI1ldG7DrSBzdMWZZWRpc2tvXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmVrb3N1Y3MoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudWNzPXZhbHVlLnVjczttb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkthdGVnb3JpZSBwb2h5YnVcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9nZW5fdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiR2VuZXJvdmF0IMO6xI1ldG7DrSBwb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHR2VuZXJvdmFuaVVQT1phdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdHZW5lcm92YW5pVVBPRHRvID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy5lZGl0TW9kZSA/IHRoYXQuaXNsLkdlbmVyb3ZhbmlVUE8udXBkYXRlKHJlcSkgOiB0aGF0LmlzbC5HZW5lcm92YW5pVVBPLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
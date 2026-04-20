"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberTypuPohledavky.ts                </Name>
//    <Description> Výběr typu pohledávky                                       </Description>
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
                    let GVyberTypuPohledavky = class GVyberTypuPohledavky extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Výběr typu pohledávky`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGVyberTypuPohledavkyZavritPotomky"]
                                }]);
                            this.createForm();
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Pohledávka", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                                name: "typ_phl",
                                model: "model.typ_phl=value.typ_phl",
                                serverFilters: {
                                    typ_phl: {
                                        o: "!=",
                                        v: this.typ_phl
                                    }
                                },
                                validators: [new Gordic.Validators.Required()]
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGVyberTypuPohledavkyZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ok() {
                            if (!this.defaultForm.gform("isValid"))
                                return;
                            this.close(this.findFields("typ_phl").gfield("getValue"));
                        }
                    };
                    GVyberTypuPohledavky = __decorate([
                        Decorators.gcontent
                    ], GVyberTypuPohledavky);
                    Ciselniky.GVyberTypuPohledavky = GVyberTypuPohledavky;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyVHlwdVBvaGxlZGF2a3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJUeXB1UG9obGVkYXZreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXNEZjtBQXRERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzRG5CO0lBdERnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzRDdCO1FBdERvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0FzRHRDO1lBdEQ4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxTQUFTLENBc0RoRDtnQkF0RHVDLFdBQUEsU0FBUztvQkFHN0MsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7d0JBSWxELGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQzs0QkFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0NBQXNDLENBQUM7aUNBQy9ELENBQUMsQ0FBQyxDQUFDOzRCQUVKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQzt3QkFFTyxVQUFVOzRCQUNkLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQztpQ0FDM0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7aUNBQy9DLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dDQUNwRCxJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUsNkJBQTZCO2dDQUNwQyxhQUFhLEVBQUU7b0NBQ1gsT0FBTyxFQUFFO3dDQUNMLENBQUMsRUFBRSxJQUFJO3dDQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTztxQ0FDbEI7aUNBQ0o7Z0NBQ0QsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDOzZCQUNqRCxDQUFDLENBQUM7NEJBRVAsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2lDQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQ0FDdEIsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbkMsQ0FBQzt3QkFFTyxhQUFhOzRCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29DQUNuQixJQUFJLEVBQUUsc0NBQXNDO29DQUM1QyxHQUFHLEVBQUUsR0FBRyxFQUFFO3dDQUNOLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO29DQUNuQyxDQUFDO2lDQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUNSLENBQUM7d0JBRUQsRUFBRTs0QkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2dDQUNuQyxPQUFPOzRCQUVYLElBQUksQ0FBQyxLQUFLLENBQWdELElBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQzlHLENBQUM7cUJBQ0osQ0FBQTtvQkFsRFksb0JBQW9CO3dCQURoQyxVQUFVLENBQUMsUUFBUTt1QkFDUCxvQkFBb0IsQ0FrRGhDO29CQWxEWSw4QkFBb0IsdUJBa0RoQyxDQUFBO2dCQUNMLENBQUMsRUF0RHVDLFNBQVMsR0FBVCxrQkFBUyxLQUFULGtCQUFTLFFBc0RoRDtZQUFELENBQUMsRUF0RDhCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBc0R0QztRQUFELENBQUMsRUF0RG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXNEN0I7SUFBRCxDQUFDLEVBdERnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzRG5CO0FBQUQsQ0FBQyxFQXREUyxNQUFNLEtBQU4sTUFBTSxRQXNEZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJUeXB1UG9obGVkYXZreS50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVsO9YsSbciB0eXB1IHBvaGxlZMOhdmt5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDEtMjggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5YmVyVHlwdVBvaGxlZGF2a3kgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYFbDvWLEm3IgdHlwdSBwb2hsZWTDoXZreWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHVnliZXJUeXB1UG9obGVkYXZreVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlBvaGxlZMOhdmthXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbzogXCIhPVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdjogdGhpcy50eXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHVnliZXJUeXB1UG9obGVkYXZreVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbG9zZSg8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPnRoaXMhLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
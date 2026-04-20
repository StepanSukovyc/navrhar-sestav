"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadPoukazPozadavek.ts              </Name>
//    <Description> Požadavek poukazu případu                                   </Description>
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
            var Controls;
            (function (Controls) {
                var Pripady;
                (function (Pripady) {
                    let GPripadPoukazPozadavek = class GPripadPoukazPozadavek extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Požadavek na založení poukazu`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPripadPoukazPozadavekZavritPotomky"]
                                }]);
                            let req = Gordic.Isl.PripadPoukazPozadavek.read(rq => {
                                return {
                                    data: {
                                        ixs_ste: this.IxsSte,
                                        id_tem: this.IdTem
                                    }
                                };
                            }).get();
                            this.createForm();
                            req.done((data) => {
                                this.defaultForm.findFields().gfield("model", "apply", data.data);
                                this.defaultForm.findFields().gfield("model", "validators", this.validators);
                            });
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Šablona", required: true })
                                .addField("gstringbox", {
                                name: "ixs_ste",
                                disabled: this.editMode
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPripadPoukazPozadavekZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                    };
                    GPripadPoukazPozadavek = __decorate([
                        Decorators.gcontent
                    ], GPripadPoukazPozadavek);
                    Pripady.GPripadPoukazPozadavek = GPripadPoukazPozadavek;
                })(Pripady = Controls.Pripady || (Controls.Pripady = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFBvdWthelBvemFkYXZlay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmlwYWRQb3VrYXpQb3phZGF2ZWsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0EwRGY7QUExREQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMERuQjtJQTFEZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMEQ3QjtRQTFEb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBMER0QztZQTFEOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsT0FBTyxDQTBEOUM7Z0JBMUR1QyxXQUFBLE9BQU87b0JBRTNDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO3dCQVFwRCxjQUFjOzRCQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsK0JBQStCLENBQUM7NEJBQzdDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29DQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0NBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO2lDQUNqRSxDQUFDLENBQUMsQ0FBQzs0QkFFSixJQUFJLEdBQUcsR0FBRyxPQUFBLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0NBQzFDLE9BQU87b0NBQ0gsSUFBSSxFQUFFO3dDQUNGLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTt3Q0FDcEIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO3FDQUNyQjtpQ0FDSixDQUFDOzRCQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUVULElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFFbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNkLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNuRSxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDbEYsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQzt3QkFFTyxVQUFVOzRCQUNkLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQztpQ0FDM0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7aUNBQzVDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQ3BCLElBQUksRUFBRSxTQUFTO2dDQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTs2QkFDMUIsQ0FBQyxDQUFDOzRCQUVQLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztpQ0FDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUNBQ3RCLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUM7d0JBR08sYUFBYTs0QkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDbkIsSUFBSSxFQUFFLHdDQUF3QztvQ0FDOUMsR0FBRyxFQUFFLEdBQUcsRUFBRTt3Q0FDTixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQ0FDbkMsQ0FBQztpQ0FDSixDQUFDLENBQUMsQ0FBQzt3QkFDUixDQUFDO3FCQUNKLENBQUE7b0JBdkRZLHNCQUFzQjt3QkFEbEMsVUFBVSxDQUFDLFFBQVE7dUJBQ1Asc0JBQXNCLENBdURsQztvQkF2RFksOEJBQXNCLHlCQXVEbEMsQ0FBQTtnQkFDTCxDQUFDLEVBMUR1QyxPQUFPLEdBQVAsZ0JBQU8sS0FBUCxnQkFBTyxRQTBEOUM7WUFBRCxDQUFDLEVBMUQ4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQTBEdEM7UUFBRCxDQUFDLEVBMURvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEwRDdCO0lBQUQsQ0FBQyxFQTFEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMERuQjtBQUFELENBQUMsRUExRFMsTUFBTSxLQUFOLE1BQU0sUUEwRGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZFBvdWthelBvemFkYXZlay50cyAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFBvxb5hZGF2ZWsgcG91a2F6dSBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMTEtMTUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlByaXBhZHkge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJpcGFkUG91a2F6UG96YWRhdmVrIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgSXhzU3RlOiBzdHJpbmc7XHJcbiAgICAgICAgSWRUZW06IHN0cmluZztcclxuXHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgICAgICAgdmFsaWRhdG9yczogYW55O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBQb8W+YWRhdmVrIG5hIHphbG/FvmVuw60gcG91a2F6dWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUHJpcGFkUG91a2F6UG96YWRhdmVrWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxID0gSXNsLlByaXBhZFBvdWthelBvemFkYXZlay5yZWFkKHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc3RlOiB0aGlzLkl4c1N0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRfdGVtOiB0aGlzLklkVGVtXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwixaBhYmxvbmFcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3N0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRQb3VrYXpQb3phZGF2ZWtaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
"use strict";
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
                    let GPripadOpravnaPolozka = class GPripadOpravnaPolozka extends Gordic.GContentBase {
                        onContentReady() {
                            let form = new Gordic.Forms.Form({ tabLabel: "" });
                            form.addSection()
                                // TODO add names
                                .addRow().addText("Identifikátor").addField("gstringbox", {
                                name: "ixp",
                                disabled: true
                            })
                                .addRow().addText("řádek").addField("gnumberbox", {
                                name: "",
                                disabled: true
                            })
                                .addRow().addText("Datum vzniku").addField("gdatebox", {
                                name: ""
                            })
                                .addRow().addText("Částka").addField("gnumberbox", {
                                name: ""
                            })
                                .addRow().addText("Poznámka").addField("gstringbox", {
                                name: ""
                            })
                                .addRow().addText("Popis").addField("gstringbox", {
                                name: ""
                            })
                                .addRow().addText("Kategorie pohybu").addField("gselectbox", {
                                name: ""
                            });
                            $("<div>").appendTo(this.element).gform("createFrom", form);
                        }
                        //TODO: cct_ex_base: tbl_opravne_polozky                 !opravne polozky
                        //! místop v guptě kde to najdu !!!!!!
                        ok() {
                            const forms = this.element.findForms();
                            const fields = [""];
                            const data = {};
                            fields.forEach((field) => {
                                data[field] = forms.findFields(field)
                                    .gfield("getValue")[field];
                            });
                            this.beginOperation("Proběhlo ukládání symbolu");
                            /*
                             * TODO ako ulo�i� data?
                            Common.Base.ProcessResponse(
                                Isl.Pripad.save(_rq => ({
                                    rq: { Data: data }
                                })).get(),
                            this)
                            */
                        }
                    };
                    GPripadOpravnaPolozka = __decorate([
                        Decorators.gcontent
                    ], GPripadOpravnaPolozka);
                    Pripady.GPripadOpravnaPolozka = GPripadOpravnaPolozka;
                })(Pripady = Controls.Pripady || (Controls.Pripady = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZE9wcmF2bmFQb2xvemthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZE9wcmF2bmFQb2xvemthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E4RGY7QUE5REQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOERuQjtJQTlEZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOEQ3QjtRQTlEb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBOER0QztZQTlEOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsT0FBTyxDQThEOUM7Z0JBOUR1QyxXQUFBLE9BQU87b0JBRTNDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsT0FBQSxZQUFZO3dCQUNuRCxjQUFjOzRCQUNWLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQ0FDYixpQkFBaUI7aUNBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO2dDQUN0RCxJQUFJLEVBQUUsS0FBSztnQ0FDWCxRQUFRLEVBQUUsSUFBSTs2QkFDakIsQ0FBQztpQ0FDRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtnQ0FDOUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsUUFBUSxFQUFFLElBQUk7NkJBQ2pCLENBQUM7aUNBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0NBQ25ELElBQUksRUFBRSxFQUFFOzZCQUNYLENBQUM7aUNBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQy9DLElBQUksRUFBRSxFQUFFOzZCQUNYLENBQUM7aUNBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQ2pELElBQUksRUFBRSxFQUFFOzZCQUNYLENBQUM7aUNBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQzlDLElBQUksRUFBRSxFQUFFOzZCQUNYLENBQUM7aUNBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtnQ0FDekQsSUFBSSxFQUFFLEVBQUU7NkJBQ1gsQ0FBQyxDQUFBOzRCQUVOLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2hFLENBQUM7d0JBRUQseUVBQXlFO3dCQUN6RSxzQ0FBc0M7d0JBR3RDLEVBQUU7NEJBQ0UsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFFdkMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFFcEIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUVoQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0NBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztxQ0FDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNuQyxDQUFDLENBQUMsQ0FBQTs0QkFFRixJQUFJLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7NEJBRWpEOzs7Ozs7OzhCQU9FO3dCQUNOLENBQUM7cUJBQ0osQ0FBQTtvQkEzRFkscUJBQXFCO3dCQURqQyxVQUFVLENBQUMsUUFBUTt1QkFDUCxxQkFBcUIsQ0EyRGpDO29CQTNEWSw2QkFBcUIsd0JBMkRqQyxDQUFBO2dCQUNMLENBQUMsRUE5RHVDLE9BQU8sR0FBUCxnQkFBTyxLQUFQLGdCQUFPLFFBOEQ5QztZQUFELENBQUMsRUE5RDhCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBOER0QztRQUFELENBQUMsRUE5RG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQThEN0I7SUFBRCxDQUFDLEVBOURnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE4RG5CO0FBQUQsQ0FBQyxFQTlEUyxNQUFNLEtBQU4sTUFBTSxRQThEZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmlwYWR5IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByaXBhZE9wcmF2bmFQb2xvemthIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJcIiB9KTtcclxuICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gYWRkIG5hbWVzXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkVGV4dChcIklkZW50aWZpa8OhdG9yXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRUZXh0KFwixZnDoWRla1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkVGV4dChcIkRhdHVtIHZ6bmlrdVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZFRleHQoXCLEjMOhc3RrYVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkVGV4dChcIlBvem7DoW1rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkVGV4dChcIlBvcGlzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRUZXh0KFwiS2F0ZWdvcmllIHBvaHlidVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1RPRE86IGNjdF9leF9iYXNlOiB0Ymxfb3ByYXZuZV9wb2xvemt5ICAgICAgICAgICAgICAgICAhb3ByYXZuZSBwb2xvemt5XHJcbiAgICAgICAgLy8hIG3DrXN0b3AgdiBndXB0xJsga2RlIHRvIG5hamR1ICEhISEhIVxyXG5cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1zID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcygpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmllbGRzID0gW1wiXCJdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ZpZWxkXSA9IGZvcm1zLmZpbmRGaWVsZHMoZmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcImdldFZhbHVlXCIpW2ZpZWxkXTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJQcm9ixJtobG8gdWtsw6Fkw6Fuw60gc3ltYm9sdVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIFRPRE8gYWtvIHVsb++/vWnvv70gZGF0YT9cclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKFxyXG4gICAgICAgICAgICAgICAgSXNsLlByaXBhZC5zYXZlKF9ycSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGRhdGEgfVxyXG4gICAgICAgICAgICAgICAgfSkpLmdldCgpLFxyXG4gICAgICAgICAgICB0aGlzKVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
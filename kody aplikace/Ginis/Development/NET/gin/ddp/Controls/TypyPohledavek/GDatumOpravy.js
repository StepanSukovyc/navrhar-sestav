"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDatumOpravy.ts                        </Name>
//    <Description> Datum opravy                                                </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var TypyPohledavek;
                (function (TypyPohledavek) {
                    let GDatumOpravy = class GDatumOpravy extends Gordic.GContentBase {
                        onContentReady() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow("Datum")
                                .addField("gdatebox", {
                                name: "datum",
                                validators: [new Gordic.Validators.Required()]
                            })
                                .addRow()
                                .addField("gcheck", {
                                name: "odlozene",
                                label: "Odložené zpracování"
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                        }
                        ok() {
                            if (this.defaultForm.gform("isValid")) {
                                let dto = {};
                                this.defaultForm.findFields().gfield("model", "collect", dto);
                                this.close(dto);
                            }
                        }
                    };
                    GDatumOpravy = __decorate([
                        Decorators.gcontent
                    ], GDatumOpravy);
                    TypyPohledavek.GDatumOpravy = GDatumOpravy;
                })(TypyPohledavek = Controls.TypyPohledavek || (Controls.TypyPohledavek = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdHVtT3ByYXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdHVtT3ByYXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBOEJmO0FBOUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThCbkI7SUE5QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThCN0I7UUE5Qm9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQThCdEM7WUE5QjhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLGNBQWMsQ0E4QnJEO2dCQTlCdUMsV0FBQSxjQUFjO29CQUVsRCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO3dCQUMxQyxjQUFjOzRCQUVWLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQztpQ0FDM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQ0FDZixRQUFRLENBQUMsVUFBVSxFQUFFO2dDQUNsQixJQUFJLEVBQUUsT0FBTztnQ0FDYixVQUFVLEVBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQ2hELENBQUM7aUNBQ0QsTUFBTSxFQUFFO2lDQUNSLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2hCLElBQUksRUFBRSxVQUFVO2dDQUNoQixLQUFLLEVBQUUscUJBQXFCOzZCQUMvQixDQUFDLENBQUM7NEJBRVAsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2lDQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQ0FDdEIsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbkMsQ0FBQzt3QkFFRCxFQUFFOzRCQUNFLElBQUksSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQ0FDckMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dDQUNiLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3BCLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFBO29CQTNCWSxZQUFZO3dCQUR4QixVQUFVLENBQUMsUUFBUTt1QkFDUCxZQUFZLENBMkJ4QjtvQkEzQlksMkJBQVksZUEyQnhCLENBQUE7Z0JBQ0wsQ0FBQyxFQTlCdUMsY0FBYyxHQUFkLHVCQUFjLEtBQWQsdUJBQWMsUUE4QnJEO1lBQUQsQ0FBQyxFQTlCOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUE4QnRDO1FBQUQsQ0FBQyxFQTlCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOEI3QjtJQUFELENBQUMsRUE5QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThCbkI7QUFBRCxDQUFDLEVBOUJTLE1BQU0sS0FBTixNQUFNLFFBOEJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEYXR1bU9wcmF2eS50cyAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEYXR1bSBvcHJhdnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAxLTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlayB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXR1bU9wcmF2eSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOltuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvZGxvemVuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk9kbG/FvmVuw6kgenByYWNvdsOhbsOtXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZShkdG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberVseNeboVybrane.ts                </Name>
//    <Description> Okno pro výběr druhu kontroly (finanční, účetní)            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-09-18                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Vratky;
                (function (Vratky) {
                    let GVyberVseNeboVybrane = class GVyberVseNeboVybrane extends Gordic.GContentBase {
                        constructor() {
                            super(...arguments);
                            this.validateOtherField = true;
                        }
                        onContentReady() {
                            this.title = `Výběr typu kontroly`;
                            this.setBreadcrumbs([{
                                    caption: this.title
                                }]);
                            this.form = $("<div>").appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formx", layoutDescriptor: "L1M1S1" })
                                .addSection("Vyberte prosím, kterou z kontrol bude chtít provést")
                            //.addRow("ÚPčetní").addField("gdatebox", {
                            //    name: "datum_od",
                            //    //validators: validators
                            //})
                            //.addRow("Do").addField("gdatebox", {
                            //    name: "datum_do",
                            //    //validators: validators
                            //})
                            );
                            //this.form.findFields("datum_od", "datum_do").gfield("model", "apply", { datum_od: this.DatumOd, datum_do: this.DatumDo });
                        }
                        ok() {
                            let retVal = this.retVal;
                            this.close({ retVal });
                            /*
                            //if (this.form.gform("isValid")) {
                            //    let datum_od = new Date(this.form.findFields("datum_od").gfield("getValue"));
                            //    let datum_do = new Date(this.form.findFields("datum_do").gfield("getValue"));
                            //    this.close({ datum_od, datum_do });
                            //}
                            */
                        }
                    };
                    GVyberVseNeboVybrane = __decorate([
                        Decorators.gcontent
                    ], GVyberVseNeboVybrane);
                    Vratky.GVyberVseNeboVybrane = GVyberVseNeboVybrane;
                })(Vratky = Controls.Vratky || (Controls.Vratky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyVnNlTmVib1Z5YnJhbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJWc2VOZWJvVnlicmFuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQStDZjtBQS9DRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErQ25CO0lBL0NnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErQzdCO1FBL0NvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0ErQ3RDO1lBL0M4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxNQUFNLENBK0M3QztnQkEvQ3VDLFdBQUEsTUFBTTtvQkFFMUMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7d0JBQXREOzs0QkFFWSx1QkFBa0IsR0FBWSxJQUFJLENBQUM7d0JBMEMvQyxDQUFDO3dCQXJDRyxjQUFjOzRCQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7NEJBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO2lDQUN0QixDQUFDLENBQUMsQ0FBQzs0QkFHSixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzVELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO2lDQUMvRCxVQUFVLENBQUMscURBQXFELENBQUM7NEJBQ2xFLDJDQUEyQzs0QkFDM0MsdUJBQXVCOzRCQUN2Qiw4QkFBOEI7NEJBQzlCLElBQUk7NEJBQ0osc0NBQXNDOzRCQUN0Qyx1QkFBdUI7NEJBQ3ZCLDhCQUE4Qjs0QkFDOUIsSUFBSTs2QkFDSCxDQUFDOzRCQUVWLDRIQUE0SDt3QkFFaEksQ0FBQzt3QkFJRCxFQUFFOzRCQUNFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7NEJBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUN2Qjs7Ozs7OzhCQU1FO3dCQUNOLENBQUM7cUJBQ0osQ0FBQTtvQkE1Q1ksb0JBQW9CO3dCQURoQyxVQUFVLENBQUMsUUFBUTt1QkFDUCxvQkFBb0IsQ0E0Q2hDO29CQTVDWSwyQkFBb0IsdUJBNENoQyxDQUFBO2dCQUNMLENBQUMsRUEvQ3VDLE1BQU0sR0FBTixlQUFNLEtBQU4sZUFBTSxRQStDN0M7WUFBRCxDQUFDLEVBL0M4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQStDdEM7UUFBRCxDQUFDLEVBL0NvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErQzdCO0lBQUQsQ0FBQyxFQS9DZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK0NuQjtBQUFELENBQUMsRUEvQ1MsTUFBTSxLQUFOLE1BQU0sUUErQ2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyVnNlTmVib1Z5YnJhbmUudHMgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHbDvWLEm3IgZHJ1aHUga29udHJvbHkgKGZpbmFuxI1uw60sIMO6xI1ldG7DrSkgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTA5LTE4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WcmF0a3kge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJWc2VOZWJvVnlicmFuZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVPdGhlckZpZWxkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcmV0VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYFbDvWLEm3IgdHlwdSBrb250cm9seWA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGVcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JteFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJWeWJlcnRlIHByb3PDrW0sIGt0ZXJvdSB6IGtvbnRyb2wgYnVkZSBjaHTDrXQgcHJvdsOpc3RcIilcclxuICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCLDmlDEjWV0bsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGF0dW1fb2RcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3ZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiRG9cIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYXR1bV9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdmFsaWRhdG9yczogdmFsaWRhdG9yc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmZvcm0uZmluZEZpZWxkcyhcImRhdHVtX29kXCIsIFwiZGF0dW1fZG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGRhdHVtX29kOiB0aGlzLkRhdHVtT2QsIGRhdHVtX2RvOiB0aGlzLkRhdHVtRG8gfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgbGV0IHJldFZhbCA9IHRoaXMucmV0VmFsO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHsgcmV0VmFsIH0pO1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAvL2lmICh0aGlzLmZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGxldCBkYXR1bV9vZCA9IG5ldyBEYXRlKHRoaXMuZm9ybS5maW5kRmllbGRzKFwiZGF0dW1fb2RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpO1xyXG4gICAgICAgICAgICAvLyAgICBsZXQgZGF0dW1fZG8gPSBuZXcgRGF0ZSh0aGlzLmZvcm0uZmluZEZpZWxkcyhcImRhdHVtX2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpKTtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5jbG9zZSh7IGRhdHVtX29kLCBkYXR1bV9kbyB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
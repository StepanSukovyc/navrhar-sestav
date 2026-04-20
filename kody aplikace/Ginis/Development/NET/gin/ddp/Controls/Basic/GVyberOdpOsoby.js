"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberOdpOsoby.ts                      </Name>
//    <Description> Okno pro výrěb odpovědné osoby                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-02-10                                                  </Created>
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
            let GVyberOdpOsoby = class GVyberOdpOsoby extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = `Výběr odpovědné osoby`;
                    that.createMainButtons();
                    that.createForm();
                    //that.element.gform("waitForValues").done(() => {
                    //    that.findForms().findFields("ixs_ref_odp").gfield("model", "apply", { ixs_ref: that.IxsRefOdp });
                    //})
                }
                createForm() {
                    const that = this;
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formVyberOdpOsoby", layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addSection("Odpovědná osoba")
                        .addRow()
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
                        name: "ixs_ref_odp",
                        model: "model.ixs_ref_odp=value.ixs_ref",
                        itemTemplate: "{nazev:trim:encode} ({ixs_ref})",
                        dropdown: true,
                        initialValue: { ixs_ref: that.IxsRefOdp }
                    }));
                }
                //** Metoda sloužící pro potvrzení operace */
                ok() {
                    const that = this;
                    //if (that.form.gform("isValid")) {
                    let ixsRefOdp = that.form.findFields("ixs_ref_odp").gfield("getValue");
                    that.close({ ixs_ref_odp: ixsRefOdp.ixs_ref });
                    //}           
                }
                //* Metoda vytvářející tlačítka okna */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Vybrat",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
            };
            GVyberOdpOsoby = __decorate([
                Decorators.gcontent
            ], GVyberOdpOsoby);
            WebClient.GVyberOdpOsoby = GVyberOdpOsoby;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyT2RwT3NvYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJPZHBPc29ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXdFZjtBQXhFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3RW5CO0lBeEVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3RTdCO1FBeEVvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFVNUMsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7b0JBRXJDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLGtEQUFrRDtvQkFDbEQsdUdBQXVHO29CQUN2RyxJQUFJO2dCQUNSLENBQUM7Z0JBRUQsVUFBVTtvQkFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM1RCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLHFDQUFxQyxFQUFFLENBQUM7eUJBQ3hHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDN0IsTUFBTSxFQUFFO3lCQUNSLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3JELElBQUksRUFBRSxhQUFhO3dCQUNuQixLQUFLLEVBQUUsaUNBQWlDO3dCQUN4QyxZQUFZLEVBQUUsaUNBQWlDO3dCQUMvQyxRQUFRLEVBQUUsSUFBSTt3QkFDZCxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtxQkFDNUMsQ0FBQyxDQUNULENBQUM7Z0JBQ1YsQ0FBQztnQkFFRCw2Q0FBNkM7Z0JBQzdDLEVBQUU7b0JBQ0UsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixtQ0FBbUM7b0JBQy9CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDbkQsY0FBYztnQkFDbEIsQ0FBQztnQkFFRCx1Q0FBdUM7Z0JBQ3ZDLGlCQUFpQjtvQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFFUixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ2xDLENBQUM7d0JBQ0YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsQ0FBQzthQUVKLENBQUE7WUFyRVksY0FBYztnQkFEMUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxjQUFjLENBcUUxQjtZQXJFWSx3QkFBYyxpQkFxRTFCLENBQUE7UUFDTCxDQUFDLEVBeEVvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF3RTdCO0lBQUQsQ0FBQyxFQXhFZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBd0VuQjtBQUFELENBQUMsRUF4RVMsTUFBTSxLQUFOLE1BQU0sUUF3RWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyT2RwT3NvYnkudHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHbDvXLEm2Igb2Rwb3bEm2Ruw6kgb3NvYnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI2LTAyLTEwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJPZHBPc29ieSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIEZvcm11bMOhxZkgKi9cclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTtcclxuXHJcbiAgICAgICAgSXhzUmVmT2RwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIE5rczogc3RyaW5nO1xyXG4gICAgICAgIFJva1BobDogbnVtYmVyO1xyXG4gICAgICAgIERkcFJlek5hYm9kbzogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYFbDvWLEm3Igb2Rwb3bEm2Ruw6kgb3NvYnlgO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNYWluQnV0dG9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5lbGVtZW50Lmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiaXhzX3JlZl9vZHBcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGl4c19yZWY6IHRoYXQuSXhzUmVmT2RwIH0pO1xyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1WeWJlck9kcE9zb2J5XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIk9kcG92xJtkbsOhIG9zb2JhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zcmVmKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3JlZl9vZHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19yZWZfb2RwPXZhbHVlLml4c19yZWZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXY6dHJpbTplbmNvZGV9ICh7aXhzX3JlZn0pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpeHNfcmVmOiB0aGF0Lkl4c1JlZk9kcCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICAgICAgICBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyoqIE1ldG9kYSBzbG91xb7DrWPDrSBwcm8gcG90dnJ6ZW7DrSBvcGVyYWNlICovXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2lmICh0aGF0LmZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXhzUmVmT2RwID0gdGhhdC5mb3JtLmZpbmRGaWVsZHMoXCJpeHNfcmVmX29kcFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBpeHNfcmVmX29kcDogaXhzUmVmT2RwLml4c19yZWYgfSk7XHJcbiAgICAgICAgICAgIC8vfSAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyogTWV0b2RhIHZ5dHbDocWZZWrDrWPDrSB0bGHEjcOtdGthIG9rbmEgKi9cclxuICAgICAgICBjcmVhdGVNYWluQnV0dG9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=
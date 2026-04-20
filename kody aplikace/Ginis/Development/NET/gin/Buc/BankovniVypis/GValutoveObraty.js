"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GValutoveObraty.ts                     </Name>
//    <Description> Content s valutovými obraty bankovního výpisu               </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2024-12-04                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content s valutovými obraty bankovního výpisu*/
            let GValutoveObraty = class GValutoveObraty extends Gordic.GContentBase {
                prepareContent(opts) {
                    $.extend(true, this, opts);
                    this.title = "jres:33600208"; //RC 33600208 : Valutové obraty výpisu
                    this.createGrid();
                    this.createActions();
                    this.createCommandBar();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: {
                            name: "actZavrit",
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        },
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření gridu obratů*/
                createGrid() {
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridValutoveObratyVypisu",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucBankovniVypisPolozka.valutoveObraty({ filters: { ixp: this.ixp } }), {
                            key: ["dat_val"],
                        })
                    });
                    //.gautofit();
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addDateColumn({
                        name: "dat_val",
                        caption: "jres:33600209" //RC 33600209 : Datum
                    }).addCurrencyColumn({
                        name: "obr_deb",
                        caption: "jres:33600210" //RC 33600210 : Obrat debet
                    }).addCurrencyColumn({
                        name: "obr_kre",
                        caption: "jres:33600211" //RC 33600211 : Obrat kredit
                    });
                }
            };
            GValutoveObraty = __decorate([
                Decorators.gcontent
            ], GValutoveObraty);
            WebClient.GValutoveObraty = GValutoveObraty;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ZhbHV0b3ZlT2JyYXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ZhbHV0b3ZlT2JyYXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBaUVmO0FBakVELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWlFbkI7SUFqRWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlFN0I7UUFqRW9CLFdBQUEsU0FBUztZQUUxQixtREFBbUQ7WUFFbkQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBSTdDLGNBQWMsQ0FBQyxJQUFJO29CQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxzQ0FBc0M7b0JBQ3BFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRTs0QkFDUCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs0QkFDM0IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLFVBQVU7b0JBQ2QsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUM1QixLQUFLLENBQStCO3dCQUNqQyxJQUFJLEVBQUUsMEJBQTBCO3dCQUNoQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNoQyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFDL0U7NEJBQ0ksR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO3lCQUNuQixDQUFDO3FCQUNULENBQUMsQ0FBQTtvQkFDRixjQUFjO2dCQUN0QixDQUFDO2dCQUVPLGdCQUFnQjtvQkFDcEIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3lCQUM5QixhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsQ0FBQyxxQkFBcUI7cUJBQ2pELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsQ0FBQywyQkFBMkI7cUJBQ3ZELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsQ0FBQyw0QkFBNEI7cUJBQ3hELENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0osQ0FBQTtZQTVEWSxlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0E0RDNCO1lBNURZLHlCQUFlLGtCQTREM0IsQ0FBQTtRQUNMLENBQUMsRUFqRW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlFN0I7SUFBRCxDQUFDLEVBakVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpRW5CO0FBQUQsQ0FBQyxFQWpFUyxNQUFNLEtBQU4sTUFBTSxRQWlFZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR1ZhbHV0b3ZlT2JyYXR5LnRzICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHMgdmFsdXRvdsO9bWkgb2JyYXR5IGJhbmtvdm7DrWhvIHbDvXBpc3UgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTEyLTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnRcclxue1xyXG4gICAgLyoqIENvbnRlbnQgcyB2YWx1dG92w71taSBvYnJhdHkgYmFua292bsOtaG8gdsO9cGlzdSovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWYWx1dG92ZU9icmF0eSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgLyoqIElkZW50aWZpa8OhdG9yIGJhbmtvdm7DrWhvIHbDvXBpc3UgKi9cclxuICAgICAgICBwdWJsaWMgaXhwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdHMpIHtcclxuICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgdGhpcywgb3B0cyk7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzM2MDAyMDhcIjsgLy9SQyAzMzYwMDIwOCA6IFZhbHV0b3bDqSBvYnJhdHkgdsO9cGlzdVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgb2JyYXTFryovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR1ZhbHV0b3ZlT2JyYXR5RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkVmFsdXRvdmVPYnJhdHlWeXBpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdWYWx1dG92ZU9icmF0eUR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLkJ1Y0Jhbmtvdm5pVnlwaXNQb2xvemthLnZhbHV0b3ZlT2JyYXR5KHsgZmlsdGVyczogeyBpeHA6IHRoaXMuaXhwIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiZGF0X3ZhbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ZhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIwOVwiIC8vUkMgMzM2MDAyMDkgOiBEYXR1bVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2JyX2RlYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIxMFwiIC8vUkMgMzM2MDAyMTAgOiBPYnJhdCBkZWJldFxyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2JyX2tyZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIxMVwiIC8vUkMgMzM2MDAyMTEgOiBPYnJhdCBrcmVkaXRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
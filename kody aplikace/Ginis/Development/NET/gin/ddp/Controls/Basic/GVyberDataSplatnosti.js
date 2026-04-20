"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberDataSplatnosti.ts                </Name>
//    <Description> Okno pro Výběr datumu splatnosti                            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-09-06                                                  </Created>
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
            let GVyberDataSplatnosti = class GVyberDataSplatnosti extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = `Výběr knihy`;
                    that.createMainButtons();
                    that.createForm();
                }
                createForm() {
                    const that = this;
                    //that.form = $.newDiv().appendTo(this.element).gform("createFrom",
                    //    new Gordic.Forms.Form({ name: "formx", layoutDescriptor: "L1M1S1" })
                    //        .addSection("Kniha")
                    //        .addRow()
                    //        .addField("gselectbox", Prefabs.Select.kniha(), {
                    //            name: "ixp_den",
                    //            model: "model.ixp_den=value.ixp_den",
                    //        })
                    //);
                    that.grid = $("<div>").appendTo(this.element)
                        .css("height", "40%")
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                                  
                        columns: WebClient.Common.GridFormats.Popisy(),
                    });
                }
                //** Metoda sloužící pro potvrzení operace */
                ok() {
                    const that = this;
                    //if (that.form.gform("isValid")) {
                    let _datSpl = that.form.findFields("ixp_den").gfield("getValue");
                    that.close({ _datSpl });
                    //}           
                }
                //* Metoda vytvářející tlačítka okna */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Vybrat datum",
                            icon: "fa-floppy-o", //TODO: ?
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
            };
            GVyberDataSplatnosti = __decorate([
                Decorators.gcontent
            ], GVyberDataSplatnosti);
            WebClient.GVyberDataSplatnosti = GVyberDataSplatnosti;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyRGF0YVNwbGF0bm9zdGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJEYXRhU3BsYXRub3N0aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXlFZjtBQXpFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5RW5CO0lBekVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5RTdCO1FBekVvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBUWxELGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxVQUFVO29CQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsbUVBQW1FO29CQUNuRSwwRUFBMEU7b0JBQzFFLDhCQUE4QjtvQkFDOUIsbUJBQW1CO29CQUNuQiwyREFBMkQ7b0JBQzNELDhCQUE4QjtvQkFDOUIsbURBQW1EO29CQUNuRCxZQUFZO29CQUNaLElBQUk7b0JBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3hDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO3lCQUNwQixLQUFLLENBQUM7d0JBQ0gsSUFBSSxFQUFFLEVBQUU7d0JBQ1IsVUFBVSxFQUFFLE1BQU0sRUFBTSw2Q0FBNkM7d0JBQ3JFLFVBQVUsRUFBRSxLQUFLLEVBQU8sWUFBWTt3QkFDcEMsY0FBYyxFQUFFLEtBQUssRUFBRyw4Q0FBOEM7d0JBQ3RFLE9BQU8sRUFBRSxVQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO3FCQUN2QyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCw2Q0FBNkM7Z0JBQzdDLEVBQUU7b0JBQ0UsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixtQ0FBbUM7b0JBQ25DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ3hCLGNBQWM7Z0JBQ2xCLENBQUM7Z0JBRUQsdUNBQXVDO2dCQUN2QyxpQkFBaUI7b0JBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBRVIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLGNBQWM7NEJBQ3ZCLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUzs0QkFDOUIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDbEMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2FBRUosQ0FBQTtZQXRFWSxvQkFBb0I7Z0JBRGhDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asb0JBQW9CLENBc0VoQztZQXRFWSw4QkFBb0IsdUJBc0VoQyxDQUFBO1FBQ0wsQ0FBQyxFQXpFb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeUU3QjtJQUFELENBQUMsRUF6RWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlFbkI7QUFBRCxDQUFDLEVBekVTLE1BQU0sS0FBTixNQUFNLFFBeUVmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdWeWJlckRhdGFTcGxhdG5vc3RpLnRzICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyBWw71ixJtyIGRhdHVtdSBzcGxhdG5vc3RpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDktMDYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWeWJlckRhdGFTcGxhdG5vc3RpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHVibGljIGZvcm06IEpRdWVyeTtcclxuICAgICAgICBwdWJsaWMgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgdmlldztcclxuXHJcbiAgICAgICAgX2l4cERlbjogU3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYFbDvWLEm3Iga25paHlgO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNYWluQnV0dG9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3RoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgLy8gICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JteFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYWRkU2VjdGlvbihcIktuaWhhXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qua25paGEoKSwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjQwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlBvcGlzeSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyoqIE1ldG9kYSBzbG91xb7DrWPDrSBwcm8gcG90dnJ6ZW7DrSBvcGVyYWNlICovXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2lmICh0aGF0LmZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBfZGF0U3BsID0gdGhhdC5mb3JtLmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jbG9zZSh7IF9kYXRTcGwgfSk7XHJcbiAgICAgICAgICAgIC8vfSAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyogTWV0b2RhIHZ5dHbDocWZZWrDrWPDrSB0bGHEjcOtdGthIG9rbmEgKi9cclxuICAgICAgICBjcmVhdGVNYWluQnV0dG9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0IGRhdHVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLCAvL1RPRE86ID9cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=
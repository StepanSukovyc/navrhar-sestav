"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberVymahani.ts                      </Name>
//    <Description> Výběr vymáhání                                              </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Výběr vymáhání
             *
             * @author Vojtěch Čech
             * @date 14.02.2024
             */
            let GVyberVymahani = class GVyberVymahani extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = "Výběr vymáhání";
                    that.taskId = "actGVyberVymahani";
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Vybrat",
                            icon: "fa-floppy-o",
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
                    var filter = {};
                    filter.ixp_nvy = that.ixpNvy;
                    filter.ixp_ddp = that.ixpDdp;
                    filter.hlidat = that.hlidat;
                    that.createGrid();
                    that.beginOperation({ id: "loadVyberVymahani", text: "Načítání dat (Výběr vymáhání)" });
                    that.isl.VymahaniDDP.listVyberVymahani(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", view);
                    }).always(() => {
                        that.endOperation({ id: "loadVyberVymahani" });
                    });
                }
                createGrid() {
                    var that = this;
                    that.grid = $.newDiv().appendTo(that.element).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                        },
                        multi: false,
                        columnMode: "full",
                        name: "grid",
                        columns: WebClient.Common.GridFormats.DilciVymahaniVyber()
                    });
                }
                ok() {
                    var that = this;
                    var ixpNvy = that.grid.ggrid("activeRow").ixp_nvy;
                    this.close({ ixpNvy });
                }
            };
            GVyberVymahani = __decorate([
                Decorators.gcontent
            ], GVyberVymahani);
            WebClient.GVyberVymahani = GVyberVymahani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyVnltYWhhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJWeW1haGFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQWlGZjtBQWpGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpRm5CO0lBakZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpRjdCO1FBakZvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQVE1QyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztvQkFFbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDbEMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsRSxJQUFJLE1BQU0sR0FBUSxFQUFFLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDN0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUM3QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBRTVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsK0JBQStCLEVBQUUsQ0FBQyxDQUFBO29CQUN2RixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FDbEMsR0FBRyxFQUFFO3dCQUNELE9BQU87NEJBQ0gsT0FBTyxFQUFFLE1BQU07eUJBQ2xCLENBQUE7b0JBQ0wsQ0FBQyxDQUNKLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTt3QkFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztvQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxVQUFVO29CQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQzNFLEtBQUssQ0FBQzt3QkFDSCxjQUFjLEVBQUU7NEJBQ1osVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJO3lCQUN4RDt3QkFDRCxLQUFLLEVBQUUsS0FBSzt3QkFDWixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLFVBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRTtxQkFDbkQsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsRUFBRTtvQkFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFpRCxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ2xHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2FBQ0osQ0FBQTtZQXhFWSxjQUFjO2dCQUQxQixVQUFVLENBQUMsUUFBUTtlQUNQLGNBQWMsQ0F3RTFCO1lBeEVZLHdCQUFjLGlCQXdFMUIsQ0FBQTtRQUNMLENBQUMsRUFqRm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlGN0I7SUFBRCxDQUFDLEVBakZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpRm5CO0FBQUQsQ0FBQyxFQWpGUyxNQUFNLEtBQU4sTUFBTSxRQWlGZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJWeW1haGFuaS50cyAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVsO9YsSbciB2eW3DoWjDoW7DrSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAyLTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFbDvWLEm3Igdnltw6Fow6Fuw61cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBWb2p0xJtjaCDEjGVjaFxyXG4gICAgICogQGRhdGUgMTQuMDIuMjAyNFxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWeWJlclZ5bWFoYW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHVibGljIGl4cE52eTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpeHBEZHA6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgaGxpZGF0OiBudW1iZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIlbDvWLEm3Igdnltw6Fow6Fuw61cIjtcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdWeWJlclZ5bWFoYW5pXCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgIGZpbHRlci5peHBfZGRwID0gdGhhdC5peHBEZHA7XHJcbiAgICAgICAgICAgIGZpbHRlci5obGlkYXQgPSB0aGF0LmhsaWRhdDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWRWeWJlclZ5bWFoYW5pXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdCAoVsO9YsSbciB2eW3DoWjDoW7DrSlcIiB9KVxyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5saXN0VnliZXJWeW1haGFuaShcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWRWeWJlclZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJWw71jaG96w60gcG9obGVkXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5EaWxjaVZ5bWFoYW5pVnliZXIoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaXhwTnZ5ID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEZXRhaWxEdG8+KFwiYWN0aXZlUm93XCIpLml4cF9udnk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBpeHBOdnkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
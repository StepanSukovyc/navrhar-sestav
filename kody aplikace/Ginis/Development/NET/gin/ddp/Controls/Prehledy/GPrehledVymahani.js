"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledVymahani.ts                    </Name>
//    <Description> Okno přehledu vymáhání pohledávek                           </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-10-13                                                  </Created>
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
            let GPrehledVymahani = class GPrehledVymahani extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.taskId = "actGPrehledVymahani";
                    that.createActions();
                    if (that.ixp != undefined) {
                        that.createHeaderForm();
                    }
                    that.createGrid();
                    that.ziskejData();
                }
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actPripadyZavritPotomky: {
                            name: "zavritPotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                    });
                }
                createHeaderForm() {
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "headerForm" })
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        initialValue: that.ixp,
                        disabled: true
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", headerForm);
                }
                createGrid() {
                    this.grid = $("<div>").appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                
                        rowNumbers: false,
                        columns: WebClient.Common.GridFormats.PrehledVymahani(),
                    });
                }
                ziskejData() {
                    var that = this;
                    that.beginOperation();
                    that.isl.DdpPrehledVymahani.list(rq => {
                        return {
                            filters: {
                                ixp: that.ixp
                            }
                        };
                    })
                        .get().done(function (dto) {
                        that.view = new Gordic.Data.View(dto.data, { key: "typ_phl" });
                        that.grid.ggrid("setData", that.view);
                    }).always(() => {
                        that.endOperation();
                    });
                }
            };
            GPrehledVymahani = __decorate([
                Decorators.gcontent
            ], GPrehledVymahani);
            WebClient.GPrehledVymahani = GPrehledVymahani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRWeW1haGFuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmVobGVkVnltYWhhbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FnRmY7QUFoRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZ0ZuQjtJQWhGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ0Y3QjtRQWhGb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQU85QyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztvQkFFcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUM1QixDQUFDO29CQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLGFBQWE7b0JBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLHVCQUF1QixFQUFFOzRCQUNyQixJQUFJLEVBQUUsZUFBZTs0QkFDckIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzs0QkFDbkMsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzt5QkFDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5QyxJQUFJLEVBQUUsS0FBSzt3QkFDWCxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0JBQ3RCLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDLENBQUE7b0JBRU4sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztnQkFFTyxVQUFVO29CQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN4QyxRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILElBQUksRUFBRSxFQUFFO3dCQUNSLFVBQVUsRUFBRSxNQUFNLEVBQU0sNkNBQTZDO3dCQUNyRSxVQUFVLEVBQUUsS0FBSyxFQUFPLFlBQVk7d0JBQ3BDLGNBQWMsRUFBRSxLQUFLLEVBQUcsNEJBQTRCO3dCQUNwRCxVQUFVLEVBQUUsS0FBSzt3QkFDakIsT0FBTyxFQUFFLFVBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7cUJBQ2hELENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVPLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBRXRCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNsQyxPQUFPOzRCQUNILE9BQU8sRUFBRTtnQ0FDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7NkJBQ2hCO3lCQUNKLENBQUE7b0JBQ0wsQ0FBQyxDQUFDO3lCQUNELEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7d0JBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0osQ0FBQTtZQTVFWSxnQkFBZ0I7Z0JBRDVCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZ0JBQWdCLENBNEU1QjtZQTVFWSwwQkFBZ0IsbUJBNEU1QixDQUFBO1FBQ0wsQ0FBQyxFQWhGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ0Y3QjtJQUFELENBQUMsRUFoRmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdGbkI7QUFBRCxDQUFDLEVBaEZTLE1BQU0sS0FBTixNQUFNLFFBZ0ZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmVobGVkVnltYWhhbmkudHMgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHDFmWVobGVkdSB2eW3DoWjDoW7DrSBwb2hsZWTDoXZlayAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMTAtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJlaGxlZFZ5bWFoYW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwdWJsaWMgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgdmlldzogYW55O1xyXG4gICAgICAgIHB1YmxpYyBpeHA6IHN0cmluZ1xyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHUHJlaGxlZFZ5bWFoYW5pXCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuaXhwICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVIZWFkZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQcmlwYWR5WmF2cml0UG90b21reToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUhlYWRlckZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImhlYWRlckZvcm1cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByZWhsZWRWeW1haGFuaSgpLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5pc2wuRGRwUHJlaGxlZFZ5bWFoYW5pLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5peHBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSwgeyBrZXk6IFwidHlwX3BobFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxufSJdfQ==
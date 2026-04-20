"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberData.ts                          </Name>
//    <Description> Okno pro výěr dara ze splátkového kalendáře                 </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-29                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Predpisy;
                (function (Predpisy) {
                    let GVyberData = class GVyberData extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Výěr data ze splátkového kalendáře`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPredpisZavritPotomky"]
                                }]);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPredpisZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                    };
                    GVyberData = __decorate([
                        Decorators.gcontent
                    ], GVyberData);
                    Predpisy.GVyberData = GVyberData;
                })(Predpisy = Controls.Predpisy || (Controls.Predpisy = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//SELECT
//  dat_splatky, poznamka, poradi
//FROM
//  vas.ddpsspl
//WHERE
//  typ_phl = 'TYP POHLEDAVKY PRIPADU'
//######### A pokud se bude zobrazovat pouze aktuální rok, tak se přidá podmíninka
//  AND YEAR(dat_splatky) = 'ROK VE KTEREM SE PRACUJE'
//######### Třídí se pak takto:
//ORDER BY
//  poradi, dat_splatky DESC
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWeWJlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0FzQmY7QUF0QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0JuQjtJQXRCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc0I3QjtRQXRCb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBc0J0QztZQXRCOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsUUFBUSxDQXNCL0M7Z0JBdEJ1QyxXQUFBLFFBQVE7b0JBRTVDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7d0JBQ3hDLGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxvQ0FBb0MsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7aUNBQ25ELENBQUMsQ0FBQyxDQUFDO3dCQUVSLENBQUM7d0JBRU8sYUFBYTs0QkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDbkIsSUFBSSxFQUFFLDBCQUEwQjtvQ0FDaEMsR0FBRyxFQUFFLEdBQUcsRUFBRTt3Q0FDTixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQ0FDbkMsQ0FBQztpQ0FDSixDQUFDLENBQUMsQ0FBQzt3QkFDUixDQUFDO3FCQUNKLENBQUE7b0JBbkJZLFVBQVU7d0JBRHRCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLFVBQVUsQ0FtQnRCO29CQW5CWSxtQkFBVSxhQW1CdEIsQ0FBQTtnQkFDTCxDQUFDLEVBdEJ1QyxRQUFRLEdBQVIsaUJBQVEsS0FBUixpQkFBUSxRQXNCL0M7WUFBRCxDQUFDLEVBdEI4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQXNCdEM7UUFBRCxDQUFDLEVBdEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzQjdCO0lBQUQsQ0FBQyxFQXRCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc0JuQjtBQUFELENBQUMsRUF0QlMsTUFBTSxLQUFOLE1BQU0sUUFzQmY7QUFFRCxRQUFRO0FBQ1IsaUNBQWlDO0FBQ2pDLE1BQU07QUFDTixlQUFlO0FBQ2YsT0FBTztBQUNQLHNDQUFzQztBQUN0QyxrRkFBa0Y7QUFDbEYsc0RBQXNEO0FBQ3RELCtCQUErQjtBQUMvQixVQUFVO0FBQ1YsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdWeWJlckRhdGEudHMgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyB2w73Em3IgZGFyYSB6ZSBzcGzDoXRrb3bDqWhvIGthbGVuZMOhxZllICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIyLTExLTI5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmVkcGlzeSB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWeWJlckRhdGEgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYFbDvcSbciBkYXRhIHplIHNwbMOhdGtvdsOpaG8ga2FsZW5kw6HFmWVgO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1ByZWRwaXNaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJlZHBpc1phdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9TRUxFQ1RcclxuLy8gIGRhdF9zcGxhdGt5LCBwb3puYW1rYSwgcG9yYWRpXHJcbi8vRlJPTVxyXG4vLyAgdmFzLmRkcHNzcGxcclxuLy9XSEVSRVxyXG4vLyAgdHlwX3BobCA9ICdUWVAgUE9ITEVEQVZLWSBQUklQQURVJ1xyXG4vLyMjIyMjIyMjIyBBIHBva3VkIHNlIGJ1ZGUgem9icmF6b3ZhdCBwb3V6ZSBha3R1w6FsbsOtIHJvaywgdGFrIHNlIHDFmWlkw6EgcG9kbcOtbmlua2FcclxuLy8gIEFORCBZRUFSKGRhdF9zcGxhdGt5KSA9ICdST0sgVkUgS1RFUkVNIFNFIFBSQUNVSkUnXHJcbi8vIyMjIyMjIyMjIFTFmcOtZMOtIHNlIHBhayB0YWt0bzpcclxuLy9PUkRFUiBCWVxyXG4vLyAgcG9yYWRpLCBkYXRfc3BsYXRreSBERVNDIl19
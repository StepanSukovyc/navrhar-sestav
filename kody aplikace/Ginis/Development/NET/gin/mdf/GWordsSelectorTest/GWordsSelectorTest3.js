"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Mdf;
    (function (Mdf) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GWordsSelectorTest3 = class GWordsSelectorTest3 extends Gordic.GContentBase {
                onContentReady() {
                    this.actions.addRange({
                        actGenerate: {
                            name: "actGenerate",
                            caption: "Generovat pohled",
                            icon: "gi-generate",
                            run: () => {
                                //var data = this.columnSelector.GetResult();
                                this.columnSelector.SetData([{ nazev: "uea", checked: true }, { nazev: "ueb", checked: false }], [{ nazev: "m1" }, { nazev: "m2" }, { nazev: "m3" }]);
                            }
                        }
                    });
                    //*************************************************************
                    // MenuBar
                    //*************************************************************
                    this.menuBar([
                        {
                            action: this.actions.actGenerate,
                            favorite: true
                        }
                    ]);
                    var contentDiv = $.newDiv().appendTo(this.element);
                    var gcontent = new GContent({
                        className: "Gordic.Eko.WebClient.GColumnSelector",
                        parentContent: this
                    }, contentDiv);
                    gcontent.load();
                    this.columnSelector = contentDiv.gcontent();
                    this.columnSelector.selectedDimensionsMaxCount = 4;
                    this.columnSelector.selectedMeasuresMaxCount = 3;
                    this.columnSelector.additionalDimensions = [{ nazev: "dim1", zkratka: "DIM1", delka: 4 }, { nazev: "dim2", zkratka: "DIM2", delka: 10 }, { nazev: "dim3", zkratka: "DIM3", delka: 2 }];
                    this.columnSelector.additionalMeasures = [{ nazev: "m1", zkratka: "MC1" }, { nazev: "m2", zkratka: "MC2" }, { nazev: "m3", zkratka: "MC3" }];
                }
            };
            GWordsSelectorTest3 = __decorate([
                gcontent
            ], GWordsSelectorTest3);
            WebClient.GWordsSelectorTest3 = GWordsSelectorTest3;
        })(WebClient = Mdf.WebClient || (Mdf.WebClient = {}));
    })(Mdf = Gordic.Mdf || (Gordic.Mdf = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1dvcmRzU2VsZWN0b3JUZXN0My5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdXb3Jkc1NlbGVjdG9yVGVzdDMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW1EZjtBQW5ERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtRG5CO0lBbkRnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtRDdCO1FBbkRvQixXQUFBLFNBQVM7WUFHMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLE9BQUEsWUFBWTtnQkFHakQsY0FBYztvQkFFVixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFbEIsV0FBVyxFQUFFOzRCQUNULElBQUksRUFBRSxhQUFhOzRCQUNuQixPQUFPLEVBQUUsa0JBQWtCOzRCQUMzQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTiw2Q0FBNkM7Z0NBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQzNGLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFFSCwrREFBK0Q7b0JBQy9ELFVBQVU7b0JBQ1YsK0RBQStEO29CQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNUOzRCQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQ2hDLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjtxQkFBQyxDQUFDLENBQUM7b0JBRVIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25ELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO3dCQUN4QixTQUFTLEVBQUUsc0NBQXNDO3dCQUNqRCxhQUFhLEVBQUUsSUFBSTtxQkFDdEIsRUFBRSxVQUFVLENBQUMsQ0FBQTtvQkFFZCxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLDBCQUEwQixHQUFHLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNyTCxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDakosQ0FBQzthQUdKLENBQUE7WUE1Q1ksbUJBQW1CO2dCQUQvQixRQUFRO2VBQ0ksbUJBQW1CLENBNEMvQjtZQTVDWSw2QkFBbUIsc0JBNEMvQixDQUFBO1FBQ0wsQ0FBQyxFQW5Eb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbUQ3QjtJQUFELENBQUMsRUFuRGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1EbkI7QUFBRCxDQUFDLEVBbkRTLE1BQU0sS0FBTixNQUFNLFFBbURmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5NZGYuV2ViQ2xpZW50IHtcclxuICAgIFxyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1dvcmRzU2VsZWN0b3JUZXN0MyBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb2x1bW5TZWxlY3RvcjogR29yZGljLkVrby5XZWJDbGllbnQuR0NvbHVtblNlbGVjdG9yO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0R2VuZXJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdlbmVyYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJHZW5lcm92YXQgcG9obGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2VuZXJhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgZGF0YSA9IHRoaXMuY29sdW1uU2VsZWN0b3IuR2V0UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3IuU2V0RGF0YShbeyBuYXpldjogXCJ1ZWFcIiwgY2hlY2tlZDogdHJ1ZSB9LCB7IG5hemV2OiBcInVlYlwiLCBjaGVja2VkOiBmYWxzZSB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt7IG5hemV2OiBcIm0xXCJ9LCB7IG5hemV2OiBcIm0yXCJ9LCB7IG5hemV2OiBcIm0zXCJ9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyBNZW51QmFyXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdEdlbmVyYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGVudERpdiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIGdjb250ZW50ID0gbmV3IEdDb250ZW50KHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJHb3JkaWMuRWtvLldlYkNsaWVudC5HQ29sdW1uU2VsZWN0b3JcIixcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXNcclxuICAgICAgICAgICAgfSwgY29udGVudERpdilcclxuXHJcbiAgICAgICAgICAgIGdjb250ZW50LmxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3IgPSBjb250ZW50RGl2Lmdjb250ZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3Iuc2VsZWN0ZWREaW1lbnNpb25zTWF4Q291bnQgPSA0O1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtblNlbGVjdG9yLnNlbGVjdGVkTWVhc3VyZXNNYXhDb3VudCA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3IuYWRkaXRpb25hbERpbWVuc2lvbnMgPSBbe25hemV2OiBcImRpbTFcIiwgemtyYXRrYTogXCJESU0xXCIsIGRlbGthOiA0fSwgeyBuYXpldjogXCJkaW0yXCIsIHprcmF0a2E6IFwiRElNMlwiLCBkZWxrYTogMTAgfSwgeyBuYXpldjogXCJkaW0zXCIsIHprcmF0a2E6IFwiRElNM1wiLCBkZWxrYTogMiB9XTtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5TZWxlY3Rvci5hZGRpdGlvbmFsTWVhc3VyZXMgPSBbeyBuYXpldjogXCJtMVwiLCB6a3JhdGthOiBcIk1DMVwiIH0sIHsgbmF6ZXY6IFwibTJcIiwgemtyYXRrYTogXCJNQzJcIiB9LCB7IG5hemV2OiBcIm0zXCIsIHprcmF0a2E6IFwiTUMzXCIgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG59Il19
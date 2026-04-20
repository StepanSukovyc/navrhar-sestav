"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GInuDashBoard.ts                                                        </Name>
//    <Description> GdaDashBoard                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2020-04-11                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            const { gcontent } = Decorators;
            let GInuDashboard = class GInuDashboard extends Gordic.GContentBase {
                //private SeznamAkci: Gordic.Isl.View<Gordic.Inu.Interface.GSeznamDokladuDto>;
                //private view_ISL: Gordic.Isl.View<Gordic.Inu.Interface.GSeznamDokladuDto>;
                onContentReady() {
                    this.loadModuleInfo();
                }
                /** načíst informace o modulu */
                loadModuleInfo() {
                    //var cnt = this;
                    var result = [];
                    //var primaryText = "Počet";
                    //var secondaryText = "jres:30250428"; //RC 30250428 : CELKEM
                    //var filterDto: Gordic.Inu.Interface.GSeznamAdaFilterDto = {};
                    //Gordic.Isl.Akce.list({
                    //    filters: {}
                    //    //,
                    //    //fragments: [""]
                    //})
                    //    .getData()
                    //    .done(function (akce) {
                    //        console.log("Gordic.Isl.Akce", akce);
                    //        cnt.PocetAkci = akce.length;
                    //        cnt.PocetAkci = akce.length;
                    //    });
                    //var secondaryText = "jres:30250429".format(this.NazevRef, this.NazevFun , this.DatLoginTxt); //RC 30250429 : {0}  | {1} | Poslední přihlášení: {2}
                    result.push(new GObservableObject({
                        name: "moduleInfoItems",
                        // image: "<img class='g-app-launcher__item' style='width:48px;height:48px;' alt='app:GWAADA05.svg' src='gin/gz.ashx?r=app&amp;f=GWAINU05.svg'>",
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GWAINU05"),
                        primaryText: "jres:30250426", //RC 30250426 : Manipulace s daty
                        secondaryText: "jres:30250429".format(this.NazevRef, this.NazevFun, this.DatLoginTxt) //RC 30250429 : {0}  | {1} | Poslední přihlášení: {2}
                    }));
                    this.moduleInfoItems = new Gordic.Data.View([{
                            id: "moduleInfo",
                            title: "jres:30250427", //RC 30250427 : Souhrn
                            zone: 1,
                            mode: "horizontal",
                            itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                            //menuParams: [
                            //    {
                            //        icon: "fa-retweet",
                            //        action: new GAction({
                            //            name: "actRefreshSouhrn",
                            //            captionVisible: GAction.captionVisibility.normal,
                            //            caption: "Aktualizovat",
                            //            run: function () {
                            //                cnt.Pocet = cnt.Pocet;
                            //                result[0].value = cnt.Pocet;
                            //                result[0].update();
                            //            }
                            //        })
                            //    }
                            //],
                            defaultSelected: false,
                            data: new Gordic.Data.View(result)
                        }], { key: ["id"] });
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        data: this.moduleInfoItems,
                        layout: "vertical",
                        title: "",
                        sortable: true,
                        zones: 3
                    });
                }
            };
            GInuDashboard = __decorate([
                gcontent
            ], GInuDashboard);
            WebClient.GInuDashboard = GInuDashboard;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0ludURhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdJbnVEYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FzRmY7QUF0RkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0ZuQjtJQXRGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc0Y3QjtRQXRGb0IsV0FBQSxTQUFTO1lBRTFCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFHaEMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFRM0MsOEVBQThFO2dCQUM5RSw0RUFBNEU7Z0JBRXJFLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRCxnQ0FBZ0M7Z0JBQ3hCLGNBQWM7b0JBQ2xCLGlCQUFpQjtvQkFDakIsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO29CQUN2Qiw0QkFBNEI7b0JBQzVCLDZEQUE2RDtvQkFHN0QsK0RBQStEO29CQUUvRCx3QkFBd0I7b0JBQ3hCLGlCQUFpQjtvQkFDakIsU0FBUztvQkFDVCx1QkFBdUI7b0JBQ3ZCLElBQUk7b0JBQ0osZ0JBQWdCO29CQUNoQiw2QkFBNkI7b0JBQzdCLCtDQUErQztvQkFDL0Msc0NBQXNDO29CQUN0QyxzQ0FBc0M7b0JBQ3RDLFNBQVM7b0JBRVQsb0pBQW9KO29CQUVwSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUM7d0JBQzlCLElBQUksRUFBRSxpQkFBaUI7d0JBQ3ZCLGlKQUFpSjt3QkFDakosS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7d0JBQ3hFLFdBQVcsRUFBRSxlQUFlLEVBQWdDLGlDQUFpQzt3QkFDN0YsYUFBYSxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxxREFBcUQ7cUJBQzlJLENBQUMsQ0FBQyxDQUFDO29CQUVKLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN6QyxFQUFFLEVBQUUsWUFBWTs0QkFDaEIsS0FBSyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQzlDLElBQUksRUFBRSxDQUFDOzRCQUNQLElBQUksRUFBRSxZQUFZOzRCQUNsQixZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxZQUFZOzRCQUM5RSxlQUFlOzRCQUNmLE9BQU87NEJBQ1AsNkJBQTZCOzRCQUM3QiwrQkFBK0I7NEJBQy9CLHVDQUF1Qzs0QkFDdkMsK0RBQStEOzRCQUMvRCxzQ0FBc0M7NEJBQ3RDLGdDQUFnQzs0QkFDaEMsd0NBQXdDOzRCQUN4Qyw4Q0FBOEM7NEJBQzlDLHFDQUFxQzs0QkFDckMsZUFBZTs0QkFDZixZQUFZOzRCQUNaLE9BQU87NEJBQ1AsSUFBSTs0QkFDTCxlQUFlLEVBQUUsS0FBSzs0QkFDckIsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3lCQUNyQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRXJCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQzt3QkFDOUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlO3dCQUMxQixNQUFNLEVBQUUsVUFBVTt3QkFDbEIsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsUUFBUSxFQUFFLElBQUk7d0JBQ2QsS0FBSyxFQUFFLENBQUM7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSixDQUFBO1lBaEZZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBZ0Z6QjtZQWhGWSx1QkFBYSxnQkFnRnpCLENBQUE7UUFDTCxDQUFDLEVBdEZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzRjdCO0lBQUQsQ0FBQyxFQXRGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc0ZuQjtBQUFELENBQUMsRUF0RlMsTUFBTSxLQUFOLE1BQU0sUUFzRmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR0ludURhc2hCb2FyZC50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdkYURhc2hCb2FyZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMC0wNC0xMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50e1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0ludURhc2hib2FyZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kdWxlSW5mb0l0ZW1zOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldlJlZjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgTmF6ZXZGdW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIERhdExvZ2luVHh0OiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBQb2NldDogbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vcHJpdmF0ZSBTZXpuYW1Ba2NpOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbURva2xhZHVEdG8+O1xyXG4gICAgICAgIC8vcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Eb2tsYWR1RHRvPjtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb2R1bGVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogbmHEjcOtc3QgaW5mb3JtYWNlIG8gbW9kdWx1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTW9kdWxlSW5mbygpIHtcclxuICAgICAgICAgICAgLy92YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgLy92YXIgcHJpbWFyeVRleHQgPSBcIlBvxI1ldFwiO1xyXG4gICAgICAgICAgICAvL3ZhciBzZWNvbmRhcnlUZXh0ID0gXCJqcmVzOjMwMjUwNDI4XCI7IC8vUkMgMzAyNTA0MjggOiBDRUxLRU1cclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJEdG86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vR29yZGljLklzbC5Ba2NlLmxpc3Qoe1xyXG4gICAgICAgICAgICAvLyAgICBmaWx0ZXJzOiB7fVxyXG4gICAgICAgICAgICAvLyAgICAvLyxcclxuICAgICAgICAgICAgLy8gICAgLy9mcmFnbWVudHM6IFtcIlwiXVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC8vICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKGFrY2UpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLklzbC5Ba2NlXCIsIGFrY2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY250LlBvY2V0QWtjaSA9IGFrY2UubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY250LlBvY2V0QWtjaSA9IGFrY2UubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHNlY29uZGFyeVRleHQgPSBcImpyZXM6MzAyNTA0MjlcIi5mb3JtYXQodGhpcy5OYXpldlJlZiwgdGhpcy5OYXpldkZ1biAsIHRoaXMuRGF0TG9naW5UeHQpOyAvL1JDIDMwMjUwNDI5IDogezB9ICB8IHsxfSB8IFBvc2xlZG7DrSBwxZlpaGzDocWhZW7DrTogezJ9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2R1bGVJbmZvSXRlbXNcIixcclxuICAgICAgICAgICAgICAgIC8vIGltYWdlOiBcIjxpbWcgY2xhc3M9J2ctYXBwLWxhdW5jaGVyX19pdGVtJyBzdHlsZT0nd2lkdGg6NDhweDtoZWlnaHQ6NDhweDsnIGFsdD0nYXBwOkdXQUFEQTA1LnN2Zycgc3JjPSdnaW4vZ3ouYXNoeD9yPWFwcCZhbXA7Zj1HV0FJTlUwNS5zdmcnPlwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IEdvcmRpYy5VdGlscy5JY29uQnVpbGRlci5kZWZhdWx0SW5zdC5jcmVhdGVNb2R1bGVJY29uKFwiR1dBSU5VMDVcIiksXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogXCJqcmVzOjMwMjUwNDI2XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUkMgMzAyNTA0MjYgOiBNYW5pcHVsYWNlIHMgZGF0eVxyXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogXCJqcmVzOjMwMjUwNDI5XCIuZm9ybWF0KHRoaXMuTmF6ZXZSZWYsIHRoaXMuTmF6ZXZGdW4sIHRoaXMuRGF0TG9naW5UeHQpIC8vUkMgMzAyNTA0MjkgOiB7MH0gIHwgezF9IHwgUG9zbGVkbsOtIHDFmWlobMOhxaFlbsOtOiB7Mn1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGVJbmZvSXRlbXMgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwibW9kdWxlSW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDQyN1wiLCAvL1JDIDMwMjUwNDI3IDogU291aHJuXHJcbiAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlWYWx1ZVR3b1Jvd3NUZXh0VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAvL21lbnVQYXJhbXM6IFtcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpY29uOiBcImZhLXJldHdlZXRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJhY3RSZWZyZXNoU291aHJuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBHQWN0aW9uLmNhcHRpb25WaXNpYmlsaXR5Lm5vcm1hbCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJBa3R1YWxpem92YXRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjbnQuUG9jZXQgPSBjbnQuUG9jZXQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXN1bHRbMF0udmFsdWUgPSBjbnQuUG9jZXQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXN1bHRbMF0udXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy9dLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcocmVzdWx0KVxyXG4gICAgICAgICAgICB9XSwgeyBrZXk6IFtcImlkXCJdIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Rhc2hib2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMubW9kdWxlSW5mb0l0ZW1zLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIHpvbmVzOiAzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
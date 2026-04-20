"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GDashboardControl = class GDashboardControl extends Gordic.GContentBase {
                prepareContent(options) {
                    let settings = $.extend({ mesic: 20, reportId: "" }, this.globalSettings?.get("Global.ucr.infopanel"));
                    if (!settings.reportId)
                        return;
                    //let gfrm$ = $("<div class='js-gfrm'>").appendTo(this.element);
                    //NOTE: V budoucnu se bude otevirat nejspis v basepanelu
                    const now = new Date();
                    let reportParams = {
                        reportId: settings.reportId,
                        platnost: `${now.getFullYear()}${("00" + now.getMonth() + 1).slice(-2)}`,
                        serverParameterMethod: "Gordic.Ucr.WebClient.GUcrDashboardReportGenerator:ServerParameterMethod",
                        params: { X0006: settings.mesic }
                    };
                    let generator = new Gordic.Report.WebClient.GReportGenerator({ parentContent: this });
                    this.beginOperation();
                    generator.generate(reportParams)
                        .then((res) => {
                        //gfrm$.empty();
                        this.endOperation();
                        let options = {
                            Form: res.fileInfo.guid,
                            genRes: res,
                            generatorOptions: generator.options,
                            params: reportParams
                        };
                        let gfrm = this.navigate(Gordic.Report.WebClient.GFrmControl, options)
                            .on("close", () => { generator.clean(res); });
                        let gfrmCnt = $.content(gfrm);
                        gfrmCnt.menuBar([]);
                        gfrmCnt.commandBar([]);
                        //gfrm$.gcontent([Gordic.Report.WebClient.GFrmControlTS, { _options: options }])
                        //    .on("close", () => { generator.clean(res.id); });
                    });
                }
            };
            GDashboardControl.uid = "gdashboard#";
            GDashboardControl = __decorate([
                Decorators.gcontent
            ], GDashboardControl);
            WebClient.GDashboardControl = GDashboardControl;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Rhc2hib2FyZENvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGFzaGJvYXJkQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBa0RmO0FBbERELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtEbkI7SUFsRGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtEN0I7UUFsRG9CLFdBQUEsU0FBUztZQUcxQixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBWTtnQkFHL0MsY0FBYyxDQUFDLE9BQXdCO29CQUNuQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO29CQUV2RyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7d0JBQUUsT0FBTztvQkFFL0IsZ0VBQWdFO29CQUVoRSx3REFBd0Q7b0JBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBRXZCLElBQUksWUFBWSxHQUFtRDt3QkFDL0QsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO3dCQUMzQixRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN4RSxxQkFBcUIsRUFBRSx5RUFBeUU7d0JBQ2hHLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFO3FCQUNwQyxDQUFDO29CQUVGLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDdEYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUV0QixTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQzt5QkFDM0IsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ1YsZ0JBQWdCO3dCQUVoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksT0FBTyxHQUFnRDs0QkFDdkQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFTLENBQUMsSUFBSzs0QkFDekIsTUFBTSxFQUFFLEdBQUc7NEJBQ1gsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLE9BQU87NEJBQ25DLE1BQU0sRUFBRSxZQUFZO3lCQUN2QixDQUFDO3dCQUVGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQzs2QkFDakUsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRWxELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3BCLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBRXZCLGdGQUFnRjt3QkFDaEYsdURBQXVEO29CQUMzRCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDOztZQTVDTSxxQkFBRyxHQUFHLGFBQWEsQUFBaEIsQ0FBaUI7WUFEbEIsaUJBQWlCO2dCQUQ3QixVQUFVLENBQUMsUUFBUTtlQUNQLGlCQUFpQixDQThDN0I7WUE5Q1ksMkJBQWlCLG9CQThDN0IsQ0FBQTtRQUNMLENBQUMsRUFsRG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtEN0I7SUFBRCxDQUFDLEVBbERnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrRG5CO0FBQUQsQ0FBQyxFQWxEUyxNQUFNLEtBQU4sTUFBTSxRQWtEZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGFzaGJvYXJkQ29udHJvbCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgc3RhdGljIHVpZCA9IFwiZ2Rhc2hib2FyZCNcIjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogeyByb2s6IHN0cmluZyB9KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9ICQuZXh0ZW5kKHsgbWVzaWM6IDIwLCByZXBvcnRJZDogXCJcIiB9LCB0aGlzLmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwudWNyLmluZm9wYW5lbFwiKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzLnJlcG9ydElkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvL2xldCBnZnJtJCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1nZnJtJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vTk9URTogViBidWRvdWNudSBzZSBidWRlIG90ZXZpcmF0IG5lanNwaXMgdiBiYXNlcGFuZWx1XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW1zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR1JlcG9ydEdlbmVyYXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0SWQ6IHNldHRpbmdzLnJlcG9ydElkLFxyXG4gICAgICAgICAgICAgICAgcGxhdG5vc3Q6IGAke25vdy5nZXRGdWxsWWVhcigpfSR7KFwiMDBcIiArIG5vdy5nZXRNb250aCgpICsgMSkuc2xpY2UoLTIpfWAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlVjci5XZWJDbGllbnQuR1VjckRhc2hib2FyZFJlcG9ydEdlbmVyYXRvcjpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIixcclxuICAgICAgICAgICAgICAgIHBhcmFtczogeyBYMDAwNjogc2V0dGluZ3MubWVzaWMgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGdlbmVyYXRvciA9IG5ldyBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0R2VuZXJhdG9yKHsgcGFyZW50Q29udGVudDogdGhpcyB9KTtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgZ2VuZXJhdG9yLmdlbmVyYXRlKHJlcG9ydFBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dmcm0kLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnM6IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LklHRnJtQ29udHJvbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm06IHJlcy5maWxlSW5mbyEuZ3VpZCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlblJlczogcmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3JPcHRpb25zOiBnZW5lcmF0b3Iub3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiByZXBvcnRQYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2ZybSA9IHRoaXMubmF2aWdhdGUoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR0ZybUNvbnRyb2wsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHsgZ2VuZXJhdG9yLmNsZWFuKHJlcyk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2ZybUNudCA9ICQuY29udGVudChnZnJtKTtcclxuICAgICAgICAgICAgICAgICAgICBnZnJtQ250Lm1lbnVCYXIoW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmcm1DbnQuY29tbWFuZEJhcihbXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ2ZybSQuZ2NvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdGcm1Db250cm9sVFMsIHsgX29wdGlvbnM6IG9wdGlvbnMgfV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4geyBnZW5lcmF0b3IuY2xlYW4ocmVzLmlkKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
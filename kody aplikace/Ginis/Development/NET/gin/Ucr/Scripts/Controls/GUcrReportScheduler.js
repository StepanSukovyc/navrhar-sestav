"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GUcrReportScheduler extends Gordic.Report.WebClient.GReportScheduler {
                constructor(cnt, options) {
                    super(cnt, options);
                    this.reportSchedulerClassName = "Gordic.Ucr.WebClient.Reports.GUcrReportScheduler";
                }
                getMenuBar() {
                    let pars = super.getMenuBar();
                    if (!this.isBalikSestav) {
                        pars.push({
                            action: this.actions.add({
                                name: "pozAct",
                                icon: "gi-detail",
                                caption: "jres:30250585", //RC 30250585 : Požadavek
                                run: (ev, ctx) => {
                                    this._cnt.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { porCisKud: this.options.data.PorCisUlohy, allowChangeObd: true } })
                                        .on("close", (ev, res) => {
                                        if (res) {
                                            this.options.data.ReportSchedulerClassName = "Gordic.Ucr.WebClient.Reports.GUcrReportScheduler";
                                            this.options.data.Report.ReportGeneratorParams = res.pozadavek;
                                        }
                                    });
                                }
                            }),
                            favorite: true
                        });
                    }
                    return pars;
                }
            }
            WebClient.GUcrReportScheduler = GUcrReportScheduler;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjclJlcG9ydFNjaGVkdWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVY3JSZXBvcnRTY2hlZHVsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQWlDZjtBQWpDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpQ25CO0lBakNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpQzdCO1FBakNvQixXQUFBLFNBQVM7WUFDMUIsTUFBYSxtQkFBb0IsU0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0I7Z0JBRzdFLFlBQVksR0FBYSxFQUFFLE9BQXlEO29CQUNoRixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUhkLDZCQUF3QixHQUFHLGtEQUFrRCxDQUFDO2dCQUl4RixDQUFDO2dCQUVTLFVBQVU7b0JBQ2hCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDTixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0NBQ3JCLElBQUksRUFBRSxRQUFRO2dDQUNkLElBQUksRUFBRSxXQUFXO2dDQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5QjtnQ0FDbkQsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQzt5Q0FDL0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUEyRSxFQUFFLEVBQUU7d0NBQzdGLElBQUksR0FBRyxFQUFFLENBQUM7NENBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFLLENBQUMsd0JBQXdCLEdBQUcsa0RBQWtELENBQUM7NENBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFDLE1BQU8sQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO3dDQUNyRSxDQUFDO29DQUNMLENBQUMsQ0FBQyxDQUFDO2dDQUNYLENBQUM7NkJBQ0osQ0FBQzs0QkFDRixRQUFRLEVBQUUsSUFBSTt5QkFDakIsQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSjtZQS9CWSw2QkFBbUIsc0JBK0IvQixDQUFBO1FBQ0wsQ0FBQyxFQWpDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBaUM3QjtJQUFELENBQUMsRUFqQ2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlDbkI7QUFBRCxDQUFDLEVBakNTLE1BQU0sS0FBTixNQUFNLFFBaUNmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIGV4cG9ydCBjbGFzcyBHVWNyUmVwb3J0U2NoZWR1bGVyIGV4dGVuZHMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFNjaGVkdWxlciB7XHJcbiAgICAgICAgcHJvdGVjdGVkIHJlcG9ydFNjaGVkdWxlckNsYXNzTmFtZSA9IFwiR29yZGljLlVjci5XZWJDbGllbnQuUmVwb3J0cy5HVWNyUmVwb3J0U2NoZWR1bGVyXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoY250OiBHQ29udGVudCwgb3B0aW9uczogR29yZGljLlJlcG9ydC5XZWJDbGllbnQuSUdSZXBvcnRTY2hlZHVsZXJPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNudCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0TWVudUJhcigpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgcGFycyA9IHN1cGVyLmdldE1lbnVCYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0JhbGlrU2VzdGF2KSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDU4NVwiLCAvL1JDIDMwMjUwNTg1IDogUG/FvmFkYXZla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbnQubmF2aWdhdGUoXCJHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsUG96YWRhdmt1Q29udHJvbFwiLCB7IG9wdGlvbnM6IHsgcG9yQ2lzS3VkOiB0aGlzLm9wdGlvbnMuZGF0YSEuUG9yQ2lzVWxvaHksIGFsbG93Q2hhbmdlT2JkOiB0cnVlIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJlczogdW5kZWZpbmVkIHwgeyBwb3phZGF2ZWs6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQb3phZGF2ZWtEZXRhaWxEdG8gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGF0YSEuUmVwb3J0U2NoZWR1bGVyQ2xhc3NOYW1lID0gXCJHb3JkaWMuVWNyLldlYkNsaWVudC5SZXBvcnRzLkdVY3JSZXBvcnRTY2hlZHVsZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kYXRhIS5SZXBvcnQhLlJlcG9ydEdlbmVyYXRvclBhcmFtcyA9IHJlcy5wb3phZGF2ZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGFycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
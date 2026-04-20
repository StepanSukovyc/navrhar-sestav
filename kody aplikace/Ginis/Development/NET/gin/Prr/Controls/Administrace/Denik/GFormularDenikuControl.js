"use strict";
var Gordic;
(function (Gordic) {
    var Prr;
    (function (Prr) {
        var UIWebClient;
        (function (UIWebClient) {
            function GFormularDenikuControl(content, mp) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                return $.extend({}, predek, {
                    idSettings: "GFormularDenikuControl",
                    dataViewKey: ["sablona"],
                    detailContent: content,
                    //serviceContent: new GContent({ className: "Gordic.Prr.UIWebClient.GFormularDenikuControl", serverParams: {} }),
                    serviceContent: content.createServiceContent("Gordic.Prr.UIWebClient.GFormularDenikuControl"),
                    searchColumns: ["sablona", "prrsfrm_nazev"],
                    showDetail: false,
                    createGridFormat: function () {
                        return new Gordic.Data.GridFormat()
                            .addTextColumn({ name: "sablona", caption: "jres:25800051", width: 150, fixedWidth: false }) //RC 25800051 : Formulář
                            .addTextColumn({ name: "prrsfrm_nazev", caption: "jres:25800004", width: 250, fixedWidth: false }); //RC 25800004 : Název
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var ixsRad;
                        var sablona;
                        if (row != null && row != undefined) {
                            ixsRad = row.ixs_rad;
                            sablona = row.sablona;
                        }
                        else if (this.detailContent != null) {
                            ixsRad = this.detailContent.originalModel.ixs_rad;
                        }
                        return this.detailContent.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailFormularDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxsRad: ixsRad,
                            Sablona: sablona,
                            Mp: mp,
                            Id: "detail_formular_deniku"
                        }, { width: width, height: height, modal: modal });
                    },
                    //additionalActions: {
                    //    actTest:
                    //    {
                    //        caption: "Test",
                    //        icon: "gi-plus",
                    //        run: function (ev, ctx) {
                    //            console.log("TTTTEST !!!");
                    //        }
                    //    }
                    //},
                    //additionalMenu: [                
                    //    { action: "actTest", favorite: true }                
                    //],
                    //additionalContextMenu: ["actTest"]
                });
            }
            UIWebClient.GFormularDenikuControl = GFormularDenikuControl;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Zvcm11bGFyRGVuaWt1Q29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdGb3JtdWxhckRlbmlrdUNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQW1EZjtBQW5ERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtRG5CO0lBbkRnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0FtRC9CO1FBbkRvQixXQUFBLFdBQVc7WUFDNUIsU0FBZ0Isc0JBQXNCLENBQUMsT0FBOEUsRUFBRSxFQUFXO2dCQUM5SCxNQUFNLE1BQU0sR0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBc0UsQ0FBQztnQkFDbkgsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7b0JBRXhCLFVBQVUsRUFBRSx3QkFBd0I7b0JBQ3BDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDeEIsYUFBYSxFQUFFLE9BQU87b0JBQ3RCLGlIQUFpSDtvQkFDakgsY0FBYyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQywrQ0FBK0MsQ0FBQztvQkFDN0YsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQztvQkFDM0MsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGdCQUFnQixFQUFFO3dCQUNkLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBOEM7NkJBQzFFLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBLHdCQUF3Qjs2QkFDbkgsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQSxxQkFBcUI7b0JBQ2hJLENBQUM7b0JBQ0QsVUFBVSxFQUFFLFVBQVUsR0FBUSxFQUFFLEtBQWlELEVBQUUsTUFBaUQsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLEtBQWM7d0JBRS9LLElBQUksTUFBTSxDQUFDO3dCQUNYLElBQUksT0FBTyxDQUFDO3dCQUNaLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7NEJBQ2xDLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDOzRCQUNyQixPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzt3QkFDMUIsQ0FBQzs2QkFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ3BDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7d0JBQ3RELENBQUM7d0JBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyw4Q0FBOEMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7NEJBQ3BJLE1BQU0sRUFBRSxNQUFNOzRCQUNkLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixFQUFFLEVBQUUsRUFBRTs0QkFDTixFQUFFLEVBQUUsd0JBQXdCO3lCQUMvQixFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUN2RCxDQUFDO29CQUNELHNCQUFzQjtvQkFDdEIsY0FBYztvQkFDZCxPQUFPO29CQUNQLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQixtQ0FBbUM7b0JBQ25DLHlDQUF5QztvQkFDekMsV0FBVztvQkFDWCxPQUFPO29CQUNQLElBQUk7b0JBQ0osbUNBQW1DO29CQUNuQywyREFBMkQ7b0JBQzNELElBQUk7b0JBQ0osb0NBQW9DO2lCQUN2QyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBakRlLGtDQUFzQix5QkFpRHJDLENBQUE7UUFDTCxDQUFDLEVBbkRvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFtRC9CO0lBQUQsQ0FBQyxFQW5EZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbURuQjtBQUFELENBQUMsRUFuRFMsTUFBTSxLQUFOLE1BQU0sUUFtRGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlByci5VSVdlYkNsaWVudCB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR0Zvcm11bGFyRGVuaWt1Q29udHJvbChjb250ZW50OiBHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnMsIG1wOiBib29sZWFuKTogR0NvbnRlbnQge1xyXG4gICAgICAgIGNvbnN0IHByZWRlayA9IChHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sIGFzIGFueSBhcyBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sKTtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIHByZWRlaywge1xyXG5cclxuICAgICAgICAgICAgaWRTZXR0aW5nczogXCJHRm9ybXVsYXJEZW5pa3VDb250cm9sXCIsXHJcbiAgICAgICAgICAgIGRhdGFWaWV3S2V5OiBbXCJzYWJsb25hXCJdLFxyXG4gICAgICAgICAgICBkZXRhaWxDb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAvL3NlcnZpY2VDb250ZW50OiBuZXcgR0NvbnRlbnQoeyBjbGFzc05hbWU6IFwiR29yZGljLlByci5VSVdlYkNsaWVudC5HRm9ybXVsYXJEZW5pa3VDb250cm9sXCIsIHNlcnZlclBhcmFtczoge30gfSksXHJcbiAgICAgICAgICAgIHNlcnZpY2VDb250ZW50OiBjb250ZW50LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlByci5VSVdlYkNsaWVudC5HRm9ybXVsYXJEZW5pa3VDb250cm9sXCIpLFxyXG4gICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJzYWJsb25hXCIsIFwicHJyc2ZybV9uYXpldlwiXSxcclxuICAgICAgICAgICAgc2hvd0RldGFpbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNyZWF0ZUdyaWRGb3JtYXQ6IGZ1bmN0aW9uICgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJQb3ZvbGVuaURlbmlrdUR0bz4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJQb3ZvbGVuaURlbmlrdUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzYWJsb25hXCIsIGNhcHRpb246IFwianJlczoyNTgwMDA1MVwiLCB3aWR0aDogMTUwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KS8vUkMgMjU4MDAwNTEgOiBGb3JtdWzDocWZXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBycnNmcm1fbmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDA0XCIsIHdpZHRoOiAyNTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pOy8vUkMgMjU4MDAwMDQgOiBOw6F6ZXZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3BlbkRldGFpbDogZnVuY3Rpb24gKHJvdzogYW55LCByZXppbTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LCBncmlkUmM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+IHwgdW5kZWZpbmVkLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbW9kYWw6IGJvb2xlYW4pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXhzUmFkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNhYmxvbmE7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93ICE9IG51bGwgJiYgcm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4c1JhZCA9IHJvdy5peHNfcmFkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhYmxvbmEgPSByb3cuc2FibG9uYTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kZXRhaWxDb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHNSYWQgPSB0aGlzLmRldGFpbENvbnRlbnQub3JpZ2luYWxNb2RlbC5peHNfcmFkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFpbENvbnRlbnQuZGlhbG9ncy5zaG93V2luZG93KFtcIkdvcmRpYy5QcnIuVUlXZWJDbGllbnQuR0RldGFpbEZvcm11bGFyRGVuaWt1XCIsIHsgR3JpZFJjOiBncmlkUmMsIFJlemltRGV0YWlsdTogcmV6aW0gfV0sIHtcclxuICAgICAgICAgICAgICAgICAgICBJeHNSYWQ6IGl4c1JhZCxcclxuICAgICAgICAgICAgICAgICAgICBTYWJsb25hOiBzYWJsb25hLFxyXG4gICAgICAgICAgICAgICAgICAgIE1wOiBtcCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfZm9ybXVsYXJfZGVuaWt1XCJcclxuICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IG1vZGFsIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL2FkZGl0aW9uYWxBY3Rpb25zOiB7XHJcbiAgICAgICAgICAgIC8vICAgIGFjdFRlc3Q6XHJcbiAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiVGVzdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coXCJUVFRURVNUICEhIVwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgIC8vYWRkaXRpb25hbE1lbnU6IFsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiBcImFjdFRlc3RcIiwgZmF2b3JpdGU6IHRydWUgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9dLFxyXG4gICAgICAgICAgICAvL2FkZGl0aW9uYWxDb250ZXh0TWVudTogW1wiYWN0VGVzdFwiXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19
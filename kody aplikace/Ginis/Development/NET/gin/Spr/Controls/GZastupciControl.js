"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GZastupciControl(content) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                return $.extend({}, predek, {
                    idSettings: "GZastupciControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GZastupciControl"),
                    searchColumns: ["ixs_esu_txt", "ixs_dva_nazev"],
                    showDelete: false,
                    showRestore: false,
                    showFilters: false,
                    gridAutofitEnabled: false,
                    createGridFormat: function () {
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        //if ((window as any).ginisDebugMode) {
                        //    gridFormat = gridFormat.addTextColumn({ name: "ixp_spis", caption: "IXP_SPIS", width: 150, fixedWidth: false });
                        //}
                        gridFormat = gridFormat
                            .addIconColumn({
                            name: "zmena_esu",
                            caption: "jres:35600005", //RC 35600005 : Změna
                            width: 20,
                            fixedWidth: false,
                            iconTemplate: (val) => {
                                if (val.zmena_esu == 1)
                                    return { icon: "fa-exclamation-triangle g-state-text g-state-warning" };
                                else
                                    return { icon: "" };
                            }
                        })
                            .addTextColumn({
                            name: "ixs_esu_txt",
                            caption: "jres:25200083", //RC 25200083 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ixs_dva_nazev",
                            caption: "jres:25200084", //RC 25200084 : Typ
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:25200088", //RC 25200088 : Poznámka
                            width: 300,
                            fragment: ""
                        });
                        return gridFormat;
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var ixpSpis;
                        var ixsEsu;
                        var licZast;
                        var porZast;
                        if (row != null && row != undefined) {
                            ixpSpis = row.ixp_spis;
                            ixsEsu = row.ixs_esu;
                            licZast = row.lic_zast;
                            porZast = row.por_zast;
                        }
                        else if (this.detailContent != null) {
                            ixpSpis = this.detailContent.originalModel.ixp_spis;
                        }
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailZastupce", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpSpis: ixpSpis,
                            IxsEsu: ixsEsu,
                            //TypVazby: typVazby, ... Neni potreba. Bude vzdy Gordic.Spr.Interface.TypSubjektuEnum.Zastupce
                            LicZast: licZast,
                            PorZast: porZast,
                            Id: "detail_zastupce"
                        });
                    }
                });
            }
            WebApp.GZastupciControl = GZastupciControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1phc3R1cGNpQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdaYXN0dXBjaUNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTJFZjtBQTNFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyRW5CO0lBM0VnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0EyRTFCO1FBM0VvQixXQUFBLE1BQU07WUFDdkIsU0FBZ0IsZ0JBQWdCLENBQUMsT0FBZ0s7Z0JBQzdMLE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFzRSxDQUFDO2dCQUNuSCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRTtvQkFDeEIsVUFBVSxFQUFFLGtCQUFrQjtvQkFDOUIsYUFBYSxFQUFFLE9BQU87b0JBQ3RCLGNBQWMsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsb0NBQW9DLENBQUM7b0JBQ2xGLGFBQWEsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUM7b0JBQy9DLFVBQVUsRUFBRSxLQUFLO29CQUNqQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLGtCQUFrQixFQUFFLEtBQUs7b0JBQ3pCLGdCQUFnQixFQUFFO3dCQUNkLElBQUksVUFBMkUsQ0FBQzt3QkFDaEYsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQTJDLENBQUM7d0JBQ25GLHVDQUF1Qzt3QkFDdkMsc0hBQXNIO3dCQUN0SCxHQUFHO3dCQUNILFVBQVUsR0FBRyxVQUFVOzZCQUNsQixhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCOzRCQUMvQyxLQUFLLEVBQUUsRUFBRTs0QkFDVCxVQUFVLEVBQUUsS0FBSzs0QkFDakIsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0NBQ2xCLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDO29DQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsc0RBQXNELEVBQUUsQ0FBQzs7b0NBQzNGLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7NEJBQzdCLENBQUM7eUJBQ0osQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCOzRCQUMvQyxLQUFLLEVBQUUsR0FBRzs0QkFDVixRQUFRLEVBQUUsRUFBRTt5QkFDZixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7NEJBQzdDLEtBQUssRUFBRSxHQUFHOzRCQUNWLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjs0QkFDbEQsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsUUFBUSxFQUFFLEVBQUU7eUJBQ2YsQ0FBQyxDQUFDO3dCQUNQLE9BQU8sVUFBVSxDQUFDO29CQUN0QixDQUFDO29CQUVELFVBQVUsRUFBRSxVQUFVLEdBQVEsRUFBRSxLQUFpRCxFQUFFLE1BQWlELEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxLQUFjO3dCQUMvSyxJQUFJLE9BQU8sQ0FBQzt3QkFDWixJQUFJLE1BQU0sQ0FBQzt3QkFDWCxJQUFJLE9BQU8sQ0FBQzt3QkFDWixJQUFJLE9BQU8sQ0FBQzt3QkFDWixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDOzRCQUNsQyxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQzs0QkFDdkIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7NEJBQ3JCLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDOzRCQUN2QixPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQzt3QkFDM0IsQ0FBQzs2QkFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ3BDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7d0JBQ3hELENBQUM7d0JBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1DQUFtQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTs0QkFDL0csT0FBTyxFQUFFLE9BQU87NEJBQ2hCLE1BQU0sRUFBRSxNQUFNOzRCQUNkLCtGQUErRjs0QkFDL0YsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixFQUFFLEVBQUUsaUJBQWlCO3lCQUN4QixDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1lBekVlLHVCQUFnQixtQkF5RS9CLENBQUE7UUFDTCxDQUFDLEVBM0VvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUEyRTFCO0lBQUQsQ0FBQyxFQTNFZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkVuQjtBQUFELENBQUMsRUEzRVMsTUFBTSxLQUFOLE1BQU0sUUEyRWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdaYXN0dXBjaUNvbnRyb2woY29udGVudDogKEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucykgfCAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKSk6IEdDb250ZW50IHtcclxuICAgICAgICBjb25zdCBwcmVkZWsgPSAoR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCBhcyBhbnkgYXMgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCk7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBwcmVkZWssIHtcclxuICAgICAgICAgICAgaWRTZXR0aW5nczogXCJHWmFzdHVwY2lDb250cm9sXCIsXHJcbiAgICAgICAgICAgIGRldGFpbENvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgIHNlcnZpY2VDb250ZW50OiBjb250ZW50LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlNwci5XZWJBcHAuR1phc3R1cGNpQ29udHJvbFwiKSxcclxuICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhzX2VzdV90eHRcIiwgXCJpeHNfZHZhX25hemV2XCJdLCAgXHJcbiAgICAgICAgICAgIHNob3dEZWxldGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93UmVzdG9yZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dGaWx0ZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZEF1dG9maXRFbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY3JlYXRlR3JpZEZvcm1hdDogZnVuY3Rpb24gKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbVphc3R1cGN1RHRvPiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtWmFzdHVwY3VEdG8+O1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1aYXN0dXBjdUR0bz4oKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKCh3aW5kb3cgYXMgYW55KS5naW5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwX3NwaXNcIiwgY2FwdGlvbjogXCJJWFBfU1BJU1wiLCB3aWR0aDogMTUwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbmFfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTYwMDAwNVwiLCAvL1JDIDM1NjAwMDA1IDogWm3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbC56bWVuYV9lc3UgPT0gMSkgcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHsgaWNvbjogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDgzXCIsIC8vUkMgMjUyMDAwODMgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHZhX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA4NFwiLCAvL1JDIDI1MjAwMDg0IDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDg4XCIsIC8vUkMgMjUyMDAwODggOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0OyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG9wZW5EZXRhaWw6IGZ1bmN0aW9uIChyb3c6IGFueSwgcmV6aW06IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dSwgZ3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG1vZGFsOiBib29sZWFuKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhwU3BpcztcclxuICAgICAgICAgICAgICAgIHZhciBpeHNFc3U7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGljWmFzdDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3JaYXN0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsICYmIHJvdyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBTcGlzID0gcm93Lml4cF9zcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGl4c0VzdSA9IHJvdy5peHNfZXN1OyAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGljWmFzdCA9IHJvdy5saWNfemFzdDtcclxuICAgICAgICAgICAgICAgICAgICBwb3JaYXN0ID0gcm93LnBvcl96YXN0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRldGFpbENvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cFNwaXMgPSB0aGlzLmRldGFpbENvbnRlbnQub3JpZ2luYWxNb2RlbC5peHBfc3BpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxDb250ZW50Lm5hdmlnYXRlKFtcIkdvcmRpYy5TcHIuV2ViQXBwLkdEZXRhaWxaYXN0dXBjZVwiLCB7IEdyaWRSYzogZ3JpZFJjLCBSZXppbURldGFpbHU6IHJlemltIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgSXhwU3BpczogaXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICBJeHNFc3U6IGl4c0VzdSxcclxuICAgICAgICAgICAgICAgICAgICAvL1R5cFZhemJ5OiB0eXBWYXpieSwgLi4uIE5lbmkgcG90cmViYS4gQnVkZSB2emR5IEdvcmRpYy5TcHIuSW50ZXJmYWNlLlR5cFN1Ympla3R1RW51bS5aYXN0dXBjZVxyXG4gICAgICAgICAgICAgICAgICAgIExpY1phc3Q6IGxpY1phc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgUG9yWmFzdDogcG9yWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfemFzdHVwY2VcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==
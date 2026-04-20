"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GOUOControl(content) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                return $.extend({}, predek, {
                    idSettings: "GOUOControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GOUOControl"),
                    searchColumns: ["nazev_ouo"],
                    showDelete: false,
                    showRestore: false,
                    showFilters: false,
                    //showResizersOnTab: true,
                    gridAutofitEnabled: false,
                    createGridFormat: function () {
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        if (window.ginisDebugMode) {
                            gridFormat = gridFormat.addTextColumn({ name: "ixp_ouo", caption: "IXP_OUO", width: 150, fixedWidth: false });
                        }
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "nazev_ouo",
                            caption: "jres:25200083", //RC 25200083 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "typ_ouo_txt",
                            caption: "jres:25200084", //RC 25200084 : Typ
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ucinnost_txt",
                            caption: "jres:25200198", //RC 25200198 : Účinnost
                            width: 300,
                            fragment: ""
                        })
                            .addDateColumn({
                            name: "dat_roz_pov",
                            caption: "jres:25200199", //RC 25200199 : Datum pověření
                            width: 150,
                            fragment: ""
                        })
                            .addDateColumn({
                            name: "dat_roz_odv",
                            caption: "jres:25200200", //RC 25200200 : Datum odvolání
                            width: 150,
                            fragment: ""
                        });
                        return gridFormat;
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var that = this;
                        var ixpSpis;
                        var ixsOuo;
                        //var typVazby;
                        //var licZast;
                        //var porZast;
                        if (row != null && row != undefined) {
                            ixpSpis = row.ixp_spis;
                            ixsOuo = row.ixs_ouo;
                            //ixsEsu = row.ixs_esu;
                            //typVazby = row.typ_vazby;
                            //licZast = row.lic_zast;
                            //porZast = row.por_zast;
                        }
                        else if (this.detailContent != null) {
                            ixpSpis = this.detailContent.originalModel.ixp_spis;
                        }
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailOUO", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpSpis: ixpSpis,
                            IxsOuo: ixsOuo,
                            IxsDsr: content.model.ixs_dsr,
                            //IxsEsu: ixsEsu,
                            //TypVazby: typVazby,
                            //LicZast: licZast,
                            //PorZast: porZast,
                            Id: "detail_ouo"
                        });
                    }
                });
            }
            WebApp.GOUOControl = GOUOControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09VT0NvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHT1VPQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBcUZmO0FBckZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFGbkI7SUFyRmdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQXFGMUI7UUFyRm9CLFdBQUEsTUFBTTtZQUN2QixTQUFnQixXQUFXLENBQUMsT0FBZ0s7Z0JBQ3hMLE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFzRSxDQUFDO2dCQUNuSCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRTtvQkFDeEIsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLGFBQWEsRUFBRSxPQUFPO29CQUN0QixjQUFjLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLCtCQUErQixDQUFDO29CQUM3RSxhQUFhLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQzVCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLDBCQUEwQjtvQkFDMUIsa0JBQWtCLEVBQUUsS0FBSztvQkFFekIsZ0JBQWdCLEVBQUU7d0JBQ2QsSUFBSSxVQUFnRixDQUFDO3dCQUNyRixVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBZ0QsQ0FBQzt3QkFDeEYsSUFBSyxNQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ2pDLFVBQVUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQ2xILENBQUM7d0JBQ0QsVUFBVSxHQUFHLFVBQVU7NkJBQ2xCLGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7NEJBQy9DLEtBQUssRUFBRSxHQUFHOzRCQUNWLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxhQUFhOzRCQUNuQixPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjs0QkFDN0MsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsUUFBUSxFQUFFLEVBQUU7eUJBQ2YsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCOzRCQUNsRCxLQUFLLEVBQUUsR0FBRzs0QkFDVixRQUFRLEVBQUUsRUFBRTt5QkFDZixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7NEJBQ3hELEtBQUssRUFBRSxHQUFHOzRCQUNWLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxhQUFhOzRCQUNuQixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4Qjs0QkFDeEQsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsUUFBUSxFQUFFLEVBQUU7eUJBQ2YsQ0FBQyxDQUFDO3dCQUNQLE9BQU8sVUFBVSxDQUFDO29CQUN0QixDQUFDO29CQUVELFVBQVUsRUFBRSxVQUFVLEdBQVEsRUFBRSxLQUFpRCxFQUFFLE1BQWlELEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxLQUFjO3dCQUMvSyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2hCLElBQUksT0FBTyxDQUFDO3dCQUNaLElBQUksTUFBTSxDQUFDO3dCQUNYLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7NEJBQ2xDLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDOzRCQUN2QixNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQTs0QkFDcEIsdUJBQXVCOzRCQUN2QiwyQkFBMkI7NEJBQzNCLHlCQUF5Qjs0QkFDekIseUJBQXlCO3dCQUM3QixDQUFDOzZCQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzt3QkFDeEQsQ0FBQzt3QkFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsOEJBQThCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFOzRCQUMxRyxPQUFPLEVBQUUsT0FBTzs0QkFDaEIsTUFBTSxFQUFFLE1BQU07NEJBQ2QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTzs0QkFDN0IsaUJBQWlCOzRCQUNqQixxQkFBcUI7NEJBQ3JCLG1CQUFtQjs0QkFDbkIsbUJBQW1COzRCQUNuQixFQUFFLEVBQUUsWUFBWTt5QkFDbkIsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQW5GZSxrQkFBVyxjQW1GMUIsQ0FBQTtRQUNMLENBQUMsRUFyRm9CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQXFGMUI7SUFBRCxDQUFDLEVBckZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxRm5CO0FBQUQsQ0FBQyxFQXJGUyxNQUFNLEtBQU4sTUFBTSxRQXFGZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR09VT0NvbnRyb2woY29udGVudDogKEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucykgfCAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKSk6IEdDb250ZW50IHtcclxuICAgICAgICBjb25zdCBwcmVkZWsgPSAoR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCBhcyBhbnkgYXMgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCk7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBwcmVkZWssIHtcclxuICAgICAgICAgICAgaWRTZXR0aW5nczogXCJHT1VPQ29udHJvbFwiLFxyXG4gICAgICAgICAgICBkZXRhaWxDb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICBzZXJ2aWNlQ29udGVudDogY29udGVudC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5TcHIuV2ViQXBwLkdPVU9Db250cm9sXCIpLFxyXG4gICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJuYXpldl9vdW9cIl0sXHJcbiAgICAgICAgICAgIHNob3dEZWxldGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93UmVzdG9yZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dGaWx0ZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgLy9zaG93UmVzaXplcnNPblRhYjogdHJ1ZSxcclxuICAgICAgICAgICAgZ3JpZEF1dG9maXRFbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZUdyaWRGb3JtYXQ6IGZ1bmN0aW9uICgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1PdW9Qcm9TcHJTcGlzRHRvPiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtT3VvUHJvU3ByU3Bpc0R0bz47XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbU91b1Byb1NwclNwaXNEdG8+KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLmdpbmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwX291b1wiLCBjYXB0aW9uOiBcIklYUF9PVU9cIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9vdW9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDgzXCIsIC8vUkMgMjUyMDAwODMgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfb3VvX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAwODRcIiwgLy9SQyAyNTIwMDA4NCA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjaW5ub3N0X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxOThcIiwgLy9SQyAyNTIwMDE5OCA6IMOaxI1pbm5vc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcm96X3BvdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxOTlcIiwgLy9SQyAyNTIwMDE5OSA6IERhdHVtIHBvdsSbxZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Jvel9vZHZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjAwXCIsIC8vUkMgMjUyMDAyMDAgOiBEYXR1bSBvZHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvcGVuRGV0YWlsOiBmdW5jdGlvbiAocm93OiBhbnksIHJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUsIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBtb2RhbDogYm9vbGVhbik6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4cFNwaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhzT3VvO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgdHlwVmF6Ynk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBsaWNaYXN0O1xyXG4gICAgICAgICAgICAgICAgLy92YXIgcG9yWmFzdDtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiByb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwU3BpcyA9IHJvdy5peHBfc3BpcztcclxuICAgICAgICAgICAgICAgICAgICBpeHNPdW8gPSByb3cuaXhzX291b1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaXhzRXN1ID0gcm93Lml4c19lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90eXBWYXpieSA9IHJvdy50eXBfdmF6Ynk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9saWNaYXN0ID0gcm93LmxpY196YXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcG9yWmFzdCA9IHJvdy5wb3JfemFzdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kZXRhaWxDb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBTcGlzID0gdGhpcy5kZXRhaWxDb250ZW50Lm9yaWdpbmFsTW9kZWwuaXhwX3NwaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsQ29udGVudC5uYXZpZ2F0ZShbXCJHb3JkaWMuU3ByLldlYkFwcC5HRGV0YWlsT1VPXCIsIHsgR3JpZFJjOiBncmlkUmMsIFJlemltRGV0YWlsdTogcmV6aW0gfV0sIHtcclxuICAgICAgICAgICAgICAgICAgICBJeHBTcGlzOiBpeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4c091bzogaXhzT3VvLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4c0RzcjogY29udGVudC5tb2RlbC5peHNfZHNyLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vSXhzRXN1OiBpeHNFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UeXBWYXpieTogdHlwVmF6YnksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9MaWNaYXN0OiBsaWNaYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vUG9yWmFzdDogcG9yWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfb3VvXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
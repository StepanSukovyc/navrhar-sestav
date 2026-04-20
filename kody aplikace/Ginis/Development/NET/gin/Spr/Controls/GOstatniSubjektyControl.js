"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GOstatniSubjektyControl(content) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                return $.extend({}, predek, {
                    idSettings: "GOstatniSubjektyControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GOstatniSubjektyControl"),
                    searchColumns: ["ixs_esu_txt", "ixs_dva_nazev", "zastupce"],
                    showDelete: false,
                    showRestore: false,
                    showFilters: false,
                    gridAutofitEnabled: false,
                    createGridFormat: function () {
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        if (window.ginisDebugMode) {
                            gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                        }
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
                            caption: "jres:25200085", //RC 25200085 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ixs_dva_nazev",
                            caption: "jres:25200086", //RC 25200086 : Typ
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "zastupce",
                            caption: "jres:25200087", //RC 25200087 : Zástupce subjektu
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
                        var typVazby;
                        var licZast;
                        var porZast;
                        if (row != null && row != undefined) {
                            ixpSpis = row.ixp_spis;
                            ixsEsu = row.ixs_esu;
                            typVazby = row.typ_vazby;
                            licZast = row.lic_zast;
                            porZast = row.por_zast;
                        }
                        else if (this.detailContent != null) {
                            ixpSpis = this.detailContent.originalModel.ixp_spis;
                        }
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailOstatnihoSubjektu", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpSpis: ixpSpis,
                            IxsEsu: ixsEsu,
                            TypVazby: typVazby,
                            LicZast: licZast,
                            PorZast: porZast,
                            Id: "detail_ostatniho_subjektu"
                        });
                    }
                });
            }
            WebApp.GOstatniSubjektyControl = GOstatniSubjektyControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09zdGF0bmlTdWJqZWt0eUNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHT3N0YXRuaVN1Ympla3R5Q29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBbUZmO0FBbkZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1GbkI7SUFuRmdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQW1GMUI7UUFuRm9CLFdBQUEsTUFBTTtZQUN2QixTQUFnQix1QkFBdUIsQ0FBQyxPQUFnSztnQkFDcE0sTUFBTSxNQUFNLEdBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQXNFLENBQUM7Z0JBQ25ILE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO29CQUN4QixVQUFVLEVBQUUseUJBQXlCO29CQUNyQyxhQUFhLEVBQUUsT0FBTztvQkFDdEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQywyQ0FBMkMsQ0FBQztvQkFDekYsYUFBYSxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7b0JBQzNELFVBQVUsRUFBRSxLQUFLO29CQUNqQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLGtCQUFrQixFQUFFLEtBQUs7b0JBQ3pCLGdCQUFnQixFQUFFO3dCQUNkLElBQUksVUFBb0YsQ0FBQzt3QkFDekYsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQW9ELENBQUM7d0JBQzVGLElBQUssTUFBYyxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUNqQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FB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MUI7SUFBRCxDQUFDLEVBbkZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFtRm5CO0FBQUQsQ0FBQyxFQW5GUyxNQUFNLEtBQU4sTUFBTSxRQW1GZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR09zdGF0bmlTdWJqZWt0eUNvbnRyb2woY29udGVudDogKEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucykgfCAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKSk6IEdDb250ZW50IHtcclxuICAgICAgICBjb25zdCBwcmVkZWsgPSAoR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCBhcyBhbnkgYXMgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCk7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBwcmVkZWssIHtcclxuICAgICAgICAgICAgaWRTZXR0aW5nczogXCJHT3N0YXRuaVN1Ympla3R5Q29udHJvbFwiLFxyXG4gICAgICAgICAgICBkZXRhaWxDb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICBzZXJ2aWNlQ29udGVudDogY29udGVudC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5TcHIuV2ViQXBwLkdPc3RhdG5pU3ViamVrdHlDb250cm9sXCIpLFxyXG4gICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJpeHNfZXN1X3R4dFwiLCBcIml4c19kdmFfbmF6ZXZcIiwgXCJ6YXN0dXBjZVwiXSwgIFxyXG4gICAgICAgICAgICBzaG93RGVsZXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1Jlc3RvcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93RmlsdGVyczogZmFsc2UsXHJcbiAgICAgICAgICAgIGdyaWRBdXRvZml0RW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNyZWF0ZUdyaWRGb3JtYXQ6IGZ1bmN0aW9uICgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Pc3RhdG5pY2hTdWJqZWt0dUR0bz4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbU9zdGF0bmljaFN1Ympla3R1RHRvPjtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtT3N0YXRuaWNoU3ViamVrdHVEdG8+KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLmdpbmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2VzdVwiLCBjYXB0aW9uOiBcIklYU19FU1VcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVuYV9lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1NjAwMDA1XCIsIC8vUkMgMzU2MDAwMDUgOiBabcSbbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsLnptZW5hX2VzdSA9PSAxKSByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4geyBpY29uOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAwODVcIiwgLy9SQyAyNTIwMDA4NSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDg2XCIsIC8vUkMgMjUyMDAwODYgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YXN0dXBjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAwODdcIiwgLy9SQyAyNTIwMDA4NyA6IFrDoXN0dXBjZSBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA4OFwiLCAvL1JDIDI1MjAwMDg4IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvcGVuRGV0YWlsOiBmdW5jdGlvbiAocm93OiBhbnksIHJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUsIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBtb2RhbDogYm9vbGVhbik6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4cFNwaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhzRXN1O1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cFZhemJ5O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpY1phc3Q7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9yWmFzdDtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiByb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwU3BpcyA9IHJvdy5peHBfc3BpcztcclxuICAgICAgICAgICAgICAgICAgICBpeHNFc3UgPSByb3cuaXhzX2VzdTsgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwVmF6YnkgPSByb3cudHlwX3ZhemJ5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxpY1phc3QgPSByb3cubGljX3phc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9yWmFzdCA9IHJvdy5wb3JfemFzdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kZXRhaWxDb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBTcGlzID0gdGhpcy5kZXRhaWxDb250ZW50Lm9yaWdpbmFsTW9kZWwuaXhwX3NwaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsQ29udGVudC5uYXZpZ2F0ZShbXCJHb3JkaWMuU3ByLldlYkFwcC5HRGV0YWlsT3N0YXRuaWhvU3ViamVrdHVcIiwgeyBHcmlkUmM6IGdyaWRSYywgUmV6aW1EZXRhaWx1OiByZXppbSB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IGl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhzRXN1OiBpeHNFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwVmF6Ynk6IHR5cFZhemJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIExpY1phc3Q6IGxpY1phc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgUG9yWmFzdDogcG9yWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfb3N0YXRuaWhvX3N1Ympla3R1XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
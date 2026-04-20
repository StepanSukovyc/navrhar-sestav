"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GVecnaPrislusnostControl(content, typVazby) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                var con = content.createServiceContent("Gordic.Spr.WebApp.GVecnaPrislusnostControl");
                return $.extend({}, predek, {
                    idSettings: "GVecnaPrislusnostControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent({ className: "Gordic.Spr.WebApp.GVecnaPrislusnostControl", serverParams: { TypVazby: typVazby } }),
                    searchColumns: ["zakon_txt"],
                    showNew: false,
                    showDelete: true,
                    showRestore: false,
                    showFilters: false,
                    showReload: true,
                    showDetail: false,
                    additionalActions: [
                        new GAction({
                            name: "actPridat",
                            caption: "jres:25200236", //RC 25200236 : Přidat
                            favorite: true,
                            icon: "fa-plus",
                            run: function () {
                                let currentContent = $.content(this);
                                var width = 650;
                                var height = 650;
                                var modal = true;
                                var druhZar = content.model.druh_zar;
                                currentContent.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberVecnePrislusnostiProSpis", { serverParams: { TypVazby: typVazby, DruhZar: druhZar } }], {
                                    IxpSpis: currentContent.parentContent.IxpSpis,
                                    IxsVpr: currentContent.parentContent.IxpVpr,
                                }, { width: width, height: height, modal: modal })
                                    .on("close", (retValue, filter) => {
                                    if (filter != undefined) {
                                        if (filter.ixp_spis != null && filter.ixs_vpr != null) {
                                            con.call("PridatVpr", filter);
                                        }
                                        else {
                                            filter.ixs_vpr = "";
                                            filter.ixp_spis = "";
                                        }
                                    }
                                })
                                    .on("close", () => {
                                    currentContent.reloadData();
                                });
                            }
                        })
                    ],
                    additionalMenu: [
                        { id: "pridat", action: "actPridat", favorite: true },
                    ],
                    currentContent: $.content(),
                    createGridFormat: function () {
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        // Věcná příslušnost - zařízení
                        if (typVazby == 10) {
                            gridFormat = gridFormat
                                .addTextColumn({
                                name: "paragraf",
                                caption: "jres:25500102", //RC 25500102 : Paragraf
                                width: 80,
                                fragment: ""
                            })
                                .addTextColumn({
                                name: "zakon_txt",
                                caption: "jres:25500100", //RC 25500100 : Zařízení
                                width: 120,
                                fragment: ""
                            })
                                .addTextColumn({
                                name: "pismeno",
                                caption: "jres:25500104", //RC 25500104 : Písmeno
                                width: 80,
                                fragment: ""
                            })
                                .addTextColumn({
                                name: "poznamka",
                                caption: "jres:25200058", //RC 25200058 : Poznámka
                                width: 300,
                                fragment: ""
                            });
                        }
                        // Věcná příslušnost - státní dozor
                        else if (typVazby == 20) {
                            gridFormat = gridFormat
                                .addNumberColumn({
                                name: "kategorie",
                                caption: "jres:25500105", //RC 25500105 : Číslo kategorie
                                width: 150,
                                fragment: ""
                            })
                                .addTextColumn({
                                name: "zakon_txt",
                                caption: "jres:25500106", //RC 25500106 : Kategorie nedostatků
                                width: 300,
                                fragment: ""
                            });
                        }
                        // Věcná příslušnost - obecná
                        else {
                            gridFormat = gridFormat
                                .addTextColumn({
                                name: "zakon_txt",
                                caption: "jres:25500107", //RC 25500107 : Zákon
                                width: 300,
                                fragment: "",
                                fixedWidth: false
                            })
                                .addTextColumn({
                                name: "poznamka",
                                caption: "jres:25200058", //RC 25200058 : Poznámka
                                width: 300,
                                fragment: "",
                                fixedWidth: false
                            });
                        }
                        return gridFormat;
                    },
                });
            }
            WebApp.GVecnaPrislusnostControl = GVecnaPrislusnostControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ZlY25hUHJpc2x1c25vc3RDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ZlY25hUHJpc2x1c25vc3RDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0EwSGY7QUExSEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMEhuQjtJQTFIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBMEgxQjtRQTFIb0IsV0FBQSxNQUFNO1lBQ3ZCLFNBQWdCLHdCQUF3QixDQUFDLE9BQWdLLEVBQUUsUUFBa0Q7Z0JBQ3pQLE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFzRSxDQUFDO2dCQUNuSCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsNENBQTRDLENBQUMsQ0FBQztnQkFDckYsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7b0JBQ3hCLFVBQVUsRUFBRSwwQkFBMEI7b0JBQ3RDLGFBQWEsRUFBRSxPQUFPO29CQUN0QixjQUFjLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsU0FBUyxFQUFFLDRDQUE0QyxFQUFFLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDO29CQUMvSSxhQUFhLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQzVCLE9BQU8sRUFBRSxLQUFLO29CQUNkLFVBQVUsRUFBRSxJQUFJO29CQUNoQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixVQUFVLEVBQUUsS0FBSztvQkFDakIsaUJBQWlCLEVBQUU7d0JBQ2YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxRQUFR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LFVBQUcsS0FBSCxVQUFHLFFBMEhuQjtBQUFELENBQUMsRUExSFMsTUFBTSxLQUFOLE1BQU0sUUEwSGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdWZWNuYVByaXNsdXNub3N0Q29udHJvbChjb250ZW50OiAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zKSB8IChHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbFJlbG9hZENvbXBvbmVudEV4dGVuc2lvbnMpLCB0eXBWYXpieTogR29yZGljLlNwci5JbnRlcmZhY2UuVHlwVmVjbmFQcmlzbHVzbm9zdCk6IEdDb250ZW50IHtcclxuICAgICAgICBjb25zdCBwcmVkZWsgPSAoR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCBhcyBhbnkgYXMgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbCk7XHJcbiAgICAgICAgdmFyIGNvbiA9IGNvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuU3ByLldlYkFwcC5HVmVjbmFQcmlzbHVzbm9zdENvbnRyb2xcIik7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBwcmVkZWssIHtcclxuICAgICAgICAgICAgaWRTZXR0aW5nczogXCJHVmVjbmFQcmlzbHVzbm9zdENvbnRyb2xcIixcclxuICAgICAgICAgICAgZGV0YWlsQ29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgc2VydmljZUNvbnRlbnQ6IGNvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoeyBjbGFzc05hbWU6IFwiR29yZGljLlNwci5XZWJBcHAuR1ZlY25hUHJpc2x1c25vc3RDb250cm9sXCIsIHNlcnZlclBhcmFtczogeyBUeXBWYXpieTogdHlwVmF6YnkgfSB9KSxcclxuICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiemFrb25fdHh0XCJdLFxyXG4gICAgICAgICAgICBzaG93TmV3OiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0RlbGV0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd1Jlc3RvcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93RmlsdGVyczogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dSZWxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dEZXRhaWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsQWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjM2XCIsIC8vUkMgMjUyMDAyMzYgOiBQxZlpZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sPih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gNjUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gNjUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHJ1aFphciA9IGNvbnRlbnQubW9kZWwuZHJ1aF96YXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LmRpYWxvZ3Muc2hvd1dpbmRvdyhbXCJHb3JkaWMuU3ByLldlYkFwcC5HVnliZXJWZWNuZVByaXNsdXNub3N0aVByb1NwaXNcIiwgeyBzZXJ2ZXJQYXJhbXM6IHsgVHlwVmF6Ynk6IHR5cFZhemJ5LCBEcnVoWmFyOiBkcnVoWmFyIH19XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwU3BpczogKGN1cnJlbnRDb250ZW50LnBhcmVudENvbnRlbnQgYXMgYW55KS5JeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzVnByOiAoY3VycmVudENvbnRlbnQucGFyZW50Q29udGVudCBhcyBhbnkpLkl4cFZwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChyZXRWYWx1ZSwgZmlsdGVyKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXhwX3NwaXMgIT0gbnVsbCAmJiBmaWx0ZXIuaXhzX3ZwciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb24uY2FsbChcIlByaWRhdFZwclwiLCBmaWx0ZXIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHNfdnByID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfc3BpcyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4geyAvL2V2LCByZXRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LnJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxNZW51OiBbXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcInByaWRhdFwiLCBhY3Rpb246IFwiYWN0UHJpZGF0XCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICBjdXJyZW50Q29udGVudDogJC5jb250ZW50PEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4oKSxcclxuICAgICAgICAgICAgY3JlYXRlR3JpZEZvcm1hdDogZnVuY3Rpb24gKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbVZQclByb1NwclNwaXNEdG8+IHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1WUHJQcm9TcHJTcGlzRHRvPjtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVlByUHJvU3ByU3Bpc0R0bz4oKTtcclxuICAgICAgICAgICAgICAgIC8vIFbEm2Nuw6EgcMWZw61zbHXFoW5vc3QgLSB6YcWZw616ZW7DrVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cFZhemJ5ID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXJhZ3JhZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTAyXCIsIC8vUkMgMjU1MDAxMDIgOiBQYXJhZ3JhZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YWtvbl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDEwMFwiLCAvL1JDIDI1NTAwMTAwIDogWmHFmcOtemVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpc21lbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDEwNFwiLCAvL1JDIDI1NTAwMTA0IDogUMOtc21lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA1OFwiLCAvL1JDIDI1MjAwMDU4IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFbEm2Nuw6EgcMWZw61zbHXFoW5vc3QgLSBzdMOhdG7DrSBkb3pvclxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwVmF6YnkgPT0gMjApIHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2F0ZWdvcmllXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAxMDVcIiwgLy9SQyAyNTUwMDEwNSA6IMSMw61zbG8ga2F0ZWdvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YWtvbl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDEwNlwiLCAvL1JDIDI1NTAwMTA2IDogS2F0ZWdvcmllIG5lZG9zdGF0a8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFbEm2Nuw6EgcMWZw61zbHXFoW5vc3QgLSBvYmVjbsOhXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpha29uX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTA3XCIsIC8vUkMgMjU1MDAxMDcgOiBaw6Frb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA1OFwiLCAvL1JDIDI1MjAwMDU4IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0gIl19
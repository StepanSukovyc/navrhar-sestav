"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GDotceneOrganyControl(content) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                var con = content.createServiceContent("Gordic.Spr.WebApp.GDotceneOrganyControl");
                return $.extend({}, predek, {
                    idSettings: "GDotceneOrganyControl",
                    detailContent: content,
                    serviceContent: con,
                    searchColumns: ["ixs_esu_txt", "ixs_esu_txt"],
                    showDelete: false,
                    showRestore: false,
                    showFilters: false,
                    gridAutofitEnabled: false,
                    additionalActions: [
                        new GAction({
                            name: "actSkupiny",
                            caption: "jres:25200191", //RC 25200191 : Skupiny
                            run: function (ev, obj) {
                                var that = this;
                                con.call("GetSSLCjSpis", { ixpSpis: content.IxpSpis })
                                    .done(function (SSLCjSpis) {
                                    let currentContent = $.content(that);
                                    var Logovani = {
                                        Ixp: content.IxpSpis,
                                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                                        AktZnacka: SSLCjSpis,
                                        DuvodHledaniTxt: WebApp.VyberEsu_DuvodHledaniTxt
                                    };
                                    var options = {
                                        ID: "ESUSkupinyEsuDlg#",
                                        Logovani: Logovani,
                                        SkupinyWorkingMode: 1
                                    };
                                    Gordic.Esu.Dialogs.RozdelovnikEsuDlg(content, options)?.on("close", function (ev, retVal) {
                                        if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {
                                            let pocet = retVal.subjekty.length;
                                            let i = 0;
                                            retVal.subjekty.forEach(function (row) {
                                                con.call("PridatEsuZeSkupiny", { ixpSpis: content.IxpSpis, ixsEsu: row.ixs_esu, ixsDva: row.ixs_dva }, {})
                                                    .done(function (ret) {
                                                    i += 1;
                                                    if (i == pocet)
                                                        currentContent.reloadData();
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        })
                    ],
                    additionalMenu: [
                        { id: "skupiny", action: "actSkupiny", favorite: true },
                    ],
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
                            caption: "jres:25200083", //RC 25200083 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ixs_dva_nazev",
                            caption: "jres:25200084", //RC 25200084 : Typ
                            width: 300,
                            fragment: ""
                        });
                        return gridFormat;
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var that = this;
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
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailDO", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpSpis: ixpSpis,
                            IxsEsu: ixsEsu,
                            TypVazby: typVazby,
                            LicZast: licZast,
                            PorZast: porZast,
                            Id: "detail_dotceneho_organu"
                        });
                    }
                });
            }
            WebApp.GDotceneOrganyControl = GDotceneOrganyControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RvdGNlbmVPcmdhbnlDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RvdGNlbmVPcmdhbnlDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FtSGY7QUFuSEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbUhuQjtJQW5IZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBbUgxQjtRQW5Ib0IsV0FBQSxNQUFNO1lBQ3ZCLFNBQWdCLHFCQUFxQixDQUFDLE9BQWdLO2dCQUNsTSxNQUFNLE1BQU0sR0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBc0UsQ0FBQztnQkFDbkgsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLHlDQUF5QyxDQUFDLENBQUM7Z0JBQ2xGLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO29CQUN4QixVQUFVLEVBQUUsdUJBQXVCO29CQUNuQyxhQUFhLEVBQUUsT0FBTztvQkFDdEIsY0FBYyxFQUFFLEdBQUc7b0JBQ25CLGFBQWEsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUM7b0JBQzdDLFVBQVUsRUFBRSxLQUFLO29CQUNqQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLGtCQUFrQixFQUFFLEtBQUs7b0JBQ3pCLGlCQUFpQixFQUFFO3dCQUNmLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxZQUFZOzRCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLHVCQUF1Qjs0QkFDakQsR0FBRyxFQUFFLFVBQXlCLEVBQUUsRUFBRSxHQUFHO2dDQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0NBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFHLE9BQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztx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QkFBNkIsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7NEJBQ3pHLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixNQUFNLEVBQUUsTUFBTTs0QkFDZCxRQUFRLEVBQUUsUUFBUTs0QkFDbEIsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixFQUFFLEVBQUUseUJBQXlCO3lCQUNoQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1lBakhlLDRCQUFxQix3QkFpSHBDLENBQUE7UUFDTCxDQUFDLEVBbkhvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUFtSDFCO0lBQUQsQ0FBQyxFQW5IZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbUhuQjtBQUFELENBQUMsRUFuSFMsTUFBTSxLQUFOLE1BQU0sUUFtSGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdEb3RjZW5lT3JnYW55Q29udHJvbChjb250ZW50OiAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zKSB8IChHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbFJlbG9hZENvbXBvbmVudEV4dGVuc2lvbnMpKTogR0NvbnRlbnQge1xyXG4gICAgICAgIGNvbnN0IHByZWRlayA9IChHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sIGFzIGFueSBhcyBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sKTtcclxuICAgICAgICB2YXIgY29uID0gY29udGVudC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5TcHIuV2ViQXBwLkdEb3RjZW5lT3JnYW55Q29udHJvbFwiKTtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIHByZWRlaywge1xyXG4gICAgICAgICAgICBpZFNldHRpbmdzOiBcIkdEb3RjZW5lT3JnYW55Q29udHJvbFwiLFxyXG4gICAgICAgICAgICBkZXRhaWxDb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICBzZXJ2aWNlQ29udGVudDogY29uLFxyXG4gICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJpeHNfZXN1X3R4dFwiLCBcIml4c19lc3VfdHh0XCJdLCAgXHJcbiAgICAgICAgICAgIHNob3dEZWxldGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93UmVzdG9yZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dGaWx0ZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZEF1dG9maXRFbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgYWRkaXRpb25hbEFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNrdXBpbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxOTFcIiwgLy9SQyAyNTIwMDE5MSA6IFNrdXBpbnlcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uLmNhbGwoXCJHZXRTU0xDalNwaXNcIiwgeyBpeHBTcGlzOiAoY29udGVudCBhcyBhbnkpLkl4cFNwaXMgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChTU0xDalNwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sPih0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgTG9nb3ZhbmkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogKGNvbnRlbnQgYXMgYW55KS5JeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRG90Y2VuZWhvU3ViamVrdHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogU1NMQ2pTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFZ5YmVyRXN1X0R1dm9kSGxlZGFuaVR4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkVTVVNrdXBpbnlFc3VEbGcjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiBMb2dvdmFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2t1cGlueVdvcmtpbmdNb2RlOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LkRpYWxvZ3MuUm96ZGVsb3ZuaWtFc3VEbGcoY29udGVudCwgb3B0aW9ucyk/Lm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuc3ViamVrdHkgJiYgcmV0VmFsLnN1Ympla3R5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb2NldCA9IHJldFZhbC5zdWJqZWt0eS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRWYWwuc3ViamVrdHkuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uLmNhbGwoXCJQcmlkYXRFc3VaZVNrdXBpbnlcIiwgeyBpeHBTcGlzOiAoY29udGVudCBhcyBhbnkpLkl4cFNwaXMsIGl4c0VzdTogcm93Lml4c19lc3UsIGl4c0R2YTogcm93Lml4c19kdmEgfSwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IHBvY2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LnJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYWRkaXRpb25hbE1lbnU6IFtcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwic2t1cGlueVwiLCBhY3Rpb246IFwiYWN0U2t1cGlueVwiLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgY3JlYXRlR3JpZEZvcm1hdDogZnVuY3Rpb24gKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURvdGNlbnljaE9yZ2FudUR0bz4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURvdGNlbnljaE9yZ2FudUR0bz47XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURvdGNlbnljaE9yZ2FudUR0bz4oKTtcclxuICAgICAgICAgICAgICAgIGlmICgod2luZG93IGFzIGFueSkuZ2luaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHNfZXN1XCIsIGNhcHRpb246IFwiSVhTX0VTVVwiLCB3aWR0aDogMTUwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW5hX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU2MDAwMDVcIiwgLy9SQyAzNTYwMDAwNSA6IFptxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6ICh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwuem1lbmFfZXN1ID09IDEpIHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB7IGljb246IFwiXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA4M1wiLCAvL1JDIDI1MjAwMDgzIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YV9uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAwODRcIiwgLy9SQyAyNTIwMDA4NCA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgb3BlbkRldGFpbDogZnVuY3Rpb24gKHJvdzogYW55LCByZXppbTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LCBncmlkUmM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+IHwgdW5kZWZpbmVkLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbW9kYWw6IGJvb2xlYW4pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBpeHBTcGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4c0VzdTtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBWYXpieTtcclxuICAgICAgICAgICAgICAgIHZhciBsaWNaYXN0O1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvclphc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93ICE9IG51bGwgJiYgcm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cFNwaXMgPSByb3cuaXhwX3NwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzRXN1ID0gcm93Lml4c19lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwVmF6YnkgPSByb3cudHlwX3ZhemJ5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxpY1phc3QgPSByb3cubGljX3phc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9yWmFzdCA9IHJvdy5wb3JfemFzdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kZXRhaWxDb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBTcGlzID0gdGhpcy5kZXRhaWxDb250ZW50Lm9yaWdpbmFsTW9kZWwuaXhwX3NwaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsQ29udGVudC5uYXZpZ2F0ZShbXCJHb3JkaWMuU3ByLldlYkFwcC5HRGV0YWlsRE9cIiwgeyBHcmlkUmM6IGdyaWRSYywgUmV6aW1EZXRhaWx1OiByZXppbSB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IGl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhzRXN1OiBpeHNFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwVmF6Ynk6IHR5cFZhemJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIExpY1phc3Q6IGxpY1phc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgUG9yWmFzdDogcG9yWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfZG90Y2VuZWhvX29yZ2FudVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19
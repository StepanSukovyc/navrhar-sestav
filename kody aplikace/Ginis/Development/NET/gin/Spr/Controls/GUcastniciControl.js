"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GUcastniciControl(content, typVazby) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                var con = content.createServiceContent("Gordic.Spr.WebApp.GUcastniciControl");
                return $.extend({}, predek, {
                    idSettings: "GUcastniciControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent({ className: "Gordic.Spr.WebApp.GUcastniciControl", serverParams: { TypVazby: typVazby } }),
                    searchColumns: ["ixs_esu_txt", "ixs_dva_nazev"],
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
                            .addTextColumn({ name: "ixs_esu_txt", caption: "jres:25200055", width: 300, fixedWidth: false }) //RC 25200055 : Název
                            .addTextColumn({ name: "ixs_dva_nazev", caption: "jres:25200056", width: 150, fixedWidth: false }) //RC 25200056 : Typ
                            .addTextColumn({ name: "zastupce_txt", caption: "jres:25200057", width: 150, fixedWidth: false }) //RC 25200057 : Zástupce účastníka
                            .addTextColumn({ name: "poznamka", caption: "jres:25200058", width: 300, fixedWidth: false }); //RC 25200058 : Poznámka
                        return gridFormat;
                    },
                    additionalActions: [
                        new GAction({
                            name: "actSkupiny",
                            caption: "jres:25200191", //RC 25200191 : Skupiny
                            run: function () {
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
                                                con.call("PridatEsuZeSkupiny", { ixpSpis: content.IxpSpis, ixsEsu: row.ixs_esu, ixsDva: row.ixs_dva }, { TypVazby: typVazby })
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
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailUcastnika", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpSpis: ixpSpis,
                            IxsEsu: ixsEsu,
                            TypVazby: typVazby,
                            LicZast: licZast,
                            PorZast: porZast,
                            Rezim: rezim,
                            Id: "detail_ucastnika"
                        });
                    }
                });
            }
            WebApp.GUcastniciControl = GUcastniciControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjYXN0bmljaUNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWNhc3RuaWNpQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBeUdmO0FBekdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlHbkI7SUF6R2dCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQXlHMUI7UUF6R29CLFdBQUEsTUFBTTtZQUN2QixTQUFnQixpQkFBaUIsQ0FBQyxPQUFnSyxFQUFFLFFBQWdCO2dCQUNoTixNQUFNLE1BQU0sR0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBc0UsQ0FBQztnQkFDbkgsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLHFDQUFxQyxDQUFDLENBQUM7Z0JBQzlFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO29CQUN4QixVQUFVLEVBQUUsbUJBQW1CO29CQUMvQixhQUFhLEVBQUUsT0FBTztvQkFDdEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxxQ0FBcUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQztvQkFDeEksYUFBYSxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQztvQkFDL0MsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLFdBQVcsRUFBRSxLQUFLO29CQUNsQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsa0JBQWtCLEVBQUUsS0FBSztvQkFDekIsZ0JBQWdCLEVBQUU7d0JBQ2QsSUFBSSxVQUE0RSxDQUFDO3dCQUNqRixVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBNEMsQ0FBQzt3QkFDcEYsSUFBSyxNQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ2pDLFVBQVUsR0FB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Q0FBQyxRQUFRLENBQUM7NEJBQ3ZCLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO3dCQUMzQixDQUFDOzZCQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzt3QkFDeEQsQ0FBQzt3QkFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsb0NBQW9DLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFOzRCQUNoSCxPQUFPLEVBQUUsT0FBTzs0QkFDaEIsTUFBTSxFQUFFLE1BQU07NEJBQ2QsUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixPQUFPLEVBQUUsT0FBTzs0QkFDaEIsS0FBSyxFQUFFLEtBQUs7NEJBQ1osRUFBRSxFQUFFLGtCQUFrQjt5QkFDekIsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQXZHZSx3QkFBaUIsb0JBdUdoQyxDQUFBO1FBQ0wsQ0FBQyxFQXpHb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBeUcxQjtJQUFELENBQUMsRUF6R2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlHbkI7QUFBRCxDQUFDLEVBekdTLE1BQU0sS0FBTixNQUFNLFFBeUdmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHVWNhc3RuaWNpQ29udHJvbChjb250ZW50OiAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zKSB8IChHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbFJlbG9hZENvbXBvbmVudEV4dGVuc2lvbnMpLCB0eXBWYXpieTogbnVtYmVyKTogR0NvbnRlbnQge1xyXG4gICAgICAgIGNvbnN0IHByZWRlayA9IChHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sIGFzIGFueSBhcyBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sKTtcclxuICAgICAgICB2YXIgY29uID0gY29udGVudC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5TcHIuV2ViQXBwLkdVY2FzdG5pY2lDb250cm9sXCIpO1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh7fSwgcHJlZGVrLCB7XHJcbiAgICAgICAgICAgIGlkU2V0dGluZ3M6IFwiR1VjYXN0bmljaUNvbnRyb2xcIixcclxuICAgICAgICAgICAgZGV0YWlsQ29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgc2VydmljZUNvbnRlbnQ6IGNvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoeyBjbGFzc05hbWU6IFwiR29yZGljLlNwci5XZWJBcHAuR1VjYXN0bmljaUNvbnRyb2xcIiwgc2VydmVyUGFyYW1zOiB7IFR5cFZhemJ5OiB0eXBWYXpieSB9IH0pLFxyXG4gICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJpeHNfZXN1X3R4dFwiLCBcIml4c19kdmFfbmF6ZXZcIl0sICBcclxuICAgICAgICAgICAgc2hvd0RlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dSZXN0b3JlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0ZpbHRlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkQXV0b2ZpdEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjcmVhdGVHcmlkRm9ybWF0OiBmdW5jdGlvbiAoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVWNhc3RuaWt1RHRvPiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVWNhc3RuaWt1RHRvPjtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVWNhc3RuaWt1RHRvPigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5naW5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19lc3VcIiwgY2FwdGlvbjogXCJJWFNfRVNVXCIsIHdpZHRoOiAxNTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbmFfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTYwMDAwNVwiLCAvL1JDIDM1NjAwMDA1IDogWm3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbC56bWVuYV9lc3UgPT0gMSkgcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHsgaWNvbjogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2VzdV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDU1XCIsIHdpZHRoOiAzMDAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjUyMDAwNTUgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2R2YV9uYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MjUyMDAwNTZcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTIwMDA1NiA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6YXN0dXBjZV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDU3XCIsIHdpZHRoOiAxNTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjUyMDAwNTcgOiBaw6FzdHVwY2Ugw7rEjWFzdG7DrWthXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvem5hbWthXCIsIGNhcHRpb246IFwianJlczoyNTIwMDA1OFwiLCB3aWR0aDogMzAwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KTsgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYWRkaXRpb25hbEFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNrdXBpbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxOTFcIiwgLy9SQyAyNTIwMDE5MSA6IFNrdXBpbnlcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb24uY2FsbChcIkdldFNTTENqU3Bpc1wiLCB7IGl4cFNwaXM6IChjb250ZW50IGFzIGFueSkuSXhwU3BpcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKFNTTENqU3Bpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2w+KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBMb2dvdmFuaSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiAoY29udGVudCBhcyBhbnkpLkl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlEb3RjZW5laG9TdWJqZWt0dSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBTU0xDalNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogVnliZXJFc3VfRHV2b2RIbGVkYW5pVHh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRVNVU2t1cGlueUVzdURsZyNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6IExvZ292YW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTa3VwaW55V29ya2luZ01vZGU6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuRGlhbG9ncy5Sb3pkZWxvdm5pa0VzdURsZyhjb250ZW50LCBvcHRpb25zKT8ub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5zdWJqZWt0eSAmJiByZXRWYWwuc3ViamVrdHkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvY2V0ID0gcmV0VmFsLnN1Ympla3R5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbC5zdWJqZWt0eS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb24uY2FsbChcIlByaWRhdEVzdVplU2t1cGlueVwiLCB7IGl4cFNwaXM6IChjb250ZW50IGFzIGFueSkuSXhwU3BpcywgaXhzRXN1OiByb3cuaXhzX2VzdSwgaXhzRHZhOiByb3cuaXhzX2R2YX0sIHsgVHlwVmF6Ynk6IHR5cFZhemJ5fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gcG9jZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnQucmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsTWVudTogW1xyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJza3VwaW55XCIsIGFjdGlvbjogXCJhY3RTa3VwaW55XCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICBvcGVuRGV0YWlsOiBmdW5jdGlvbiAocm93OiBhbnksIHJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUsIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBtb2RhbDogYm9vbGVhbik6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4cFNwaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhzRXN1O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpY1phc3Q7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9yWmFzdDtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiByb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwU3BpcyA9IHJvdy5peHBfc3BpcztcclxuICAgICAgICAgICAgICAgICAgICBpeHNFc3UgPSByb3cuaXhzX2VzdTtcclxuICAgICAgICAgICAgICAgICAgICBsaWNaYXN0ID0gcm93LmxpY196YXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHBvclphc3QgPSByb3cucG9yX3phc3Q7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGV0YWlsQ29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwU3BpcyA9IHRoaXMuZGV0YWlsQ29udGVudC5vcmlnaW5hbE1vZGVsLml4cF9zcGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFpbENvbnRlbnQubmF2aWdhdGUoW1wiR29yZGljLlNwci5XZWJBcHAuR0RldGFpbFVjYXN0bmlrYVwiLCB7IEdyaWRSYzogZ3JpZFJjLCBSZXppbURldGFpbHU6IHJlemltIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgSXhwU3BpczogaXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICBJeHNFc3U6IGl4c0VzdSxcclxuICAgICAgICAgICAgICAgICAgICBUeXBWYXpieTogdHlwVmF6YnksXHJcbiAgICAgICAgICAgICAgICAgICAgTGljWmFzdDogbGljWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICBQb3JaYXN0OiBwb3JaYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlemltOiByZXppbSxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfdWNhc3RuaWthXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
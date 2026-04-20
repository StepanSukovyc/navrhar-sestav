"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GDotcSubjUkonuControl(content) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                var con = content.createServiceContent("Gordic.Spr.WebApp.GDotcSubjUkonuControl");
                return $.extend({}, predek, {
                    idSettings: "GDotcSubjUkonuControl",
                    detailContent: content,
                    serviceContent: con,
                    searchColumns: ["ixs_esu_txt"],
                    showNew: false,
                    showDelete: false,
                    showRestore: false,
                    showFilters: false,
                    additionalActions: [
                        new GAction({
                            name: "actPridat",
                            caption: "jres:25200236", //RC 25200236 : Přidat
                            favorite: true,
                            icon: "fa-plus",
                            run: function (ev, obj) {
                                let currentContent = $.content(this);
                                var width = 850;
                                var height = 650;
                                var modal = true;
                                currentContent.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDotcenehoSubjektu", {}], {
                                    IxpUkon: currentContent.parentContent.IxpUkon,
                                    IxpSpis: currentContent.parentContent.IxpSpis,
                                    Jednotlive: false,
                                    BezZastupcu: false,
                                    Zastupovani: false,
                                    TitleText: "jres:25200237" + "jres:25200210" //RC 25200237 : Dotčený subjekt správního úkonu - 
                                }, { width: width, height: height, modal: modal })
                                    .on("close", (ev, retValue) => {
                                    currentContent.reloadData();
                                });
                            }
                        }),
                        new GAction({
                            name: "actRefreshVypraveni",
                            caption: "jres:25500311", //RC 25500311 : Občerstvit vypravení
                            favorite: true,
                            icon: "fa-refresh",
                            run: function (ev, obj) {
                                let currentContent = $.content(this);
                                let selection = currentContent.grid.ggrid("getSelection");
                                con.call("RefreshVypraveni", {
                                    seznamDto: selection
                                }).done(function () {
                                    currentContent.reloadData();
                                    content._reloadData();
                                });
                            }
                        }),
                        new GAction({
                            name: "actRefreshDoruceni",
                            caption: "jres:25500312", //RC 25500312 : Občerstvit doručení
                            favorite: true,
                            icon: "fa-refresh",
                            run: function (ev, obj) {
                                let currentContent = $.content(this);
                                let selection = currentContent.grid.ggrid("getSelection");
                                con.call("RefreshDoruceni", {
                                    seznamDto: selection
                                }).done(function () {
                                    currentContent.reloadData();
                                    content._reloadData();
                                });
                            }
                        }),
                        new GAction({
                            name: "actOdstraneni",
                            caption: "jres:35600004", //RC 35600004 : Odstranit
                            favorite: true,
                            icon: "gi-bin",
                            run: function (ev, obj) {
                                let currentContent = $.content(this);
                                let selection = currentContent.grid.ggrid("getSelection");
                                con.call("Odstraneni", {
                                    IxpUkon: currentContent.parentContent.IxpUkon,
                                    seznamDto: selection
                                }).done(function () {
                                    currentContent.reloadData();
                                    content._reloadData();
                                });
                            }
                        }),
                    ],
                    additionalMenu: [
                        { id: "pridat", action: "actPridat", favorite: true },
                        { id: "Občerstvit vypravení", action: "actRefreshVypraveni", favorite: true },
                        { id: "Občerstvit doručení", action: "actRefreshDoruceni", favorite: true },
                        { id: "Odstranit", action: "actOdstraneni", favorite: true }
                    ],
                    createGridFormat: function () {
                        var that = this;
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        if (that.detailContent.contextProp("debugMode")) {
                            gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                        }
                        this.grid.ggrid({
                            multi: true,
                        });
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "ixs_esu_txt",
                            caption: "jres:25200083", //RC 25200083 : Název
                            width: 250,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ixs_dva_nazev",
                            caption: "jres:25200084", //RC 25200084 : Typ
                            width: 100,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:25200058", //RC 25200058 : Poznámka
                            width: 100,
                            fragment: ""
                        })
                            /*
                            .addTextColumn({
                                name: "s_dor_txt",
                                caption: "jres:25200232", //RC 25200232 : Stav doručení
                                width: 100,
                                fragment: ""
                            })
                            .addDateColumn({
                                name: "dat_odes",
                                caption: "jres:25200233", //RC 25200233 : Datum odeslání
                                width: 100,
                                fragment: ""
                            })
                            */
                            .addBooleanColumn({ name: "s_vypraveno", caption: "jres:25300044", width: 90, fixedWidth: false }) //RC 25300044 : Vypraveno
                            .addDateColumn({
                            name: "dat_vypraveni",
                            caption: "jres:25300037", //RC 25300037 : Datum vypravení
                            width: 130,
                            fragment: ""
                        })
                            /*
                            .addDateColumn({
                                name: "dat_potvrz",
                                caption: "jres:25300038", //RC 25300038 : Datum doručení SSL
                                width: 100,
                                fragment: ""
                            })
                            */
                            .addBooleanColumn({ name: "s_doruceno", caption: "jres:25300043", width: 85, fixedWidth: false }) //RC 25300043 : Doručeno
                            .addDateColumn({
                            name: "dat_doruceni",
                            caption: "jres:25200234", //RC 25200234 : Datum doručení
                            width: 130,
                            fragment: ""
                        })
                            .addDateColumn({
                            name: "dat_lh_odv",
                            caption: "jres:25300040", //RC 25300040 : Lhůta pro odvolání
                            width: 140,
                            fragment: ""
                        })
                            .addBooleanColumn({ name: "s_odv", caption: "jres:25300042", width: 85, fixedWidth: false }) //RC 25300042 : Odvolání
                            .addDateColumn({
                            name: "dat_odvolani",
                            caption: "jres:25300041", //RC 25300041 : Datum odvolání
                            width: 130,
                            fragment: ""
                        });
                        return gridFormat;
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var that = this;
                        var ixpUkon;
                        var ixpSpis;
                        var ixsEsu;
                        var typVazby;
                        var licZast;
                        var porZast;
                        if (row != null && row != undefined) {
                            ixpUkon = row.ixp_ukon;
                            ixpSpis = row.ixp_spis;
                            ixsEsu = row.ixs_esu;
                            typVazby = row.typ_vazby;
                            licZast = row.lic_zast;
                            porZast = row.por_zast;
                        }
                        else if (this.detailContent != null) {
                            ixpSpis = this.detailContent.originalModel.ixp_spis;
                        }
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailDotcSubjUkonu", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpUkon: ixpUkon,
                            IxpSpis: ixpSpis,
                            IxsEsu: ixsEsu,
                            TypVazby: typVazby,
                            LicZast: licZast,
                            PorZast: porZast,
                            Id: "detail_dotc_subj_ukonu"
                        }, { width: width, height: height, modal: modal });
                    },
                    enableActions: function () {
                        console.log("GDotcSubjUkonuControl.enableActions");
                        //    var readOnly = (content as any).RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
                        //    (this as any).actions.actPridat!.enabled(readOnly);
                        //    (this as any).actions.actRefresh!.enabled(readOnly);
                    },
                    enableRowActions: function (gridSelection) {
                        console.log("GDotcSubjUkonuControl.enableRowActions");
                        var readOnly = content.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                        let selections = gridSelection.count != 0;
                        this.actions.actPridat.enabled(readOnly);
                        this.actions.actRefresh.enabled(readOnly);
                        //(this as any).actions.actDelete!.enabled(gridSelection.count != 0 && gridSelection.getSelection()[0].Permissions.CanDelete.value &&
                        //    readOnly && this.detailContent.model.Permissions.CanUpdate.value);
                        this.actions.actRefreshVypraveni.enabled(selections);
                        this.actions.actRefreshDoruceni.enabled(selections);
                        this.actions.actOdstraneni.enabled(selections);
                    }
                });
            }
            WebApp.GDotcSubjUkonuControl = GDotcSubjUkonuControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RvdGNTdWJqVWtvbnVDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RvdGNTdWJqVWtvbnVDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0E2T2Y7QUE3T0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNk9uQjtJQTdPZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBNk8xQjtRQTdPb0IsV0FBQSxNQUFNO1lBQ3ZCLFNBQWdCLHFCQUFxQixDQUFDLE9BQWdLO2dCQUNsTSxNQUFNLE1BQU0sR0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBc0UsQ0FBQztnQkFDbkgsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLHlDQUF5QyxDQUFDLENBQUE7Z0JBQ2pGLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO29CQUN4QixVQUFVLEVBQUUsdUJBQXVCO29CQUNuQyxhQUFhLEVBQUUsT0FBTztvQkFDdEIsY0FBYyxFQUFFLEdBQUc7b0JBQ25CLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDOUIsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLFdBQVcsRUFBRSxLQUFLO29CQUNsQixXQUFXLEVBQUUsS0FBSztvQkFFbEIsaUJBQWlCLEVBQUU7d0JBQ2YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxRQUFRLEVBQUUsSUFBSTs0QkFDZCxJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBeUIsRUFBRSxFQUFFLEdBQUc7Z0NBQ2pDLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQXlELElBQUksQ0FBQyxDQUFDO2dDQUM3RixJQUFJLEtBQUssR0FBRyxH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QUN6QyxJQUFZLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2xELElBQVksQ0FBQyxPQUFPLENBQUMsVUFBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDcEQscUlBQXFJO3dCQUNySSx3RUFBd0U7d0JBQ3ZFLElBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM5RCxJQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDN0QsSUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUEzT2UsNEJBQXFCLHdCQTJPcEMsQ0FBQTtRQUNMLENBQUMsRUE3T29CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQTZPMUI7SUFBRCxDQUFDLEVBN09nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2T25CO0FBQUQsQ0FBQyxFQTdPUyxNQUFNLEtBQU4sTUFBTSxRQTZPZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR0RvdGNTdWJqVWtvbnVDb250cm9sKGNvbnRlbnQ6IChHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnMpIHwgKEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucykpOiBHQ29udGVudCB7XHJcbiAgICAgICAgY29uc3QgcHJlZGVrID0gKEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2wgYXMgYW55IGFzIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2wpO1xyXG4gICAgICAgIHZhciBjb24gPSBjb250ZW50LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlNwci5XZWJBcHAuR0RvdGNTdWJqVWtvbnVDb250cm9sXCIpXHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBwcmVkZWssIHtcclxuICAgICAgICAgICAgaWRTZXR0aW5nczogXCJHRG90Y1N1YmpVa29udUNvbnRyb2xcIixcclxuICAgICAgICAgICAgZGV0YWlsQ29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgc2VydmljZUNvbnRlbnQ6IGNvbixcclxuICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhzX2VzdV90eHRcIl0sXHJcbiAgICAgICAgICAgIHNob3dOZXc6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93RGVsZXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1Jlc3RvcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93RmlsdGVyczogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsQWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjM2XCIsIC8vUkMgMjUyMDAyMzYgOiBQxZlpZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sPih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gODUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gNjUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlNwci5XZWJBcHAuR1Z5YmVyRG90Y2VuZWhvU3ViamVrdHVcIiwge31dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBVa29uOiAoY3VycmVudENvbnRlbnQucGFyZW50Q29udGVudCBhcyBhbnkpLkl4cFVrb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBTcGlzOiAoY3VycmVudENvbnRlbnQucGFyZW50Q29udGVudCBhcyBhbnkpLkl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKZWRub3RsaXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJlelphc3R1cGN1OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFphc3R1cG92YW5pOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlVGV4dDogXCJqcmVzOjI1MjAwMjM3XCIgKyBcImpyZXM6MjUyMDAyMTBcIiAvL1JDIDI1MjAwMjM3IDogRG90xI1lbsO9IHN1Ympla3Qgc3Byw6F2bsOtaG8gw7prb251IC0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IG1vZGFsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnQucmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWZyZXNoVnlwcmF2ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMzExXCIsICAvL1JDIDI1NTAwMzExIDogT2LEjWVyc3R2aXQgdnlwcmF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2w+KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gY3VycmVudENvbnRlbnQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uLmNhbGwoXCJSZWZyZXNoVnlwcmF2ZW5pXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlem5hbUR0bzogc2VsZWN0aW9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGVudC5yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29udGVudCBhcyBhbnkpLl9yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWZyZXNoRG9ydWNlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAzMTJcIiwgIC8vUkMgMjU1MDAzMTIgOiBPYsSNZXJzdHZpdCBkb3J1xI1lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sPih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGN1cnJlbnRDb250ZW50LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbi5jYWxsKFwiUmVmcmVzaERvcnVjZW5pXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlem5hbUR0bzogc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnQucmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRlbnQgYXMgYW55KS5fcmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2RzdHJhbmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTYwMDAwNFwiLCAgLy9SQyAzNTYwMDAwNCA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYmluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudENvbnRlbnQgPSAkLmNvbnRlbnQ8R0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sPih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGN1cnJlbnRDb250ZW50LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbi5jYWxsKFwiT2RzdHJhbmVuaVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBVa29uOiAoY3VycmVudENvbnRlbnQucGFyZW50Q29udGVudCBhcyBhbnkpLkl4cFVrb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXpuYW1EdG86IHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LnJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZW50IGFzIGFueSkuX3JlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYWRkaXRpb25hbE1lbnU6IFtcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwicHJpZGF0XCIsIGFjdGlvbjogXCJhY3RQcmlkYXRcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwiT2LEjWVyc3R2aXQgdnlwcmF2ZW7DrVwiLCBhY3Rpb246IFwiYWN0UmVmcmVzaFZ5cHJhdmVuaVwiLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJPYsSNZXJzdHZpdCBkb3J1xI1lbsOtXCIsIGFjdGlvbjogXCJhY3RSZWZyZXNoRG9ydWNlbmlcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwiT2RzdHJhbml0XCIsIGFjdGlvbjogXCJhY3RPZHN0cmFuZW5pXCIsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgY3JlYXRlR3JpZEZvcm1hdDogZnVuY3Rpb24gKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURvdGNTdWJqVWtvbnVEdG8+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Eb3RjU3VialVrb251RHRvPjtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtRG90Y1N1YmpVa29udUR0bz4oKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRldGFpbENvbnRlbnQuY29udGV4dFByb3AoXCJkZWJ1Z01vZGVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHNfZXN1XCIsIGNhcHRpb246IFwiSVhTX0VTVVwiLCB3aWR0aDogMTUwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICh0aGlzIGFzIGFueSBhcyBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sKS5ncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDgzXCIsIC8vUkMgMjUyMDAwODMgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHZhX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA4NFwiLCAvL1JDIDI1MjAwMDg0IDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDU4XCIsIC8vUkMgMjUyMDAwNTggOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfZG9yX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyMzJcIiwgLy9SQyAyNTIwMDIzMiA6IFN0YXYgZG9ydcSNZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDIzM1wiLCAvL1JDIDI1MjAwMjMzIDogRGF0dW0gb2Rlc2zDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQm9vbGVhbkNvbHVtbih7IG5hbWU6IFwic192eXByYXZlbm9cIiwgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDQ0XCIsIHdpZHRoOiA5MCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTMwMDA0NCA6IFZ5cHJhdmVub1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnlwcmF2ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTMwMDAzN1wiLCAvL1JDIDI1MzAwMDM3IDogRGF0dW0gdnlwcmF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BvdHZyelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUzMDAwMzhcIiwgLy9SQyAyNTMwMDAzOCA6IERhdHVtIGRvcnXEjWVuw60gU1NMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRCb29sZWFuQ29sdW1uKHsgbmFtZTogXCJzX2RvcnVjZW5vXCIsIGNhcHRpb246IFwianJlczoyNTMwMDA0M1wiLCB3aWR0aDogODUsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjUzMDAwNDMgOiBEb3J1xI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvcnVjZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDIzNFwiLCAvL1JDIDI1MjAwMjM0IDogRGF0dW0gZG9ydcSNZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9saF9vZHZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDQwXCIsIC8vUkMgMjUzMDAwNDAgOiBMaMWvdGEgcHJvIG9kdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRCb29sZWFuQ29sdW1uKHsgbmFtZTogXCJzX29kdlwiLCBjYXB0aW9uOiBcImpyZXM6MjUzMDAwNDJcIiwgd2lkdGg6IDg1LCBmaXhlZFdpZHRoOiBmYWxzZSB9KSAvL1JDIDI1MzAwMDQyIDogT2R2b2zDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2R2b2xhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDQxXCIsIC8vUkMgMjUzMDAwNDEgOiBEYXR1bSBvZHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYV9kb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjM1XCIsIC8vUkMgMjUyMDAyMzUgOiBQb3puw6Fta2EgZG9ydcSNZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvcGVuRGV0YWlsOiBmdW5jdGlvbiAocm93OiBhbnksIHJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUsIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBtb2RhbDogYm9vbGVhbik6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4cFVrb247XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhwU3BpcztcclxuICAgICAgICAgICAgICAgIHZhciBpeHNFc3U7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwVmF6Ynk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGljWmFzdDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3JaYXN0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsICYmIHJvdyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBVa29uID0gcm93Lml4cF91a29uO1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cFNwaXMgPSByb3cuaXhwX3NwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzRXN1ID0gcm93Lml4c19lc3VcclxuICAgICAgICAgICAgICAgICAgICB0eXBWYXpieSA9IHJvdy50eXBfdmF6Ynk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGljWmFzdCA9IHJvdy5saWNfemFzdDtcclxuICAgICAgICAgICAgICAgICAgICBwb3JaYXN0ID0gcm93LnBvcl96YXN0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRldGFpbENvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cFNwaXMgPSB0aGlzLmRldGFpbENvbnRlbnQub3JpZ2luYWxNb2RlbC5peHBfc3BpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxDb250ZW50Lm5hdmlnYXRlKFtcIkdvcmRpYy5TcHIuV2ViQXBwLkdEZXRhaWxEb3RjU3VialVrb251XCIsIHsgR3JpZFJjOiBncmlkUmMsIFJlemltRGV0YWlsdTogcmV6aW0gfV0sIHtcclxuICAgICAgICAgICAgICAgICAgICBJeHBVa29uOiBpeHBVa29uLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IGl4cFNwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhzRXN1OiBpeHNFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwVmF6Ynk6IHR5cFZhemJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIExpY1phc3Q6IGxpY1phc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgUG9yWmFzdDogcG9yWmFzdCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfZG90Y19zdWJqX3Vrb251XCJcclxuICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IG1vZGFsIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZW5hYmxlQWN0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHRG90Y1N1YmpVa29udUNvbnRyb2wuZW5hYmxlQWN0aW9uc1wiKTtcclxuICAgICAgICAgICAgLy8gICAgdmFyIHJlYWRPbmx5ID0gKGNvbnRlbnQgYXMgYW55KS5SZXppbURldGFpbHUgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXc7XHJcbiAgICAgICAgICAgIC8vICAgICh0aGlzIGFzIGFueSkuYWN0aW9ucy5hY3RQcmlkYXQhLmVuYWJsZWQocmVhZE9ubHkpO1xyXG4gICAgICAgICAgICAvLyAgICAodGhpcyBhcyBhbnkpLmFjdGlvbnMuYWN0UmVmcmVzaCEuZW5hYmxlZChyZWFkT25seSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlbmFibGVSb3dBY3Rpb25zOiBmdW5jdGlvbiAoZ3JpZFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHRG90Y1N1YmpVa29udUNvbnRyb2wuZW5hYmxlUm93QWN0aW9uc1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciByZWFkT25seSA9IChjb250ZW50IGFzIGFueSkuUmV6aW1EZXRhaWx1ID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbnMgPSBncmlkU2VsZWN0aW9uLmNvdW50ICE9IDA7ICBcclxuICAgICAgICAgICAgICAgICh0aGlzIGFzIGFueSkuYWN0aW9ucy5hY3RQcmlkYXQhLmVuYWJsZWQocmVhZE9ubHkpO1xyXG4gICAgICAgICAgICAgICAgKHRoaXMgYXMgYW55KS5hY3Rpb25zLmFjdFJlZnJlc2ghLmVuYWJsZWQocmVhZE9ubHkpO1xyXG4gICAgICAgICAgICAgICAgLy8odGhpcyBhcyBhbnkpLmFjdGlvbnMuYWN0RGVsZXRlIS5lbmFibGVkKGdyaWRTZWxlY3Rpb24uY291bnQgIT0gMCAmJiBncmlkU2VsZWN0aW9uLmdldFNlbGVjdGlvbigpWzBdLlBlcm1pc3Npb25zLkNhbkRlbGV0ZS52YWx1ZSAmJlxyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVhZE9ubHkgJiYgdGhpcy5kZXRhaWxDb250ZW50Lm1vZGVsLlBlcm1pc3Npb25zLkNhblVwZGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAodGhpcyBhcyBhbnkpLmFjdGlvbnMuYWN0UmVmcmVzaFZ5cHJhdmVuaSEuZW5hYmxlZChzZWxlY3Rpb25zKTtcclxuICAgICAgICAgICAgICAgICh0aGlzIGFzIGFueSkuYWN0aW9ucy5hY3RSZWZyZXNoRG9ydWNlbmkhLmVuYWJsZWQoc2VsZWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAodGhpcyBhcyBhbnkpLmFjdGlvbnMuYWN0T2RzdHJhbmVuaSEuZW5hYmxlZChzZWxlY3Rpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
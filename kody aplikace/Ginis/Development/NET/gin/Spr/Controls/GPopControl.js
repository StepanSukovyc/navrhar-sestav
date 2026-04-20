"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GPopControl(content, Param_SprRadEko) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                return $.extend({}, predek, {
                    idSettings: "GPopControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GPopControl"),
                    searchColumns: ["ixs_esu_txt"],
                    showDelete: true,
                    showRestore: false,
                    showFilters: false,
                    createGridFormat: function () {
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        //if ((window as any).ginisDebugMode) {
                        //    gridFormat = gridFormat.addTextColumn({ name: "ixp_spis", caption: "IXP_SPIS", width: 150, fixedWidth: false });
                        //}
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "ixs_esu_txt",
                            caption: "jres:25200107", //RC 25200107 : Poplatník
                            width: 150,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "druh_pl_txt",
                            caption: "jres:25200108", //RC 25200108 : Druh platby
                            width: 150,
                            fragment: ""
                        })
                            .addNumberColumn({
                            name: "c_pop",
                            caption: "jres:25200109", //RC 25200109 : Výše platby
                            width: 150,
                            fragment: ""
                        });
                        // Jen pro ekomode
                        if (Param_SprRadEko)
                            gridFormat = gridFormat
                                .addTextColumn({
                                name: "typ_eko_txt",
                                caption: "jres:25200156", //RC 25200156 : Typ dokladu
                                width: 100,
                                fragment: ""
                            })
                                .addTextColumn({
                                name: "ixp_eko_dok",
                                caption: "jres:25200157", //RC 25200157 : PID dokladu
                                width: 100,
                                fragment: ""
                            });
                        //
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "vs",
                            caption: "jres:25200110", //RC 25200110 : VS
                            width: 100,
                            fragment: ""
                        })
                            .addDateColumn({
                            name: "dat_vyzvy",
                            caption: "jres:25200111", //RC 25200111 : Datum výzvy
                            width: 150,
                            fragment: ""
                        })
                            .addDateColumn({
                            name: "dat_zapl",
                            caption: "jres:25200112", //RC 25200112 : Datum zaplacení
                            width: 150,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "druh_sa_txt",
                            caption: "jres:25200113", //RC 25200113 : Druh sankce
                            width: 150,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "zpu_pl_txt",
                            caption: "jres:25200114", //RC 25200114 : Způsob platby
                            width: 150,
                            fragment: ""
                        });
                        return gridFormat;
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var ixpSpis;
                        var radekPop;
                        if (row != null && row != undefined) {
                            ixpSpis = row.ixp_spis;
                            radekPop = row.radek_pop;
                        }
                        else if (this.detailContent != null) {
                            ixpSpis = this.detailContent.originalModel.ixp_spis;
                            radekPop = this.detailContent.originalModel.radek_pop;
                        }
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailPlatby", { GridRc: gridRc, RezimDetailu: rezim }], {
                            IxpSpis: ixpSpis,
                            RadekPop: radekPop,
                            Id: "detail_platby"
                        });
                    }
                });
            }
            WebApp.GPopControl = GPopControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvcENvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9wQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBeUdmO0FBekdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlHbkI7SUF6R2dCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQXlHMUI7UUF6R29CLFdBQUEsTUFBTTtZQUN2QixTQUFnQixXQUFXLENBQUMsT0FBZ0ssRUFBRSxlQUF3QjtnQkFDbE4sTUFBTSxNQUFNLEdBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQXNFLENBQUM7Z0JBQ25ILE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFO29CQUN4QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsYUFBYSxFQUFFLE9BQU87b0JBQ3RCLGNBQWMsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsK0JBQStCLENBQUM7b0JBQzdFLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDOUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFdBQVcsRUFBRSxLQUFLO29CQUNsQixXQUFXLEVBQUUsS0FBSztvQkFDbEIsZ0JBQWdCLEVBQUU7d0JBQ2QsSUFBSSxVQUFzRSxDQUFDO3dCQUMzRSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBc0MsQ0FBQzt3QkFDOUUsdUNBQXVDO3dCQUN2QyxzSEFBc0g7d0JBQ3RILEdBQUc7d0JBQ0gsVUFBVSxHQUFHLFVBQVU7NkJBQ2xCLGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7NEJBQ25ELEtBQUssRUFBRSxHQUFHOzRCQUNWLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxhQUFh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USxFQUFFLFFBQVE7NEJBQ2xCLEVBQUUsRUFBRSxlQUFlO3lCQUN0QixDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1lBdkdlLGtCQUFXLGNBdUcxQixDQUFBO1FBQ0wsQ0FBQyxFQXpHb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBeUcxQjtJQUFELENBQUMsRUF6R2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlHbkI7QUFBRCxDQUFDLEVBekdTLE1BQU0sS0FBTixNQUFNLFFBeUdmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUG9wQ29udHJvbChjb250ZW50OiAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zKSB8IChHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbFJlbG9hZENvbXBvbmVudEV4dGVuc2lvbnMpLCBQYXJhbV9TcHJSYWRFa286IGJvb2xlYW4pOiBHQ29udGVudCB7XHJcbiAgICAgICAgY29uc3QgcHJlZGVrID0gKEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2wgYXMgYW55IGFzIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2wpO1xyXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh7fSwgcHJlZGVrLCB7XHJcbiAgICAgICAgICAgIGlkU2V0dGluZ3M6IFwiR1BvcENvbnRyb2xcIixcclxuICAgICAgICAgICAgZGV0YWlsQ29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgc2VydmljZUNvbnRlbnQ6IGNvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuU3ByLldlYkFwcC5HUG9wQ29udHJvbFwiKSxcclxuICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhzX2VzdV90eHRcIl0sICBcclxuICAgICAgICAgICAgc2hvd0RlbGV0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd1Jlc3RvcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93RmlsdGVyczogZmFsc2UsXHJcbiAgICAgICAgICAgIGNyZWF0ZUdyaWRGb3JtYXQ6IGZ1bmN0aW9uICgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Qb3BEdG8+IHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Qb3BEdG8+O1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Qb3BEdG8+KCk7XHJcbiAgICAgICAgICAgICAgICAvL2lmICgod2luZG93IGFzIGFueSkuZ2luaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cF9zcGlzXCIsIGNhcHRpb246IFwiSVhQX1NQSVNcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwN1wiLCAvL1JDIDI1MjAwMTA3IDogUG9wbGF0bsOta1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhfcGxfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwOFwiLCAvL1JDIDI1MjAwMTA4IDogRHJ1aCBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwOVwiLCAvL1JDIDI1MjAwMTA5IDogVsO9xaFlIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gSmVuIHBybyBla29tb2RlXHJcbiAgICAgICAgICAgICAgICBpZiAoUGFyYW1fU3ByUmFkRWtvKVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2Vrb190eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDE1NlwiLCAvL1JDIDI1MjAwMTU2IDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9la29fZG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxNTdcIiwgLy9SQyAyNTIwMDE1NyA6IFBJRCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTEwXCIsIC8vUkMgMjUyMDAxMTAgOiBWU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXp2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMTFcIiwgLy9SQyAyNTIwMDExMSA6IERhdHVtIHbDvXp2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96YXBsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDExMlwiLCAvL1JDIDI1MjAwMTEyIDogRGF0dW0gemFwbGFjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhfc2FfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDExM1wiLCAvL1JDIDI1MjAwMTEzIDogRHJ1aCBzYW5rY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cHVfcGxfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDExNFwiLCAvL1JDIDI1MjAwMTE0IDogWnDFr3NvYiBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgb3BlbkRldGFpbDogZnVuY3Rpb24gKHJvdzogYW55LCByZXppbTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LCBncmlkUmM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+IHwgdW5kZWZpbmVkLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbW9kYWw6IGJvb2xlYW4pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgICAgIHZhciBpeHBTcGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhZGVrUG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsICYmIHJvdyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBTcGlzID0gcm93Lml4cF9zcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrUG9wID0gcm93LnJhZGVrX3BvcDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kZXRhaWxDb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBTcGlzID0gdGhpcy5kZXRhaWxDb250ZW50Lm9yaWdpbmFsTW9kZWwuaXhwX3NwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtQb3AgPSB0aGlzLmRldGFpbENvbnRlbnQub3JpZ2luYWxNb2RlbC5yYWRla19wb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsQ29udGVudC5uYXZpZ2F0ZShbXCJHb3JkaWMuU3ByLldlYkFwcC5HRGV0YWlsUGxhdGJ5XCIsIHsgR3JpZFJjOiBncmlkUmMsIFJlemltRGV0YWlsdTogcmV6aW0gfV0sIHtcclxuICAgICAgICAgICAgICAgICAgICBJeHBTcGlzOiBpeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIFJhZGVrUG9wOiByYWRla1BvcCxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfcGxhdGJ5XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledPlatcu.ts                      </Name>
//    <Description> Okno přehledu plátců případů                                </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-10-13                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.Controls.Prehledy.GPrehledPlatcu", { ID: "DDPGPrehledPlatcu#", ixp_pop: this.Ixp }); přičemž this.Ixp bude odpovídat aktualní ixp
            let GPrehledPlatcu = class GPrehledPlatcu extends Gordic.GContentBase {
                // Případ na kterém se dá otestovat: UP76X001BED6
                onContentReady() {
                    var that = this;
                    that.taskId = "actGPrehledPlatcu";
                    that.createActions();
                    var headerForm = new Gordic.Forms.Form({ name: "ddpIdentifikatorFilter" })
                        .addRow("Identifikátor poplatníka")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_pop",
                        initialValue: that.ixp_pop
                    });
                    that.menuBar([
                        { action: that.actions.actDetail, favorite: true },
                    ]);
                    $("<div>").appendTo(that.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (_event, obj) => {
                            that.ziskejData(obj.filter);
                        }
                    });
                    that.grid = $("<div>").appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                
                        rowNumbers: false,
                        defaultAction: that.actions.actDetail,
                        columns: WebClient.Common.GridFormats.PrehledPlatcu(),
                        profiles: [{
                                columnList: "ixp, vs, jmeno, prijmeni, dat_od, dat_do"
                            }]
                    });
                    if (that.ixp_pop != undefined) { //když se načíta od někud jinud automaticky zobrazí data
                        that.ziskejData({ ixp_pop: that.ixp_pop });
                    }
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createActions() {
                    var that = this;
                    // položky menuBaru
                    that.actions.addRange({
                        actPripadyZavritPotomky: {
                            name: "zavritpotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        actDetail: {
                            name: "detail",
                            caption: "Detail",
                            tooltip: "Otevření případu",
                            run: function () {
                                var row = that.grid.ggrid("getSelection")[0];
                                if (row == undefined) {
                                    that.showFlash("Není vybrán žádný záznam!", "error");
                                    return;
                                }
                                //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                WebClient.Common.Pripady.openPripadDetail(that, row.ixp);
                                //that.navigate("Gordic.Ddp.WebClient.GPripadDetail", { ID: 'DDPGPripadDetail#', Ixp: row.ixp, TypPhl: row.typ_phl });
                            }
                        },
                    });
                }
                ziskejData(filter) {
                    var that = this;
                    that.beginOperation();
                    if (filter.ixp_pop != null) { //nic se nestane když bude prázdný identifikátor
                        that.isl.DdpPrehledPlatcu.list(rq => {
                            return {
                                filters: filter
                            };
                        }).get().done(function (dto) {
                            that.view = new Gordic.Data.View(dto.data, { key: "ixp_pop" });
                            that.grid.ggrid("setData", that.view);
                            that.endOperation();
                        });
                    }
                    else {
                        that.view = new Gordic.Data.View(undefined);
                        that.grid.ggrid("setData", that.view);
                        that.endOperation();
                    }
                }
            };
            GPrehledPlatcu = __decorate([
                Decorators.gcontent
            ], GPrehledPlatcu);
            WebClient.GPrehledPlatcu = GPrehledPlatcu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRQbGF0Y3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJlaGxlZFBsYXRjdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWlIZjtBQWpIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpSG5CO0lBakhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpSDdCO1FBakhvQixXQUFBLFNBQVM7WUFDMUIsc01BQXNNO1lBRXRNLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBTzVDLGlEQUFpRDtnQkFDakQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7b0JBRWxDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxDQUFDO3lCQUNyRSxNQUFNLENBQUMsMEJBQTBCLENBQUM7eUJBQ2xDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNyRCxJQUFJLEVBQUUsU0FBUzt3QkFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU87cUJBQzdCLENBQUMsQ0FBQTtvQkFFTixJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7cUJBQ3JELENBQUMsQ0FBQztvQkFF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NEJBQ0QsT0FBTztnQ0FDSCxPQUFPLEVBQUUsTUFBTTs2QkFDbEIsQ0FBQTt3QkFDTCxDQUFDLENBQ0osQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHOzRCQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOzRCQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN0QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQTdHWSxjQUFjO2dCQUQxQixVQUFVLENBQUMsUUFBUTtlQUNQLGNBQWMsQ0E2RzFCO1lBN0dZLHdCQUFjLGlCQTZHMUIsQ0FBQTtRQUNMLENBQUMsRUFqSG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlIN0I7SUFBRCxDQUFDLEVBakhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpSG5CO0FBQUQsQ0FBQyxFQWpIUyxNQUFNLEtBQU4sTUFBTSxRQWlIZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJlaGxlZFBsYXRjdS50cyAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwxZllaGxlZHUgcGzDoXRjxa8gcMWZw61wYWTFryAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMC0xMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8vemF2b2xhdCB6IGppbsOpaG8gbcOtc3RhIHBvbW9jw606IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmVobGVkeS5HUHJlaGxlZFBsYXRjdVwiLCB7IElEOiBcIkREUEdQcmVobGVkUGxhdGN1I1wiLCBpeHBfcG9wOiB0aGlzLkl4cCB9KTsgcMWZacSNZW3FviB0aGlzLkl4cCBidWRlIG9kcG92w61kYXQgYWt0dWFsbsOtIGl4cFxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJlaGxlZFBsYXRjdSBleHRlbmRzIEdDb250ZW50QmFzZSB7IFxyXG4gICAgICAgIHB1YmxpYyBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyB2aWV3OiBhbnk7XHJcbiAgICAgICAgaXhwX3BvcDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAgICAgLy8gUMWZw61wYWQgbmEga3RlcsOpbSBzZSBkw6Egb3Rlc3RvdmF0OiBVUDc2WDAwMUJFRDZcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdQcmVobGVkUGxhdGN1XCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBJZGVudGlmaWthdG9yRmlsdGVyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvciBwb3BsYXRuw61rYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lml4cF9wb3BcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuXHJcbiAgICAgICAgICAgICAgICBnZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbaGVhZGVyRm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogKF9ldmVudCwgb2JqKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YShvYmouZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByZWhsZWRQbGF0Y3UoKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaXhwLCB2cywgam1lbm8sIHByaWptZW5pLCBkYXRfb2QsIGRhdF9kb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuaXhwX3BvcCAhPSB1bmRlZmluZWQpIHsgLy9rZHnFviBzZSBuYcSNw610YSBvZCBuxJtrdWQgamludWQgYXV0b21hdGlja3kgem9icmF6w60gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHsgaXhwX3BvcDogdGhhdC5peHBfcG9wIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5EZHBFa29Jbml0KHRoYXQsIHRoYXQuSW5pdEVycm9yVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBwb2xvxb5reSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJpcGFkeVphdnJpdFBvdG9ta3k6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInphdnJpdHBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHsgLy9vdGV2xZllIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT3RldsWZZW7DrSBwxZnDrXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuR0RkcFByZWhsZWRQbGF0Y3VEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSB6w6F6bmFtIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLz8gamUgdGFkeSBudXRuw70gbcOtdCB0eXBfcGhsIG5hIHZzdHVwdSBwcm8gb3RldsWZZW7DrSBkZXRhaWx1IHDFmcOtcGFkdSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhhdCwgcm93Lml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWREZXRhaWxcIiwgeyBJRDogJ0REUEdQcmlwYWREZXRhaWwjJywgSXhwOiByb3cuaXhwLCBUeXBQaGw6IHJvdy50eXBfcGhsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YShmaWx0ZXI6IGFueSk6IHZvaWQgeyAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXhwX3BvcCAhPSBudWxsKSB7IC8vbmljIHNlIG5lc3RhbmUga2R5xb4gYnVkZSBwcsOhemRuw70gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLkRkcFByZWhsZWRQbGF0Y3UubGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhLCB7IGtleTogXCJpeHBfcG9wXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
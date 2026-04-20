"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledStatistikTisku.ts              </Name>
//    <Description> Okno přehledu statistik tisků                               </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-07                                                  </Created>
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
            let GPrehledStatistikTisku = class GPrehledStatistikTisku extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.taskId = "actGPrehledStatistikTisku";
                    that.createActions();
                    that.menuBar([
                        { action: that.actions.actTisk, favorite: true },
                    ]);
                    that.createFilterForm();
                }
                createActions() {
                    var that = this;
                    // položky menuBaru
                    that.actions.addRange({
                        actTisk: {
                            name: "tisk",
                            caption: "Tisk",
                            tooltip: "Tisk statistik tisku",
                            icon: "gi-print",
                            run: () => {
                                that.tiskDokladu();
                            }
                        },
                    });
                }
                createFilterForm() {
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "mainForm" })
                        .addRow("Statistika za období od")
                        .addField("gdatebox", {
                        name: "dat_od",
                        change: (_event, obj) => {
                            that.dat_od = obj.value;
                        }
                    })
                        .addRow("do")
                        .addField("gdatebox", {
                        name: "dat_do",
                        change: (_event, obj) => {
                            that.dat_do = obj.value;
                        }
                    })
                        .addRow({ label: "Zobrazit nepoužité sestavy" })
                        .addField("gcheck", {
                        name: "nepouzite",
                        change: (_event, obj) => {
                            that.nepouzite = obj.value;
                            that.ziskejData({ dat_od: that.dat_od, dat_do: that.dat_do, nepouzite: that.nepouzite });
                        }
                    });
                    $("<div>").appendTo(that.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        autoLoadAfterCreatePanel: true,
                        apply: (event, obj) => {
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
                        columns: WebClient.Common.GridFormats.PrehledStatistikTisku(),
                        defaultProfile: {
                            rowNumbers: true,
                        }
                    });
                }
                ziskejData(filter) {
                    var that = this;
                    filter.faze = that.faze;
                    that.beginOperation();
                    that.isl.DdpPrehledStatistikTisku.list(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        that.view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", that.view);
                        that.endOperation();
                    });
                }
                tiskDokladu() {
                    var that = this;
                    if (that.nepouzite == undefined || that.nepouzite == false || that.nepouzite == "0")
                        that.nepouzite = "0";
                    else
                        that.nepouzite = "1";
                    if (that.view != null) {
                        const actTiskStatistikTisku = GAction.createPrintAction({
                            name: "actTiskStatistikTisku",
                            tema: "ddp_ptm_stases",
                            // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                            serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:StatistikTisku", //zde se plní téma
                            reportStarting: function (rep) {
                                rep.customDto = {
                                    datumOd: that.dat_od,
                                    datumDo: that.dat_do,
                                    nepouzite: that.nepouzite,
                                    rok_den: that.RokDen,
                                    ixp_den: that.IxpDen
                                };
                            },
                        });
                        actTiskStatistikTisku.run();
                    }
                    else {
                        that.showFlash("Nejsou načtena žádná data", "error");
                    }
                }
            };
            GPrehledStatistikTisku = __decorate([
                Decorators.gcontent
            ], GPrehledStatistikTisku);
            WebClient.GPrehledStatistikTisku = GPrehledStatistikTisku;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRTdGF0aXN0aWtUaXNrdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmVobGVkU3RhdGlzdGlrVGlza3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FvSmY7QUFwSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0puQjtJQXBKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb0o3QjtRQXBKb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQWNwRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRywyQkFBMkIsQ0FBQztvQkFFMUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUVyQixJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7cUJBQ25ELENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFTyxhQUFhO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLG1CQUFtQjtvQkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVBQUUsTUFBTTs0QkFDWixPQUFPLEVBQUUsTUFBTTs0QkFDZixPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJ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RUFBRSxJQUFJLENBQUMsTUFBTTtpQ0FDdkIsQ0FBQTs0QkFDTCxDQUFDO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDaEMsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3pELENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFoSlksc0JBQXNCO2dCQURsQyxVQUFVLENBQUMsUUFBUTtlQUNQLHNCQUFzQixDQWdKbEM7WUFoSlksZ0NBQXNCLHlCQWdKbEMsQ0FBQTtRQUNMLENBQUMsRUFwSm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW9KN0I7SUFBRCxDQUFDLEVBcEpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFvSm5CO0FBQUQsQ0FBQyxFQXBKUyxNQUFNLEtBQU4sTUFBTSxRQW9KZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJlaGxlZFN0YXRpc3Rpa1Rpc2t1LnRzICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwxZllaGxlZHUgc3RhdGlzdGlrIHRpc2vFryAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTExLTA3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByZWhsZWRTdGF0aXN0aWtUaXNrdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHVibGljIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHVibGljIHZpZXc6IGFueTtcclxuICAgICAgICBmYXplOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vcHJvbcSbbm7DqSB2eXXFvml0w6kgcHJvIFRJU0tcclxuICAgICAgICBwcml2YXRlIGRhdF9vZDogYW55O1xyXG4gICAgICAgIHByaXZhdGUgZGF0X2RvOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBuZXBvdXppdGU6IGFueTtcclxuICAgICAgICBJeHBEZW46IHN0cmluZztcclxuICAgICAgICBSb2tEZW46IG51bWJlclxyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHUHJlaGxlZFN0YXRpc3Rpa1Rpc2t1XCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2ssIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gcG9sb8W+a3kgbWVudUJhcnVcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWN0VGlzazoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVGlzayBzdGF0aXN0aWsgdGlza3VcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza0Rva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwibWFpbkZvcm1cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXRpc3Rpa2EgemEgb2Jkb2LDrSBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoX2V2ZW50LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRfb2QgPSBvYmoudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoX2V2ZW50LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRfZG8gPSBvYmoudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJab2JyYXppdCBuZXBvdcW+aXTDqSBzZXN0YXZ5XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZXBvdXppdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChfZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5lcG91eml0ZSA9IG9iai52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHsgZGF0X29kOiB0aGF0LmRhdF9vZCwgZGF0X2RvOiB0aGF0LmRhdF9kbywgbmVwb3V6aXRlOiB0aGF0Lm5lcG91eml0ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuXHJcbiAgICAgICAgICAgICAgICBnZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbaGVhZGVyRm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKG9iai5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByZWhsZWRTdGF0aXN0aWtUaXNrdSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoZmlsdGVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBmaWx0ZXIuZmF6ZSA9IHRoYXQuZmF6ZTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5EZHBQcmVobGVkU3RhdGlzdGlrVGlza3UubGlzdFxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRpc2tEb2tsYWR1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQubmVwb3V6aXRlID09IHVuZGVmaW5lZCB8fCB0aGF0Lm5lcG91eml0ZSA9PSBmYWxzZSB8fCB0aGF0Lm5lcG91eml0ZSA9PSBcIjBcIikgdGhhdC5uZXBvdXppdGUgPSBcIjBcIjtcclxuICAgICAgICAgICAgZWxzZSB0aGF0Lm5lcG91eml0ZSA9IFwiMVwiXHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC52aWV3ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0VGlza1N0YXRpc3Rpa1Rpc2t1ID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrU3RhdGlzdGlrVGlza3VcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fc3Rhc2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g4oaTIE1ldG9kYSwga3RlcsOhIGplIHphdm9sw6FuYSB0xJtzbsSbIHDFmWVkIGdlbmVyb3bDoW7DrW0gc2VzdGF2eSBhIGtkZSBsemUgbmEgc3RyYW7EmyBzZXJ2ZXJ1IG92bGl2bml0IHBhcmFtZXRyeSBzZXN0YXZ5IOKGk1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwV2ViVGlzazpTdGF0aXN0aWtUaXNrdVwiLCAgLy96ZGUgc2UgcGxuw60gdMOpbWFcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyAgIC8vcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclBhcmFtZXRlck1ldGhvZCAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW1PZDogdGhhdC5kYXRfb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXR1bURvOiB0aGF0LmRhdF9kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lcG91eml0ZTogdGhhdC5uZXBvdXppdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfZGVuOiB0aGF0LlJva0RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuSXhwRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrU3RhdGlzdGlrVGlza3UucnVuKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lanNvdSBuYcSNdGVuYSDFvsOhZG7DoSBkYXRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
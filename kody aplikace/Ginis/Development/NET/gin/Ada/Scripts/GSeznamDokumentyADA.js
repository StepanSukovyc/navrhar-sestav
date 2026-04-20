"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamDokumentyADA.js                                                        </Name>
//    <Description> GSeznamDokumentyADA                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSeznamDokumentyADA = class GSeznamDokumentyADA extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Dokumenty ADA";
                    this.taskId = "actDokumentyADA"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actGridDoubleClick: {
                            caption: "Detail",
                            run: function (ev, ctx) {
                                var vybraneRadky;
                                vybraneRadky = cnt.find(".js-SeznamDocumentyAda").ggrid("activeRow", false);
                                if (vybraneRadky.ixp) {
                                    var modOtevreni = Gordic.Global.Enums.ModOtevreni.showModalWindow;
                                    var params = {
                                        DetailDto: { ixp: vybraneRadky.ixp },
                                    };
                                    Gordic.Ssl.Dialogs.Detail(cnt, params, modOtevreni);
                                }
                                return true;
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actGridDoubleClick*"]));
                    cnt.gridFormatSeznam = new Gordic.Data.GridFormat();
                    cnt.gridFormatSeznam.addIconColumn(Gordic.Wfl.Globals.ListSupport.PoziceSpisColumnDlg());
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "ixp",
                        caption: "PID",
                        customClass: "dt-left",
                        width: 140
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "Věc",
                        customClass: "dt-left",
                        width: 300
                    })
                        .addTextColumn({
                        name: "obsah_text",
                        caption: "Věc podrobně",
                        customClass: "dt-left",
                        width: 300
                    })
                        .addDateColumn({
                        name: "dat_pod",
                        caption: "Datum podání",
                        customClass: "dt-left",
                        width: 140
                    })
                        //.addTextColumn({               //sloupce pridane pred cfu
                        //    name: "ixp_spis",
                        //    caption: "Vloženo ve spisu",
                        //    customClass: "dt-left",
                        //    width: 140
                        //})
                        .addTextColumn({
                        name: "ixp_spis_prir",
                        caption: "Přiřazeno ke spisu",
                        customClass: "dt-left",
                        width: 140
                    })
                        .addNumberColumn({
                        name: "poc_priloh",
                        caption: "Počet příloh",
                        customClass: "dt-left",
                        width: 40
                    })
                        .addTextColumn({
                        name: "VlastnikFunkce.nazev_rf",
                        caption: "Vlastník",
                        customClass: "dt-left",
                        width: 300
                    });
                    cnt.mainTable = $("<div class='js-SeznamDocumentyAda'>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        defaultAction: cnt.actions.actGridDoubleClick,
                        selection: function (ev, selectionInfo) {
                            // var data = that.view_ISL.getDataRows();
                            console.log(selectionInfo);
                        },
                        searchColumns: Gordic.Ada.WebClient.AdaFunction.zjisti_sloupce_search(cnt.gridFormatSeznam),
                        columns: cnt.gridFormatSeznam,
                        defaultProfile: {
                            columnList: cnt.zjisti_sloupce(cnt.gridFormatSeznam)
                        },
                        profiles: [
                            { name: "Úplný", columnList: this.zjisti_sloupce(cnt.gridFormatSeznam), _locked: true } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        ],
                    });
                    cnt.filter = {};
                    cnt.filter.typ_ag = [250];
                    cnt.filter.s_stor = 0;
                    that.view_ISL = new Gordic.Isl.View(this.isl.Dokument.list({ filters: cnt.filter, fragments: ["Permissions", "*", "VlastnikFunkce.*"] }));
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                }
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
            };
            GSeznamDokumentyADA = __decorate([
                gcontent
            ], GSeznamDokumentyADA);
            WebClient.GSeznamDokumentyADA = GSeznamDokumentyADA;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURva3VtZW50eUFEQS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HU2V6bmFtRG9rdW1lbnR5QURBLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBd0pmO0FBeEpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdKbkI7SUF4SmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdKN0I7UUF4Sm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQUFyRDs7b0JBZ0JJLFVBQUssR0FBRyxlQUFlLENBQUM7b0JBQ3hCLFdBQU0sR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLCtCQUErQjtnQkFrSS9ELENBQUM7Z0JBaElHLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVsSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsa0JBQWtCLEVBQUU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FFbEIs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LENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWxELENBQUM7Z0JBRUQsY0FBYyxDQUFDLEVBQUU7b0JBQ2IsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0UsQ0FBQzthQUNKLENBQUE7WUFuSlksbUJBQW1CO2dCQUQvQixRQUFRO2VBQ0ksbUJBQW1CLENBbUovQjtZQW5KWSw2QkFBbUIsc0JBbUovQixDQUFBO1FBQ0wsQ0FBQyxFQXhKb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd0o3QjtJQUFELENBQUMsRUF4SmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdKbkI7QUFBRCxDQUFDLEVBeEpTLE1BQU0sS0FBTixNQUFNLFFBd0pmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1Eb2t1bWVudHlBREEuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHU2V6bmFtRG9rdW1lbnR5QURBICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRG9rdW1lbnR5QURBIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudER0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudER0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudEZpbHRlckR0bztcclxuICAgICAgICBwcml2YXRlIGdyaWRGb3JtYXRTZXpuYW06IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNzbC5JbnRlcmZhY2UuR0Rva3VtZW50RHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWFpblRhYmxlOiBKUXVlcnk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuICAgICAgICBwcmV2aWV3RGl2OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHJvd1RvUHJldmlldzogYW55O1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiRG9rdW1lbnR5IEFEQVwiO1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0RG9rdW1lbnR5QURBXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RHcmlkRG91YmxlQ2xpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3k7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eWJyYW5lUmFka3kgPSBjbnQuZmluZChcIi5qcy1TZXpuYW1Eb2N1bWVudHlBZGFcIikuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodnlicmFuZVJhZGt5Lml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZE90ZXZyZW5pID0gR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3c7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXRhaWxEdG86IHsgaXhwOiB2eWJyYW5lUmFka3kuaXhwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Tc2wuRGlhbG9ncy5EZXRhaWwoY250LCBwYXJhbXMsIG1vZE90ZXZyZW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdEdyaWREb3VibGVDbGljaypcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNzbC5JbnRlcmZhY2UuR0Rva3VtZW50RHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkSWNvbkNvbHVtbihHb3JkaWMuV2ZsLkdsb2JhbHMuTGlzdFN1cHBvcnQuUG96aWNlU3Bpc0NvbHVtbkRsZygpKVxyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0gXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUElEXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWxJtjXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvYnNhaF90ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbEm2MgcG9kcm9ibsSbXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BvZFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSBwb2TDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcIml4cF9zcGlzXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiVmxvxb5lbm8gdmUgc3Bpc3VcIixcclxuICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9zcGlzX3ByaXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZacWZYXplbm8ga2Ugc3Bpc3VcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jX3ByaWxvaFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb8SNZXQgcMWZw61sb2hcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiVmxhc3RuaWtGdW5rY2UubmF6ZXZfcmZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVmxhc3Ruw61rXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICBjbnQubWFpblRhYmxlID0gJChcIjxkaXYgY2xhc3M9J2pzLVNlem5hbURvY3VtZW50eUFkYSc+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBjbnQuYWN0aW9ucy5hY3RHcmlkRG91YmxlQ2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIHNlbGVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGRhdGEgPSB0aGF0LnZpZXdfSVNMLmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBzZWxlY3Rpb25JbmZvICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFGdW5jdGlvbi56amlzdGlfc2xvdXBjZV9zZWFyY2goY250LmdyaWRGb3JtYXRTZXpuYW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNudC5ncmlkRm9ybWF0U2V6bmFtLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBjbnQuemppc3RpX3Nsb3VwY2UoY250LmdyaWRGb3JtYXRTZXpuYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiw5pwbG7DvVwiLCBjb2x1bW5MaXN0OiB0aGlzLnpqaXN0aV9zbG91cGNlKGNudC5ncmlkRm9ybWF0U2V6bmFtKSwgX2xvY2tlZDogdHJ1ZSB9IC8vZ3JpZEZvcm1hdFNlem5hbS5jb2x1bW5zLmZpbHRlcigoYykgPT4gYy5uYW1lICE9IFwia25paGFcIikuam9pbigpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgICBjbnQuZmlsdGVyLnR5cF9hZyA9IFsyNTBdO1xyXG4gICAgICAgICAgICBjbnQuZmlsdGVyLnNfc3RvciA9IDA7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuRG9rdW1lbnQubGlzdCh7IGZpbHRlcnM6IGNudC5maWx0ZXIsIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCIsIFwiVmxhc3RuaWtGdW5rY2UuKlwiXSB9KSk7XHJcblxyXG4gICAgICAgICAgICBjbnQubWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6amlzdGlfc2xvdXBjZShnZikge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2YuY29sdW1ucy5maWx0ZXIoZSA9PiBlLmhpZGRlbiAhPSB0cnVlKS5tYXAoZSA9PiBlLm5hbWUpLmpvaW4oJywnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
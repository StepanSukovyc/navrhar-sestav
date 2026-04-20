"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GNedokonceneParovani.ts                </Name>
//    <Description> Content pro seznam výpisů s nedokončeným párováním          </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-03                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro seznam výpisů s nedokončeným párováním */
            let GNedokonceneParovani = class GNedokonceneParovani extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actUvolnit: {
                            caption: "jres:33600524", //RC 33600524 : Uvolnit
                            permission: this.Permissions.LzeUvolnit,
                            run: function (ev, ctx) {
                                this.setPending(that.uvolnit());
                            }
                        },
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({
                            enabled: true,
                            run: function (ev, ctx) {
                                this.setPending(that.$grid.ggrid("getView").requestData());
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actObcerstvit*", "actUvolnit*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element).ggrid({
                        name: "gridNedokonceneParovani",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucNedokonceneParovani.list(), {
                            key: ["ixp"]
                        }),
                        columnMode: "full"
                    }).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GNedokonceneParovaniDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GNedokonceneParovaniDtoNames.ucet_vl */
                    })
                        .addNumberColumn({
                        name: "cis_pid" /* Interface.GNedokonceneParovaniDtoNames.cis_pid */,
                        caption: "jres:33600525", //RC 33600525 : Číslo výpisu
                        width: 120
                    })
                        .addDateTimeColumn({
                        name: "dat_z_par" /* Interface.GNedokonceneParovaniDtoNames.dat_z_par */,
                        caption: "jres:33600526", //RC 33600526 : Okamžik spuštění
                        width: 120
                    })
                        .addTextColumn({
                        name: "nazev_rf" /* Interface.GNedokonceneParovaniDtoNames.nazev_rf */,
                        caption: "jres:33600527", //RC 33600527 : Spustil
                        width: 160
                    })
                        .addPid({
                        name: "ixp" /* Interface.GNedokonceneParovaniDtoNames.ixp */,
                        field: "ixp" /* Interface.GNedokonceneParovaniDtoNames.ixp */
                    });
                    return gridFormat;
                }
                /** Uvolnění výpisů z nedokončeného párování */
                uvolnit() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.isl.BucNedokonceneParovani.uvolnit({ data: { ixp: row.ixp } }).get().then(() => {
                        this.$grid.ggrid("getView").requestData();
                    });
                }
            };
            GNedokonceneParovani = __decorate([
                Decorators.gcontent
            ], GNedokonceneParovani);
            WebClient.GNedokonceneParovani = GNedokonceneParovani;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05lZG9rb25jZW5lUGFyb3ZhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTmVkb2tvbmNlbmVQYXJvdmFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQTRHZjtBQTVHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0R25CO0lBNUdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0RzdCO1FBNUdvQixXQUFBLFNBQVM7WUFDMUIseURBQXlEO1lBRXpELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQU1sRCxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsVUFBVSxFQUFFOzRCQUNSLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCOzRCQUNqRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVOzRCQUN2QyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDcEMsQ0FBQzt5QkFDSjt3QkFDRCxhQUFhLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JB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b0JBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDO2FBQ0osQ0FBQTtZQXhHWSxvQkFBb0I7Z0JBRGhDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asb0JBQW9CLENBd0doQztZQXhHWSw4QkFBb0IsdUJBd0doQyxDQUFBO1FBQ0wsQ0FBQyxFQTVHb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNEc3QjtJQUFELENBQUMsRUE1R2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRHbkI7QUFBRCxDQUFDLEVBNUdTLE1BQU0sS0FBTixNQUFNLFFBNEdmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdOZWRva29uY2VuZVBhcm92YW5pLnRzICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHBybyBzZXpuYW0gdsO9cGlzxa8gcyBuZWRva29uxI1lbsO9bSBww6Fyb3bDoW7DrW0gICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMC0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogQ29udGVudCBwcm8gc2V6bmFtIHbDvXBpc8WvIHMgbmVkb2tvbsSNZW7DvW0gcMOhcm92w6Fuw61tICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdOZWRva29uY2VuZVBhcm92YW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogU2VydmljZSBQZXJtaXNzaW9ucyAqL1xyXG4gICAgICAgIHByaXZhdGUgUGVybWlzc2lvbnM6IEludGVyZmFjZS5HTmVkb2tvbmNlbmVQYXJvdmFuaVNlcnZpY2VQZXJtaXNzaW9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RVdm9sbml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTI0XCIsIC8vUkMgMzM2MDA1MjQgOiBVdm9sbml0XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVVdm9sbml0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQudXZvbG5pdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2JjZXJzdHZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPYmNlcnN0dml0KlwiLCBcImFjdFV2b2xuaXQqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdncmlkPEludGVyZmFjZS5HTmVkb2tvbmNlbmVQYXJvdmFuaUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkTmVkb2tvbmNlbmVQYXJvdmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HTmVkb2tvbmNlbmVQYXJvdmFuaUR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuQnVjTmVkb2tvbmNlbmVQYXJvdmFuaS5saXN0KCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCJcclxuICAgICAgICAgICAgfSkuZ2F1dG9maXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR05lZG9rb25jZW5lUGFyb3ZhbmlEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR05lZG9rb25jZW5lUGFyb3ZhbmlEdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR05lZG9rb25jZW5lUGFyb3ZhbmlEdG9OYW1lcy51Y2V0X3ZsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdOZWRva29uY2VuZVBhcm92YW5pRHRvTmFtZXMuY2lzX3BpZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MjVcIiwgLy9SQyAzMzYwMDUyNSA6IMSMw61zbG8gdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmVkb2tvbmNlbmVQYXJvdmFuaUR0b05hbWVzLmRhdF96X3BhcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MjZcIiwgLy9SQyAzMzYwMDUyNiA6IE9rYW3FvmlrIHNwdcWhdMSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR05lZG9rb25jZW5lUGFyb3ZhbmlEdG9OYW1lcy5uYXpldl9yZixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MjdcIiwgLy9SQyAzMzYwMDUyNyA6IFNwdXN0aWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFBpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdOZWRva29uY2VuZVBhcm92YW5pRHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR05lZG9rb25jZW5lUGFyb3ZhbmlEdG9OYW1lcy5peHBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBVdm9sbsSbbsOtIHbDvXBpc8WvIHogbmVkb2tvbsSNZW7DqWhvIHDDoXJvdsOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSB1dm9sbml0KCkge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdOZWRva29uY2VuZVBhcm92YW5pRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNOZWRva29uY2VuZVBhcm92YW5pLnV2b2xuaXQoeyBkYXRhOiB7IGl4cDogcm93Lml4cCB9IH0pLmdldCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
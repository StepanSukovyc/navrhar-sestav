"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GParovanoDetail.ts                     </Name>
//    <Description> Dialog s detailem platby na kterou byla párována položka výpisu </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-08                                                  </Created>
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
            /**Dialog s detailem platby na kterou byla párována položka výpisu */
            let GParovanoDetail = class GParovanoDetail extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.$form.findFields().gfield("model", "apply", this.data);
                    this.$form.gform("viewMode", "view");
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actDetailExt: Gordic.Eko.Action.actionDetailDoZalozky({
                            enabled: !!that.ixp_par && !!that.data.typ_ag,
                            run: function (ev, ctx) {
                                this.setPending(Gordic.WebApp.Utility.openApp({
                                    ixx1: that.ixp_par,
                                    typAg: that.data.typ_ag
                                }, 'OpenDetail', {
                                    ticketType: Gordic.Enums.TicketType.WithLoginAndContext
                                }));
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        })
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actDetailExt", "actZavrit!"]));
                }
                /**Vytvoření formuláře*/
                createForm() {
                    let form = new Gordic.Forms.Form({
                        name: "formParovano",
                        layoutDescriptor: "L1M1S1"
                    })
                        .addRow("jres:33600039") //RC 33600039 : Identifikátor
                        .addField("gstringbox", {
                        name: "ixp_par",
                        disabled: true
                    })
                        .addRow("jres:33600040") //RC 33600040 : Agenda
                        .addField("gstringbox", {
                        name: "zkr_ag",
                        disabled: true
                    })
                        .addRow("jres:33600041") //RC 33600041 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac_ag",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "jres:33600042" : "jres:33600043") //RC 33600043 : Stav dokladu
                        .addField("gstringbox", {
                        name: "nazev",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "jres:33600044" : "jres:33600045") //RC 33600045 : Číslo účetního dokladu
                        .addField("gstringbox", {
                        name: "ico",
                        disabled: true
                    });
                    if (this.s_pol < 30) {
                        form.addRow("jres:33600046") //RC 33600046 : Způsob úhrady
                            .addField("gstringbox", {
                            name: "zkr_zp",
                            disabled: true
                        });
                    }
                    if (this.s_pol != 30) {
                        form.addRow("jres:33600047") //RC 33600047 : VS
                            .addField("gstringbox", {
                            name: "vs",
                            disabled: true
                        });
                    }
                    form.addRow("jres:33600048") //RC 33600048 : Částka
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c",
                        disabled: true
                    })
                        .addRow("jres:33600049") //RC 33600049 : Párováno
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_par",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "jres:33600050" : "jres:33600051") //RC 33600051 : Datum likvidace
                        .addField("gdatebox", {
                        name: "dat_spl",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "jres:33600052" : "jres:33600053") //RC 33600053 : Datum zaúčtování
                        .addField("gdatebox", {
                        name: "dat_zap",
                        disabled: true
                    });
                    if (this.s_pol < 30) {
                        form.addRow("jres:33600054") //RC 33600054 : Datum párování
                            .addField("gdatebox", {
                            name: "dat_par",
                            disabled: true
                        });
                    }
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
            };
            GParovanoDetail = __decorate([
                Decorators.gcontent
            ], GParovanoDetail);
            WebClient.GParovanoDetail = GParovanoDetail;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bhcm92YW5vRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bhcm92YW5vRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLGtHQUFrRztBQUNsRyx5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBMklmO0FBM0lELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJJbkI7SUEzSWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTJJN0I7UUEzSW9CLFdBQUEsU0FBUztZQUMxQixxRUFBcUU7WUFFckUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBaUI3QyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzs0QkFDbEQsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1B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QUFDLGVBQWUsQ0FBQyxDQUFDLDhCQUE4Qjs2QkFDdEQsUUFBUSxDQUFDLFVBQVUsRUFBRTs0QkFDbEIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsUUFBUSxFQUFFLElBQUk7eUJBQ2pCLENBQUMsQ0FBQTtvQkFDVixDQUFDO29CQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0UsQ0FBQzthQUNKLENBQUE7WUF2SVksZUFBZTtnQkFEM0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxlQUFlLENBdUkzQjtZQXZJWSx5QkFBZSxrQkF1STNCLENBQUE7UUFDTCxDQUFDLEVBM0lvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEySTdCO0lBQUQsQ0FBQyxFQTNJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkluQjtBQUFELENBQUMsRUEzSVMsTUFBTSxLQUFOLE1BQU0sUUEySWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFub0RldGFpbC50cyAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gRGlhbG9nIHMgZGV0YWlsZW0gcGxhdGJ5IG5hIGt0ZXJvdSBieWxhIHDDoXJvdsOhbmEgcG9sb8W+a2EgdsO9cGlzdSA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAxLTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqRGlhbG9nIHMgZGV0YWlsZW0gcGxhdGJ5IG5hIGt0ZXJvdSBieWxhIHDDoXJvdsOhbmEgcG9sb8W+a2EgdsO9cGlzdSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGFyb3Zhbm9EZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKklkZW50aWZpa8OhdG9yIG5hcMOhcm92YW7DqWhvIGRva2xhZHUqL1xyXG4gICAgICAgIHB1YmxpYyBpeHBfcGFyOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIMSMw61zbG8gxZnDoWRrdSBuYXDDoXJvdmFuw6lobyBkb2tsYWR1Ki9cclxuICAgICAgICBwdWJsaWMgY2lzbG9fcGFyOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFN0YXYgcG9sb8W+a3kqL1xyXG4gICAgICAgIHB1YmxpYyBzX3BvbDogbnVtYmVyO1xyXG4gICAgICAgIC8qKiDEjMOhc3RrYSovXHJcbiAgICAgICAgcHVibGljIGM6IHN0cmluZ1xyXG5cclxuICAgICAgICAvL0NvbnRlbnRWYWx1ZXNcclxuICAgICAgICAvKiogRGF0YSBkZXRhaWx1IHDDoXJvdsOhbsOtKi9cclxuICAgICAgICBwcml2YXRlIGRhdGE6IEludGVyZmFjZS5HUGFyb3Zhbm9EZXRhaWxEdG87XHJcblxyXG4gICAgICAgIC8qKiBGb3JtdWzDocWZICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy4kZm9ybS5nZm9ybShcInZpZXdNb2RlXCIsIFwidmlld1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsRXh0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWxEb1phbG96a3koe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICEhdGhhdC5peHBfcGFyICYmICEhdGhhdC5kYXRhLnR5cF9hZyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQuaXhwX3BhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBBZzogdGhhdC5kYXRhLnR5cF9hZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdPcGVuRGV0YWlsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWNrZXRUeXBlOiBFbnVtcy5UaWNrZXRUeXBlLldpdGhMb2dpbkFuZENvbnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0RGV0YWlsRXh0XCIsIFwiYWN0WmF2cml0IVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtUGFyb3Zhbm9cIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAwMzlcIikgLy9SQyAzMzYwMDAzOSA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9wYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMDQwXCIpIC8vUkMgMzM2MDAwNDAgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemtyX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDA0MVwiKSAvL1JDIDMzNjAwMDQxIDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKHRoaXMuc19wb2wgPCAzMCkgPyBcImpyZXM6MzM2MDAwNDJcIiA6IFwianJlczozMzYwMDA0M1wiKSAvL1JDIDMzNjAwMDQzIDogU3RhdiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCh0aGlzLnNfcG9sIDwgMzApID8gXCJqcmVzOjMzNjAwMDQ0XCIgOiBcImpyZXM6MzM2MDAwNDVcIikgLy9SQyAzMzYwMDA0NSA6IMSMw61zbG8gw7rEjWV0bsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNfcG9sIDwgMzApIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMzYwMDA0NlwiKSAvL1JDIDMzNjAwMDQ2IDogWnDFr3NvYiDDumhyYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemtyX3pwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc19wb2wgIT0gMzApIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMzYwMDA0N1wiKSAvL1JDIDMzNjAwMDQ3IDogVlNcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjMzNjAwMDQ4XCIpIC8vUkMgMzM2MDAwNDggOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAwNDlcIikgLy9SQyAzMzYwMDA0OSA6IFDDoXJvdsOhbm9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCh0aGlzLnNfcG9sIDwgMzApID8gXCJqcmVzOjMzNjAwMDUwXCIgOiBcImpyZXM6MzM2MDAwNTFcIikgLy9SQyAzMzYwMDA1MSA6IERhdHVtIGxpa3ZpZGFjZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygodGhpcy5zX3BvbCA8IDMwKSA/IFwianJlczozMzYwMDA1MlwiIDogXCJqcmVzOjMzNjAwMDUzXCIpIC8vUkMgMzM2MDAwNTMgOiBEYXR1bSB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3phcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc19wb2wgPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjMzNjAwMDU0XCIpIC8vUkMgMzM2MDAwNTQgOiBEYXR1bSBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
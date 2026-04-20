"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GParovaniProtokoly.ts                  </Name>
//    <Description> Content pro protokoly párování                              </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-12-03                                                  </Created>
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
            /** Content pro protokoly párování */
            let GParovaniProtokoly = class GParovaniProtokoly extends Gordic.GContentBase {
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
                        actAutParovat: {
                            caption: "jres:33600805", //RC 33600805 : Spustit
                            tooltip: "jres:33600806", //RC 33600806 : Spuštění automatického párování
                            permission: this.Permissions.LzeAutParovat,
                            run: function (ev, ctx) {
                                this.setPending(that.autParovat());
                            }
                        },
                        actTiskSparovane: Gordic.Eko.Action.actionTisk({
                            name: "actTiskSparovane",
                            caption: "jres:33600647", //RC 33600647 : Spárované
                            tema: "buc_ptm_prospg",
                            ixsStr: this.buc_ptm_prospg,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GParovaniProtokoly:PrintParameters",
                            reportStarting: function (rep) {
                                let davka = Gordic.Eko.Grid.currentRow(that.$grid)?.davka;
                                rep.customDto = { davka: davka };
                            }
                        }),
                        actTiskNesparovane: Gordic.Eko.Action.actionTisk({
                            name: "actTiskNesparovane",
                            caption: "jres:33600648", //RC 33600648 : Nespárované
                            tema: "buc_ptm_pronpg",
                            ixsStr: this.buc_ptm_pronpg,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GParovaniProtokoly:PrintParameters",
                            reportStarting: function (rep) {
                                let davka = Gordic.Eko.Grid.currentRow(that.$grid)?.davka;
                                rep.customDto = { davka: davka };
                            }
                        }),
                        actPosledniParovani: {
                            caption: "jres:33600807", //RC 33600807 : Poslední párování
                            tooltip: "jres:33600808", //RC 33600808 : Zobrazení údajů o posledním párování
                            permission: this.Permissions.LzePosledniParovani,
                            run: function (ev, ctx) {
                                this.setPending(that.posledniParovani());
                            }
                        },
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        },
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actAutParovat*", "actTiskSparovane*", "actTiskNesparovane*", "actPosledniParovani*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element).ggrid({
                        name: "gridParovaniProtokoly",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucParovaniNastroje.listProtokoly(), {
                            key: ["davka"]
                        }),
                        columnMode: "full",
                        defaultProfile: {
                            sort: "!dat_zmena"
                        }
                    }).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "davka" /* Interface.GParovaniProtokolDtoNames.davka */,
                        caption: "jres:33600646", //RC 33600646 : Číslo
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena" /* Interface.GParovaniProtokolDtoNames.dat_zmena */,
                        caption: "jres:33600649", //RC 33600649 : Datum párování
                        width: 160
                    })
                        .addTextColumn({
                        name: "nazev_rf" /* Interface.GParovaniProtokolDtoNames.nazev_rf */,
                        caption: "jres:33600650", //RC 33600650 : Pároval
                        width: 500
                    });
                }
                /** Spuštění automatického párování */
                autParovat() {
                    return this.navigate(['Gordic.Buc.WebClient.GAutomatickeParovani', { taskId: 'actAutomatickeParovani', uid: 'AutomatickeParovani#' }]).createDialogPromise().then(() => {
                        this.$grid.ggrid("getView").requestData();
                    });
                }
                /** Zobrazení údajů o posledním párování */
                posledniParovani() {
                    return this.dialogs.showModalWindow(['Gordic.Buc.WebClient.GPosledniParovani', { taskId: 'actPosledniParovani', uid: 'PosledniParovani#' }]).createDialogPromise();
                }
            };
            GParovaniProtokoly = __decorate([
                Decorators.gcontent
            ], GParovaniProtokoly);
            WebClient.GParovaniProtokoly = GParovaniProtokoly;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bhcm92YW5pUHJvdG9rb2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bhcm92YW5pUHJvdG9rb2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBb0lmO0FBcElELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9JbkI7SUFwSWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9JN0I7UUFwSW9CLFdBQUEsU0FBUztZQUMxQixxQ0FBcUM7WUFFckMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBVWhELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixhQUFhLEVBQUU7NEJBQ1gsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7NEJBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsK0NBQStDOzRCQUN6RSxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhOzRCQUMxQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDdkMsQ0FBQzt5QkFDSjt3QkFDRCxnQkFBZ0IsRUFBRSxN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QUUsRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQ3ZLLENBQUM7YUFDSixDQUFBO1lBaElZLGtCQUFrQjtnQkFEOUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxrQkFBa0IsQ0FnSTlCO1lBaElZLDRCQUFrQixxQkFnSTlCLENBQUE7UUFDTCxDQUFDLEVBcElvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvSTdCO0lBQUQsQ0FBQyxFQXBJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0luQjtBQUFELENBQUMsRUFwSVMsTUFBTSxLQUFOLE1BQU0sUUFvSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR1Bhcm92YW5pUHJvdG9rb2x5LnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHByb3Rva29seSBww6Fyb3bDoW7DrSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTItMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIENvbnRlbnQgcHJvIHByb3Rva29seSBww6Fyb3bDoW7DrSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGFyb3ZhbmlQcm90b2tvbHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBTZXJ2aWNlIHBlcm1pc3Npb25zKi9cclxuICAgICAgICBwcml2YXRlIFBlcm1pc3Npb25zOiBJbnRlcmZhY2UuR1Bhcm92YW5pUHJvdG9rb2xTZXJ2aWNlUGVybWlzc2lvbnM7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciBwcm8gdGlzayAtIEJVQyAtIFRUIFByb3Rva29sIHNww6Fyb3ZhbsO9Y2ggcGxhdGViIChHUikgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fcHJvc3BnOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciBwcm8gdGlzayAtIEJVQyAtIFRUIFByb3Rva29sIG5lc3DDoXJvdmFuw71jaCBwbGF0ZWIgKEdSKSAqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B0bV9wcm9ucGc6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RBdXRQYXJvdmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwODA1XCIsIC8vUkMgMzM2MDA4MDUgOiBTcHVzdGl0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwODA2XCIsIC8vUkMgMzM2MDA4MDYgOiBTcHXFoXTEm27DrSBhdXRvbWF0aWNrw6lobyBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplQXV0UGFyb3ZhdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmF1dFBhcm92YXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tTcGFyb3ZhbmU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1NwYXJvdmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDY0N1wiLCAvL1JDIDMzNjAwNjQ3IDogU3DDoXJvdmFuw6lcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImJ1Y19wdG1fcHJvc3BnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiB0aGlzLmJ1Y19wdG1fcHJvc3BnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFuaVByb3Rva29seTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF2a2EgPSBFa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HUGFyb3ZhbmlQcm90b2tvbER0bz4odGhhdC4kZ3JpZCk/LmRhdmthO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBkYXZrYTogZGF2a2EgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tOZXNwYXJvdmFuZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrTmVzcGFyb3ZhbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA2NDhcIiwgLy9SQyAzMzYwMDY0OCA6IE5lc3DDoXJvdmFuw6lcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImJ1Y19wdG1fcHJvbnBnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiB0aGlzLmJ1Y19wdG1fcHJvbnBnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFuaVByb3Rva29seTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF2a2EgPSBFa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HUGFyb3ZhbmlQcm90b2tvbER0bz4odGhhdC4kZ3JpZCk/LmRhdmthO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBkYXZrYTogZGF2a2EgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFBvc2xlZG5pUGFyb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA4MDdcIiwgLy9SQyAzMzYwMDgwNyA6IFBvc2xlZG7DrSBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDgwOFwiLCAvL1JDIDMzNjAwODA4IDogWm9icmF6ZW7DrSDDumRhasWvIG8gcG9zbGVkbsOtbSBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplUG9zbGVkbmlQYXJvdmFuaSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnBvc2xlZG5pUGFyb3ZhbmkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0QXV0UGFyb3ZhdCpcIiwgXCJhY3RUaXNrU3Bhcm92YW5lKlwiLCBcImFjdFRpc2tOZXNwYXJvdmFuZSpcIiwgXCJhY3RQb3NsZWRuaVBhcm92YW5pKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkdSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZ3JpZDxJbnRlcmZhY2UuR1Bhcm92YW5pUHJvdG9rb2xEdG8+KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFBhcm92YW5pUHJvdG9rb2x5XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdQYXJvdmFuaVByb3Rva29sRHRvPihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzbC5CdWNQYXJvdmFuaU5hc3Ryb2plLmxpc3RQcm90b2tvbHkoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiZGF2a2FcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXRfem1lbmFcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFuaVByb3Rva29sRHRvTmFtZXMuZGF2a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjQ2XCIsIC8vUkMgMzM2MDA2NDYgOiDEjMOtc2xvXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YW5pUHJvdG9rb2xEdG9OYW1lcy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjQ5XCIsIC8vUkMgMzM2MDA2NDkgOiBEYXR1bSBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFuaVByb3Rva29sRHRvTmFtZXMubmF6ZXZfcmYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjUwXCIsIC8vUkMgMzM2MDA2NTAgOiBQw6Fyb3ZhbFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFNwdcWhdMSbbsOtIGF1dG9tYXRpY2vDqWhvIHDDoXJvdsOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBhdXRQYXJvdmF0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShbJ0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdBdXRvbWF0aWNrZVBhcm92YW5pJywgeyB0YXNrSWQ6ICdhY3RBdXRvbWF0aWNrZVBhcm92YW5pJywgdWlkOiAnQXV0b21hdGlja2VQYXJvdmFuaSMnIH1dKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtIMO6ZGFqxa8gbyBwb3NsZWRuw61tIHDDoXJvdsOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb3NsZWRuaVBhcm92YW5pKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhbJ0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdQb3NsZWRuaVBhcm92YW5pJywgeyB0YXNrSWQ6ICdhY3RQb3NsZWRuaVBhcm92YW5pJywgdWlkOiAnUG9zbGVkbmlQYXJvdmFuaSMnIH1dKS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
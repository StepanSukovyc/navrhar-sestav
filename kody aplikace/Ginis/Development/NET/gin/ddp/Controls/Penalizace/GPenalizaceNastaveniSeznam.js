"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPenalizaceNastaveniSeznam.ts          </Name>
//    <Description> Seznam nastavení penalizace                                 </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-09-11                                                  </Created>
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
            var Controls;
            (function (Controls) {
                var Penalizace;
                (function (Penalizace) {
                    let GPenalizaceNastaveniSeznam = class GPenalizaceNastaveniSeznam extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            this.title = `Penalizace případu ${this.Ixp}`;
                            this.view = new Gordic.Isl.View(that.isl.PripadPenalizaceNastaveni.list(rq => {
                                return {
                                    filters: { ixp: this.Ixp, aktivita: 100 }
                                };
                            }));
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPenalizaceNastaveniSeznamZavritPotomky"]
                                }]);
                            this.menuBar([{
                                    action: this.actions["actGPenalizaceNastaveniSeznamNovy"],
                                    favorite: true
                                },
                                {
                                    action: this.actions["actGPenalizaceNastaveniSeznamUpravit"],
                                    favorite: true
                                },
                                {
                                    action: this.actions["actGPenalizaceNastaveniSeznamStorno"],
                                    favorite: true
                                }, {
                                    action: this.actions["actGPenalizaceNastaveniSeznamObnovit"],
                                    favorite: true,
                                    align: "opposite"
                                }]);
                            this.createGrid();
                        }
                        createGrid() {
                            this.grid = $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.view,
                                defaultProfile: {
                                    columnList: "dat_od, dat_do, typ_pen, c_pen_min, c_sazba_pen, proc_sazba_pen, poznamka, dat_ukonc, prikaz, c_pen, proc_sazba_den, zmenu_prov, dat_zmena"
                                },
                                columns: WebClient.Common.GridFormats.PenalizaceNastaveni()
                            });
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPenalizaceNastaveniSeznamZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                },
                                {
                                    name: "actGPenalizaceNastaveniSeznamNovy",
                                    caption: "Nový",
                                    icon: "fa-plus",
                                    run: () => {
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Penalizace.GPenalizaceNastaveni", { ID: "DDPGPenalizaceNastaveni#", Ixp: this.Ixp, editMode: false }, "Parametry penalizace", 800, 600).on("close", () => {
                                            this.view.requestData();
                                        });
                                    }
                                },
                                {
                                    name: "actGPenalizaceNastaveniSeznamUpravit",
                                    caption: "Upravit",
                                    icon: "gi-pencil",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Penalizace.GPenalizaceNastaveni", { ID: "DDPGPenalizaceNastaveni#", Ixp: row.ixp, Poradi: row.poradi, editMode: true }, "Parametry penalizace", 800, 600)
                                            .on("close", () => {
                                            this.view.requestData();
                                        });
                                    }
                                },
                                {
                                    name: "actGPenalizaceNastaveniSeznamStorno",
                                    caption: "Storno",
                                    icon: "fa-trash",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        WebClient.Common.Base.ProcessResponse(Gordic.Isl.PripadPenalizaceNastaveni.delete(rq => {
                                            return {
                                                rq: {
                                                    Data: {
                                                        ixp: row.ixp,
                                                        poradi: row.poradi,
                                                    }
                                                }
                                            };
                                        }).get(), this)
                                            .always(() => {
                                            this.view.requestData();
                                        });
                                    }
                                },
                                {
                                    name: "actGPenalizaceNastaveniSeznamObnovit",
                                    caption: "Obnovit",
                                    icon: "fa-refresh",
                                    run: () => {
                                        this.view.requestData();
                                    }
                                }]);
                        }
                    };
                    GPenalizaceNastaveniSeznam = __decorate([
                        Decorators.gcontent
                    ], GPenalizaceNastaveniSeznam);
                    Penalizace.GPenalizaceNastaveniSeznam = GPenalizaceNastaveniSeznam;
                })(Penalizace = Controls.Penalizace || (Controls.Penalizace = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BlbmFsaXphY2VOYXN0YXZlbmlTZXpuYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQThIZjtBQTlIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E4SG5CO0lBOUhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4SDdCO1FBOUhvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0E4SHRDO1lBOUg4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxVQUFVLENBOEhqRDtnQkE5SHVDLFdBQUEsVUFBVTtvQkFFOUMsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxPQUFBLFlBQVk7d0JBS3hELGNBQWM7NEJBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBRTlDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQ0FDekUsT0FBTztvQ0FDSCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO2lDQUM1QyxDQUFBOzRCQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRUosSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFB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QkEySHRDLENBQUE7Z0JBQ0wsQ0FBQyxFQTlIdUMsVUFBVSxHQUFWLG1CQUFVLEtBQVYsbUJBQVUsUUE4SGpEO1lBQUQsQ0FBQyxFQTlIOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUE4SHRDO1FBQUQsQ0FBQyxFQTlIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOEg3QjtJQUFELENBQUMsRUE5SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThIbkI7QUFBRCxDQUFDLEVBOUhTLE1BQU0sS0FBTixNQUFNLFFBOEhmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQZW5hbGl6YWNlTmFzdGF2ZW5pU2V6bmFtLnRzICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTZXpuYW0gbmFzdGF2ZW7DrSBwZW5hbGl6YWNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDktMTEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QZW5hbGl6YWNlIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BlbmFsaXphY2VOYXN0YXZlbmlTZXpuYW0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBJc2wuVmlldzxEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUGVuYWxpemFjZU5hc3RhdmVuaUR0bz47XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBQZW5hbGl6YWNlIHDFmcOtcGFkdSAke3RoaXMuSXhwfWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLlByaXBhZFBlbmFsaXphY2VOYXN0YXZlbmkubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgaXhwOiB0aGlzLkl4cCwgYWt0aXZpdGE6IDEwMCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlTmFzdGF2ZW5pU2V6bmFtTm92eVwiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlTmFzdGF2ZW5pU2V6bmFtVXByYXZpdFwiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlTmFzdGF2ZW5pU2V6bmFtU3Rvcm5vXCJdLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1BlbmFsaXphY2VOYXN0YXZlbmlTZXpuYW1PYm5vdml0XCJdLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJvcHBvc2l0ZVwiXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkYXRfb2QsIGRhdF9kbywgdHlwX3BlbiwgY19wZW5fbWluLCBjX3NhemJhX3BlbiwgcHJvY19zYXpiYV9wZW4sIHBvem5hbWthLCBkYXRfdWtvbmMsIHByaWtheiwgY19wZW4sIHByb2Nfc2F6YmFfZGVuLCB6bWVudV9wcm92LCBkYXRfem1lbmFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlBlbmFsaXphY2VOYXN0YXZlbmkoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbU5vdnlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlBlbmFsaXphY2UuR1BlbmFsaXphY2VOYXN0YXZlbmlcIiwgeyBJRDogXCJERFBHUGVuYWxpemFjZU5hc3RhdmVuaSNcIiwgSXhwOiB0aGlzLkl4cCwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiUGFyYW1ldHJ5IHBlbmFsaXphY2VcIiwgODAwLCA2MDApLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbVVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlTmFzdGF2ZW5pRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlBlbmFsaXphY2UuR1BlbmFsaXphY2VOYXN0YXZlbmlcIiwgeyBJRDogXCJERFBHUGVuYWxpemFjZU5hc3RhdmVuaSNcIiwgSXhwOiByb3cuaXhwLCBQb3JhZGk6IHJvdy5wb3JhZGksIGVkaXRNb2RlOiB0cnVlIH0sIFwiUGFyYW1ldHJ5IHBlbmFsaXphY2VcIiwgODAwLCA2MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbVN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlTmFzdGF2ZW5pRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKElzbC5QcmlwYWRQZW5hbGl6YWNlTmFzdGF2ZW5pLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3JhZGk6IHJvdy5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZU5hc3RhdmVuaVNlem5hbU9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
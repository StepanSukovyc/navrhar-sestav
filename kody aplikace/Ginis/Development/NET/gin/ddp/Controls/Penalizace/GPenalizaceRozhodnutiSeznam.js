"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPenalizaceRozhodnutiSeznam.ts         </Name>
//    <Description> Seznam rozhodnutí penalizace                                </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-12-19                                                  </Created>
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
                    let GPenalizaceRozhodnutiSeznam = class GPenalizaceRozhodnutiSeznam extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            this.title = `Rozhodnutí o penalizaci případu ${this.Ixp}`;
                            this.view = new Gordic.Isl.View(that.isl.PripadPenalizaceRozhodnuti.list(rq => {
                                return {
                                    filters: { ixp: this.Ixp, aktivita: 100 }
                                };
                            }));
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPenalizaceRozhodnutiSeznamZavritPotomky"]
                                }]);
                            this.menuBar([{
                                    action: this.actions["actGPenalizaceRozhodnutiSeznamNove"],
                                    favorite: true
                                },
                                {
                                    action: this.actions["actGPenalizaceRozhodnutiSeznamUpravit"],
                                    favorite: true
                                },
                                {
                                    action: this.actions["actGPenalizaceRozhodnutiSeznamStorno"],
                                    favorite: true
                                }, {
                                    action: this.actions["actGPenalizaceRozhodnutiSeznamObnovit"],
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
                                    columnList: "por_rozhod, cj, dat_nab_pm, dat_doruc, dat_vykon, dat_rozhod, dat_zac_pen, dat_kon_pen, poznamka"
                                },
                                columns: WebClient.Common.GridFormats.PenalizaceRozhodnuti()
                            });
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPenalizaceRozhodnutiSeznamZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                },
                                {
                                    name: "actGPenalizaceRozhodnutiSeznamNove",
                                    caption: "Nový",
                                    icon: "fa-plus",
                                    run: () => {
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Penalizace.GPenalizaceRozhodnuti", { ID: "DDPGPenalizaceRozhodnuti#", Ixp: this.Ixp, editMode: false }, "Rozhodnutí o penalizaci", 800, 600)
                                            .on("close", () => {
                                            this.view.requestData();
                                        });
                                    }
                                },
                                {
                                    name: "actGPenalizaceRozhodnutiSeznamUpravit",
                                    caption: "Upravit",
                                    icon: "gi-pencil",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Penalizace.GPenalizaceRozhodnuti", { ID: "DDPGPenalizaceRozhodnuti#", Ixp: row.ixp, Poradi: row.por_rozhod, editMode: true }, "Rozhodnutí o penalizaci", 800, 600)
                                            .on("close", () => {
                                            this.view.requestData();
                                        });
                                    }
                                },
                                {
                                    name: "actGPenalizaceRozhodnutiSeznamStorno",
                                    caption: "Storno",
                                    icon: "fa-trash",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        WebClient.Common.Base.ProcessResponse(Gordic.Isl.PripadPenalizaceRozhodnuti.delete(rq => {
                                            return {
                                                rq: {
                                                    Data: {
                                                        ixp: row.ixp,
                                                        por_rozhod: row.por_rozhod,
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
                                    name: "actGPenalizaceRozhodnutiSeznamObnovit",
                                    caption: "Obnovit",
                                    icon: "fa-refresh",
                                    run: () => {
                                        this.view.requestData();
                                    }
                                }]);
                        }
                    };
                    GPenalizaceRozhodnutiSeznam = __decorate([
                        Decorators.gcontent
                    ], GPenalizaceRozhodnutiSeznam);
                    Penalizace.GPenalizaceRozhodnutiSeznam = GPenalizaceRozhodnutiSeznam;
                })(Penalizace = Controls.Penalizace || (Controls.Penalizace = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BlbmFsaXphY2VSb3pob2RudXRpU2V6bmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BlbmFsaXphY2VSb3pob2RudXRpU2V6bmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBZ0lmO0FBaElELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdJbkI7SUFoSWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdJN0I7UUFoSW9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQWdJdEM7WUFoSThCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLFVBQVUsQ0FnSWpEO2dCQWhJdUMsV0FBQSxVQUFVO29CQUc5QyxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUE0QixTQUFRLE9BQUEsWUFBWTt3QkFLekQsY0FBYzs0QkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7NEJBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsbUNBQW1DLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFFM0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dDQUMxRSxPQUFPO29DQUNILE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7aUNBQzVDLENBQUE7NEJBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFSixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxF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Qiw4QkE0SHZDLENBQUE7Z0JBQ0wsQ0FBQyxFQWhJdUMsVUFBVSxHQUFWLG1CQUFVLEtBQVYsbUJBQVUsUUFnSWpEO1lBQUQsQ0FBQyxFQWhJOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUFnSXRDO1FBQUQsQ0FBQyxFQWhJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ0k3QjtJQUFELENBQUMsRUFoSWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdJbkI7QUFBRCxDQUFDLEVBaElTLE1BQU0sS0FBTixNQUFNLFFBZ0lmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQZW5hbGl6YWNlUm96aG9kbnV0aVNlem5hbS50cyAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTZXpuYW0gcm96aG9kbnV0w60gcGVuYWxpemFjZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMTItMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QZW5hbGl6YWNlIHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQZW5hbGl6YWNlUm96aG9kbnV0aVNlem5hbSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlUm96aG9kbnV0aUR0bz47XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBSb3pob2RudXTDrSBvIHBlbmFsaXphY2kgcMWZw61wYWR1ICR7dGhpcy5JeHB9YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuUHJpcGFkUGVuYWxpemFjZVJvemhvZG51dGkubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgaXhwOiB0aGlzLkl4cCwgYWt0aXZpdGE6IDEwMCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUGVuYWxpemFjZVJvemhvZG51dGlTZXpuYW1aYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUGVuYWxpemFjZVJvemhvZG51dGlTZXpuYW1Ob3ZlXCJdLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1BlbmFsaXphY2VSb3pob2RudXRpU2V6bmFtVXByYXZpdFwiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlUm96aG9kbnV0aVNlem5hbVN0b3Jub1wiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlUm96aG9kbnV0aVNlem5hbU9ibm92aXRcIl0sXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFsaWduOiBcIm9wcG9zaXRlXCJcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInBvcl9yb3pob2QsIGNqLCBkYXRfbmFiX3BtLCBkYXRfZG9ydWMsIGRhdF92eWtvbiwgZGF0X3JvemhvZCwgZGF0X3phY19wZW4sIGRhdF9rb25fcGVuLCBwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUGVuYWxpemFjZVJvemhvZG51dGkoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZVJvemhvZG51dGlTZXpuYW1aYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BlbmFsaXphY2VSb3pob2RudXRpU2V6bmFtTm92ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvVwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuUGVuYWxpemFjZS5HUGVuYWxpemFjZVJvemhvZG51dGlcIiwgeyBJRDogXCJERFBHUGVuYWxpemFjZVJvemhvZG51dGkjXCIsIEl4cDogdGhpcy5JeHAsIGVkaXRNb2RlOiBmYWxzZSB9LCBcIlJvemhvZG51dMOtIG8gcGVuYWxpemFjaVwiLCA4MDAsIDYwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQZW5hbGl6YWNlUm96aG9kbnV0aVNlem5hbVVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlUm96aG9kbnV0aUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QZW5hbGl6YWNlLkdQZW5hbGl6YWNlUm96aG9kbnV0aVwiLCB7IElEOiBcIkREUEdQZW5hbGl6YWNlUm96aG9kbnV0aSNcIiwgSXhwOiByb3cuaXhwLCBQb3JhZGk6IHJvdy5wb3Jfcm96aG9kLCBlZGl0TW9kZTogdHJ1ZSB9LCBcIlJvemhvZG51dMOtIG8gcGVuYWxpemFjaVwiLCA4MDAsIDYwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQZW5hbGl6YWNlUm96aG9kbnV0aVNlem5hbVN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlUm96aG9kbnV0aUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShJc2wuUHJpcGFkUGVuYWxpemFjZVJvemhvZG51dGkuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcl9yb3pob2Q6IHJvdy5wb3Jfcm96aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKSwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BlbmFsaXphY2VSb3pob2RudXRpU2V6bmFtT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
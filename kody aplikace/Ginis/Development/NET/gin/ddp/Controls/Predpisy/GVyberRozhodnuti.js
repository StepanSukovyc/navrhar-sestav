"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberRozhodnuti.ts                    </Name>
//    <Description> Okno pro výěr rozhodnutí z tabulky rozhodnuti               </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-12-19                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GVyberRozhodnuti = 
            /** Okno pro výěr rozhodnutí z tabulky rozhodnuti */
            class GVyberRozhodnuti extends Gordic.GContentBase {
                onContentReady() {
                    this.title = `Výběr rozhodnutí případu ${this.Ixp}`;
                    this.createActions();
                    this.setBreadcrumbs([{
                            caption: this.title,
                            action: this.actions["actGPredpisZavritPotomky"]
                        }]);
                    this.createGui();
                }
                createGui() {
                    this.menuBar([{
                            favorite: true,
                            action: this.actions["actGPripadRozhodnutiNove"]
                        },
                        {
                            favorite: true,
                            action: this.actions["actGPripadRozhodnutiDetail"]
                        },
                        //{
                        //    favorite: true,
                        //    action: this.actions["actGPripadRozhodnutiStorno"]
                        //},
                        //{
                        //    favorite: true,
                        //    action: this.actions["actGPripadRozhodnutiObnovit"]
                        //},
                        //{
                        //    favorite: true,
                        //    action: this.actions["actGPripadRozhodnutiDokument"]
                        //}
                    ]);
                    this.gridRozhodnuti = $("<div>")
                        .appendTo(this.element)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        name: "gridRozhodnuti",
                        columns: WebClient.Common.GridFormats.PripadRozhodnuti(),
                        defaultProfile: {
                            columnList: "rozhodnuti, ixp_dok, dat_dodat, dat_dodani, dat_od, dat_do, platnost, popis, poznamka, radek_uhr"
                        },
                        data: new Gordic.Isl.View(Gordic.Isl.PripadRozhodnuti.list(rq => {
                            return {
                                filters: {
                                    ixp: this.Ixp
                                }
                            };
                        })),
                        defaultAction: this.actions["actVybratRozhodnuti"],
                    });
                }
                refresh() {
                    this.beginOperation();
                    var that = this;
                    this.viewRozhodnuti = new Gordic.Isl.View(Gordic.Isl.PripadRozhodnuti.list(rq => {
                        return {
                            filters: {
                                ixp: this.Ixp
                            }
                        };
                    }));
                    that.gridRozhodnuti.ggrid("setData", that.viewRozhodnuti);
                    this.endOperation();
                }
                createActions() {
                    this.actions.addRange([
                        {
                            name: "actGPredpisZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actVybratRozhodnuti",
                            run: () => {
                                this.ok();
                            }
                        },
                        {
                            name: "actGPripadRozhodnutiNove",
                            caption: "Nové",
                            run: () => {
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadRozhodnuti", { ID: "DDPGPripadRozhodnuti#", Ixp: this.Ixp, editMode: false }, "Nové rozhodnutí", 610, 450)
                                    .on("close", () => {
                                    //this.viewRozhodnuti.requestData();
                                    this.refresh();
                                });
                            }
                        },
                        {
                            name: "actGPripadRozhodnutiDetail",
                            caption: "Detail",
                            run: () => {
                                let row = this.gridRozhodnuti.ggrid("activeRow");
                                if (row)
                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadRozhodnuti", { ID: "DDPGPripadRozhodnuti#", Ixp: row.ixp, Rozhodnuti: row.rozhodnuti, editMode: true }, "Detail rozhodnutí", 610, 450)
                                        .on("close", () => {
                                        //this.viewRozhodnuti.requestData();
                                        this.refresh();
                                    });
                            }
                        },
                        {
                            name: "actGPripadRozhodnutiStorno",
                            caption: "Zrušit",
                            run: () => {
                                let row = this.gridRozhodnuti.ggrid("activeRow");
                                if (row) {
                                    let req = Gordic.Isl.PripadRozhodnuti.storno(rq => {
                                        return {
                                            rq: {
                                                Data: row
                                            }
                                        };
                                    }).get();
                                    WebClient.Common.Base.ProcessResponse(req, this, false, false).always(() => {
                                        //this.viewRozhodnuti.requestData();
                                        this.refresh();
                                    });
                                }
                            }
                        },
                        {
                            name: "actGPripadRozhodnutiObnovit",
                            caption: "Obnovit",
                            run: () => {
                                let row = this.gridRozhodnuti.ggrid("activeRow");
                                if (row) {
                                    let req = Gordic.Isl.PripadRozhodnuti.restore(rq => {
                                        return {
                                            rq: {
                                                Data: row
                                            }
                                        };
                                    }).get();
                                    WebClient.Common.Base.ProcessResponse(req, this, false, false).always(() => {
                                        //this.viewRozhodnuti.requestData();
                                        this.refresh();
                                    });
                                }
                            }
                        },
                        {
                            name: "actGPripadRozhodnutiDokument",
                            caption: "Dokument",
                            run: () => {
                                let row = this.gridRozhodnuti.ggrid("activeRow");
                                if (row && row.ixp_dok) {
                                    Gordic.Wfl.Dialogs.DetailDokumentuSpisu(this, { DetailDto: { ixp: row.ixp_dok } }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                                }
                            }
                        }
                    ]);
                }
                ok() {
                    var that = this;
                    debugger;
                    let row = this.gridRozhodnuti.ggrid("activeRow");
                    this.close(row.rozhodnuti);
                }
            };
            GVyberRozhodnuti = __decorate([
                Decorators.gcontent
                /** Okno pro výěr rozhodnutí z tabulky rozhodnuti */
            ], GVyberRozhodnuti);
            WebClient.GVyberRozhodnuti = GVyberRozhodnuti;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyUm96aG9kbnV0aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWeWJlclJvemhvZG51dGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0FzTGY7QUF0TEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0xuQjtJQXRMZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc0w3QjtRQXRMb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsZ0JBQWdCO1lBRDdCLG9EQUFvRDtZQUNwRCxNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFPOUMsY0FBYztvQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3BELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDO3lCQUNuRCxDQUFDLENBQUMsQ0FBQztvQkFFSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7Z0JBRXBCLENBQUM7Z0JBRU8sU0FBUztvQkFFYixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ1YsUUFBUSxFQUFFLElBQUk7NEJBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7eUJBQ25EO3dCQUNEOzRCQUNJLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO3lCQUNyRDt3QkFDRyxHQUFHO3dCQUNILHFCQUFxQjt3QkFD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LEtBQUssQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7Z0NBQ2pJLENBQUM7NEJBRUwsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxFQUFFO29CQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsUUFBUSxDQUFDO29CQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUE0QyxXQUFXLENBQUMsQ0FBQztvQkFDNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzlCLENBQUM7YUFDSixDQUFBO1lBbExZLGdCQUFnQjtnQkFGNUIsVUFBVSxDQUFDLFFBQVE7Z0JBQ3BCLG9EQUFvRDtlQUN2QyxnQkFBZ0IsQ0FrTDVCO1lBbExZLDBCQUFnQixtQkFrTDVCLENBQUE7UUFDTCxDQUFDLEVBdExvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzTDdCO0lBQUQsQ0FBQyxFQXRMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc0xuQjtBQUFELENBQUMsRUF0TFMsTUFBTSxLQUFOLE1BQU0sUUFzTGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyUm96aG9kbnV0aS50cyAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHbDvcSbciByb3pob2RudXTDrSB6IHRhYnVsa3kgcm96aG9kbnV0aSAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIyICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjItMTItMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICAvKiogT2tubyBwcm8gdsO9xJtyIHJvemhvZG51dMOtIHogdGFidWxreSByb3pob2RudXRpICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5YmVyUm96aG9kbnV0aSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWRSb3pob2RudXRpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlld1JvemhvZG51dGk6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRSb3pob2RudXRpRHRvPjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgVsO9YsSbciByb3pob2RudXTDrSBwxZnDrXBhZHUgJHt0aGlzLkl4cH1gO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1ByZWRwaXNaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3VpKClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUd1aSgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQcmlwYWRSb3pob2RudXRpTm92ZVwiXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1ByaXBhZFJvemhvZG51dGlEZXRhaWxcIl1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQcmlwYWRSb3pob2RudXRpU3Rvcm5vXCJdXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUHJpcGFkUm96aG9kbnV0aU9ibm92aXRcIl1cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQcmlwYWRSb3pob2RudXRpRG9rdW1lbnRcIl1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFJvemhvZG51dGkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3pob2RudXRpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByaXBhZFJvemhvZG51dGkoKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInJvemhvZG51dGksIGl4cF9kb2ssIGRhdF9kb2RhdCwgZGF0X2RvZGFuaSwgZGF0X29kLCBkYXRfZG8sIHBsYXRub3N0LCBwb3BpcywgcG96bmFta2EsIHJhZGVrX3VoclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgSXNsLlZpZXcoSXNsLlByaXBhZFJvemhvZG51dGkubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLkl4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RWeWJyYXRSb3pob2RudXRpXCJdLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaCgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1JvemhvZG51dGkgPSBuZXcgSXNsLlZpZXcoSXNsLlByaXBhZFJvemhvZG51dGkubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLkl4cFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRSb3pob2RudXRpLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdSb3pob2RudXRpKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5YnJhdFJvemhvZG51dGlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkUm96aG9kbnV0aU5vdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsOpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkUm96aG9kbnV0aVwiLCB7IElEOiBcIkREUEdQcmlwYWRSb3pob2RudXRpI1wiLCBJeHA6IHRoaXMuSXhwLCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDqSByb3pob2RudXTDrVwiLCA2MTAsIDQ1MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMudmlld1JvemhvZG51dGkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkUm96aG9kbnV0aURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRSb3pob2RudXRpLmdncmlkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRSb3pob2RudXRpRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkUm96aG9kbnV0aVwiLCB7IElEOiBcIkREUEdQcmlwYWRSb3pob2RudXRpI1wiLCBJeHA6IHJvdy5peHAsIFJvemhvZG51dGk6IHJvdy5yb3pob2RudXRpLCBlZGl0TW9kZTogdHJ1ZSB9LCBcIkRldGFpbCByb3pob2RudXTDrVwiLCA2MTAsIDQ1MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy52aWV3Um96aG9kbnV0aS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByaXBhZFJvemhvZG51dGlTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZFJvemhvZG51dGkuZ2dyaWQ8RGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFJvemhvZG51dGlEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gSXNsLlByaXBhZFJvemhvZG51dGkuc3Rvcm5vKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YTogcm93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UocmVxLCB0aGlzLCBmYWxzZSwgZmFsc2UpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnZpZXdSb3pob2RudXRpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkUm96aG9kbnV0aU9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZFJvemhvZG51dGkuZ2dyaWQ8RGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFJvemhvZG51dGlEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0gSXNsLlByaXBhZFJvemhvZG51dGkucmVzdG9yZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHJlcSwgdGhpcywgZmFsc2UsIGZhbHNlKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy52aWV3Um96aG9kbnV0aS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgeyAgIC8vTmV0dcWhw61tLCBrIMSNZW11IHRvIHNsb3XFvsOtXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkUm96aG9kbnV0aURva3VtZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb2t1bWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkUm96aG9kbnV0aS5nZ3JpZDxEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUm96aG9kbnV0aUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgcm93Lml4cF9kb2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh0aGlzLCB7IERldGFpbER0bzogeyBpeHA6IHJvdy5peHBfZG9rIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkUm96aG9kbnV0aS5nZ3JpZDxEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUm96aG9kbnV0aUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2Uocm93LnJvemhvZG51dGkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
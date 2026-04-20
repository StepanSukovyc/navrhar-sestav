"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniCiselnikuADM.ts              </Name>
//    <Description> Nastavení číselníků (verze pro ADX)                         </Description>
//    <Author>      mhanus                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2023-11-13                                                  </Created>
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
            let GNastaveniCiselnikuADM = class GNastaveniCiselnikuADM extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.taskId = "actGNastaveniCiselnikuADM";
                    that.title = "Nastavení číselníků";
                    that.createActions();
                    that.createGui();
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createGui() {
                    const that = this;
                    that.view = new Gordic.Isl.View(that.isl.TypPohledavky.list(rq => {
                        return {
                            filters: {
                                ico: that.Ico,
                                ucs: that.Ucs,
                                rok: that.Rok,
                                //zobrKnihu: true,
                            }
                        };
                    }));
                    that.menuBar([
                        {
                            action: that.actions["actGNastaveniCiselnikuDetail"],
                            favorite: true
                        },
                        //{
                        //    action: that.actions["actGNastaveniCiselnikuDetail2"],
                        //    favorite: true
                        //}
                    ]);
                    that.actions.addRange([
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actClose!"]));
                    that.grid = $("<div>")
                        .appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        data: that.view,
                        sort: "nazev",
                        defaultProfile: {
                            columnList: "typ_phl, nazev, ixp_den, rok",
                            rowNumbers: true
                        },
                        defaultAction: that.actions["actGNastaveniCiselnikuDetail"],
                        searchColumns: ["typ_phl", "nazev"],
                        columns: WebClient.Common.GridFormats.TypyPohledavek(that)
                    });
                }
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGNastaveniCiselnikuZavritPotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGNastaveniCiselnikuDetail",
                            caption: "Detail",
                            icon: "gi-detail",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                if (row == null) {
                                    that.dialogs.error("Vyberte typ pohledávky", "Vyberte typ pohledávky.");
                                    return;
                                }
                                //that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl! }, `Číselníky typu pohledávky ${row.typ_phl!}`, 800, 600);
                                //var newGpc = Gordic.Eko.Utils.createBookGpc(that.gpc, row.ixp_den) { gpc: newGpc },
                                that.navigate("Gordic.Ddp.WebClient.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl });
                                //that.title:`Číselníky typu pohledávky ${row.typ_phl!}`
                            }
                        },
                        {
                            name: "actGNastaveniCiselnikuDetail2",
                            caption: "Detail-vzor",
                            icon: "gi-detail",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                if (row == null) {
                                    that.dialogs.error("Vyberte typ pohledávky", "Vyberte typ pohledávky.");
                                    return;
                                }
                                //that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl! }, `Číselníky typu pohledávky ${row.typ_phl!}`, 800, 600);
                                that.navigate("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky2", { ID: "DDPGCiselniky1#", typ_phl: row.typ_phl });
                                //that.title:`Číselníky typu pohledávky ${row.typ_phl!}`
                            }
                        }
                    ]);
                }
            };
            GNastaveniCiselnikuADM = __decorate([
                Decorators.gcontent
            ], GNastaveniCiselnikuADM);
            WebClient.GNastaveniCiselnikuADM = GNastaveniCiselnikuADM;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaUNpc2VsbmlrdUFETS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdOYXN0YXZlbmlDaXNlbG5pa3VBRE0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0EySGY7QUEzSEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkhuQjtJQTNIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMkg3QjtRQTNIb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQWNwRCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRywyQkFBMkIsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUVyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRWpCLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbkUsQ0FBQztnQkFFTyxTQUFTO29CQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ3RELE9BQU87NEJBQ0gsT0FBTyxFQUFFO2dDQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQ0FDYixH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VyxDQUFDLENBQUM7Z0NBQ3RGLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLHlCQUF5QixDQUFDLENBQUM7b0NBQ3hFLE9BQU87Z0NBQ1gsQ0FBQztnQ0FFRCw2TEFBNkw7Z0NBQzdMLElBQUksQ0FBQyxRQUFRLENBQUMscURBQXFELEVBQUUsRUFBRSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFRLEVBQUUsQ0FBQyxDQUFDO2dDQUN2SCx3REFBd0Q7NEJBQzVELENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSixDQUFBO1lBdkhZLHNCQUFzQjtnQkFEbEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxzQkFBc0IsQ0F1SGxDO1lBdkhZLGdDQUFzQix5QkF1SGxDLENBQUE7UUFDTCxDQUFDLEVBM0hvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEySDdCO0lBQUQsQ0FBQyxFQTNIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkhuQjtBQUFELENBQUMsRUEzSFMsTUFBTSxLQUFOLE1BQU0sUUEySGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR05hc3RhdmVuaUNpc2VsbmlrdUFETS50cyAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE5hc3RhdmVuw60gxI3DrXNlbG7DrWvFryAodmVyemUgcHJvIEFEWCkgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBtaGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMS0xMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdOYXN0YXZlbmlDaXNlbG5pa3VBRE0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBJc2wuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+O1xyXG5cclxuICAgICAgICBpeHBfZGVuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIEljbzogc3RyaW5nO1xyXG4gICAgICAgIFVjczogc3RyaW5nO1xyXG4gICAgICAgIFJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdOYXN0YXZlbmlDaXNlbG5pa3VBRE1cIjtcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiTmFzdGF2ZW7DrSDEjcOtc2VsbsOta8WvXCI7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHdWkoKTtcclxuXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuRGRwRWtvSW5pdCh0aGF0LCB0aGF0LkluaXRFcnJvclRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHdWkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuVHlwUG9obGVkYXZreS5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQuUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3pvYnJLbmlodTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05hc3RhdmVuaUNpc2VsbmlrdURldGFpbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTmFzdGF2ZW5pQ2lzZWxuaWt1RGV0YWlsMlwiXSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZSFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJ0eXBfcGhsLCBuYXpldiwgaXhwX2Rlbiwgcm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdOYXN0YXZlbmlDaXNlbG5pa3VEZXRhaWxcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1widHlwX3BobFwiLCBcIm5hemV2XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5UeXB5UG9obGVkYXZlayh0aGF0KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R05hc3RhdmVuaUNpc2VsbmlrdVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFzdGF2ZW5pQ2lzZWxuaWt1RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSB0eXAgcG9obGVkw6F2a3lcIiwgXCJWeWJlcnRlIHR5cCBwb2hsZWTDoXZreS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HQ2lzZWxuaWt5XCIsIHsgSUQ6IFwiRERQR0Npc2VsbmlreSNcIiwgdHlwX3BobDogcm93LnR5cF9waGwhIH0sIGDEjMOtc2VsbsOta3kgdHlwdSBwb2hsZWTDoXZreSAke3Jvdy50eXBfcGhsIX1gLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGF0LmdwYywgcm93Lml4cF9kZW4pIHsgZ3BjOiBuZXdHcGMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdDaXNlbG5pa3lcIiwgIHsgSUQ6IFwiRERQR0Npc2VsbmlreSNcIiwgdHlwX3BobDogcm93LnR5cF9waGwhIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudGl0bGU6YMSMw61zZWxuw61reSB0eXB1IHBvaGxlZMOhdmt5ICR7cm93LnR5cF9waGwhfWBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R05hc3RhdmVuaUNpc2VsbmlrdURldGFpbDJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbC12em9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgdHlwIHBvaGxlZMOhdmt5XCIsIFwiVnliZXJ0ZSB0eXAgcG9obGVkw6F2a3kuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR0Npc2VsbmlreVwiLCB7IElEOiBcIkREUEdDaXNlbG5pa3kjXCIsIHR5cF9waGw6IHJvdy50eXBfcGhsISB9LCBgxIzDrXNlbG7DrWt5IHR5cHUgcG9obGVkw6F2a3kgJHtyb3cudHlwX3BobCF9YCwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdDaXNlbG5pa3kyXCIsIHsgSUQ6IFwiRERQR0Npc2VsbmlreTEjXCIsIHR5cF9waGw6IHJvdy50eXBfcGhsISB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnRpdGxlOmDEjMOtc2VsbsOta3kgdHlwdSBwb2hsZWTDoXZreSAke3Jvdy50eXBfcGhsIX1gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
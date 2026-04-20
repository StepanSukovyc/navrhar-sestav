"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniCiselniku.ts                 </Name>
//    <Description> Nastavení číselníků                                         </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
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
            let GNastaveniCiselniku = class GNastaveniCiselniku extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    this.taskId = "actGNastaveniCiselniku";
                    this.title = "Nastavení číselníků";
                    this.createActions();
                    this.createGui();
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createGui() {
                    const that = this;
                    //new Gordic.Data.Readers.typp
                    //this.view = new Isl.View(that.isl.TypPohledavky.list(rq => {
                    //    return {
                    //        filters: {
                    //            ico: this.Ico,
                    //            ucs: this.Ucs,
                    //            rok: this.Rok,
                    //            //zobrKnihu: true,
                    //        }
                    //    };
                    //}));
                    this.view = new Gordic.Isl.View(that.isl.TypPohledavky.listSimple());
                    this.menuBar([
                        {
                            action: this.actions["actGNastaveniCiselnikuDetail"],
                            favorite: true
                        },
                        //{
                        //    action: this.actions["actGNastaveniCiselnikuDetail2"],
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
                    this.grid = $("<div>")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: this.view,
                        sort: "nazev",
                        defaultProfile: {
                            columnList: "typ_phl, nazev, aktivita",
                            //rowNumbers: true,
                            condFormats: [
                                { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, "100"))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray, text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                            ]
                        },
                        defaultAction: this.actions["actGNastaveniCiselnikuDetail"],
                        searchColumns: ["typ_phl", "nazev"],
                        columns: WebClient.Common.GridFormats.TypyPohledavek(this)
                    });
                }
                createActions() {
                    this.actions.addRange([
                        {
                            name: "actGNastaveniCiselnikuZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGNastaveniCiselnikuDetail",
                            caption: "Detail",
                            icon: "gi-detail",
                            run: () => {
                                let row = this.grid.ggrid("activeRow");
                                if (row == null) {
                                    this.dialogs.error("Vyberte typ pohledávky", "Vyberte typ pohledávky.");
                                    return;
                                }
                                //this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl! }, `Číselníky typu pohledávky ${row.typ_phl!}`, 800, 600);
                                //var newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, row.ixp_den) { gpc: newGpc },
                                this.navigate("Gordic.Ddp.WebClient.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl });
                                //this.title:`Číselníky typu pohledávky ${row.typ_phl!}`
                            }
                        },
                        {
                            name: "actGNastaveniCiselnikuDetail2",
                            caption: "Detail-vzor",
                            icon: "gi-detail",
                            run: () => {
                                let row = this.grid.ggrid("activeRow");
                                if (row == null) {
                                    this.dialogs.error("Vyberte typ pohledávky", "Vyberte typ pohledávky.");
                                    return;
                                }
                                //this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl! }, `Číselníky typu pohledávky ${row.typ_phl!}`, 800, 600);
                                this.navigate("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky2", { ID: "DDPGCiselniky2#", typ_phl: row.typ_phl });
                                //this.title:`Číselníky typu pohledávky ${row.typ_phl!}`
                            }
                        }
                    ]);
                }
            };
            GNastaveniCiselniku = __decorate([
                Decorators.gcontent
            ], GNastaveniCiselniku);
            WebClient.GNastaveniCiselniku = GNastaveniCiselniku;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaUNpc2VsbmlrdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdOYXN0YXZlbmlDaXNlbG5pa3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FrSWY7QUFsSUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa0luQjtJQWxJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa0k3QjtRQWxJb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQWNqRCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUVyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRWpCLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbkUsQ0FBQztnQkFFTyxTQUFTO29CQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsOEJBQThCO29CQUU5Qiw4REFBOEQ7b0JBQzlELGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQiw0QkFBNEI7b0JBQzVCLDRCQUE0QjtvQkFDNUIsNEJBQTRCO29CQUM1QixnQ0FBZ0M7b0JBQ2hDLFdBQVc7b0JBQ1gsUUFBUTtvQkFDUixNQUFNO29CQUVOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFBLEdBQUcs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QStCOzRCQUNyQyxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQWdELFdBQVcsQ0FBQyxDQUFDO2dDQUN0RixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO29DQUN4RSxPQUFPO2dDQUNYLENBQUM7Z0NBRUQsNkxBQTZMO2dDQUM3TCxJQUFJLENBQUMsUUFBUSxDQUFDLHFEQUFxRCxFQUFFLEVBQUUsRUFBRSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBUSxFQUFFLENBQUMsQ0FBQztnQ0FDdkgsd0RBQXdEOzRCQUM1RCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0osQ0FBQTtZQTlIWSxtQkFBbUI7Z0JBRC9CLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsbUJBQW1CLENBOEgvQjtZQTlIWSw2QkFBbUIsc0JBOEgvQixDQUFBO1FBQ0wsQ0FBQyxFQWxJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa0k3QjtJQUFELENBQUMsRUFsSWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtJbkI7QUFBRCxDQUFDLEVBbElTLE1BQU0sS0FBTixNQUFNLFFBa0lmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYXN0YXZlbmlDaXNlbG5pa3UudHMgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBOYXN0YXZlbsOtIMSNw61zZWxuw61rxa8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTExLTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR05hc3RhdmVuaUNpc2VsbmlrdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IElzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bz47XHJcblxyXG4gICAgICAgIGl4cF9kZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgSWNvOiBzdHJpbmc7XHJcbiAgICAgICAgVWNzOiBzdHJpbmc7XHJcbiAgICAgICAgUm9rOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tJZCA9IFwiYWN0R05hc3RhdmVuaUNpc2VsbmlrdVwiO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJOYXN0YXZlbsOtIMSNw61zZWxuw61rxa9cIjtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUd1aSgpO1xyXG5cclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5EZHBFa29Jbml0KHRoYXQsIHRoYXQuSW5pdEVycm9yVGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUd1aSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL25ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLnR5cHBcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy52aWV3ID0gbmV3IElzbC5WaWV3KHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvOiB0aGlzLkljbyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB1Y3M6IHRoaXMuVWNzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJvazogdGhpcy5Sb2ssXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy96b2JyS25paHU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH07XHJcbiAgICAgICAgICAgIC8vfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IElzbC5WaWV3KHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kubGlzdFNpbXBsZSgpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHTmFzdGF2ZW5pQ2lzZWxuaWt1RGV0YWlsXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdOYXN0YXZlbmlDaXNlbG5pa3VEZXRhaWwyXCJdLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlIVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInR5cF9waGwsIG5hemV2LCBha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogJ05PVChFUVVBTFMoQGFrdGl2aXRhLCBcIjEwMFwiKSknLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcubGlnaHRncmF5LCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyYXkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R05hc3RhdmVuaUNpc2VsbmlrdURldGFpbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJ0eXBfcGhsXCIsIFwibmF6ZXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlR5cHlQb2hsZWRhdmVrKHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdOYXN0YXZlbmlDaXNlbG5pa3VaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R05hc3RhdmVuaUNpc2VsbmlrdURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgdHlwIHBvaGxlZMOhdmt5XCIsIFwiVnliZXJ0ZSB0eXAgcG9obGVkw6F2a3kuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR0Npc2VsbmlreVwiLCB7IElEOiBcIkREUEdDaXNlbG5pa3kjXCIsIHR5cF9waGw6IHJvdy50eXBfcGhsISB9LCBgxIzDrXNlbG7DrWt5IHR5cHUgcG9obGVkw6F2a3kgJHtyb3cudHlwX3BobCF9YCwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIHJvdy5peHBfZGVuKSB7IGdwYzogbmV3R3BjIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWt5XCIsICB7IElEOiBcIkREUEdDaXNlbG5pa3kjXCIsIHR5cF9waGw6IHJvdy50eXBfcGhsISB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnRpdGxlOmDEjMOtc2VsbsOta3kgdHlwdSBwb2hsZWTDoXZreSAke3Jvdy50eXBfcGhsIX1gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdOYXN0YXZlbmlDaXNlbG5pa3VEZXRhaWwyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwtdnpvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHR5cCBwb2hsZWTDoXZreVwiLCBcIlZ5YmVydGUgdHlwIHBvaGxlZMOhdmt5LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdDaXNlbG5pa3lcIiwgeyBJRDogXCJERFBHQ2lzZWxuaWt5I1wiLCB0eXBfcGhsOiByb3cudHlwX3BobCEgfSwgYMSMw61zZWxuw61reSB0eXB1IHBvaGxlZMOhdmt5ICR7cm93LnR5cF9waGwhfWAsIDgwMCwgNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HQ2lzZWxuaWt5MlwiLCB7IElEOiBcIkREUEdDaXNlbG5pa3kyI1wiLCB0eXBfcGhsOiByb3cudHlwX3BobCEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy50aXRsZTpgxIzDrXNlbG7DrWt5IHR5cHUgcG9obGVkw6F2a3kgJHtyb3cudHlwX3BobCF9YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
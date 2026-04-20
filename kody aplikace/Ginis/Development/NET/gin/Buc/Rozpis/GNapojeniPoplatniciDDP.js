"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GNapojeniPoplatniciDDP.ts              </Name>
//    <Description> Dialog s výběrem předpisů napojených poplatníků DDP         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-10                                                  </Created>
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
            /**Dialog s výběrem předpisů napojených poplatníků DDP */
            let GNapojeniPoplatniciDDP = class GNapojeniPoplatniciDDP extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: (ev, ctx) => {
                                let data = this.$grid.ggrid("getSelection");
                                this.tryClose(data);
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridVyberUhrady",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        multi: true,
                        data: new Gordic.Isl.View(this.isl.BucNapojeniPoplatniciDDP.list({ filters: { ixp_pl: this.ixp_pl } }), {}),
                        defaultAction: this.actions.actOk,
                        defaultProfile: {
                            grouping: "esu_txt" /* Interface.GNapojeniPoplatniciDDPDtoNames.esu_txt */
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "esu_txt" /* Interface.GNapojeniPoplatniciDDPDtoNames.esu_txt */,
                        caption: "jres:33600239", //RC 33600239 : Název
                        width: 160
                    });
                    columns.addNumberColumn({
                        name: "pri_uhr" /* Interface.GNapojeniPoplatniciDDPDtoNames.pri_uhr */,
                        caption: "jres:33600216", //RC 33600216 : Priorita
                        width: 32
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GNapojeniPoplatniciDDPDtoNames.vs */
                    });
                    columns.addKs({
                        name: "ks" /* Interface.GNapojeniPoplatniciDDPDtoNames.ks */,
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GNapojeniPoplatniciDDPDtoNames.ss */,
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GNapojeniPoplatniciDDPDtoNames.c */,
                        caption: "jres:33600062", //RC 33600062 : Částka
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_uhr" /* Interface.GNapojeniPoplatniciDDPDtoNames.c_uhr */,
                        caption: "jres:33600240", //RC 33600240 : Zaplaceno
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_roz" /* Interface.GNapojeniPoplatniciDDPDtoNames.c_roz */,
                        caption: "jres:33600241", //RC 33600241 : Rozdíl
                        width: 120
                    });
                    columns.addDateColumn({
                        name: "dat_spl" /* Interface.GNapojeniPoplatniciDDPDtoNames.dat_spl */,
                        caption: "jres:33600221", //RC 33600221 : Datum splatnosti
                        width: 110,
                    });
                    columns.addDateColumn({
                        name: "dat_uhr" /* Interface.GNapojeniPoplatniciDDPDtoNames.dat_uhr */,
                        caption: "jres:33600242", //RC 33600242 : Datum úhrady
                        width: 110,
                    });
                    columns.addTextColumn({
                        name: "ktg_upo_txt" /* Interface.GNapojeniPoplatniciDDPDtoNames.ktg_upo_txt */,
                        caption: "jres:33600217", //RC 33600217 : Kategorie pohybu
                        width: 120
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GNapojeniPoplatniciDDPDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GNapojeniPoplatniciDDPDtoNames.ucet_vl */,
                    });
                    columns.addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GNapojeniPoplatniciDDPDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GNapojeniPoplatniciDDPDtoNames.ucet_ci */,
                    });
                    columns.addAgendoveCislo({
                        name: "ac" /* Interface.GNapojeniPoplatniciDDPDtoNames.ac */,
                        field: "ac" /* Interface.GNapojeniPoplatniciDDPDtoNames.ac */
                    });
                    columns.addTextColumn({
                        name: "ixp" /* Interface.GNapojeniPoplatniciDDPDtoNames.ixp */,
                        caption: "jres:33600228", //RC 33600228 : Identifikátor
                        width: 120
                    });
                    return columns;
                }
            };
            GNapojeniPoplatniciDDP = __decorate([
                Decorators.gcontent
            ], GNapojeniPoplatniciDDP);
            WebClient.GNapojeniPoplatniciDDP = GNapojeniPoplatniciDDP;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hcG9qZW5pUG9wbGF0bmljaUREUC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdOYXBvamVuaVBvcGxhdG5pY2lERFAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0FzSWY7QUF0SUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0luQjtJQXRJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc0k3QjtRQXRJb0IsV0FBQSxTQUFTO1lBQzFCLHlEQUF5RDtZQUV6RCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLE9BQUEsWUFBWTtnQkFPcEQsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOzRCQUM5QixPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3hCLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixTQUFTLEVBQUUsTUFBTSxDQUFD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LE1BQU0sUUFzSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR05hcG9qZW5pUG9wbGF0bmljaUREUC50cyAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBzIHbDvWLEm3JlbSBwxZllZHBpc8WvIG5hcG9qZW7DvWNoIHBvcGxhdG7DrWvFryBERFAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAzLTEwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKkRpYWxvZyBzIHbDvWLEm3JlbSBwxZllZHBpc8WvIG5hcG9qZW7DvWNoIHBvcGxhdG7DrWvFryBERFAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR05hcG9qZW5pUG9wbGF0bmljaUREUCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqSWRlbnRpZmlrw6F0b3IgcGzDoXRjZSAqL1xyXG4gICAgICAgIHB1YmxpYyBpeHBfcGw6IHN0cmluZztcclxuICAgICAgICBcclxuICAgICAgICAvKipHcmlkICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9rOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Payh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdOYXBvamVuaVBvcGxhdG5pY2lERFBEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRWeWJlclVocmFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdOYXBvamVuaVBvcGxhdG5pY2lERFBEdG8+KHRoaXMuaXNsLkJ1Y05hcG9qZW5pUG9wbGF0bmljaUREUC5saXN0KHsgZmlsdGVyczogeyBpeHBfcGw6IHRoaXMuaXhwX3BsIH19KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T2ssXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBpbmc6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuZXN1X3R4dFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGVmaW5pY2UgZ3JpZGZvcm3DoXR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR05hcG9qZW5pUG9wbGF0bmljaUREUER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIzOVwiLCAvL1JDIDMzNjAwMjM5IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMucHJpX3VocixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIxNlwiLCAvL1JDIDMzNjAwMjE2IDogUHJpb3JpdGFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFZzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMudnNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRLcyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR05hcG9qZW5pUG9wbGF0bmljaUREUER0b05hbWVzLmtzLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdOYXBvamVuaVBvcGxhdG5pY2lERFBEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDYyXCIsIC8vUkMgMzM2MDAwNjIgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuY191aHIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNDBcIiwgLy9SQyAzMzYwMDI0MCA6IFphcGxhY2Vub1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuY19yb3osXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNDFcIiwgLy9SQyAzMzYwMDI0MSA6IFJvemTDrWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIyMVwiLCAvL1JDIDMzNjAwMjIxIDogRGF0dW0gc3BsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMuZGF0X3VocixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI0MlwiLCAvL1JDIDMzNjAwMjQyIDogRGF0dW0gw7pocmFkeVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMua3RnX3Vwb190eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMTdcIiwgLy9SQyAzMzYwMDIxNyA6IEthdGVnb3JpZSBwb2h5YnVcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTmFwb2plbmlQb3BsYXRuaWNpRERQRHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR05hcG9qZW5pUG9wbGF0bmljaUREUER0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQmFua292bmlVY2V0Q2l6aSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR05hcG9qZW5pUG9wbGF0bmljaUREUER0b05hbWVzLnVjZXRfY2ksXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdOYXBvamVuaVBvcGxhdG5pY2lERFBEdG9OYW1lcy51Y2V0X2NpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEFnZW5kb3ZlQ2lzbG8oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdOYXBvamVuaVBvcGxhdG5pY2lERFBEdG9OYW1lcy5hYyxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR05hcG9qZW5pUG9wbGF0bmljaUREUER0b05hbWVzLmFjXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR05hcG9qZW5pUG9wbGF0bmljaUREUER0b05hbWVzLml4cCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIyOFwiLCAvL1JDIDMzNjAwMjI4IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
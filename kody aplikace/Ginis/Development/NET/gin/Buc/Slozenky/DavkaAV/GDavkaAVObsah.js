"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVObsah.ts                       </Name>
//    <Description> Dialog s obsahem složenky dávek/y A-V                       </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-14                                                  </Created>
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
            /**Dialog s obsahem složenky dávek/y A-V */
            let GDavkaAVObsah = class GDavkaAVObsah extends Gordic.GContentBase {
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
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            enabled: true,
                            tema: (this.mod == 0) ? "buc_ptm_davav" : "buc_ptm_vybav",
                            ixsStr: (this.mod == 0) ? this.buc_ptm_davav : this.buc_ptm_vybav,
                            serverParameterMethod: "Gordic.Buc.WebClient.GDavkaAVObsah:PrintParameters",
                            dialogOpening: function (rep) {
                                let rows = that.$grid.ggrid("getSelection");
                                return rows && rows.length > 0;
                            },
                            reportStarting: function (rep) {
                                let where = " WHERE a.dat_pod is not null"; //musí zde být nějaká podmínka, jinak sestava selže u mod == 1
                                if (that.mod == 0) {
                                    where = " WHERE davka = {0}".format(that.davka);
                                }
                                rep.customDto = { where: where };
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
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaAVObsah",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaAVObsah.list({
                            filters: (this.mod == 0) ? {
                                davka: this.davka
                            } : void 0
                        }), {
                            key: ["davka", "sk_vl", "bu_vl", "radek"]
                        }),
                        defaultProfile: {
                            sort: "radek",
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "pod_pos" /* Interface.GDavkaAVObsahDtoNames.pod_pos */,
                        caption: "jres:33600255", //RC 33600255 : Podací pošta
                        width: 150
                    });
                    columns.addDateColumn({
                        name: "dat_pod" /* Interface.GDavkaAVObsahDtoNames.dat_pod */,
                        caption: "jres:33600256", //RC 33600256 : Datum podání
                        width: 110
                    });
                    columns.addNumberColumn({
                        name: "pod_cis" /* Interface.GDavkaAVObsahDtoNames.pod_cis */,
                        caption: "jres:33600257", //RC 33600257 : Podací číslo
                        width: 55
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GDavkaAVObsahDtoNames.vs */,
                    });
                    columns.addKs({
                        name: "ks" /* Interface.GDavkaAVObsahDtoNames.ks */,
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GDavkaAVObsahDtoNames.ss */,
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GDavkaAVObsahDtoNames.c */,
                        caption: "jres:33600258", //RC 33600258 : Částka
                        width: 120
                    });
                    columns.addTextColumn({
                        name: "ocr1" /* Interface.GDavkaAVObsahDtoNames.ocr1 */,
                        caption: "jres:33600259", //RC 33600259 : Označení odeslání 1
                        width: 150
                    });
                    columns.addTextColumn({
                        name: "ocr2" /* Interface.GDavkaAVObsahDtoNames.ocr2 */,
                        caption: "jres:33600260", //RC 33600260 : Označení odeslání 2
                        width: 150
                    });
                    columns.addTextColumn({
                        name: "ocr3" /* Interface.GDavkaAVObsahDtoNames.ocr3 */,
                        caption: "jres:33600261", //RC 33600261 : Zpráva pro příjemce
                        width: 150
                    });
                    //kvůli řazení
                    columns.addNumberColumn({
                        name: "radek" /* Interface.GDavkaAVObsahDtoNames.radek */,
                        caption: "jres:33600262", //RC 33600262 : Řádek platby
                        width: 55,
                        hidden: true
                    });
                    return columns;
                }
            };
            GDavkaAVObsah = __decorate([
                Decorators.gcontent
            ], GDavkaAVObsah);
            WebClient.GDavkaAVObsah = GDavkaAVObsah;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQVZPYnNhaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXZrYUFWT2JzYWgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0FpSmY7QUFqSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUpuQjtJQWpKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBaUo3QjtRQWpKb0IsV0FBQSxTQUFTO1lBQzFCLDJDQUEyQztZQUUzQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsT0FBQSxZQUFZO2dCQWMzQyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDbEMsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLElBQUk7NEJBQ2IsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxlQUFlOzRCQUN6RCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFB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Q0FBQyxlQUFlLENBQUM7d0JBQ3BCLElBQUkscURBQXVDO3dCQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLDRCQUE0Qjt3QkFDdEQsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFBO29CQUVGLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixDQUFDO2FBQ0osQ0FBQTtZQTdJWSxhQUFhO2dCQUR6QixVQUFVLENBQUMsUUFBUTtlQUNQLGFBQWEsQ0E2SXpCO1lBN0lZLHVCQUFhLGdCQTZJekIsQ0FBQTtRQUNMLENBQUMsRUFqSm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlKN0I7SUFBRCxDQUFDLEVBakpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpSm5CO0FBQUQsQ0FBQyxFQWpKUyxNQUFNLEtBQU4sTUFBTSxRQWlKZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HRGF2a2FBVk9ic2FoLnRzICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRGlhbG9nIHMgb2JzYWhlbSBzbG/FvmVua3kgZMOhdmVrL3kgQS1WICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAzLTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKkRpYWxvZyBzIG9ic2FoZW0gc2xvxb5lbmt5IGTDoXZlay95IEEtViAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGF2a2FBVk9ic2FoIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogxI3DrXNsbyBkw6F2a3kqL1xyXG4gICAgICAgIHB1YmxpYyBkYXZrYTogbnVtYmVyO1xyXG4gICAgICAgIC8qKm3Ds2QgKDEgLSBwb2RhbsOpKSovXHJcbiAgICAgICAgcHVibGljIG1vZDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipCVUMgLSBUVCBEw6F2a2EgQS1WIHNsb8W+ZW5layBwxZllZGFuw6EgcG/FoXRvdSAoR1IpICovXHJcbiAgICAgICAgcHJpdmF0ZSBidWNfcHRtX2RhdmF2OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqQlVDIC0gVFQgVsO9YsSbciBwb8WhdG92bsOtY2ggcG91a8OhemVrIEFWICovXHJcbiAgICAgICAgcHJpdmF0ZSBidWNfcHRtX3Z5YmF2OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKkdyaWQgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogKHRoaXMubW9kID09IDApID8gXCJidWNfcHRtX2RhdmF2XCIgOiBcImJ1Y19wdG1fdnliYXZcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6ICh0aGlzLm1vZCA9PSAwKSA/IHRoaXMuYnVjX3B0bV9kYXZhdiA6IHRoaXMuYnVjX3B0bV92eWJhdixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZPYnNhaDpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dPcGVuaW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dzID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvd3MgJiYgcm93cy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdoZXJlID0gXCIgV0hFUkUgYS5kYXRfcG9kIGlzIG5vdCBudWxsXCI7IC8vbXVzw60gemRlIGLDvXQgbsSbamFrw6EgcG9kbcOtbmthLCBqaW5hayBzZXN0YXZhIHNlbMW+ZSB1IG1vZCA9PSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZSA9IFwiIFdIRVJFIGRhdmthID0gezB9XCIuZm9ybWF0KHRoYXQuZGF2a2EpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IHdoZXJlOiB3aGVyZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RUaXNrKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlZ5dHZvxZllbsOtIGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR0RhdmthQVZPYnNhaER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERhdmthQVZPYnNhaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG8+KHRoaXMuaXNsLkJ1Y0RhdmthQVZPYnNhaC5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogKHRoaXMubW9kID09IDApID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF2a2E6IHRoaXMuZGF2a2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiZGF2a2FcIiwgXCJza192bFwiLCBcImJ1X3ZsXCIsIFwicmFkZWtcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInJhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FBVk9ic2FoRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy5wb2RfcG9zLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjU1XCIsIC8vUkMgMzM2MDAyNTUgOiBQb2RhY8OtIHBvxaF0YVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy5kYXRfcG9kLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjU2XCIsIC8vUkMgMzM2MDAyNTYgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZPYnNhaER0b05hbWVzLnBvZF9jaXMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNTdcIiwgLy9SQyAzMzYwMDI1NyA6IFBvZGFjw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDU1XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRLcyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZPYnNhaER0b05hbWVzLmtzLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBVk9ic2FoRHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjU4XCIsIC8vUkMgMzM2MDAyNTggOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy5vY3IxLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjU5XCIsIC8vUkMgMzM2MDAyNTkgOiBPem5hxI1lbsOtIG9kZXNsw6Fuw60gMVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy5vY3IyLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjYwXCIsIC8vUkMgMzM2MDAyNjAgOiBPem5hxI1lbsOtIG9kZXNsw6Fuw60gMlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWT2JzYWhEdG9OYW1lcy5vY3IzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjYxXCIsIC8vUkMgMzM2MDAyNjEgOiBacHLDoXZhIHBybyBwxZnDrWplbWNlXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8va3bFr2xpIMWZYXplbsOtXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBVk9ic2FoRHRvTmFtZXMucmFkZWssXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNjJcIiwgLy9SQyAzMzYwMDI2MiA6IMWYw6FkZWsgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTUsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
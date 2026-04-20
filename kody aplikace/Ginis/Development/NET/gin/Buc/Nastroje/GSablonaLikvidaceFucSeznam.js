"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GSablonaLikvidaceFucSeznam.ts          </Name>
//    <Description> Content pro Definiční tabulka-šablona pro automatickou likvidaci nespárovaných plateb do FUC </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-13                                                  </Created>
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
            /** Content pro Definiční tabulka-šablona pro automatickou likvidaci nespárovaných plateb do FUC */
            let GSablonaLikvidaceFucSeznam = class GSablonaLikvidaceFucSeznam extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                }
                closing(id_sablona) {
                    if (id_sablona) {
                        return id_sablona;
                    }
                    else if (!id_sablona && this.$grid.ggrid("getView").getCount("data") == 0 && this.rezim == 1) {
                        return -1;
                    }
                    else {
                        return void 0;
                    }
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: this.rezim == 1,
                            visible: this.rezim == 1,
                            run: function (ev, ctx) {
                                let row = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (!row) {
                                    this.setPending(-1);
                                    return;
                                }
                                that.tryClose(row.id_sablona);
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
                    this.menuBar(this.actions.createBar([]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().css("height", "100%").appendTo(this.element).ggrid({
                        name: "gridSablonaLikvidaceFuc",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucSablonaLikvidaceFuc.list({
                            filters: {
                                sk_vl: this.sk_vl,
                                bu_vl: this.bu_vl,
                                typ_pla: this.typ_pla,
                                priz_char: this.priz_char,
                                vs_od: this.vs,
                                aktivita: (this.rezim == 1) ? 100 : void 0,
                                ktg_typ: (this.rezim == 1) ? this.ktg_typ : void 0,
                            },
                            fragments: ["*"]
                        }), {
                            key: ["id_sablona", "vs_od", "vs_do", "ss_od", "ss_do"],
                        }),
                        columnMode: "full",
                        defaultProfile: {
                            sort: "id_sablona",
                            condFormats: [
                                {
                                    formula: "@aktivita != 100",
                                    description: "jres:33600564", //RC 33600564 : Záznam není aktivní
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.gray
                                },
                            ]
                        },
                    });
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "id_sablona" /* Interface.GSablonaLikvidaceFucDtoNames.id_sablona */,
                        caption: "jres:33600553", //RC 33600553 : ID
                        width: 50
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GSablonaLikvidaceFucDtoNames.nazev */,
                        caption: "jres:33600554", //RC 33600554 : Název
                        width: 300
                    })
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GSablonaLikvidaceFucDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GSablonaLikvidaceFucDtoNames.ucet_vl */
                    })
                        .addTextColumn({
                        name: "vs_od" /* Interface.GSablonaLikvidaceFucDtoNames.vs_od */,
                        caption: "jres:33600555", //RC 33600555 : VS od
                        width: 100
                    })
                        .addTextColumn({
                        name: "vs_do" /* Interface.GSablonaLikvidaceFucDtoNames.vs_do */,
                        caption: "jres:33600556", //RC 33600556 : VS do
                        width: 100
                    })
                        .addTextColumn({
                        name: "ktg_typ_txt" /* Interface.GSablonaLikvidaceFucDtoNames.ktg_typ_txt */,
                        caption: "jres:33600557", //RC 33600557 : Kategorie typu dokladu
                        width: 190
                    })
                        .addTextColumn({
                        name: "typ_upr_poh_txt" /* Interface.GSablonaLikvidaceFucDtoNames.typ_upr_poh_txt */,
                        caption: "jres:33600558", //RC 33600558 : Typ účetního případu pohybu
                        width: 160
                    })
                        .addTextColumn({
                        name: "typ_pla_txt" /* Interface.GSablonaLikvidaceFucDtoNames.typ_pla_txt */,
                        caption: "jres:33600559", //RC 33600559 : Typ platby
                        width: 90
                    })
                        .addTextColumn({
                        name: "priz_char_txt" /* Interface.GSablonaLikvidaceFucDtoNames.priz_char_txt */,
                        caption: "jres:33600560", //RC 33600560 : Charakter operace
                        width: 120
                    })
                        .addTextColumn({
                        name: "ixs_fun_txt" /* Interface.GSablonaLikvidaceFucDtoNames.ixs_fun_txt */,
                        caption: "jres:33600561", //RC 33600561 : Zpracovatel ve FUC
                        width: 300
                    })
                        .addNumberColumn({
                        name: "aktivita" /* Interface.GSablonaLikvidaceFucDtoNames.aktivita */,
                        caption: "jres:33600563", //RC 33600563 : Aktivita (číselně)
                        hidden: true
                    });
                    return gridFormat;
                }
            };
            GSablonaLikvidaceFucSeznam = __decorate([
                Decorators.gcontent
            ], GSablonaLikvidaceFucSeznam);
            WebClient.GSablonaLikvidaceFucSeznam = GSablonaLikvidaceFucSeznam;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NhYmxvbmFMaWt2aWRhY2VGdWNTZXpuYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2FibG9uYUxpa3ZpZGFjZUZ1Y1Nlem5hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2RiwrSEFBK0g7QUFDL0gseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQTBMZjtBQTFMRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwTG5CO0lBMUxnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwTDdCO1FBMUxvQixXQUFBLFNBQVM7WUFtQjFCLG1HQUFtRztZQUVuRyxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLE9BQUEsWUFBWTtnQkFtQnhELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsT0FBTyxDQUFDLFVBQVU7b0JBQ2QsSUFBSSxVQUFVLEVBQUUsQ0FBQzt3QkFDYixPQUFPLFVBQVUsQ0FBQztvQkFDdEIsQ0FBQzt5QkFBTSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDN0YsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDZCxDQUFDO3lCQUFNLENBQUM7d0JBQ0osT0FBTyxLQUFLLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELGtDQUFrQztn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QUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLGdGQUF3RDt3QkFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQ0FBMkM7d0JBQ3JFLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksd0VBQW9EO3dCQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSw0RUFBc0Q7d0JBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsaUNBQWlDO3dCQUMzRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLHdFQUFvRDt3QkFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7d0JBQzVELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsZUFBZSxDQUFDO3dCQUNiLElBQUksa0VBQWlEO3dCQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGtDQUFrQzt3QkFDNUQsTUFBTSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFDO29CQUVQLE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2FBQ0osQ0FBQTtZQXBLWSwwQkFBMEI7Z0JBRHRDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsMEJBQTBCLENBb0t0QztZQXBLWSxvQ0FBMEIsNkJBb0t0QyxDQUFBO1FBQ0wsQ0FBQyxFQTFMb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMEw3QjtJQUFELENBQUMsRUExTGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBMbkI7QUFBRCxDQUFDLEVBMUxTLE1BQU0sS0FBTixNQUFNLFFBMExmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdTYWJsb25hTGlrdmlkYWNlRnVjU2V6bmFtLnRzICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHBybyBEZWZpbmnEjW7DrSB0YWJ1bGthLcWhYWJsb25hIHBybyBhdXRvbWF0aWNrb3UgbGlrdmlkYWNpIG5lc3DDoXJvdmFuw71jaCBwbGF0ZWIgZG8gRlVDIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTEtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIFZzdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1IHbDvWLEm3J1IMO6aHJhZHkqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU2FibG9uYUxpa3ZpZGFjZUZ1Y1Nlem5hbURsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICAvKiogUMWZw616bmFrIHJlxb5pbXUgb3RldsWZZW7DrSAoMCAtIGVkaXRhY2UsIDEgLSBwb3V6ZSB2w71ixJtyKSAqL1xyXG4gICAgICAgIHJlemltOiBudW1iZXIsXHJcbiAgICAgICAgLyoqVmFyaWFiaWxuw60gc3ltYm9sICovXHJcbiAgICAgICAgdnM/OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIC8qKktvZCBiYW5reSAqL1xyXG4gICAgICAgIHNrX3ZsPzogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvKirEjMOtc2xvIGJhbmtvdm7DrWhvIMO6xI10dSAqL1xyXG4gICAgICAgIGJ1X3ZsPzogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvKip0eXBfcGxhKi9cclxuICAgICAgICB0eXBfcGxhPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgICAvKipwcml6X2NoYXIgKi9cclxuICAgICAgICBwcml6X2NoYXI/OiBudW1iZXIgfCBudWxsLFxyXG4gICAgICAgIC8qKmt0Z190eXAgKi9cclxuICAgICAgICBrdGdfdHlwPzogbnVtYmVyIHwgbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb250ZW50IHBybyBEZWZpbmnEjW7DrSB0YWJ1bGthLcWhYWJsb25hIHBybyBhdXRvbWF0aWNrb3UgbGlrdmlkYWNpIG5lc3DDoXJvdmFuw71jaCBwbGF0ZWIgZG8gRlVDICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTYWJsb25hTGlrdmlkYWNlRnVjU2V6bmFtIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgR1NhYmxvbmFMaWt2aWRhY2VGdWNTZXpuYW1EbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayByZcW+aW11IG90ZXbFmWVuw60gKDAgLSBlZGl0YWNlLCAxIC0gcG91emUgdsO9YsSbcikgKi9cclxuICAgICAgICBwdWJsaWMgcmV6aW06IG51bWJlcjtcclxuICAgICAgICAvKipWYXJpYWJpbG7DrSBzeW1ib2wgKi9cclxuICAgICAgICBwdWJsaWMgdnM6IHN0cmluZztcclxuICAgICAgICAvKipLb2QgYmFua3kgKi9cclxuICAgICAgICBwdWJsaWMgc2tfdmw6IHN0cmluZztcclxuICAgICAgICAvKirEjMOtc2xvIGJhbmtvdm7DrWhvIMO6xI10dSAqL1xyXG4gICAgICAgIHB1YmxpYyBidV92bDogc3RyaW5nO1xyXG4gICAgICAgIC8qKnR5cF9wbGEqL1xyXG4gICAgICAgIHB1YmxpYyB0eXBfcGxhOiBudW1iZXI7XHJcbiAgICAgICAgLyoqcHJpel9jaGFyICovXHJcbiAgICAgICAgcHVibGljIHByaXpfY2hhcjogbnVtYmVyO1xyXG4gICAgICAgIC8qKmt0Z190eXAgKi9cclxuICAgICAgICBwdWJsaWMga3RnX3R5cDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiogR3JpZCovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2luZyhpZF9zYWJsb25hKSB7XHJcbiAgICAgICAgICAgIGlmIChpZF9zYWJsb25hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWRfc2FibG9uYTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghaWRfc2FibG9uYSAmJiB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXRDb3VudChcImRhdGFcIikgPT0gMCAmJiB0aGlzLnJlemltID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9rKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnJlemltID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5yZXppbSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HU2FibG9uYUxpa3ZpZGFjZUZ1Y0R0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm93KSB7IHRoaXMuc2V0UGVuZGluZygtMSk7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHJvdy5pZF9zYWJsb25hKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPayFcIiwgXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkdSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdncmlkPEludGVyZmFjZS5HU2FibG9uYUxpa3ZpZGFjZUZ1Y0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkU2FibG9uYUxpa3ZpZGFjZUZ1Y1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HU2FibG9uYUxpa3ZpZGFjZUZ1Y0R0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuQnVjU2FibG9uYUxpa3ZpZGFjZUZ1Yy5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tfdmw6IHRoaXMuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidV92bDogdGhpcy5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9wbGE6IHRoaXMudHlwX3BsYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfY2hhcjogdGhpcy5wcml6X2NoYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c19vZDogdGhpcy52cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAodGhpcy5yZXppbSA9PSAxKSA/IDEwMCA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6ICh0aGlzLnJlemltID09IDEpID8gdGhpcy5rdGdfdHlwIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIipcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiaWRfc2FibG9uYVwiLCBcInZzX29kXCIsIFwidnNfZG9cIiwgXCJzc19vZFwiLCBcInNzX2RvXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaWRfc2FibG9uYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGFrdGl2aXRhICE9IDEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDU2NFwiLCAvL1JDIDMzNjAwNTY0IDogWsOhem5hbSBuZW7DrSBha3Rpdm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU2FibG9uYUxpa3ZpZGFjZUZ1Y0R0b05hbWVzLmlkX3NhYmxvbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTUzXCIsIC8vUkMgMzM2MDA1NTMgOiBJRFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NTRcIiwgLy9SQyAzMzYwMDU1NCA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQmFua292bmlVY2V0Vmxhc3RuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTYWJsb25hTGlrdmlkYWNlRnVjRHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdTYWJsb25hTGlrdmlkYWNlRnVjRHRvTmFtZXMudWNldF92bFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy52c19vZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NTVcIiwgLy9SQyAzMzYwMDU1NSA6IFZTIG9kXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy52c19kbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NTZcIiwgLy9SQyAzMzYwMDU1NiA6IFZTIGRvXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy5rdGdfdHlwX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NTdcIiwgLy9SQyAzMzYwMDU1NyA6IEthdGVnb3JpZSB0eXB1IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTkwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU2FibG9uYUxpa3ZpZGFjZUZ1Y0R0b05hbWVzLnR5cF91cHJfcG9oX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NThcIiwgLy9SQyAzMzYwMDU1OCA6IFR5cCDDusSNZXRuw61obyBwxZnDrXBhZHUgcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy50eXBfcGxhX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NTlcIiwgLy9SQyAzMzYwMDU1OSA6IFR5cCBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTYWJsb25hTGlrdmlkYWNlRnVjRHRvTmFtZXMucHJpel9jaGFyX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NjBcIiwgLy9SQyAzMzYwMDU2MCA6IENoYXJha3RlciBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy5peHNfZnVuX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NjFcIiwgLy9SQyAzMzYwMDU2MSA6IFpwcmFjb3ZhdGVsIHZlIEZVQ1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG9OYW1lcy5ha3Rpdml0YSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NjNcIiwgLy9SQyAzMzYwMDU2MyA6IEFrdGl2aXRhICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
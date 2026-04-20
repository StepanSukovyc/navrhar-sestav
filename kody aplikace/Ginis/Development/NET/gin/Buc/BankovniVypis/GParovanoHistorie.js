"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GParovanoHistorie.ts                   </Name>
//    <Description> Dialog s historií párování položky výpisu                   </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-10                                                  </Created>
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
            /**Dialog s historií párování položky výpisu */
            let GParovanoHistorie = class GParovanoHistorie extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
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
                    this.commandBar(this.actions.createBar(["actZavrit!"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridParovanoHistorie",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucParovano.historie({
                            filters: { ixp: this.ixp_par, radek_pol: this.radek_pol, subradek: this.subradek, radek_av: this.radek_av }
                        }), { key: ["ixp", "radek_pol", "subradek", "radek_av", "por_cislo"] }),
                        defaultProfile: {
                            sort: "por_cislo",
                            condFormats: [
                                {
                                    formula: "@s_pol == 45",
                                    description: "jres:33600056", //RC 33600056 : Stav 'nespárováno
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                                },
                                {
                                    formula: "@c < 0",
                                    description: "jres:33600057", //RC 33600057 : Částka menší než 0
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    applyTo: "c"
                                },
                            ],
                        },
                    })
                        .gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    const that = this;
                    let columns = new Gordic.Data.GridFormat();
                    columns.addNumberColumn({
                        name: "por_cislo" /* Interface.GParovanoHistorieDtoNames.por_cislo */,
                        caption: "# ",
                        description: "jres:33600058", //RC 33600058 : Pořadové číslo
                        width: 32
                    });
                    columns.addTextColumn({
                        name: "s_pol_zkr" /* Interface.GParovanoHistorieDtoNames.s_pol_zkr */,
                        caption: "jres:33600059", //RC 33600059 : S 
                        description: "jres:33600060", //RC 33600060 : Stav položky
                        width: 32,
                        cellTemplate: (data) => { return data.s_pol_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_pol_txt ?? ""; },
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GParovanoHistorieDtoNames.c */,
                        caption: "jres:33600062", //RC 33600062 : Částka
                        width: 120
                    });
                    columns.addMena({
                        name: "mena_zkr" /* Interface.GParovanoHistorieDtoNames.mena_zkr */
                    });
                    columns.addCurrencyColumn({
                        name: "c_mena" /* Interface.GParovanoHistorieDtoNames.c_mena */,
                        caption: "jres:33600061", //RC 33600061 : Částka v měně
                        width: 120
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GParovanoHistorieDtoNames.vs */,
                    });
                    columns.addKs({
                        name: "ks" /* Interface.GParovanoHistorieDtoNames.ks */,
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GParovanoHistorieDtoNames.ss */,
                    });
                    columns.addDateColumn({
                        name: "dat_zap" /* Interface.GParovanoHistorieDtoNames.dat_zap */,
                        caption: "jres:33600063", //RC 33600063 : Datum zaplacení
                        width: 110
                    });
                    columns.addDateColumn({
                        name: "dat_par" /* Interface.GParovanoHistorieDtoNames.dat_par */,
                        caption: "jres:33600064", //RC 33600064 : Datum párování
                        width: 110
                    });
                    columns.addDateColumn({
                        name: "dat_uhr" /* Interface.GParovanoHistorieDtoNames.dat_uhr */,
                        caption: "jres:33600065", //RC 33600065 : Datum UUP
                        description: "jres:33600066", //RC 33600066 : Datum uskutečnění účetního případu
                        width: 110
                    });
                    columns.addTextColumn({
                        name: "ixp_par" /* Interface.GParovanoHistorieDtoNames.ixp_par */,
                        caption: "jres:33600067", //RC 33600067 : IXP párováno
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "cislo_par" /* Interface.GParovanoHistorieDtoNames.cislo_par */,
                        caption: "jres:33600068", //RC 33600068 : Číslo párování
                        width: 60
                    });
                    columns.addAgenda({
                        name: "typ_ag_zkr" /* Interface.GParovanoHistorieDtoNames.typ_ag_zkr */,
                        field: "typ_ag_zkr" /* Interface.GParovanoHistorieDtoNames.typ_ag_zkr */,
                    });
                    columns.addNazevSubjektu({
                        name: "esu_txt" /* Interface.GParovanoHistorieDtoNames.esu_txt */,
                        field: "esu_txt" /* Interface.GParovanoHistorieDtoNames.esu_txt */,
                        width: 300
                    });
                    if (this.rppUus == 1) {
                        columns.addUus({
                            name: "uus" /* Interface.GParovanoHistorieDtoNames.uus */,
                            field: "uus" /* Interface.GParovanoHistorieDtoNames.uus */
                        });
                    }
                    columns.addNumberColumn({
                        name: "s_pol" /* Interface.GParovanoHistorieDtoNames.s_pol */,
                        caption: "jres:33600069", //RC 33600069 : S (číselně)
                        description: "jres:33600070", //RC 33600070 : Stav položky (číselně)
                        width: 32,
                        hidden: true
                    });
                    return columns;
                }
            };
            GParovanoHistorie = __decorate([
                Decorators.gcontent
            ], GParovanoHistorie);
            WebClient.GParovanoHistorie = GParovanoHistorie;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bhcm92YW5vSGlzdG9yaWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUGFyb3Zhbm9IaXN0b3JpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQXFLZjtBQXJLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxS25CO0lBcktnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxSzdCO1FBcktvQixXQUFBLFNBQVM7WUFDMUIsK0NBQStDO1lBRS9DLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQWEvQyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQztxQkFDTCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxD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LENBQUMsU0FBUyxDQUFDO3dCQUNkLElBQUksbUVBQWdEO3dCQUNwRCxLQUFLLG1FQUFnRDtxQkFDeEQsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDckIsSUFBSSw2REFBNkM7d0JBQ2pELEtBQUssNkRBQTZDO3dCQUNsRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDOzRCQUNYLElBQUkscURBQXlDOzRCQUM3QyxLQUFLLHFEQUF5Qzt5QkFDakQsQ0FBQyxDQUFBO29CQUNOLENBQUM7b0JBQ0QsT0FBTyxDQUFDLGVBQWUsQ0FBQzt3QkFDcEIsSUFBSSx5REFBMkM7d0JBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCO3dCQUNyRCxXQUFXLEVBQUUsZUFBZSxFQUFFLHNDQUFzQzt3QkFDcEUsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFBO29CQUVGLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixDQUFDO2FBQ0osQ0FBQTtZQWpLWSxpQkFBaUI7Z0JBRDdCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsaUJBQWlCLENBaUs3QjtZQWpLWSwyQkFBaUIsb0JBaUs3QixDQUFBO1FBQ0wsQ0FBQyxFQXJLb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcUs3QjtJQUFELENBQUMsRUFyS2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFLbkI7QUFBRCxDQUFDLEVBcktTLE1BQU0sS0FBTixNQUFNLFFBcUtmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HUGFyb3Zhbm9IaXN0b3JpZS50cyAgICAgICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBzIGhpc3RvcmnDrSBww6Fyb3bDoW7DrSBwb2xvxb5reSB2w71waXN1ICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDEtMTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKipEaWFsb2cgcyBoaXN0b3Jpw60gcMOhcm92w6Fuw60gcG9sb8W+a3kgdsO9cGlzdSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGFyb3Zhbm9IaXN0b3JpZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqSWRlbnRpZmlrw6F0b3IgbmFww6Fyb3ZhbsOpaG8gZG9rbGFkdSovXHJcbiAgICAgICAgcHVibGljIGl4cF9wYXI6IHN0cmluZztcclxuICAgICAgICAvKiogxZjDoWRlayBwb2xvxb5reSBiYW5rb3Zuw61obyB2w71waXN1Ki9cclxuICAgICAgICBwdWJsaWMgcmFkZWtfcG9sOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFN1YsWZw6FkZWsgcG9sb8W+a3kgYmFua292bsOtaG8gdsO9cGlzdSovXHJcbiAgICAgICAgcHVibGljIHN1YnJhZGVrOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIMWYw6FkZWsgQVYgLSDFmcOhZGVrIHJvenBpc3UgcG9sb8W+a3kgYmFua292bsOtaG8gdsO9cGlzdSovXHJcbiAgICAgICAgcHVibGljIHJhZGVrX2F2OiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKiBHbG9iYWxzIC0gUnBwVXVzKi9cclxuICAgICAgICBwcml2YXRlIHJwcFV1czogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdCFcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlZ5dHZvxZllbsOtIGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFBhcm92YW5vSGlzdG9yaWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0bz4odGhpcy5pc2wuQnVjUGFyb3Zhbm8uaGlzdG9yaWUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7IGl4cDogdGhpcy5peHBfcGFyLCByYWRla19wb2w6IHRoaXMucmFkZWtfcG9sLCBzdWJyYWRlazogdGhpcy5zdWJyYWRlaywgcmFkZWtfYXY6IHRoaXMucmFkZWtfYXYgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCB7IGtleTogW1wiaXhwXCIsIFwicmFkZWtfcG9sXCIsIFwic3VicmFkZWtcIiwgXCJyYWRla19hdlwiLCBcInBvcl9jaXNsb1wiXSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInBvcl9jaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQHNfcG9sID09IDQ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDA1NlwiLCAvL1JDIDMzNjAwMDU2IDogU3RhdiAnbmVzcMOhcm92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBjIDwgMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAwNTdcIiwgLy9SQyAzMzYwMDA1NyA6IMSMw6FzdGthIG1lbsWhw60gbmXFviAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHlUbzogXCJjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0bz4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvTmFtZXMucG9yX2Npc2xvLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjIFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDA1OFwiLCAvL1JDIDMzNjAwMDU4IDogUG/FmWFkb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLnNfcG9sX3prcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDA1OVwiLCAvL1JDIDMzNjAwMDU5IDogUyBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAwNjBcIiwgLy9SQyAzMzYwMDA2MCA6IFN0YXYgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc19wb2xfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfcG9sX3R4dCA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwNjJcIiwgLy9SQyAzMzYwMDA2MiA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTWVuYSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy5tZW5hX3prclxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDA2MVwiLCAvL1JDIDMzNjAwMDYxIDogxIzDoXN0a2EgdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRWcyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRLcyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy5rcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRTcyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy5zcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLmRhdF96YXAsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwNjNcIiwgLy9SQyAzMzYwMDA2MyA6IERhdHVtIHphcGxhY2Vuw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLmRhdF9wYXIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwNjRcIiwgLy9SQyAzMzYwMDA2NCA6IERhdHVtIHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy5kYXRfdWhyLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDY1XCIsIC8vUkMgMzM2MDAwNjUgOiBEYXR1bSBVVVBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAwNjZcIiwgLy9SQyAzMzYwMDA2NiA6IERhdHVtIHVza3V0ZcSNbsSbbsOtIMO6xI1ldG7DrWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvTmFtZXMuaXhwX3BhcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDA2N1wiLCAvL1JDIDMzNjAwMDY3IDogSVhQIHDDoXJvdsOhbm9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvTmFtZXMuY2lzbG9fcGFyLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDY4XCIsIC8vUkMgMzM2MDAwNjggOiDEjMOtc2xvIHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRBZ2VuZGEoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvTmFtZXMudHlwX2FnX3prcixcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy50eXBfYWdfemtyLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE5hemV2U3ViamVrdHUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvTmFtZXMuZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1Bhcm92YW5vSGlzdG9yaWVEdG9OYW1lcy5lc3VfdHh0LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ycHBVdXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1ucy5hZGRVdXMoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLnV1cyxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdQYXJvdmFub0hpc3RvcmllRHRvTmFtZXMudXVzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3Zhbm9IaXN0b3JpZUR0b05hbWVzLnNfcG9sLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDY5XCIsIC8vUkMgMzM2MDAwNjkgOiBTICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDA3MFwiLCAvL1JDIDMzNjAwMDcwIDogU3RhdiBwb2xvxb5reSAoxI3DrXNlbG7EmylcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMixcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
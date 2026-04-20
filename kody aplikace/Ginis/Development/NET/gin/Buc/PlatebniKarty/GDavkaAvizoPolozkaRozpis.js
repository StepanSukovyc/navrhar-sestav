"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAvizoPolozkaRozpis.ts            </Name>
//    <Description> Dialog s rozpisem položky dávky avíza platební karty        </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-01                                                  </Created>
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
            /**Dialog s položkami dávky avíza platební karty */
            let GDavkaAvizoPolozkaRozpis = class GDavkaAvizoPolozkaRozpis extends Gordic.GContentBase {
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
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaAvizoPolozkaRozpis",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaAvizoPolozka.listRozpisPolozky({
                            filters: {
                                davka: this.davka,
                                radek: this.radek,
                                mod: this.mod
                            },
                        }), {
                            key: ["lic", "davka", "radek", "subradek"],
                        }),
                        defaultAction: this.actions.actRozpis,
                        defaultProfile: {
                            sort: "subradek",
                            condFormats: [
                                {
                                    formula: "@s_ide == 10",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    description: "jres:33600316" //RC 33600316 : Položka neidentifikována
                                },
                                {
                                    formula: "@s_ide == 30",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                                    description: "jres:33600317" //RC 33600317 : Položka neznámá
                                },
                                {
                                    formula: "@s_ide == 0",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.green,
                                    description: "jres:33600318" //RC 33600318 : Položka evidována
                                },
                            ]
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "s_ide_zkr" /* Interface.GDavkaAvizoPolozkaDtoNames.s_ide_zkr */,
                        caption: "jres:33600319", //RC 33600319 : S 
                        description: "jres:33600320", //RC 33600320 : Stav položky
                        width: 32,
                        cellTemplate: (data) => { return data.s_ide_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_ide_txt ?? ""; }
                    });
                    columns.addDateColumn({
                        name: "dat_tra" /* Interface.GDavkaAvizoPolozkaDtoNames.dat_tra */,
                        caption: "jres:33600323", //RC 33600323 : Datum transakce
                        width: 110
                    });
                    columns.addCurrencyColumn({
                        name: "c_tra" /* Interface.GDavkaAvizoPolozkaDtoNames.c_tra */,
                        caption: "jres:33600326", //RC 33600326 : Částka
                        width: 120
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GDavkaAvizoPolozkaDtoNames.vs */,
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GDavkaAvizoPolozkaDtoNames.ss */,
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GDavkaAvizoDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GDavkaAvizoDtoNames.ucet_vl */,
                    });
                    columns.addTextColumn({
                        name: "ixp_pok" /* Interface.GDavkaAvizoPolozkaDtoNames.ixp_pok */,
                        caption: "jres:33600329", //RC 33600329 : Identifikátor POK
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "s_ide" /* Interface.GDavkaAvizoPolozkaDtoNames.s_ide */,
                        caption: "jres:33600333", //RC 33600333 : Stav položky (číselně)
                        hidden: true
                    });
                    return columns;
                }
            };
            GDavkaAvizoPolozkaRozpis = __decorate([
                Decorators.gcontent
            ], GDavkaAvizoPolozkaRozpis);
            WebClient.GDavkaAvizoPolozkaRozpis = GDavkaAvizoPolozkaRozpis;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQXZpem9Qb2xvemthUm96cGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdmthQXZpem9Qb2xvemthUm96cGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBNkhmO0FBN0hELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZIbkI7SUE3SGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZIN0I7UUE3SG9CLFdBQUEsU0FBUztZQUMxQixtREFBbUQ7WUFFbkQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxPQUFBLFlBQVk7Z0JBV3RELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDO3FCQUNMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELDRCQUE0QjtnQkFDcEIsZ0JBQWdCO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENB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LENBQUE7b0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDVixJQUFJLG9EQUF5QztxQkFDaEQsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ1YsSUFBSSxvREFBeUM7cUJBQ2hELENBQUMsQ0FBQTtvQkFDRixPQUFPLENBQUMsc0JBQXNCLENBQUM7d0JBQzNCLElBQUksdURBQXVDO3dCQUMzQyxLQUFLLHVEQUF1QztxQkFDL0MsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxhQUFhLENBQUM7d0JBQ2xCLElBQUksOERBQThDO3dCQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGlDQUFpQzt3QkFDM0QsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxlQUFlLENBQUM7d0JBQ3BCLElBQUksMERBQTRDO3dCQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNDQUFzQzt3QkFDaEUsTUFBTSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFBO29CQUVGLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixDQUFDO2FBQ0osQ0FBQTtZQXpIWSx3QkFBd0I7Z0JBRHBDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asd0JBQXdCLENBeUhwQztZQXpIWSxrQ0FBd0IsMkJBeUhwQyxDQUFBO1FBQ0wsQ0FBQyxFQTdIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNkg3QjtJQUFELENBQUMsRUE3SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZIbkI7QUFBRCxDQUFDLEVBN0hTLE1BQU0sS0FBTixNQUFNLFFBNkhmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUF2aXpvUG9sb3prYVJvenBpcy50cyAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEaWFsb2cgcyByb3pwaXNlbSBwb2xvxb5reSBkw6F2a3kgYXbDrXphIHBsYXRlYm7DrSBrYXJ0eSAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNC0wMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKipEaWFsb2cgcyBwb2xvxb5rYW1pIGTDoXZreSBhdsOtemEgcGxhdGVibsOtIGthcnR5ICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXZrYUF2aXpvUG9sb3prYVJvenBpcyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqxIzDrXNsbyBkw6F2a2EgKi9cclxuICAgICAgICBwdWJsaWMgZGF2a2E6IG51bWJlcjtcclxuICAgICAgICAvKirFmMOhZGVrIGTDoXZreSAqL1xyXG4gICAgICAgIHB1YmxpYyByYWRlazogbnVtYmVyO1xyXG4gICAgICAgIC8qKm3Ds2QgKDEgLSBwb2RhbsOpKSovXHJcbiAgICAgICAgcHVibGljIG1vZDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipHcmlkICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERhdmthQXZpem9Qb2xvemthUm96cGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvPih0aGlzLmlzbC5CdWNEYXZrYUF2aXpvUG9sb3prYS5saXN0Um96cGlzUG9sb3preSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdmthOiB0aGlzLmRhdmthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWs6IHRoaXMucmFkZWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2Q6IHRoaXMubW9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJsaWNcIiwgXCJkYXZrYVwiLCBcInJhZGVrXCIsIFwic3VicmFkZWtcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFJvenBpcyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN1YnJhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19pZGUgPT0gMTBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzMTZcIiAvL1JDIDMzNjAwMzE2IDogUG9sb8W+a2EgbmVpZGVudGlmaWtvdsOhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19pZGUgPT0gMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzE3XCIgLy9SQyAzMzYwMDMxNyA6IFBvbG/FvmthIG5lem7DoW3DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX2lkZSA9PSAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyZWVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzMThcIiAvL1JDIDMzNjAwMzE4IDogUG9sb8W+a2EgZXZpZG92w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGVmaW5pY2UgZ3JpZGZvcm3DoXR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvTmFtZXMuc19pZGVfemtyLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzE5XCIsIC8vUkMgMzM2MDAzMTkgOiBTIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDMyMFwiLCAvL1JDIDMzNjAwMzIwIDogU3RhdiBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX2lkZV96a3IgPz8gXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc19pZGVfdHh0ID8/IFwiXCI7IH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5kYXRfdHJhLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzIzXCIsIC8vUkMgMzM2MDAzMjMgOiBEYXR1bSB0cmFuc2FrY2VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvTmFtZXMuY190cmEsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjZcIiwgLy9SQyAzMzYwMDMyNiA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5zcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5peHBfcG9rLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzI5XCIsIC8vUkMgMzM2MDAzMjkgOiBJZGVudGlmaWvDoXRvciBQT0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLnNfaWRlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzMzXCIsIC8vUkMgMzM2MDAzMzMgOiBTdGF2IHBvbG/Fvmt5ICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
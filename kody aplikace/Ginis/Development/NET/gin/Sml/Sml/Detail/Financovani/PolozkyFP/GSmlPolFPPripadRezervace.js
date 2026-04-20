"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPolFPPripadRezervace.ts            </Name>
//    <Description> Položky FP - Případ - Dialog Rezervace                      </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-12                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /**Položky FP - Případ - Dialog Rezervace */
            let GSmlPolFPPripadRezervace = class GSmlPolFPPripadRezervace extends Gordic.GContentBase {
                onContentReady() {
                    this.createGrid();
                    this.createActions();
                    this.createCommandBar();
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
                /**Vytvoření seznamu rezervací*/
                createGrid() {
                    $.newDiv()
                        .appendTo(this.element)
                        .ggrid({
                        name: "gridPolozkyFPRezervace",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlFinPolozkyFPPripad.listRezervace({
                            ixp: this.ixp, rok: this.rok, cislo: this.cislo
                        })),
                        defaultProfile: {
                            condFormats: [
                                {
                                    formula: "@res == 0",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                                }
                            ]
                        },
                    }).ggrideko({
                        summaryRow: true,
                        summaryRowAllowed: true,
                        summaryRowColumns: ["pol", "res"]
                    }).gautofit();
                }
                /**
                 * Vytvoření gridformátu pro seznam rezervací
                 * @returns
                 */
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addTextColumn({
                        name: "txt_2", //typ_ag
                        caption: "jres:33600350", //RC 33600350 : Agenda
                        width: 70
                    }).addTextColumn({
                        name: "ixp",
                        caption: "jres:33600351", //RC 33600351 : Identifikátor
                        width: 120
                    }).addTextColumn({
                        name: "ac",
                        caption: "jres:33600352", //RC 33600352 : Evidenční číslo
                        width: 120
                    }).addTextColumn({
                        name: "ac_ag",
                        caption: "jres:33600353", //RC 33600353 : Agendové číslo
                        width: 120
                    }).addNumberColumn({
                        name: "cislo", //radek_kry
                        caption: "#",
                        width: 40
                    }).addNks();
                    gf.addSortedEkoCfuSet(this
                    //{
                    //    isEditable: false,
                    //    columnExtend: {
                    //        uea: { hidden: !this.sml_rad_polsuex },
                    //        ueb: { hidden: !this.sml_rad_polsuex }
                    //    }
                    //}
                    );
                    gf.addCurrencyColumn({
                        name: "pol", //c
                        caption: "jres:33600354" //RC 33600354 : Částka
                    }).addCurrencyColumn({
                        name: "res", //c_rez
                        caption: "jres:33600355" //RC 33600355 : Rezervováno
                    }).addTextColumn({
                        name: "nazev",
                        caption: "jres:33600356" //RC 33600356 : Název
                    });
                    return gf;
                }
            };
            GSmlPolFPPripadRezervace = __decorate([
                Decorators.gcontent
            ], GSmlPolFPPripadRezervace);
            WebClient.GSmlPolFPPripadRezervace = GSmlPolFPPripadRezervace;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBK0hmO0FBL0hELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStIbkI7SUEvSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQStIN0I7UUEvSG9CLFdBQUEsU0FBUztZQWUxQiw0Q0FBNEM7WUFFNUMsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxPQUFBLFlBQVk7Z0JBUXRELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDO3FCQUNMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELDRCQUE0QjtnQkFDcEIsZ0JBQWdCO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENB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QUNqRCxDQUFDLENBQUM7b0JBRUgsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQzthQUNKLENBQUE7WUE3R1ksd0JBQXdCO2dCQURwQyxVQUFVLENBQUMsUUFBUTtlQUNQLHdCQUF3QixDQTZHcEM7WUE3R1ksa0NBQXdCLDJCQTZHcEMsQ0FBQTtRQUNMLENBQUMsRUEvSG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQStIN0I7SUFBRCxDQUFDLEVBL0hnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErSG5CO0FBQUQsQ0FBQyxFQS9IUyxNQUFNLEtBQU4sTUFBTSxRQStIZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlLnRzICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBQb2xvxb5reSBGUCAtIFDFmcOtcGFkIC0gRGlhbG9nIFJlemVydmFjZSAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTA2LTEyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxQb2xGUFByaXBhZFJlemVydmFjZUlucHV0UGFyYW1zIHtcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1Ki9cclxuICAgICAgICBpeHA6IHN0cmluZyxcclxuICAgICAgICAvKiogUm9rIGRlbsOta3UqL1xyXG4gICAgICAgIHJvazogbnVtYmVyLFxyXG4gICAgICAgIC8qKiDEjMOtc2xvIHBvbG/Fvmt5Ki9cclxuICAgICAgICBjaXNsbzogbnVtYmVyLFxyXG4gICAgICAgIC8qKiBUeXAgZG9rdW1lbnR1IChrdsWvbGkgdGl0dWxrdSkqL1xyXG4gICAgICAgIHR5cF9kb2s6IG51bWJlclxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlUmV0dXJuVmFsdWUge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlBvbG/Fvmt5IEZQIC0gUMWZw61wYWQgLSBEaWFsb2cgUmV6ZXJ2YWNlICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTbWxQb2xGUFByaXBhZFJlemVydmFjZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIElkZW50aWZpa8OhdG9yIHDFmcOtcGFkdSovXHJcbiAgICAgICAgcHVibGljIGl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sgZGVuw61rdSovXHJcbiAgICAgICAgcHVibGljIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiDEjMOtc2xvIHBvbG/Fvmt5Ki9cclxuICAgICAgICBwdWJsaWMgY2lzbG86IG51bWJlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXQhXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBzZXpuYW11IHJlemVydmFjw60qL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUG9sb3preUZQUmV6ZXJ2YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5TbWxGaW5Qb2xvemt5RlBQcmlwYWQubGlzdFJlemVydmFjZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy5peHAsIHJvazogdGhpcy5yb2ssIGNpc2xvOiB0aGlzLmNpc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAcmVzID09IDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pLmdncmlkZWtvKHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBbXCJwb2xcIiwgXCJyZXNcIl1cclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgcHJvIHNlem5hbSByZXplcnZhY8OtXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eHRfMlwiLCAvL3R5cF9hZ1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzUwXCIsIC8vUkMgMzM2MDAzNTAgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNTFcIiwgLy9SQyAzMzYwMDM1MSA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzUyXCIsIC8vUkMgMzM2MDAzNTIgOiBFdmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzUzXCIsIC8vUkMgMzM2MDAzNTMgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb1wiLCAvL3JhZGVrX2tyeVxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgfSkuYWRkTmtzKClcclxuICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpc0VkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjb2x1bW5FeHRlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdWVhOiB7IGhpZGRlbjogIXRoaXMuc21sX3JhZF9wb2xzdWV4IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHVlYjogeyBoaWRkZW46ICF0aGlzLnNtbF9yYWRfcG9sc3VleCB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9sXCIsIC8vY1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzU0XCIgLy9SQyAzMzYwMDM1NCA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmVzXCIsIC8vY19yZXpcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM1NVwiIC8vUkMgMzM2MDAzNTUgOiBSZXplcnZvdsOhbm9cclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNTZcIiAvL1JDIDMzNjAwMzU2IDogTsOhemV2XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
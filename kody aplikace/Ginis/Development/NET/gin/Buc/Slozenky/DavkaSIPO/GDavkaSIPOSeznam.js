"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVSeznam.ts                      </Name>
//    <Description> Dialog se seznamem složenek dávek SIPO                      </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-20                                                  </Created>
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
            /**Dialog se seznamem složenek dávek SIPO */
            let GDavkaSIPOSeznam = class GDavkaSIPOSeznam extends Gordic.GContentBase {
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
                        actNacist: {
                            caption: "jres:33600794", //RC 33600794 : Načíst
                            icon: "gi-send",
                            permission: that.Permissions.LzeNacist,
                            run: function (ev, ctx) {
                                this.setPending(that.nacist());
                            }
                        },
                        actObsah: {
                            caption: "Obsah",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                let data = that.$grid.ggrid("getSelection");
                                if (data.length == 1) {
                                    this.setPending(that.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaSIPOObsah", { uid: "GDavkaSIPOObsah#" }], {
                                        davka: data[0].davka,
                                        mod: 0,
                                    }, { /*width: 580, height: 450*/}).createDialogPromise());
                                }
                            }
                        },
                        //actSeznamObsahu: {
                        //    caption: "jres:33600263", //RC 33600263 : Seznam obsahů
                        //    icon: "gi-list",
                        //    run: function (ev, ctx) {
                        //        this.setPending(that.dialogs.showModalWindow(
                        //            ["Gordic.Buc.WebClient.GDavkaAVObsah", { uid: "GDavkaAVObsah#" }],
                        //            {
                        //                mod: 1,
                        //            }, { /*width: 580, height: 450*/ }).createDialogPromise());
                        //    }
                        //},
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: this.mod == 1,
                            visible: this.mod == 1,
                            run: (ev, ctx) => {
                                let row = Gordic.Eko.Grid.currentRow(this.$grid);
                                this.tryClose(row);
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
                    this.menuBar(this.actions.createBar(["actNacist*", "actObsah*" /*, "actSeznamObsahu*"*/]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaSIPOSeznam",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaSIPO.list({
                            filters: {
                                sk_vl: this.sk_vl,
                                bu_vl: this.bu_vl,
                                c: this.c_pre,
                                mod: this.mod
                            }
                        }), {
                            key: ["davka", "cis_org", "rok_obd", "mes_obd", "kod_popl_sipo"]
                        }),
                        defaultAction: this.actions.actOk,
                        defaultProfile: {
                            sort: "!davka",
                            condFormats: [
                                {
                                    formula: "@s_dav == 30",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                                    description: "jres:33600265" //RC 33600265 : Dávka zpracována
                                }
                            ]
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addNumberColumn({
                        name: "davka" /* Interface.GDavkaSIPODtoNames.davka */,
                        caption: "jres:33600266", //RC 33600266 : Číslo dávky
                        width: 90
                    });
                    columns.addNumberColumn({
                        name: "poc_pla_dav" /* Interface.GDavkaSIPODtoNames.poc_pla_dav */,
                        caption: "jres:33600267", //RC 33600267 : Počet plateb
                        description: "jres:33600268", //RC 33600268 : Celkový počet plateb dávky
                        width: 90
                    });
                    columns.addCurrencyColumn({
                        name: "c_dav" /* Interface.GDavkaSIPODtoNames.c_dav */,
                        caption: "jres:33600269", //RC 33600269 : Bankovní výpis
                        description: "jres:33600270", //RC 33600270 : Celková částka dávky
                        width: 120
                    });
                    columns.addTextColumn({
                        name: "ozn_dav" /* Interface.GDavkaSIPODtoNames.ozn_dav */,
                        caption: "jres:33600271", //RC 33600271 : Dávka
                        width: 150
                    });
                    columns.addRok({
                        name: "rok_obd" /* Interface.GDavkaSIPODtoNames.rok_obd */,
                        field: "rok_obd" /* Interface.GDavkaSIPODtoNames.rok_obd */
                    });
                    columns.addMesic({
                        name: "mes_obd" /* Interface.GDavkaSIPODtoNames.mes_obd */,
                        field: "mes_obd" /* Interface.GDavkaSIPODtoNames.mes_obd */
                    });
                    columns.addNumberColumn({
                        name: "kod_popl_sipo" /* Interface.GDavkaSIPODtoNames.kod_popl_sipo */,
                        caption: "jres:33600272", //RC 33600272 : Kód
                        width: 60
                    });
                    columns.addDateColumn({
                        name: "dat_nac" /* Interface.GDavkaSIPODtoNames.dat_nac */,
                        caption: "jres:33600273", //RC 33600273 : Datum načtení
                        width: 110
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GDavkaSIPODtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GDavkaSIPODtoNames.ucet_vl */,
                    });
                    columns.addNumberColumn({
                        name: "poc_pla" /* Interface.GDavkaSIPODtoNames.poc_pla */,
                        caption: "jres:33600274", //RC 33600274 : Počet
                        width: 55
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GDavkaSIPODtoNames.c */,
                        caption: "jres:33600275", //RC 33600275 : Částka
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "s_dav" /* Interface.GDavkaSIPODtoNames.s_dav */,
                        caption: "jres:33600253", //RC 33600253 : Stav dávky (číselně)
                        hidden: true
                    });
                    return columns;
                }
                /** Načtení dávky složenek SIPO */
                nacist() {
                    return this.dialogs.error("TODO").createDialogPromise();
                }
            };
            GDavkaSIPOSeznam = __decorate([
                Decorators.gcontent
            ], GDavkaSIPOSeznam);
            WebClient.GDavkaSIPOSeznam = GDavkaSIPOSeznam;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthU0lQT1Nlem5hbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXZrYVNJUE9TZXpuYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0FvTWY7QUFwTUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb01uQjtJQXBNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb003QjtRQXBNb0IsV0FBQSxTQUFTO1lBQzFCLDRDQUE0QztZQUU1QyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFnQjlDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELElBQUksRUFBRSxTQUFTOzRCQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7NEJBQ3RDLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUNuQyxDQUFDO3lCQUNKO3dCQUNELFFBQVEsRUFBRTs0QkFDTixPQUFPLEVBQUUsT0FB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RSxHQUFHO3FCQUNiLENBQUMsQ0FBQTtvQkFFRixPQUFPLENBQUMsZUFBZSxDQUFDO3dCQUNwQixJQUFJLGtEQUFvQzt3QkFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQ0FBb0M7d0JBQzlELE1BQU0sRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQTtvQkFFRixPQUFPLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLE1BQU07b0JBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUM1RCxDQUFDO2FBQ0osQ0FBQTtZQWhNWSxnQkFBZ0I7Z0JBRDVCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZ0JBQWdCLENBZ001QjtZQWhNWSwwQkFBZ0IsbUJBZ001QixDQUFBO1FBQ0wsQ0FBQyxFQXBNb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb003QjtJQUFELENBQUMsRUFwTWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9NbkI7QUFBRCxDQUFDLEVBcE1TLE1BQU0sS0FBTixNQUFNLFFBb01mIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUFWU2V6bmFtLnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEaWFsb2cgc2Ugc2V6bmFtZW0gc2xvxb5lbmVrIGTDoXZlayBTSVBPICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDMtMjAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqRGlhbG9nIHNlIHNlem5hbWVtIHNsb8W+ZW5layBkw6F2ZWsgU0lQTyAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGF2a2FTSVBPU2V6bmFtIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogc23Em3JvdsO9IGvDs2QgYmFua3kgdmxhc3Ruw60qL1xyXG4gICAgICAgIHB1YmxpYyBza192bDogc3RyaW5nO1xyXG4gICAgICAgIC8qKmLEm8W+bsO9IMO6xI1ldCB2bGFzdG7DrSovXHJcbiAgICAgICAgcHVibGljIGJ1X3ZsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqxI3DoXN0a2EgcMWZZXZvZHUqL1xyXG4gICAgICAgIHB1YmxpYyBjX3ByZTogRGVjaW1hbCB8IEpzb25EZWNpbWFsO1xyXG4gICAgICAgIC8qKm3Ds2QgKDEgLSBwb2RhbsOpKSovXHJcbiAgICAgICAgcHVibGljIG1vZDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiogU2VydmljZSBQZXJtaXNzaW9ucyAqL1xyXG4gICAgICAgIHByaXZhdGUgUGVybWlzc2lvbnM6IEludGVyZmFjZS5HRGF2a2FTSVBPU2VydmljZVBlcm1pc3Npb25zO1xyXG5cclxuICAgICAgICAvKipHcmlkICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROYWNpc3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3OTRcIiwgLy9SQyAzMzYwMDc5NCA6IE5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhhdC5QZXJtaXNzaW9ucy5MemVOYWNpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5uYWNpc3QoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9ic2FoOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYnNhaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HRGF2a2FTSVBPT2JzYWhcIiwgeyB1aWQ6IFwiR0RhdmthU0lQT09ic2FoI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF2a2E6IGRhdGFbMF0uZGF2a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7IC8qd2lkdGg6IDU4MCwgaGVpZ2h0OiA0NTAqLyB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vYWN0U2V6bmFtT2JzYWh1OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNjNcIiwgLy9SQyAzMzYwMDI2MyA6IFNlem5hbSBvYnNhaMWvXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZPYnNhaFwiLCB7IHVpZDogXCJHRGF2a2FBVk9ic2FoI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBtb2Q6IDEsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0sIHsgLyp3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCovIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICBhY3RPazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMubW9kID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5tb2QgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR0RhdmthU0lQT0R0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2Uocm93KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0TmFjaXN0KlwiLCBcImFjdE9ic2FoKlwiLyosIFwiYWN0U2V6bmFtT2JzYWh1KlwiKi9dKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9rIVwiLCBcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HRGF2a2FTSVBPRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRGF2a2FTSVBPU2V6bmFtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR0RhdmthU0lQT0R0bz4odGhpcy5pc2wuQnVjRGF2a2FTSVBPLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza192bDogdGhpcy5za192bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogdGhpcy5jX3ByZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZDogdGhpcy5tb2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiZGF2a2FcIiwgXCJjaXNfb3JnXCIsIFwicm9rX29iZFwiLCBcIm1lc19vYmRcIiwgXCJrb2RfcG9wbF9zaXBvXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiIWRhdmthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19kYXYgPT0gMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjY1XCIgLy9SQyAzMzYwMDI2NSA6IETDoXZrYSB6cHJhY292w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FTSVBPRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEYXZrYVNJUE9EdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT0R0b05hbWVzLmRhdmthLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjY2XCIsIC8vUkMgMzM2MDAyNjYgOiDEjMOtc2xvIGTDoXZreVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMucG9jX3BsYV9kYXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNjdcIiwgLy9SQyAzMzYwMDI2NyA6IFBvxI1ldCBwbGF0ZWJcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAyNjhcIiwgLy9SQyAzMzYwMDI2OCA6IENlbGtvdsO9IHBvxI1ldCBwbGF0ZWIgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT0R0b05hbWVzLmNfZGF2LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjY5XCIsIC8vUkMgMzM2MDAyNjkgOiBCYW5rb3Zuw60gdsO9cGlzXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjcwXCIsIC8vUkMgMzM2MDAyNzAgOiBDZWxrb3bDoSDEjcOhc3RrYSBkw6F2a3lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMub3puX2RhdixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI3MVwiLCAvL1JDIDMzNjAwMjcxIDogRMOhdmthXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkUm9rKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMucm9rX29iZCxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR0RhdmthU0lQT0R0b05hbWVzLnJva19vYmRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRNZXNpYyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT0R0b05hbWVzLm1lc19vYmQsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdEYXZrYVNJUE9EdG9OYW1lcy5tZXNfb2JkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMua29kX3BvcGxfc2lwbyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI3MlwiLCAvL1JDIDMzNjAwMjcyIDogS8OzZFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT0R0b05hbWVzLmRhdF9uYWMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNzNcIiwgLy9SQyAzMzYwMDI3MyA6IERhdHVtIG5hxI10ZW7DrVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEJhbmtvdm5pVWNldFZsYXN0bmkoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYVNJUE9EdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYVNJUE9EdG9OYW1lcy5wb2NfcGxhLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjc0XCIsIC8vUkMgMzM2MDAyNzQgOiBQb8SNZXRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1NVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI3NVwiLCAvL1JDIDMzNjAwMjc1IDogxIzDoXN0a2FcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPRHRvTmFtZXMuc19kYXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNTNcIiwgLy9SQyAzMzYwMDI1MyA6IFN0YXYgZMOhdmt5ICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYcSNdGVuw60gZMOhdmt5IHNsb8W+ZW5layBTSVBPICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWNpc3QoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJUT0RPXCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
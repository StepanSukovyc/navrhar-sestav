"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVSeznam.ts                      </Name>
//    <Description> Dialog se seznamem dávek avíz platebních karet              </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-27                                                  </Created>
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
            /**Dialog se seznamem dávek avíz platebních karet */
            let GDavkaAvizoSeznam = class GDavkaAvizoSeznam extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    let tiskDto = {};
                    that.actions.addRange({
                        actNacist: {
                            caption: "jres:33600813", //RC 33600813 : Načíst
                            permission: that.Permissions.LzeNacist,
                            run: function (ev, ctx) {
                                this.setPending(that.nacist());
                            }
                        },
                        actPolozky: {
                            caption: "jres:33600291", //RC 33600291 : Položky
                            run: function (ev, ctx) {
                                let data = that.$grid.ggrid("getSelection");
                                if (data.length == 1) {
                                    this.setPending(that.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAvizoPolozka", { uid: "GDavkaAvizoPolozka#" }], {
                                        davka: data[0].davka,
                                        s_rozp: data[0].s_rozp,
                                        mod: that.mod,
                                    }, { /*width: 580, height: 450*/}).createDialogPromise().then((res) => {
                                        if (res?.changed) {
                                            that.$grid.ggrid("getView").requestData();
                                        }
                                    }));
                                }
                            }
                        },
                        actIdentifikace: {
                            caption: "jres:33600292", //RC 33600292 : Identifikace
                            enabled: this.mod == 0,
                            run: function (ev, ctx) {
                                that.beginOperation("jres:33600293"); //RC 33600293 : Probíhá identifikace avíz
                                this.setPending(that.isl.BucDavkaAvizo.automatickyIdentifikovat().get().then(() => {
                                    that.$grid.ggrid("getView").requestData();
                                }).always(() => { that.endOperation(); }));
                            }
                        },
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            enabled: true,
                            tema: "buc_ptm_aviz",
                            ixsStr: this.buc_ptm_aviz,
                            serverParameterMethod: "Gordic.Buc.WebClient.GDavkaAvizoSeznam:PrintParameters",
                            dialogOpening: function (rep) {
                                return that.dialogMaskaTisk().then((ctx) => { if (ctx)
                                    tiskDto = ctx; });
                            },
                            reportStarting: function (rep) {
                                rep.customDto = { datTraStart: tiskDto.dat_tra.start, datTraEnd: tiskDto.dat_tra.end, sPol: tiskDto.s_pol, sPolZkr: tiskDto.s_pol_zkr };
                            }
                        }),
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
                    this.menuBar(this.actions.createBar(["actNacist*", "actPolozky*", "actIdentifikace*", "actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaAvizoSeznam",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaAvizo.list({
                            filters: {
                                sk_vl: this.sk_vl,
                                bu_vl: this.bu_vl,
                                vs: this.vs,
                                ss: this.ss,
                                c: this.c_pre,
                                mod: this.mod
                            }
                        }), {
                            key: ["lic", "davka"]
                        }),
                        defaultAction: this.actions.actOk,
                        defaultProfile: {
                            sort: "!davka",
                            condFormats: [
                                {
                                    formula: "@s_rozp == 10",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    description: "jres:33600294" //RC 33600294 : Dávka v identifikaci
                                },
                                {
                                    formula: "@s_rozp == 20",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                                    description: "jres:33600295" //RC 33600295 : Dávka nerozepsána
                                },
                                {
                                    formula: "@s_rozp == 0",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.green,
                                    description: "jres:33600296" //RC 33600296 : Dávka pořízena
                                },
                            ]
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "s_rozp_zkr" /* Interface.GDavkaAvizoDtoNames.s_rozp_zkr */,
                        caption: "jres:33600297", //RC 33600297 : S 
                        description: "jres:33600298", //RC 33600298 : Stav dávky
                        width: 32,
                        cellTemplate: (data) => { return data.s_rozp_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_rozp_txt ?? ""; }
                    });
                    columns.addTextColumn({
                        name: "cis_obch" /* Interface.GDavkaAvizoDtoNames.cis_obch */,
                        caption: "jres:33600299", //RC 33600299 : Obchodník
                        width: 150
                    });
                    columns.addNumberColumn({
                        name: "cis_avi" /* Interface.GDavkaAvizoDtoNames.cis_avi */,
                        caption: "jres:33600300", //RC 33600300 : Avízo
                        width: 80
                    });
                    columns.addDateColumn({
                        name: "dat_avi" /* Interface.GDavkaAvizoDtoNames.dat_avi */,
                        caption: "jres:33600301", //RC 33600301 : Datum avíza
                        width: 110
                    });
                    columns.addDateColumn({
                        name: "dat_zau" /* Interface.GDavkaAvizoDtoNames.dat_zau */,
                        caption: "jres:33600302", //RC 33600302 : Datum převodu
                        width: 110
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GDavkaAvizoDtoNames.vs */,
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GDavkaAvizoDtoNames.ss */,
                    });
                    columns.addCurrencyColumn({
                        name: "c_sum_zau" /* Interface.GDavkaAvizoDtoNames.c_sum_zau */,
                        caption: "jres:33600303", //RC 33600303 : Převedeno
                        width: 120
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GDavkaAvizoDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GDavkaAvizoDtoNames.ucet_vl */,
                    });
                    columns.addCurrencyColumn({
                        name: "c_sum_tra" /* Interface.GDavkaAvizoDtoNames.c_sum_tra */,
                        caption: "jres:33600304", //RC 33600304 : Částka transakcí
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_sum_pop" /* Interface.GDavkaAvizoDtoNames.c_sum_pop */,
                        caption: "jres:33600305", //RC 33600305 : Poplatky
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "davka" /* Interface.GDavkaAvizoDtoNames.davka */,
                        caption: "jres:33600306", //RC 33600306 : Dávka
                        width: 80
                    });
                    columns.addTextColumn({
                        name: "ozn_dav" /* Interface.GDavkaAvizoDtoNames.ozn_dav */,
                        caption: "jres:33600307", //RC 33600307 : Označení dávky
                        width: 300
                    });
                    columns.addNumberColumn({
                        name: "s_rozp" /* Interface.GDavkaAvizoDtoNames.s_rozp */,
                        caption: "jres:33600308", //RC 33600308 : Stav dávky (číselně)
                        hidden: true
                    });
                    return columns;
                }
                /** Dialog před tiskem s výběrem masky */
                dialogMaskaTisk() {
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAvizoTiskMaska", { uid: "GDavkaAvizoTiskMaska#" }], {}, { width: 580, height: 450 }).createDialogPromise().then((ctx) => {
                        if (!ctx) {
                            return $.Deferred().reject().promise();
                        }
                        return ctx;
                    });
                }
                /** Načtení dávky avíz platebních karet */
                nacist() {
                    return this.dialogs.error("TODO").createDialogPromise();
                }
            };
            GDavkaAvizoSeznam = __decorate([
                Decorators.gcontent
            ], GDavkaAvizoSeznam);
            WebClient.GDavkaAvizoSeznam = GDavkaAvizoSeznam;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQXZpem9TZXpuYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGF2a2FBdml6b1Nlem5hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQTBQZjtBQTFQRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwUG5CO0lBMVBnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwUDdCO1FBMVBvQixXQUFBLFNBQVM7WUFDMUIsb0RBQW9EO1lBRXBELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQXNCL0MsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO29CQUV0QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzRCQUN0QyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs0QkFDbkMsQ0FBQzt5QkFDSjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1Is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Ly8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUFWU2V6bmFtLnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEaWFsb2cgc2Ugc2V6bmFtZW0gZMOhdmVrIGF2w616IHBsYXRlYm7DrWNoIGthcmV0ICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAzLTI3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKkRpYWxvZyBzZSBzZXpuYW1lbSBkw6F2ZWsgYXbDrXogcGxhdGVibsOtY2gga2FyZXQgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdmthQXZpem9TZXpuYW0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBzbcSbcm92w70ga8OzZCBiYW5reSB2bGFzdG7DrSovXHJcbiAgICAgICAgcHVibGljIHNrX3ZsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqYsSbxb5uw70gw7rEjWV0IHZsYXN0bsOtKi9cclxuICAgICAgICBwdWJsaWMgYnVfdmw6IHN0cmluZztcclxuICAgICAgICAvKirEjcOhc3RrYSBwxZlldm9kdSovXHJcbiAgICAgICAgcHVibGljIGNfcHJlOiBEZWNpbWFsIHwgSnNvbkRlY2ltYWw7XHJcbiAgICAgICAgLyoqbcOzZCAoMSAtIHBvZGFuw6kpKi9cclxuICAgICAgICBwdWJsaWMgbW9kOiBudW1iZXI7XHJcbiAgICAgICAgLyoqdmFyaWFiaWxuw60gc3ltYm9sKi9cclxuICAgICAgICBwdWJsaWMgdnM6IHN0cmluZztcclxuICAgICAgICAvKip2YXJpYWJpbG7DrSBzeW1ib2wqL1xyXG4gICAgICAgIHB1YmxpYyBzczogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogU2VydmljZSBQZXJtaXNzaW9ucyAqL1xyXG4gICAgICAgIHByaXZhdGUgUGVybWlzc2lvbnM6IEludGVyZmFjZS5HRGF2a2FBdml6b1NlcnZpY2VQZXJtaXNzaW9ucztcclxuICAgICAgICAvKipCVUMgLSBUVCBBdsOtem8gcGxhdGVibsOtY2gga2FyZXQqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B0bV9hdml6OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKkdyaWQgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdGlza0R0bzogYW55ID0ge307XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmFjaXN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwODEzXCIsIC8vUkMgMzM2MDA4MTMgOiBOYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoYXQuUGVybWlzc2lvbnMuTHplTmFjaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQubmFjaXN0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQb2xvemt5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjkxXCIsIC8vUkMgMzM2MDAyOTEgOiBQb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQXZpem9Qb2xvemthXCIsIHsgdWlkOiBcIkdEYXZrYUF2aXpvUG9sb3prYSNcIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdmthOiBkYXRhWzBdLmRhdmthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzX3JvenA6IGRhdGFbMF0uc19yb3pwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2Q6IHRoYXQubW9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgLyp3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCovIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcz8uY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RJZGVudGlmaWthY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyOTJcIiwgLy9SQyAzMzYwMDI5MiA6IElkZW50aWZpa2FjZVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMubW9kID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMzYwMDI5M1wiKTsgLy9SQyAzMzYwMDI5MyA6IFByb2LDrWjDoSBpZGVudGlmaWthY2UgYXbDrXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuaXNsLkJ1Y0RhdmthQXZpem8uYXV0b21hdGlja3lJZGVudGlmaWtvdmF0KCkuZ2V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VGlzazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImJ1Y19wdG1fYXZpelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c1N0cjogdGhpcy5idWNfcHRtX2F2aXosXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUF2aXpvU2V6bmFtOlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wZW5pbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9nTWFza2FUaXNrKCkudGhlbigoY3R4KSA9PiB7IGlmIChjdHgpIHRpc2tEdG8gPSBjdHg7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgZGF0VHJhU3RhcnQ6IHRpc2tEdG8uZGF0X3RyYS5zdGFydCwgZGF0VHJhRW5kOiB0aXNrRHRvLmRhdF90cmEuZW5kLCBzUG9sOiB0aXNrRHRvLnNfcG9sLCBzUG9sWmtyOiB0aXNrRHRvLnNfcG9sX3prciB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0T2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9rKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLm1vZCA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMubW9kID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZShyb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROYWNpc3QqXCIsIFwiYWN0UG9sb3preSpcIiwgXCJhY3RJZGVudGlmaWthY2UqXCIsIFwiYWN0VGlzaypcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRGF2a2FBdml6b1Nlem5hbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvPih0aGlzLmlzbC5CdWNEYXZrYUF2aXpvLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza192bDogdGhpcy5za192bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnM6IHRoaXMudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzczogdGhpcy5zcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IHRoaXMuY19wcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2Q6IHRoaXMubW9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcImxpY1wiLCBcImRhdmthXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiIWRhdmthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19yb3pwID09IDEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjk0XCIgLy9SQyAzMzYwMDI5NCA6IETDoXZrYSB2IGlkZW50aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3JvenAgPT0gMjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjk1XCIgLy9SQyAzMzYwMDI5NSA6IETDoXZrYSBuZXJvemVwc8OhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19yb3pwID09IDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuZ3JlZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDI5NlwiIC8vUkMgMzM2MDAyOTYgOiBEw6F2a2EgcG/FmcOtemVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGVmaW5pY2UgZ3JpZGZvcm3DoXR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0RhdmthQXZpem9EdG8+IHtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0RhdmthQXZpem9EdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMuc19yb3pwX3prcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI5N1wiLCAgLy9SQyAzMzYwMDI5NyA6IFMgXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjk4XCIsIC8vUkMgMzM2MDAyOTggOiBTdGF2IGTDoXZreVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3JvenBfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfcm96cF90eHQgPz8gXCJcIjsgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLmNpc19vYmNoLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjk5XCIsIC8vUkMgMzM2MDAyOTkgOiBPYmNob2Ruw61rXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLmNpc19hdmksXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMDBcIiwgLy9SQyAzMzYwMDMwMCA6IEF2w616b1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9EdG9OYW1lcy5kYXRfYXZpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzAxXCIsIC8vUkMgMzM2MDAzMDEgOiBEYXR1bSBhdsOtemFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLmRhdF96YXUsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMDJcIiwgLy9SQyAzMzYwMDMwMiA6IERhdHVtIHDFmWV2b2R1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMudnMsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkU3Moe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMuY19zdW1femF1LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzAzXCIsIC8vUkMgMzM2MDAzMDMgOiBQxZlldmVkZW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQmFua292bmlVY2V0Vmxhc3RuaSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9EdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMuY19zdW1fdHJhLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzA0XCIsIC8vUkMgMzM2MDAzMDQgOiDEjMOhc3RrYSB0cmFuc2FrY8OtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMuY19zdW1fcG9wLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzA1XCIsIC8vUkMgMzM2MDAzMDUgOiBQb3BsYXRreVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9EdG9OYW1lcy5kYXZrYSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMwNlwiLCAvL1JDIDMzNjAwMzA2IDogRMOhdmthXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLm96bl9kYXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMDdcIiwgLy9SQyAzMzYwMDMwNyA6IE96bmHEjWVuw60gZMOhdmt5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLnNfcm96cCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMwOFwiLCAgLy9SQyAzMzYwMDMwOCA6IFN0YXYgZMOhdmt5ICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEaWFsb2cgcMWZZWQgdGlza2VtIHMgdsO9YsSbcmVtIG1hc2t5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2dNYXNrYVRpc2soKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQXZpem9UaXNrTWFza2FcIiwgeyB1aWQ6IFwiR0RhdmthQXZpem9UaXNrTWFza2EjXCIgfV0sXHJcbiAgICAgICAgICAgICAgICB7fSwgeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHg7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hxI10ZW7DrSBkw6F2a3kgYXbDrXogcGxhdGVibsOtY2gga2FyZXQgKi9cclxuICAgICAgICBwcml2YXRlIG5hY2lzdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlRPRE9cIikuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVSeznam.ts                      </Name>
//    <Description> Dialog se seznamem/vyúčtováním dávek/složenek B             </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
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
            /**Dialog se seznamem/vyúčtováním dávek/složenek B */
            let GDavkaBSeznam = class GDavkaBSeznam extends Gordic.GContentBase {
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
                        actGenerovani: {
                            caption: "jres:33600810", //RC 33600810 : Generování
                            permission: that.Permissions.LzeGenerovat,
                            run: function (ev, ctx) {
                                this.setPending(that.generovani());
                            }
                        },
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        })
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actGenerovani*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaBSeznam",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaB.list(), {
                            key: ["ixp_slo"]
                        }),
                        defaultAction: this.actions.actOk,
                        defaultProfile: {
                            sort: "!dat_vds,!vds",
                            condFormats: [
                                //má tohle vážně význam???
                                {
                                    formula: "@s_vsb == 10",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.purple,
                                    description: "jres:33600363" //RC 33600363 : Stav: Příkaz dávky odeslán do banky
                                },
                                {
                                    formula: "@s_vsb == 20",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.green, //v TK DarkGreen
                                    description: "jres:33600364" //RC 33600364 : Stav: Dávka párována
                                },
                                {
                                    formula: "@s_vsb == 30",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.orange, //v TK Green
                                    description: "jres:33600365" //RC 33600365 : Stav: Načtena dávka vyúčtování
                                },
                                {
                                    formula: "@s_vsb == 40",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                                    description: "jres:33600366" //RC 33600366 : Stav: Zpracovány vratky
                                },
                                {
                                    formula: "@s_vsb == 90",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.gray,
                                    description: "jres:33600367" //RC 33600367 : Stav: Stornována
                                },
                            ]
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "s_vsb_zkr" /* Interface.GDavkaBDtoNames.s_vsb_zkr */,
                        caption: "jres:33600348", //RC 33600348 : S 
                        description: "jres:33600349", //RC 33600349 : Stav dávky
                        width: 32,
                        cellTemplate: (data) => { return data.s_vsb_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_vsb_txt ?? ""; }
                    });
                    columns.addDateColumn({
                        name: "dat_vds" /* Interface.GDavkaBDtoNames.dat_vds */,
                        caption: "jres:33600350", //RC 33600350 : Datum VDS
                        width: 110
                    });
                    columns.addTextColumn({
                        name: "vds" /* Interface.GDavkaBDtoNames.vds */,
                        caption: "jres:33600351", //RC 33600351 : VDS
                        width: 30
                    });
                    columns.addVs({
                        name: "vs_vds" /* Interface.GDavkaBDtoNames.vs_vds */,
                        field: "vs_vds" /* Interface.GDavkaBDtoNames.vs_vds */,
                    });
                    columns.addCurrencyColumn({
                        name: "c_dok" /* Interface.GDavkaBDtoNames.c_dok */,
                        caption: "jres:33600352", //RC 33600352 : Částka dokladů
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_saz_dok" /* Interface.GDavkaBDtoNames.c_saz_dok */,
                        caption: "jres:33600353", //RC 33600353 : Sazba dokladů
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "poc_dok" /* Interface.GDavkaBDtoNames.poc_dok */,
                        caption: "jres:33600354", //RC 33600354 : Počet dokladů
                        width: 80
                    });
                    columns.addCurrencyColumn({
                        name: "c_nev" /* Interface.GDavkaBDtoNames.c_nev */,
                        caption: "jres:33600356", //RC 33600356 : Částka nevyplacených dokladů
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "poc_nev" /* Interface.GDavkaBDtoNames.poc_nev */,
                        caption: "jres:33600357", //RC 33600357 : Počet nevyplacených dokladů
                        width: 80
                    });
                    columns.addDateColumn({
                        name: "dat_nac_sez" /* Interface.GDavkaBDtoNames.dat_nac_sez */,
                        caption: "jres:33600358", //RC 33600358 : Datum načtení seznamu
                        width: 110
                    });
                    columns.addDateColumn({
                        name: "dat_nac" /* Interface.GDavkaBDtoNames.dat_nac */,
                        caption: "jres:33600359", //RC 33600359 : Datum načtení vyúčtování
                        width: 110
                    });
                    columns.addTextColumn({
                        name: "ixp_slo" /* Interface.GDavkaBDtoNames.ixp_slo */,
                        caption: "jres:33600360", //RC 33600360 : Identifikátor
                        width: 110
                    });
                    columns.addNumberColumn({
                        name: "s_vsb" /* Interface.GDavkaBDtoNames.s_vsb */,
                        caption: "jres:33600355", //RC 33600355 : Stav dávky (číselně)
                        hidden: true
                    });
                    return columns;
                }
                /** Otevření dialogu generování */
                generovani() {
                    return this.navigate(['Gordic.Buc.WebClient.GDavkaBGenerovani', { taskId: 'actZpracovaniBGenerovani', uid: 'DavkaBGenerovani#' }]).createDialogPromise().then(() => {
                        this.$grid.ggrid("getView").requestData();
                    });
                }
            };
            GDavkaBSeznam = __decorate([
                Decorators.gcontent
            ], GDavkaBSeznam);
            WebClient.GDavkaBSeznam = GDavkaBSeznam;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQlNlem5hbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXZrYUJTZXpuYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0E4S2Y7QUE5S0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEtuQjtJQTlLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOEs3QjtRQTlLb0IsV0FBQSxTQUFTO1lBQzFCLHFEQUFxRDtZQUVyRCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsT0FBQSxZQUFZO2dCQU0zQyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsYUFBYSxFQUFFOzRCQUNYLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCOzRCQUNwRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZOzRCQUN6QyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDdkMsQ0FBQzt5QkFDSjt3QkFDRCxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxPQUFP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QUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUMvSixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDOUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUE7WUExS1ksYUFBYTtnQkFEekIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxhQUFhLENBMEt6QjtZQTFLWSx1QkFBYSxnQkEwS3pCLENBQUE7UUFDTCxDQUFDLEVBOUtvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4SzdCO0lBQUQsQ0FBQyxFQTlLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOEtuQjtBQUFELENBQUMsRUE5S1MsTUFBTSxLQUFOLE1BQU0sUUE4S2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZTZXpuYW0udHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBzZSBzZXpuYW1lbS92ecO6xI10b3bDoW7DrW0gZMOhdmVrL3Nsb8W+ZW5layBCICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqRGlhbG9nIHNlIHNlem5hbWVtL3Z5w7rEjXRvdsOhbsOtbSBkw6F2ZWsvc2xvxb5lbmVrIEIgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdmthQlNlem5hbSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFNlcnZpY2UgUGVybWlzc2lvbnMgKi9cclxuICAgICAgICBwcml2YXRlIFBlcm1pc3Npb25zOiBJbnRlcmZhY2UuR0RhdmthQlNlcnZpY2VQZXJtaXNzaW9ucztcclxuICAgICAgICAvKipHcmlkICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RHZW5lcm92YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwODEwXCIsIC8vUkMgMzM2MDA4MTAgOiBHZW5lcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGF0LlBlcm1pc3Npb25zLkx6ZUdlbmVyb3ZhdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmdlbmVyb3ZhbmkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RHZW5lcm92YW5pKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlZ5dHZvxZllbsOtIGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR0RhdmthQkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERhdmthQlNlem5hbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdEYXZrYUJEdG8+KHRoaXMuaXNsLkJ1Y0RhdmthQi5saXN0KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBfc2xvXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiIWRhdF92ZHMsIXZkc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tw6EgdG9obGUgdsOhxb5uxJsgdsO9em5hbT8/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQHNfdnNiID09IDEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzYzXCIgLy9SQyAzMzYwMDM2MyA6IFN0YXY6IFDFmcOta2F6IGTDoXZreSBvZGVzbMOhbiBkbyBiYW5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3ZzYiA9PSAyMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IENvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmVlbiwgLy92IFRLIERhcmtHcmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzNjRcIiAvL1JDIDMzNjAwMzY0IDogU3RhdjogRMOhdmthIHDDoXJvdsOhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc192c2IgPT0gMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQub3JhbmdlLCAvL3YgVEsgR3JlZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzY1XCIgLy9SQyAzMzYwMDM2NSA6IFN0YXY6IE5hxI10ZW5hIGTDoXZrYSB2ecO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3ZzYiA9PSA0MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IENvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzNjZcIiAvL1JDIDMzNjAwMzY2IDogU3RhdjogWnByYWNvdsOhbnkgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQHNfdnNiID09IDkwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDM2N1wiIC8vUkMgMzM2MDAzNjcgOiBTdGF2OiBTdG9ybm92w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGVmaW5pY2UgZ3JpZGZvcm3DoXR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0RhdmthQkR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FCRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMuc192c2JfemtyLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQ4XCIsICAvL1JDIDMzNjAwMzQ4IDogUyBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzNDlcIiwgLy9SQyAzMzYwMDM0OSA6IFN0YXYgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfdnNiX3prciA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3ZzYl90eHQgPz8gXCJcIjsgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJEdG9OYW1lcy5kYXRfdmRzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzUwXCIsIC8vUkMgMzM2MDAzNTAgOiBEYXR1bSBWRFNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMudmRzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzUxXCIsIC8vUkMgMzM2MDAzNTEgOiBWRFNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFZzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMudnNfdmRzLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMudnNfdmRzLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMuY19kb2ssXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNTJcIiwgLy9SQyAzMzYwMDM1MiA6IMSMw6FzdGthIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJEdG9OYW1lcy5jX3Nhel9kb2ssXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNTNcIiwgLy9SQyAzMzYwMDM1MyA6IFNhemJhIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMucG9jX2RvayxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM1NFwiLCAvL1JDIDMzNjAwMzU0IDogUG/EjWV0IGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQkR0b05hbWVzLmNfbmV2LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzU2XCIsIC8vUkMgMzM2MDAzNTYgOiDEjMOhc3RrYSBuZXZ5cGxhY2Vuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQkR0b05hbWVzLnBvY19uZXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNTdcIiwgLy9SQyAzMzYwMDM1NyA6IFBvxI1ldCBuZXZ5cGxhY2Vuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQkR0b05hbWVzLmRhdF9uYWNfc2V6LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzU4XCIsIC8vUkMgMzM2MDAzNTggOiBEYXR1bSBuYcSNdGVuw60gc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJEdG9OYW1lcy5kYXRfbmFjLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzU5XCIsIC8vUkMgMzM2MDAzNTkgOiBEYXR1bSBuYcSNdGVuw60gdnnDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCRHRvTmFtZXMuaXhwX3NsbyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM2MFwiLCAvL1JDIDMzNjAwMzYwIDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJEdG9OYW1lcy5zX3ZzYixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM1NVwiLCAgLy9SQyAzMzYwMDM1NSA6IFN0YXYgZMOhdmt5ICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBPdGV2xZllbsOtIGRpYWxvZ3UgZ2VuZXJvdsOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcm92YW5pKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShbJ0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUJHZW5lcm92YW5pJywgeyB0YXNrSWQ6ICdhY3RacHJhY292YW5pQkdlbmVyb3ZhbmknLCB1aWQ6ICdEYXZrYUJHZW5lcm92YW5pIycgfV0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==